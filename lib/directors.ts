import { albums } from "./albums";

export type Director = {
  id: string;
  slug: string;

  name: string;
  japaneseName?: string;
  japanese_name?: string;
  jpName?: string;

  role?: string;
  position?: string;
  meaning?: string;

  profileImage?: string;
  profile_image_url?: string;
  image?: string;

  coverImage?: string;
  cover_image_url?: string;
  cover?: string;

  description?: string;
  signature?: string;

  displayOrder?: number;
  display_order?: number;
  order?: number;

  [key: string]: any;
};

export const directors: Director[] = [];

export function getDirectorJapaneseName(director: Director) {
  return (
    director.japaneseName ||
    director.japanese_name ||
    director.jpName ||
    ""
  );
}

export function getDirectorProfileImage(director: Director) {
  return (
    director.profileImage ||
    director.profile_image_url ||
    director.image ||
    ""
  );
}

export function getDirectorCoverImage(director: Director) {
  return (
    director.coverImage ||
    director.cover_image_url ||
    director.cover ||
    ""
  );
}

export function getOrderedDirectors() {
  return [...directors].sort((a, b) => {
    return (
      (a.displayOrder || a.display_order || a.order || 999) -
      (b.displayOrder || b.display_order || b.order || 999)
    );
  });
}

export function getDirectorById(id: string) {
  return (
    directors.find((director) => {
      return director.id === id || director.slug === id;
    }) || null
  );
}

export function getDirectorBySlug(slug: string) {
  return (
    directors.find((director) => {
      return director.slug === slug || director.id === slug;
    }) || null
  );
}

export function getDirectorAlbums(directorIdOrSlugOrName: string) {
  return albums.filter((album) => {
    return (
      album.director === directorIdOrSlugOrName ||
      album.directorId === directorIdOrSlugOrName ||
      album.director_id === directorIdOrSlugOrName
    );
  });
}