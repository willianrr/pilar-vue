<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const isMenuOpen = ref(false);
const query = ref("");
const router = useRouter();

const handleSearch = () => {
  if (query.value.trim()) {
    router.push(`/pesquisar/${encodeURIComponent(query.value.trim())}`);
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <header
    class="text-white flex items-center justify-between pt-2 z-10 relative bg-custom-gradient"
  >
    <div class="flex items-center">
      <img
        class="w-[150px] cursor-pointer"
        src="~/assets/logo.png"
        alt="logo pilar"
        @click="router.push('/')"
      />
      <button
        class="text-3xl md:hidden ml-4 absolute right-5"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <ul class="hidden md:flex gap-8 text-xl p-4">
        <li class="cursor-pointer" @click="router.push('/')">Início</li>
        <li class="cursor-pointer">Filmes</li>
        <li class="cursor-pointer">Séries</li>
      </ul>
    </div>
    <div class="max-w-md mr-4 hidden md:block">
      <div
        class="relative flex items-center w-full h-12 rounded focus-within:shadow-lg bg-white overflow-hidden"
      >
        <div class="grid place-items-center h-full w-24 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 16 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <form @submit.prevent="handleSearch" class="w-full">
          <input
            class="w-full outline-none text-sm text-gray-700 pr-2 h-[40px]"
            type="text"
            v-model="query"
            id="search"
            placeholder="Buscar séries e filmes..."
          />
          <button type="submit" class="hidden">Buscar</button>
        </form>
      </div>
    </div>
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 z-30 md:hidden"
      @click="closeMenu"
    >
      <div class="flex flex-col items-center justify-center h-full">
        <ul class="text-white text-xl">
          <li class="py-4" @click="closeMenu">Início</li>
          <li class="py-4" @click="closeMenu">Filmes</li>
          <li class="py-4" @click="closeMenu">Séries</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Adicione estilos adicionais, se necessário */
</style>
