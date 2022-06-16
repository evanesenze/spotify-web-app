import React, {
  FC,
  useRef,
  useEffect,
  useState,
  LegacyRef,
  MutableRefObject,
} from "react";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import { ReactComponent as HomeIcon } from "../assets/home.svg";
import { ReactComponent as HomeActiveIcon } from "../assets/homeActive.svg";
import { ReactComponent as SearchIcon } from "../assets/search.svg";
import { ReactComponent as SearchActiveIcon } from "../assets/searchActive.svg";
import { ReactComponent as CollectionIcon } from "../assets/collection.svg";
// import {ReactComponent as CollectionActiveIcon } from './assets/collectionActive.svg';

import AudioPlayer from "react-audio-player";

import Home from "./Views/Home";
import Loading from "./Loading";
import Search from "./Views/Search";
import SearchOutput from "./Views/SearchOutput";
import CardContent from "./Views/CardContent";
import TopBar from "./TopBars";

const MainComponent: FC<MainProps> = ({ spotifyHandler }) => {
  const [user, setUser] = useState<User>();
  const [viewHistory, setViewHistory] = useState<ViewType[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>("Search");
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>();
  const [cardContent, setCardContent] = useState<ICardContent | undefined>();
  const [foundPlaylists, setFoundPlaylists] = useState<
    IGetPlaylistsWithCategory | undefined
  >();

  /**
   * Возвращает основной контент страницы
   * @returns {JSX.Element}
   */
  const getContent = (): JSX.Element => {
    switch (currentView) {
      case "Home":
        return <Home spotifyHandler={spotifyHandler} user={user} />;
      case "Search":
        return (
          <Search
            spotifyHandler={spotifyHandler}
            user={user}
            setCurrentView={setCurrentView}
            setFoundPlaylists={setFoundPlaylists}
          />
        );
      case "SearchOutput":
        return (
          <SearchOutput
            setCardContent={setCardContent}
            setCurrentView={setCurrentView}
            foundPlaylists={foundPlaylists}
          />
        );
      case "CardContent":
        return (
          <CardContent
            spotifyHandler={spotifyHandler}
            content={cardContent}
            setCurrentTrack={setCurrentTrack}
          />
        );
      default:
        return <Loading />;
    }
  };

  /**
   * Возвращает контент топбара страницы
   * @returns {JSX.Element}
   */
  const getTopBar = (): JSX.Element => {
    // const content = (<input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>);
    switch (currentView) {
      // case 'Search':
      //   return <TopBar user={user} content={content}/>
      // case 'SearchOutput':
      //   return <TopBar user={user} content={content}/>
      default:
        return <TopBar user={user} />;
    }
  };

  /**
   * Меняет текущую вкладку на переданную
   * @param {ViewType} nextView
   * @returns {void}
   */
  const switchView = (nextView: ViewType): void => {
    if (currentView === nextView) return;
    setViewHistory((x) => {
      x.push(currentView);
      return x;
    });
    setCurrentView(nextView);
  };

  useEffect(() => {
    if (!spotifyHandler) return;
    spotifyHandler
      .getMe()
      .then(() => setUser(spotifyHandler.user))
      .catch(() => {});
  }, []);

  return (
    <React.Fragment>
      <div className="main">
        <nav className="main__nav">
          <div className="nav_logo">
            <a className="nav_logo__link" href="/">
              <LogoIcon className="nav_logo__icon" />
            </a>
          </div>
          <ul className="nav_btns">
            <li
              className={`nav_btns__btn ${
                currentView === "Home" && "nav_btns__btn_active"
              }`}
              onClick={() => switchView("Home")}
            >
              {currentView === "Home" ? (
                <HomeActiveIcon className="nav_btns__icon" />
              ) : (
                <HomeIcon className="nav_btns__icon" />
              )}
              <span className="text_ellipsis">Главная</span>
            </li>
            <li
              className={`nav_btns__btn ${
                currentView === "Search" && "nav_btns__btn_active"
              }`}
              onClick={() => switchView("Search")}
            >
              {currentView === "Search" ? (
                <SearchActiveIcon className="nav_btns__icon" />
              ) : (
                <SearchIcon className="nav_btns__icon" />
              )}
              <span className="text_ellipsis">Поиск</span>
            </li>
            <li className="nav_btns__btn">
              <CollectionIcon className="nav_btns__icon" />
              <span className="text_ellipsis">Моя медиатека</span>
            </li>
            <hr className="nav_btns__line" />
          </ul>
        </nav>
        <div className="main__container">
          <div className="top_bar">{getTopBar()}</div>
          <div className="content">{getContent()}</div>
        </div>
      </div>
      <div className="now_playing_bar">
        <footer className="now_playing_bar__footer">
          <div className="player__wrapper">
            <AudioPlayer
              className="player"
              controls
              autoPlay
              src={currentTrack?.preview_url}
              onEnded={() => console.log(currentTrack?.external_urls.spotify)}
            />
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default MainComponent;
