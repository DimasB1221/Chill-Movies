import { tmdbAxios } from "@/src/server/lib/axios/tmdb";

const fetchTmdbGenres = async () => {
  const res = await tmdbAxios.get("/genre/movie/list");
  return res.data.genres;
};

export default fetchTmdbGenres;
