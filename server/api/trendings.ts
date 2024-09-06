export default defineEventHandler(async () => {
  try {
    const response = await $fetch<{ results: any[] }>(
      `${process.env.API_BASE_URL}/trending/tv/day?language=pt-BR&api_key=${process.env.API_KEY}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.SECRET}`,
        },
      }
    );

    const trendings = response.results.map((trending) => ({
      dataid: trending.id,
      title: trending.original_title || trending.title || trending.name,
      image: trending.backdrop_path,
      votes: trending.vote_average,
      type: trending.media_type,
    }));

    return trendings;
  } catch (error) {
    console.error("Failed to fetch trending cards:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch trending cards",
    });
  }
});
