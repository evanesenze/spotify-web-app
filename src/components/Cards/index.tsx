import React, { FC } from "react";
import { ReactComponent as CardDefaultIcon } from "../../assets/playlist.svg";

const Card: FC<IDefaultCard> = ({ imgSrc, cardTitle, cardText, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card__image">
        <CardDefaultIcon className="card__default_image" />
        {imgSrc && <img className="card__image_content" src={imgSrc} />}
      </div>
      <div className="card__info">
        <span className="card_title text_ellipsis">{cardTitle}</span>
        <span title={cardText} className="card_text text_ellipsis">
          {cardText}
        </span>
      </div>
    </div>
  );
};

const AlbumCard: FC<IAlbumCard> = ({ item }) => {
  const imgSrc = item.images[0].url;
  const date = new Date(item.release_date);
  const text = `Вышел ${date.toLocaleDateString()}`;
  return <Card imgSrc={imgSrc} cardTitle={item.name} cardText={text} />;
};

const ArtistsCard: FC<IArtistsCard> = ({ item }) => {
  if (!item) return <div>123</div>;
  const imgSrc = item?.images[0]?.url ?? "";
  const followers = item.followers.total;
  const text = `Подписчики: ${followers}`;
  return <Card imgSrc={imgSrc} cardTitle={item.name} cardText={text} />;
};

const EpisodeCard: FC<IEpisodeCard> = ({ item }) => {
  const imgSrc = item?.images[0]?.url ?? "";
  return (
    <Card imgSrc={imgSrc} cardTitle={item.name} cardText={item.description} />
  );
};

const PlaylistCard: FC<IPlaylistCard> = ({ item, onClick }) => {
  const imgSrc = item.images[0].url;
  return (
    <Card
      imgSrc={imgSrc}
      cardTitle={item.name}
      cardText={item.description}
      onClick={onClick}
    />
  );
};

const ShowCard: FC<IShowCard> = ({ item }) => {
  const imgSrc = item.images[0].url;
  return (
    <Card imgSrc={imgSrc} cardTitle={item.name} cardText={item.description} />
  );
};

const TrackCard: FC<ITrackCard> = ({ item }) => {
  const imgSrc = item.album.images[0].url;
  const text = `Продолжительность ${item.duration_ms / 1000} с.`;
  return <Card imgSrc={imgSrc} cardTitle={item.name} cardText={text} />;
};

export {
  AlbumCard,
  ArtistsCard,
  EpisodeCard,
  PlaylistCard,
  ShowCard,
  TrackCard,
};
