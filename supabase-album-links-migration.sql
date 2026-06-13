alter table albums
add column if not exists melon_url text,
add column if not exists genie_url text,
add column if not exists bugs_url text,
add column if not exists vibe_url text,
add column if not exists flo_url text,
add column if not exists apple_music_url text,
add column if not exists spotify_url text,
add column if not exists youtube_music_url text;
