import React, { FC, useEffect, useState } from "react";
import {
  AlbumCard,
  ArtistsCard,
  EpisodeCard,
  PlaylistCard,
  ShowCard,
  TrackCard,
} from "../../Cards";
import ContentSection from "../../Contentection";

const Home: FC<IHome> = ({ user, spotifyHandler }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (!user) return;
    loadMain();
  }, [user]);

  /**
   *Загружает контент страницы
   * @returns {Promise<void>}
   */
  const loadMain = async (): Promise<void> => {
    if (!spotifyHandler) return;
    const availableGenreSeeds = await spotifyHandler.getAvailableGenreSeeds();
    const randomSeeds = availableGenreSeeds
      ?.sort(() => 0.5 - Math.random())
      .slice(0, 6);
    const type: ItemType[] = [
      "album",
      "artist",
      "episode",
      "playlist",
      "show",
      "track",
    ];
    const result: { [key: string]: any[] } = {
      albums: [],
      artists: [],
      episodes: [],
      playlists: [],
      shows: [],
      tracks: [],
    };
    for (let cur of randomSeeds) {
      const search = await spotifyHandler.search(cur, type, 1);
      Object.entries(search).reduce(
        (prev, [key, value]: [string, SearchItem]) => {
          if (!value.items[0]) return prev;
          prev[key].push(value.items[0]);
          return prev;
        },
        result
      );
    }
    setAlbums(result.albums);
    setArtists(result.artists);
    setEpisodes(result.episodes);
    setPlaylists(result.playlists);
    setShows(result.shows);
    setTracks(result.tracks);
  };

  return (
    <React.Fragment>
      <ContentSection
        title="Послушай эти Альбомы"
        content={albums.map((item, index) => (
          <AlbumCard key={`album_${index}`} item={item} />
        ))}
      />
      <ContentSection
        title="Наши исполнители"
        content={artists.map((item, index) => (
          <ArtistsCard key={`artists_${index}`} item={item} />
        ))}
      />
      <ContentSection
        title="Что-то новенькое"
        content={episodes.map((item, index) => (
          <EpisodeCard key={`episode_${index}`} item={item} />
        ))}
      />
      <ContentSection
        title="Популярные плейлисты"
        content={playlists.map((item, index) => (
          <PlaylistCard key={`playlist_${index}`} item={item} />
        ))}
      />
      <ContentSection
        title="Шоу"
        content={shows.map((item, index) => (
          <ShowCard key={`show_${index}`} item={item} />
        ))}
      />
      <ContentSection
        title="Подборка треков"
        content={tracks.map((item, index) => (
          <TrackCard key={`track_${index}`} item={item} />
        ))}
      />
    </React.Fragment>
  );
};

export default Home;
