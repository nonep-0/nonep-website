import { albums, type Album } from "./albums";

export type ProducerSkill = {
  label: string;
};

export type Producer = {
  id: string;
  slug: string;

  name: string;
  japaneseName?: string;
  japanese_name?: string;
  jpName?: string;

  number?: string;
  producerNumber?: string;
  producer_number?: string;

  role?: string;
  meaning?: string;
  position?: string;

  skills: ProducerSkill[];

  profileImage?: string;
  profile_image_url?: string;
  image?: string;

  coverImage?: string;
  cover_image_url?: string;
  cover?: string;

  description?: string;
  signature?: string;
  quote?: string;

  albumIds: string[];

  displayOrder?: number;
  display_order?: number;
  order?: number;

  [key: string]: any;
};

export const producers: Producer[] = [];

export function formatProducerNumber(value?: string | number | null) {
  if (value === null || value === undefined || value === "") {
    return "NO.---";
  }

  const rawValue = String(value).trim();

  if (rawValue.toUpperCase().startsWith("NO.")) {
    return rawValue.toUpperCase();
  }

  const onlyNumber = rawValue.replace(/[^\d]/g, "");

  if (!onlyNumber) {
    return "NO.---";
  }

  return `NO.${onlyNumber.padStart(3, "0")}`;
}

export function getProducerNumber(producer: Producer) {
  return (
    producer.number ||
    producer.producerNumber ||
    producer.producer_number ||
    ""
  );
}

export function getProducerJapaneseName(producer: Producer) {
  return (
    producer.japaneseName ||
    producer.japanese_name ||
    producer.jpName ||
    ""
  );
}

export function getProducerProfileImage(producer: Producer) {
  return (
    producer.profileImage ||
    producer.profile_image_url ||
    producer.image ||
    ""
  );
}

export function getProducerCoverImage(producer: Producer) {
  return (
    producer.coverImage ||
    producer.cover_image_url ||
    producer.cover ||
    ""
  );
}

export function getOrderedProducers() {
  return [...producers].sort((a, b) => {
    return (
      (a.displayOrder || a.display_order || a.order || 999) -
      (b.displayOrder || b.display_order || b.order || 999)
    );
  });
}

export function getProducerById(id: string) {
  return (
    producers.find((producer) => {
      return producer.id === id || producer.slug === id;
    }) || null
  );
}

export function getProducerBySlug(slug: string) {
  return (
    producers.find((producer) => {
      return producer.slug === slug || producer.id === slug;
    }) || null
  );
}

export function getProducerAlbums(albumIds?: string[]): Album[] {
  if (!albumIds || albumIds.length === 0) {
    return [];
  }

  return albums.filter((album) => {
    return albumIds.includes(album.id) || albumIds.includes(album.slug);
  });
}