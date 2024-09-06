import { useAsyncData } from "nuxt/app";

type MoviesCard = {
  dataid: number;
  title: string;
  image: string;
  votes: number;
  type: string;
};

export const useMoviesCards = () => {
  return useAsyncData<MoviesCard[]>("moviesCards", async () => {
    try {
      const data = await $fetch<MoviesCard[]>("/api/movies");

      return data ?? [];
    } catch (error) {
      console.error("Failed to fetch MoviesCard cards:", error);
      throw new Error("Failed to fetch MoviesCard cards");
    }
  });
};
