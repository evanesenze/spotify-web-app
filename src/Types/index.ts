type MainProps = {
  spotifyHandler?: ISpotifyHandler;
};

type Myprops = {
  backgroundImage: string;
};

type ViewType = "Home" | "Search" | "SearchOutput" | "CardContent";

type StateSet<T> = React.Dispatch<React.SetStateAction<T>>;

interface ILoading {
  text?: string;
}

interface IAuthProps {
  spotifyHandler?: ISpotifyHandler;
}

interface IContentSection {
  title: string;
  content: JSX.Element[];
}
