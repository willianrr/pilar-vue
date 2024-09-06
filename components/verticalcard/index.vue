<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
import { useRouter } from "vue-router";
const router = useRouter();
type VerticalCard = {
  dataid: number;
  title: string;
  image: string;
  votes: number;
  type: string;
  description?: string;
  first_air_date?: string;
};

const props = defineProps<{
  data: VerticalCard[];
}>();
</script>

<template>
  <div class="flex flex-col relative gap-4 overflow-y">
    <div
      v-for="card in data"
      :key="card?.dataid"
      class="p-4 rounded flex gap-4 bg-gray-500 align-middle cursor-pointer"
      @click="router.push(`/detalhes/${card?.dataid}/${card?.type}`)"
    >
      <div>
        <img
          v-if="!card.image"
          class="w-[250px] max-h-[141px] rounded object-cover"
          src="~/assets/noimage.jpg"
          :alt="card?.title"
        />
        <img
          v-else
          class="max-w-[250px] rounded"
          :src="`${runtimeConfig.public.IMAGE_URL}/w500${card?.image}`"
          :alt="card?.title"
        />
      </div>
      <div>
        <h3 class="pt-2 font-semibold text-xl">{{ card?.title }}</h3>
        <p class="text-white pt-2">{{ card?.description }}</p>
        <div>
          <span class="font-bold">Data lançamento:</span>
          {{ card?.first_air_date }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.no-scroll-bar::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
