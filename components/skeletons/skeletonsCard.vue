<template>
  <div class="flex flex-nowrap gap-4 overflow-x-auto no-scroll-bar">
    <div
      v-for="item in Array(10)"
      class="py-4 rounded max-w-[250px] relative animate-pulse"
    >
      <div class="w-[250px] h-[140px] rounded bg-gray-200">{{ item }}</div>
      <div class="pt-2">
        <div class="h-[8px] bg-gray-200 rounded-full w-full mb-2"></div>
        <div class="h-[8px] bg-gray-200 rounded-full w-full mb-2"></div>
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
