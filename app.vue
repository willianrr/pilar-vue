<script setup lang="ts">
useHead({
  title: "Página - Pilar Vue",
  meta: [{ name: "description", content: "Seja muito bem vindo" }],
});
</script>

<template>
  <div class="bg-gray-900 w-full">
    <NuxtLayout>
      <Header />
      <NuxtPage />
      <Footer />
    </NuxtLayout>
  </div>
</template>
