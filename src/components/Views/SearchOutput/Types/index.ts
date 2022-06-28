interface ISearchOutput extends IView {
  // searchValue: string;
  // setCurrentView: StateSet<ViewType>
  // setFoundPlaylists: StateSet<IGetPlaylistsWithCategory | null>
  foundPlaylists?: IGetPlaylistsWithCategory;
  setCurrentView: StateSet<ViewType>;
  setCardContent: StateSet<ICardContent | undefined>;
}
