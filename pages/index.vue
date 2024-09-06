<script setup lang="ts">
const { data: trendingCardsRef, status: statusTrending } =
  await useTrendingCards();
const { data: moviesCardsRef, status: statusMovies } = await useMoviesCards();

const trendingCards = computed(() => trendingCardsRef.value ?? []);
const moviesCards = computed(() => moviesCardsRef.value ?? []);
</script>

<template>
  <div class="text-white bg-gray-900">
    <Hero />
    <div class="p-4">
      <div class="w-full mt-[-30px]">
        <h2 class="font-normal text-2xl">Séries</h2>
        <SkeletonsCard v-if="statusTrending === 'pending'" />
        <Card v-else :trendings="trendingCards" />
      </div>
      <div class="w-full mt-4">
        <h2 class="font-normal text-2xl">TV</h2>
        <SkeletonsCard v-if="statusMovies === 'pending'" />
        <Card v-else :trendings="moviesCards" />
      </div>
    </div>
  </div>
</template>
