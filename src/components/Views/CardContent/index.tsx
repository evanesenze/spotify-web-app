import React, { FC, useEffect, useState } from "react";
import randomColor from "randomcolor";
import styled from "styled-components";

const CardContentHeader = styled.div<{ bgColor: string }>`
    height: 30%;
    display: flex;
    border-radius: 15px 15px 0 0;
    background: ${({ bgColor }) => `linear-gradient(${bgColor}, transparent)`};
    padding 2% 2% 0;
`;

const DefaultCardContent: FC<IDefaultCardContent> = ({
  contentImage,
  contentDescripton,
  contentTitle,
  contentType,
  contentExtra,
  content,
  addCurrentTrack,
}) => {
  const color = randomColor();

  return (
    <React.Fragment>
      <CardContentHeader bgColor={color}>
        <div className="card_content__image">
          <img style={{ width: "100%", height: "100%" }} src={contentImage} />
        </div>
        <div className="card_content__info">
          <span className="card_content__type">{contentType}</span>
          <h1 className="card_content__title">{contentTitle}</h1>
          <span className="card_content__descripton">{contentDescripton}</span>
          <div className="card_content__extra">{contentExtra}</div>
        </div>
      </CardContentHeader>
      <div className="card_content__items">
        <CardContentRow
          style={{
            position: "sticky",
            background: "#222",
            padding: "1% 0",
            top: "-24px",
            color: "#b3b3b3",
            borderBottom: "1px solid rgba(255,255,255,.1)",
            borderTop: "1px solid rgba(255,255,255,.1)",
            textTransform: "uppercase",
            fontSize: "12px",
          }}
          number="#"
          name="Название"
          description="Альбом"
          date="Дата добавления"
          duration_s="Время"
        />
        {content.map((item, index) => (
          <CardContentRow
            key={`row_${index}`}
            number={index + 1}
            name={item.track.name}
            description={item.track.album.name}
            date={new Date(item.added_at).toLocaleDateString()}
            duration_s={(item.track.duration_ms / 60000).toFixed(1)}
            onClick={() => addCurrentTrack(item.track)}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

const CardContentRow: FC<ICardContentRow> = ({
  date,
  description,
  duration_s,
  name,
  number,
  style,
  onClick,
}) => {
  return (
    <div className="card_content_grid" style={style} onClick={onClick}>
      <span style={{ display: "flex", justifyContent: "center" }}>
        {number}
      </span>
      <span>{name}</span>
      <span>{description}</span>
      <span>{date}</span>
      <span>{duration_s}</span>
    </div>
  );
};

const CardContent: FC<ICardContentView> = ({
  spotifyHandler,
  content,
  setCurrentTrack,
}) => {
  const [items, setItems] = useState<TrackInfo[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  /**
   * Загружает треки переданного контента
   * @returns {Promise<void>}
   */
  const loadItems = async (): Promise<void> => {
    if (!spotifyHandler || !content) return;
    const items = await spotifyHandler.getPlaylistItems(content.id);
    setItems(items);
  };

  /**
   * Устанавливает переданный трек текущим
   * @param {Track} track
   * @returns {void}
   */
  const addCurrentTrack = (track: Track): void => {
    if (track.preview_url) {
      setCurrentTrack(track);
    } else {
      alert("Вы не можете прослушать этот трек здесь");
    }
  };

  switch (content?.type) {
    case "playlist":
      const data = content as Playlist;
      const image = data.images[0].url;
      return (
        <DefaultCardContent
          contentImage={image}
          contentType="Плейлист"
          contentTitle={data.name}
          contentDescripton={data.description}
          content={items}
          addCurrentTrack={addCurrentTrack}
        />
      );
    default:
      return <div></div>;
  }
};

export default CardContent;
