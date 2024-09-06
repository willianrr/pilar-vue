import { useAsyncData } from "nuxt/app";

type TrendingCard = {
  dataid: number;
  title: string;
  image: string;
  votes: number;
  type: string;
};

export const useTrendingCards = () => {
  return useAsyncData<TrendingCard[]>("trendingCards", async () => {
    try {
      const data = await $fetch<TrendingCard[]>("/api/trendings");

      return data ?? [];
    } catch (error) {
      console.error("Failed to fetch trending cards:", error);
      throw new Error("Failed to fetch trending cards");
    }
  });
};
