interface ISearch extends IView {
  // searchValue: string;
  setCurrentView: StateSet<ViewType>;
  setFoundPlaylists: StateSet<IGetPlaylistsWithCategory | undefined>;
}
