import { StrictMode, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreActionType, GlobalStoreContext } from '../store'

function DeleteSongModal(props) {
    const {store, storeReducer} = useContext(GlobalStoreContext);
    const { song, title} = props;
    let songTitle = "";
    if(title){
        songTitle=title;
    }
    let className = 'modal';
    // let visible=store.deleteSongModalActive;
    if(store.deleteSongModalActive && store.currentList){
        className+=' is-visible';
    }

    function handleConfirmButton(event){
        event.stopPropagation();
        console.log("removing song at index: " + store.deleteSongIndex);
        store.removeSong(store.deleteSongIndex);
        // store.cancelDeleteSongModal();
    }

    function handleCancelButton(event){
        event.stopPropagation();
        store.cancelDeleteSongModal();
    }
    return (
        
        <div className="modal-dialog" id='verify-remove-song-root' data-animation="slideInOutLeft">
            <div className="modal-header">
                Remove song?
            </div>
            <div className="modal-text">
                <div className="modal-center-content" >
                    Are you sure you wish to permanently remove <b>{songTitle}</b> from the playlist?
                </div>
            </div>
            <div className="modal-footer">
                <input type="button" id="remove-song-confirm-button" className="modal-button"  value='Confirm' onClick={handleConfirmButton} />
                <input type="button" id="remove-song-cancel-button" className="modal-button"  value='Cancel' onClick={handleCancelButton} />
            </div>
        </div>

    );
}

export default DeleteSongModal;