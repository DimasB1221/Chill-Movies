import { supabase } from "@/lib/supabaseClient";

const seedMovieGenres = async (movieId: string, genreTmdbIds: number[]) => {
  const { data: genres } = await supabase
    .from("genres")
    .select("id, tmdb_id")
    .in("tmdb_id", genreTmdbIds);

  if (!genres) return;

  const payload = genres.map((g) => ({
    movie_id: movieId,
    genre_id: g.id,
  }));

  await supabase.from("movie_genres").upsert(payload);
};

export default seedMovieGenres;
