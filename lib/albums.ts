export type AlbumSortKey = "latest" | "popular" | "oldest";

export type PlatformLink = {
  key:
    | "bugs"
    | "melon"
    | "genie"
    | "vibe"
    | "flo"
    | "appleMusic"
    | "spotify"
    | "youtube"
    | "youtubeMusic"
    | string;
  label: string;
  url?: string;
};

export type AlbumTrack = {
  order?: number;
  title?: string;
  duration?: string;
  text?: string;
  [key: string]: any;
};

export type AlbumCredit = {
  role?: string;
  name?: string;
  text?: string;
  [key: string]: any;
};

export type DistributionLinks = {
  bugs?: string;
  melon?: string;
  genie?: string;
  vibe?: string;
  flo?: string;
  appleMusic?: string;
  apple_music?: string;
  spotify?: string;
  youtubeMusic?: string;
  youtube_music?: string;
  youtube?: string;
  [key: string]: string | undefined;
};

export type Album = {
  id: string;
  slug: string;

  title: string;
  japaneseTitle?: string;
  japanese_title?: string;
  jpTitle?: string;

  subtitle?: string;
  type?: string;
  format?: string;
  genre?: string;
  country?: string;

  releaseDate?: string;
  release_date?: string;
  releaseLabel?: string;
  release_label?: string;
  date?: string;

  artist?: string;

  producer?: string;
  producerId?: string;
  producer_id?: string;

  director?: string;
  directorId?: string;
  director_id?: string;

  youtubeViews?: number;
  youtube_views?: number;
  views?: number;

  youtubeUrl?: string;
  youtube_url?: string;

  thumbnail?: string;
  thumbnailUrl?: string;
  thumbnail_url?: string;

  cover?: string;
  coverUrl?: string;
  cover_url?: string;
  image?: string;

  description?: string;

  tracklist?: AlbumTrack[];
  tracks?: AlbumTrack[];

  credits?: AlbumCredit[] | { lines?: string[] };
  credit?: AlbumCredit[] | { lines?: string[] };

  distributionLinks?: DistributionLinks;
  distribution_links?: DistributionLinks;
  availableOn?: DistributionLinks;

  platforms: PlatformLink[];

  displayOrder?: number;
  display_order?: number;
  order?: number;

  [key: string]: any;
};

export const albums: Album[] = [];

export function getAlbumThumbnail(album: Album) {
  return (
    album.thumbnail ||
    album.thumbnailUrl ||
    album.thumbnail_url ||
    album.image ||
    ""
  );
}

export function getAlbumCover(album: Album) {
  return (
    album.cover ||
    album.coverUrl ||
    album.cover_url ||
    album.thumbnail ||
    album.thumbnailUrl ||
    album.thumbnail_url ||
    album.image ||
    ""
  );
}

export function getAlbumReleaseDate(album: Album) {
  return album.releaseDate || album.release_date || album.date || "";
}

export function getAlbumReleaseLabel(album: Album) {
  return (
    album.releaseLabel ||
    album.release_label ||
    album.releaseDate ||
    album.release_date ||
    album.date ||
    ""
  );
}

export function getAlbumYoutubeViews(album: Album) {
  return album.youtubeViews || album.youtube_views || album.views || 0;
}

export function sortAlbums(items: Album[], sortKey: AlbumSortKey) {
  const copiedItems = [...items];

  if (sortKey === "latest") {
    return copiedItems.sort((a, b) => {
      const dateA = getAlbumReleaseDate(a);
      const dateB = getAlbumReleaseDate(b);

      return new Date(dateB || 0).getTime() - new Date(dateA || 0).getTime();
    });
  }

  if (sortKey === "oldest") {
    return copiedItems.sort((a, b) => {
      const dateA = getAlbumReleaseDate(a);
      const dateB = getAlbumReleaseDate(b);

      return new Date(dateA || 0).getTime() - new Date(dateB || 0).getTime();
    });
  }

  if (sortKey === "popular") {
    return copiedItems.sort((a, b) => {
      return getAlbumYoutubeViews(b) - getAlbumYoutubeViews(a);
    });
  }

  return copiedItems;
}

export function getAlbumById(id: string) {
  return (
    albums.find((album) => {
      return album.id === id || album.slug === id;
    }) || null
  );
}

export function getAlbumBySlug(slug: string) {
  return (
    albums.find((album) => {
      return album.slug === slug || album.id === slug;
    }) || null
  );
}

export function getRelatedAlbums(currentAlbumId?: string) {
  return albums
    .filter((album) => {
      return album.id !== currentAlbumId && album.slug !== currentAlbumId;
    })
    .slice(0, 5);
}

export function getAlbumsByProducer(producerNameOrId: string) {
  return albums.filter((album) => {
    return (
      album.producer === producerNameOrId ||
      album.producerId === producerNameOrId ||
      album.producer_id === producerNameOrId
    );
  });
}

export function getAlbumsByDirector(directorNameOrId: string) {
  return albums.filter((album) => {
    return (
      album.director === directorNameOrId ||
      album.directorId === directorNameOrId ||
      album.director_id === directorNameOrId
    );
  });
}