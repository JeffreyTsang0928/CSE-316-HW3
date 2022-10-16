import React, { useContext, useState } from 'react'
import { GlobalStoreActionType, GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store, storeReducer } = useContext(GlobalStoreContext);

    const { song, index } = props;



    function handleRemoveSong(event){
        event.stopPropagation();
        console.log("current modal state: " + store.deleteSongModalActive);
        storeReducer({
            type: GlobalStoreActionType.TOGGLE_DELETE_SONG_MODAL,
            payload: null
        });
        // let songIndex = event.target.id.substring("remove-song-".length);
        // console.log("removing song at index: " + songIndex);
        // store.removeSong(songIndex);
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleRemoveSong}
            />
        </div>
    );
}

export default SongCard;