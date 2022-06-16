import React, { FC } from "react";
import Loading from "./Loading";

const ContentSection: FC<IContentSection> = ({ title, content }) => {
  return (
    <div className="content__section">
      <div className="section__title">
        <h2 className="section__title_text text_ellipsis">{title}</h2>
        <span className="section__show_all">Все</span>
      </div>
      <div className="section__content">
        {!content.length && <Loading />}
        {content}
      </div>
    </div>
  );
};

export default ContentSection;
