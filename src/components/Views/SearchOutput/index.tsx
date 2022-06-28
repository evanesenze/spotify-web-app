import React, { FC, useEffect } from "react";
import { PlaylistCard } from "../../Cards";
import ContentSection from "../../Contentection";
import Loading from "../../Loading";

const SearchOutput:FC<ISearchOutput> = ({foundPlaylists, setCurrentView, setCardContent}) => {
    
    const items = foundPlaylists?.playlists?.items ?? [];

    /**
     * Выбирает плейлист для просмотра
     * @param {Playlist} item 
     * @returns {void}
     */
    const selectPlaylist = (item: Playlist): void => {
        setCardContent(item);
        setCurrentView('CardContent');
    };

    return (<React.Fragment>
        <ContentSection 
            title={foundPlaylists?.categoryName ??'Послушай эти Плейлисты'}
            content={items?.map((item, index) => (<PlaylistCard key={`album_${index}`} item={item} onClick={(e) => selectPlaylist(item)}/>))}
        />
    </React.Fragment>);   
}

export default SearchOutput;