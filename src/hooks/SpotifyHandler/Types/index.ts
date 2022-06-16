interface ISpotifyHandler {
  user?: User;
  device?: Device;

  getToken(): Promise<this>;

  getUserToken(code: string): Promise<this>;

  getCategories(): Promise<Category[]>;

  search(
    query: string,
    searchType: ItemType[],
    limit?: number
  ): Promise<ISearchResponse>;

  getMe(): Promise<this>;

  getAvailableDevices(): Promise<this>;

  getRecommendations(): Promise<void>;

  getNewReleases(): Promise<void>;

  getPlaylistsWithCategory(
    categoryId: string
  ): Promise<IGetPlaylistsWithCategory>;

  getAvailableGenreSeeds(): Promise<string[]>;

  getPlaylistItems(playlistId: string): Promise<TrackInfo[]>;
}

interface IExecuteResponse {
  ok: boolean;
  response: {};
}

interface IGetToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface IGetCategories {
  categories: SearchItemCategories;
}

interface IGetPlaylistsWithCategory {
  playlists: SearchItemPlaylists;
  message?: string;
  categoryName?: string;
}

interface IGetUserToken extends IGetToken {
  refresh_token: string;
  scope: string;
}

interface IGetAvailableDevices {
  devices: Device[];
}

interface IGetTokenError {
  error: string;
  error_description: string;
}

interface IAvailableGenreSeeds {
  genres: string[];
}

type ItemType = "album" | "artist" | "playlist" | "track" | "show" | "episode";

interface ISearchResponse {
  albums: SearchItemAlbums;
  artists: SearchItemArtists;
  playlists: SearchItemPlaylists;
  tracks: SearchItemTracks;
  shows: SearchItemShows;
  episodes: SearchItemEpisodes;
}

interface SearchItem {
  href: string;
  items: unknown[];
  limit: number;
  next?: string;
  offset: number;
  previous?: string;
}

interface SearchItemAlbums extends SearchItem {
  items: Album[];
}

interface SearchItemArtists extends SearchItem {
  items: Artists[];
}

interface SearchItemEpisodes extends SearchItem {
  items: Episode[];
}

interface SearchItemPlaylists extends SearchItem {
  items: Playlist[];
}

interface SearchItemShows extends SearchItem {
  items: Show[];
}

interface SearchItemTracks extends SearchItem {
  items: Track[];
}

interface SearchItemCategories extends SearchItem {
  items: Category[];
}

interface GetPlaylistItems extends SearchItem {
  items: TrackInfo[];
}

interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

type ContentType = Track | Show | Playlist | Episode | Artists | Album;

interface ICardContent {
  type: ItemType;
  id: string;
}

interface TrackInfo {
  added_at: string;
  added_by: {};
  is_local: boolean;
  track: Track;
  video_thumbnail: {
    url?: string;
  };
}

//track_number
interface Track extends ICardContent {
  href: string;
  name: string;
  album: Album;
  artists: Artist[];
  duration_ms: number;
  popularity: number;
  preview_url?: string;
  track_number: number;
  external_urls: ExternalUrls;
}

//publisher
interface Show extends ICardContent {
  href: string;
  images: Image[];
  name: string;

  description: string;
  html_description: string;
  languages: string[];
  publisher: string;
}

//owner
interface Playlist extends ICardContent {
  href: string;
  images: Image[];
  name: string;
  external_urls: ExternalUrls;

  description: string;
  tracks: {
    href: string;
    total: number;
  };
  owner: {
    display_name: string;
    id: string;
    href: string;
  };
}

//languages
interface Episode extends ICardContent {
  href: string;
  images: Image[];
  name: string;

  description: string;
  duration_ms: number;
  html_description: string;
  languages: string[];
  release_date: string;
}

//followers
interface Artists extends ICardContent {
  href: string;
  images: Image[];
  name: string;

  popularity: number;
  followers: {
    href?: string;
    total: number;
  };
}

//total_tracks
interface Album extends ICardContent {
  href: string;
  images: Image[];
  name: string;

  artists: Artist[];
  available_markets: string[];
  release_date: string;
  total_tracks: number;
}

interface Artist {}

interface ExternalUrls {
  spotify: string;
}

interface User {
  display_name: string;
  country: string;
  email: string;
  id: string;
  images: Image[];
}

interface Image {
  url: string;
  width?: number;
  height?: number;
}

interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: DeviceType;
  volume_percent: number;
}

type DeviceType = "Computer";
