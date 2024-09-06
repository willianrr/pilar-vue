<template>
  <div class="text-white bg-gray-900 h-full">
    <div class="p-4">
      <h1 class="pb-4 text-2xl">Resultados para "{{ decodedQuery }}"</h1>
      <verticalcard :data="movies" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRuntimeConfig } from "#app";

const route = useRoute();
const query = route.params.query;
const decodedQuery = decodeURIComponent(query);

const runtimeConfig = useRuntimeConfig();

const { data: movies } = await useLazyFetch(
  `${runtimeConfig.public.API_BASE_URL}/search/multi?api_key=${
    runtimeConfig.public.API_KEY
  }&query=${encodeURIComponent(query)}&language=pt-BR`,
  {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${runtimeConfig.public.SECRET}`,
    },
    transform: (search) => {
      return search.results.map((result) => ({
        dataid: result.id,
        title: result.original_title || result.title || result.name,
        image: result.backdrop_path,
        votes: result.vote_average,
        type: result.media_type,
        description: result.overview,
        first_air_date: result.first_air_date || result.release_date,
      }));
    },
  }
);
</script>
