"use client";

import React, { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/Input";
import { Movie } from "@/src/lib/types/movie";

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie?: Movie | null;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const MovieModal: React.FC<MovieModalProps> = ({
  isOpen,
  onClose,
  movie,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    poster: "",
    rating: "",
    genres: "",
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        poster: movie.poster || "",
        rating: movie.rating?.toString() || "",
        genres: movie.genres?.join(", ") || "",
      });
    } else {
      setFormData({
        title: "",
        poster: "",
        rating: "",
        genres: "",
      });
    }
  }, [movie, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      rating: parseFloat(formData.rating),
      genres: formData.genres
        .split(",")
        .map((g) => g.trim())
        .filter((g) => g),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#18181B] rounded-2xl border border-white/10 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">
            {movie ? "Edit Movie" : "Add New Movie"}
          </h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            className="text-white/50 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Input
              label="Judul Film"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter movie title"
              required
              className="bg-[#27272A] border-white/10 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Input
              label="Poster URL"
              value={formData.poster}
              onChange={(e) =>
                setFormData({ ...formData, poster: e.target.value })
              }
              placeholder="Enter poster image URL"
              className="bg-[#27272A] border-white/10 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Input
              label="Genres (Comma separated)"
              value={formData.genres}
              onChange={(e) =>
                setFormData({ ...formData, genres: e.target.value })
              }
              placeholder="Action, Drama, Horror"
              className="bg-[#27272A] border-white/10 focus:ring-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Input
              label="Rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: e.target.value })
              }
              placeholder="0.0"
              required
              className="bg-[#27272A] border-white/10 focus:ring-primary/50"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-white/10 text-white hover:bg-white/5 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white min-w-[100px]"
            >
              {isLoading ? "Saving..." : "Save Movie"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MovieModal;
