interface ICard {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface IDefaultCard extends ICard {
  imgSrc: string;
  cardTitle: string;
  cardText: string;
}

interface IAlbumCard extends ICard {
  item: Album;
}

interface IArtistsCard extends ICard {
  item: Artists;
}

interface IEpisodeCard extends ICard {
  item: Episode;
}

interface IPlaylistCard extends ICard {
  item: Playlist;
}

interface IShowCard extends ICard {
  item: Show;
}

interface ITrackCard extends ICard {
  item: Track;
}
