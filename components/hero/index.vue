<template>
  <div
    class="flex flex-nowrap gap-4 overflow-x-auto no-scroll-bar"
    v-if="status === 'pending'"
  >
    <div class="py-4 rounded w-[100%] relative animate-pulse">
      <div class="w-[100%] h-[70vh] rounded bg-gray-200"></div>
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
        :src="`${runtimeConfig.public.IMAGE_URL}/w1920_and_h800_multi_faces/${tv?.image} `"
        alt=""
      />
      <div
        class="z-[5] absolute left-5 max-w-[90vw] md:max-w-[42vw] top-[40%] md:top-[30%] md:z-[10]"
      >
        <h2 class="text-white text-4xl md:text-5xl font-medium">
          {{ tv?.title }}
        </h2>
        <p class="text-white text-md md:text-xl pt-4 font-normal md:block">
          {{ tv?.description }}
        </p>
        <button
          class="bg-[#111827] rounded py-2 px-4 font-bold text-md border-gray-500 border mt-4"
          @click="
            router.push(
              `/detalhes/${tv?.dataid}/${tv?.type || 'tv' || 'movie'}`
            )
          "
        >
          Saiba mais
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type tvProps = {
  id: number;
  backdrop_path: string;
  original_title: string;
  media_type: string;
  title: string;
  vote_average: number;
  type: string;
};
const runtimeConfig = useRuntimeConfig();
import { useRouter } from "vue-router";
const router = useRouter();
const {
  data: tv,
  status,
  error,
} = await useLazyFetch(
  `${runtimeConfig.public.API_BASE_URL}/tv/top_rated?language=pt-BR&page=1&api_key=${runtimeConfig.public.API_KEY}`,
  {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${runtimeConfig.public.SECRET}`,
    },
    transform: (rateds: any) => {
      return (rateds.results[0] = {
        dataid: rateds.results[0].id,
        title:
          rateds.results[0].original_title ||
          rateds.results[0].title ||
          rateds.results[0].name,
        image: rateds.results[0].backdrop_path,
        votes: rateds.results[0].vote_average,
        type: rateds.results[0].media_type,
        description: rateds.results[0].overview,
      });
    },
  }
);
</script>
