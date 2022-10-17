import React, { useContext, useState } from 'react'
import { StaticRouter } from 'react-router-dom';
import { GlobalStoreActionType, GlobalStoreContext } from '../store'


function SongCard(props) {
    const { store, storeReducer } = useContext(GlobalStoreContext);

    const { song, index, isDragging, draggedTo } = props;



    function handleRemoveSong(event){
        event.stopPropagation();
        console.log("current modal state: " + store.deleteSongModalActive);
        let songIndex = event.target.id.substring("remove-song-".length);
        // store.setDeleteSongTitle(songIndex);
        // console.log("set the delete song index to :" + store.deleteSongIndex);
        store.enableDeleteSongModal(songIndex); 

        
        // console.log("removing song at index: " + songIndex);
        // store.removeSong(songIndex);
    }

    function handleClick(event){
        event.stopPropagation();
        if(event.detail===2){
            console.log("double clicked a song at index: " + event.target.id.substring('song-'.length,event.target.id.search('-card')));
            let songIndex = event.target.id.substring('song-'.length,event.target.id.search('-card'));
            store.enableEditSongModal(songIndex);
        }
    }

    function handleDragStart(event){
        event.dataTransfer.setData("song", event.target.id.substring('song-'.length,event.target.id.search('-card')));
        console.log("dragging song " + event.target.id.substring('song-'.length,event.target.id.search('-card')));
        store.handleDragStart(event.target.id.substring('song-'.length,event.target.id.search('-card')));
    }

    function handleDragOver(event){
        event.preventDefault();
        console.log("drag over");
        store.handleDragOver(event.target.id.substring('song-'.length,event.target.id.search('-card')));
    }

    function handleDragEnter(event){
        event.preventDefault();
        console.log("drag enter");
        store.handleDragEnter(event.target.id.substring('song-'.length,event.target.id.search('-card')));
    }

    function handleDragLeave(event){
        event.preventDefault();
        console.log("drag leave");
        store.handleDragLeave();
    }

    function handleDrop(event){
        event.preventDefault();
        console.log("dropped song");
        let targetIndex = event.target.id.substring('song-'.length,event.target.id.search('-card'));
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        console.log("dropped song: " + sourceIndex + " over " + targetIndex);
        store.moveSong(sourceIndex, targetIndex);
        // store.handleDrop();
    }

    let cardClass = "list-card unselected-list-card";
    
    if(isDragging){
        cardClass += " list-card-is-dragging";
    }
    else if(draggedTo){
        cardClass += "-dragged-to";
    }
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onClick={handleClick}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
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