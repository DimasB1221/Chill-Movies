import fetchTmdbGenres from "@/src/server/services/genreServices";
import { supabase } from "@/src/server/lib/supabaseClient";

const seedGenres = async () => {
  const genres = await fetchTmdbGenres();

  const payload = genres.map((g: any) => ({
    tmdb_id: g.id,
    name: g.name,
  }));

  const { error } = await supabase
    .from("genres")
    .upsert(payload, { onConflict: "tmdb_id" });

  if (error) throw error;

  console.log("✅ Genres seeded:", payload.length);
};

export default seedGenres;
