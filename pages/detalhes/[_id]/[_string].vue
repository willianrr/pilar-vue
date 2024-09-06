<template>
  <div>
    <div v-if="status === 'pending'" class="flex flex-nowrap gap-4">
      <div class="py-4 rounded w-full relative animate-pulse">
        <div class="w-full h-[70vh] rounded bg-gray-200"></div>
      </div>
    </div>
    <div
      v-if="error"
      class="flex flex-nowrap gap-4 overflow-x-auto no-scroll-bar"
    >
      <h3 class="pt-2 font-semibold">
        Não foi possível carregar, por favor recarregue novamente.
      </h3>
    </div>
    <div class="relative w-full h-[70vh]" v-else>
      <div
        class="w-full h-full absolute top-[-70px] z-[1] bg-custom-background"
      ></div>
      <div class="absolute top-[-70px] left-0 w-full">
        <img
          class="w-[100%] h-[70vh] object-cover"
          :src="`${runtimeConfig.public.IMAGE_URL}/w1920_and_h800_multi_faces/${detail?.image} `"
          alt=""
        />
        <div
          class="z-[5] absolute left-5 max-w-[90vw] md:max-w-[42vw] top-[30%] md:top-[30%] md:z-[10]"
        >
          <h2 class="text-white text-4xl md:text-5xl font-medium">
            {{ detail?.title }}
          </h2>
          <p class="text-white text-sm md:text-xl pt-4 font-normal md:block">
            {{ detail?.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-full bg-white relative py-4 px-4 mt-[-70px]">
      <h2 class="text-3xl px-2">Elenco</h2>
      <Peoples :data="credits" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "#app";

const route = useRoute();
const { _id, _string } = route.params;
const runtimeConfig = useRuntimeConfig();

const {
  data: detail,
  status,
  error,
} = await useLazyFetch(
  `${runtimeConfig.public.API_BASE_URL}/${_string}/${_id}?api_key=${runtimeConfig.public.API_KEY}&language=pt-BR`,
  {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${runtimeConfig.public.SECRET}`,
    },
    transform: (response) => {
      return {
        dataid: response.id,
        title: response.original_title || response.title || response.name,
        image: response.backdrop_path,
        votes: response.vote_average,
        type: response.media_type,
        description: response.overview,
      };
    },
  }
);

const { data: credits } = await useLazyFetch(
  `${runtimeConfig.public.API_BASE_URL}/${_string}/${_id}/credits?api_key=${runtimeConfig.public.API_KEY}&language=pt-BR`,
  {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${runtimeConfig.public.SECRET}`,
    },
    transform: (response) => {
      return response.cast.map((result) => ({
        dataid: result.id,
        title: result.original_title || result.title || result.name,
        image: result.profile_path,
        votes: result.vote_average,
        type: result.media_type,
        description: result.overview,
        first_air_date: result.first_air_date || result.release_date,
      }));
    },
  }
);
</script>

<style scoped></style>
