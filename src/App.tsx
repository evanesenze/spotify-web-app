import React from "react";

import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as HomeActive } from "./assets/homeActive.svg";
import { ReactComponent as Search } from "./assets/search.svg";
import { ReactComponent as Collection } from "./assets/collection.svg";
import { ReactComponent as Avatar } from "./assets/avatar.svg";
import { ReactComponent as TriangleDown } from "./assets/triangleDown.svg";
import { ReactComponent as Back } from "./assets/back.svg";
import { ReactComponent as Forward } from "./assets/forward.svg";

function App() {
  return (
    <React.Fragment>
      <div className="main">
        <nav className="main__nav">
          <div className="nav_logo">
            <a className="nav_logo__link" href="/">
              <Logo className="nav_logo__icon" />
            </a>
          </div>
          <ul className="nav_btns">
            <li className="nav_btns__btn nav_btns__btn_active">
              <HomeActive className="nav_btns__icon" />
              <span className="text_ellipsis">Главная</span>
            </li>
            <li className="nav_btns__btn">
              <Search className="nav_btns__icon" />
              <span className="text_ellipsis">Поиск</span>
            </li>
            <li className="nav_btns__btn">
              <Collection className="nav_btns__icon" />
              <span className="text_ellipsis">Моя медиатека</span>
            </li>
            <hr className="nav_btns__line" />
          </ul>
        </nav>
        <div className="main__container">
          <div className="top_bar">
            <header className="top_bar__header">
              <div className="navigation_btns">
                <div className="navigation_btn navigation_btn__disabled">
                  <Back />
                </div>
                <div className="navigation_btn">
                  <Forward />
                </div>
              </div>
              <div className="profile_btn">
                <div className="profile_btn__avatar">
                  <Avatar />
                </div>
                <span className="profile_btn__titile text_ellipsis">
                  Пользователь
                </span>
                <TriangleDown className="profile_btn__show_more" />
              </div>
            </header>
          </div>
          <div className="content">
            <div className="content__section">
              <div className="section__title">
                <h2 className="section__title_text text_ellipsis">
                  Послушай эти шоу
                </h2>
                <span className="section__show_all">Все</span>
              </div>
              <div className="section__content">
                <div className="album_card">
                  <div className="album_card__image">
                    <img
                      className="album_card__image_content"
                      src="https://i.scdn.co/image/09a2ab8c15ea83c46922060ca497453b5697d548"
                    />
                  </div>
                  <div className="album_card__info">
                    <span className="album_title text_ellipsis">
                      Шоу Talk на ТНТ.
                    </span>
                    <span className="album_author text_ellipsis">
                      Телеканал ТНТ
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="content__section">
              <div className="section__title">
                <h2 className="section__title_text text_ellipsis">
                  Выбор редакции (чарты)
                </h2>
                <span className="section__show_all">Все</span>
              </div>
              <div className="section__content">
                <div className="album_card">
                  <div className="album_card__image">
                    <img
                      className="album_card__image_content"
                      src="https://i.scdn.co/image/09a2ab8c15ea83c46922060ca497453b5697d548"
                    />
                  </div>
                  <div className="album_card__info">
                    <span className="album_title">Шоу Talk на ТНТ.</span>
                    <span className="album_author">Телеканал ТНТ</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="content__section">
              <div className="section__title">
                <h2 className="section__title_text text_ellipsis">
                  Что-то новенькое
                </h2>
                <span className="section__show_all">Все</span>
              </div>
              <div className="section__content">
                <div className="album_card">
                  <div className="album_card__image">
                    <img
                      className="album_card__image_content"
                      src="https://i.scdn.co/image/09a2ab8c15ea83c46922060ca497453b5697d548"
                    />
                  </div>
                  <div className="album_card__info">
                    <span className="album_title">Шоу Talk на ТНТ.</span>
                    <span className="album_author">Телеканал ТНТ</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="content__section">
              <div className="section__title">
                <h2 className="section__title_text text_ellipsis">В тренде</h2>
                <span className="section__show_all">Все</span>
              </div>
              <div className="section__content">
                <div className="album_card">
                  <div className="album_card__image">
                    <img
                      className="album_card__image_content"
                      src="https://i.scdn.co/image/09a2ab8c15ea83c46922060ca497453b5697d548"
                    />
                  </div>
                  <div className="album_card__info">
                    <span className="album_title">Шоу Talk на ТНТ.</span>
                    <span className="album_author">Телеканал ТНТ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="now_playing_bar">
        <footer className="now_playing_bar__footer">
          <div className="player__wrapper">
            <audio className="player" controls />
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default App;
