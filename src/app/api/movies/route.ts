import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/src/lib/supabase/supabaseServer";

export async function GET(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error } = await supabase
    .from("movies")
    .select(
      `
      id,
      title,
      poster,
      rating,
      movie_genres(
        genres(name)
      )
    `,
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const formatted = data.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster,
    rating: movie.rating,
    genres: movie.movie_genres.map((g: any) => g.genres.name),
  }));

  // caching level http tidak akan hilang meskipun broswer di tutup karna sesuai max age nya
  // Tanstack di cek dulu (ram) jika data sudah basi atau tidak ada maka akan cek ke cache http (disk broswer), kalau sudah habis juga maka akan ke server supabase
  return NextResponse.json(formatted, {
    headers: {
      "Cache-Control":
        "public, max-age=60, s-maxage=120, stale-while-revalidate=300",
    },
  });
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();

  const { title, poster, rating } = body;

  const { data, error } = await supabase
    .from("movies")
    .insert([{ title, poster, rating }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(req: Request) {
  const supabase = await createSupabaseServerClient();
  const body = await req.json();
  const { id, title, poster, rating } = body;

  const { data, error } = await supabase
    .from("movies")
    .update({ title, poster, rating })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const { error } = await supabase.from("movies").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted" });
}
