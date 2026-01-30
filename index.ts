import seedMovies from "./lib/seeders/movieSeeder";
import seedGenre from "@/lib/seeders/genreSeeder";

(async () => {
  await seedGenre();
  await seedMovies();
  process.exit(0);
})();
