import seedMovies from "./src/server/seeders/movieSeeder";
import seedGenre from "@/src/server/seeders/genreSeeder";

(async () => {
  await seedGenre();
  await seedMovies();
  process.exit(0);
})();
