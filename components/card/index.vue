<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRuntimeConfig } from "#app";

const carousel = ref<HTMLDivElement | null>(null);

const router = useRouter();
const runtimeConfig = useRuntimeConfig();

type TrendingCard = {
  dataid: number;
  title: string;
  image: string;
  votes: number;
  type: string;
};

const scrollLeft = () => {
  if (carousel.value) {
    carousel.value.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }
};

const scrollRight = () => {
  if (carousel.value) {
    carousel.value.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }
};

const props = defineProps<{
  trendings: TrendingCard[];
}>();
</script>

<template>
  <div class="relative">
    <button
      @click="scrollLeft"
      class="absolute left-0 top-[38%] transform -translate-y-1/2 bg-black/50 p-2 h-[142px] z-10"
    >
      &#8249;
    </button>
    <div
      ref="carousel"
      class="flex flex-nowrap gap-4 overflow-x-auto no-scroll-bar relative"
    >
      <div v-for="card in trendings" :key="card?.dataid" class="py-4 rounded">
        <img
          class="max-w-[250px] rounded cursor-pointer"
          :src="`${runtimeConfig.public.IMAGE_URL}/w500${card?.image}`"
          :alt="card?.title"
          @click="router.push(`/detalhes/${card?.dataid}/${card?.type}`)"
        />
        <h3 class="pt-2 font-semibold">{{ card?.title }}</h3>
      </div>
    </div>
    <button
      @click="scrollRight"
      class="absolute right-0 top-[38%] transform -translate-y-1/2 bg-black/50 p-2 h-[142px] z-10"
    >
      &#8250;
    </button>
  </div>
</template>

<style scoped>
.no-scroll-bar::-webkit-scrollbar {
  width: 0;
  height: 0;
}

button {
  color: white;
  font-size: 24px;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
