<script setup lang="ts">
import { ref } from "vue";
const runtimeConfig = useRuntimeConfig();

// Referência para o container do carrossel
const carousel = ref<HTMLDivElement | null>(null);

type CardProps = {
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
  data: CardProps[];
}>();
</script>

<template>
  <div class="relative">
    <button
      @click="scrollLeft"
      class="absolute left-0 top-[50%] transform -translate-y-1/2 bg-black/50 p-2 h-[142px] z-10 text-white"
    >
      &#8249;
    </button>

    <div
      ref="carousel"
      class="flex flex-nowrap gap-4 overflow-x-auto no-scroll-bar"
    >
      <div v-for="card in data" :key="card?.dataid" class="py-4 rounded">
        <img
          class="max-w-[250px] rounded cursor-pointer"
          :src="`${runtimeConfig.public.IMAGE_URL}/w500${card?.image}`"
          :alt="card?.title"
        />
        <h3 class="pt-2 font-semibold">{{ card?.title }}</h3>
      </div>
    </div>

    <button
      @click="scrollRight"
      class="absolute right-0 top-[50%] transform -translate-y-1/2 bg-black/50 p-2 h-[142px] z-10 text-white"
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
  cursor: pointer;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
