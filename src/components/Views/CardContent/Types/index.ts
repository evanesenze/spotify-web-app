interface ICardContentView extends IView {
  content?: ICardContent;
  setCurrentTrack: StateSet<Track | undefined>;
}

interface IDefaultCardContent {
  contentImage: string;
  contentType: string;
  contentTitle: string;
  contentDescripton: string;
  contentExtra?: React.ReactElement;
  content: TrackInfo[];
  addCurrentTrack: (track: Track) => void;
}

interface ICardContentRow {
  number?: number | string;
  name?: string;
  description?: string;
  date?: Date | string;
  duration_s?: number | string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
