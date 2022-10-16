import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteSongModal(props) {
    const store = useContext(GlobalStoreContext);
    const { song, index } = props;
    let songTitle = "";
    if(song){
        songTitle=song.title;
    }
    let visible=store.deleteSongModalActive;
    return (
        <div
        id="remove-song-modal"
        className='modal'
        data-animation="slideInOutLeft"
        visible={visible}>
        <div className="modal-root" id='verify-remove-song-root'>
            <div className="modal-north">
                Remove {songTitle}?
            </div>
            <div className="modal-center">
                <div className="modal-center-content">
                    Are you sure you wish to permanently remove {songTitle} from the playlist?
                </div>
            </div>
            <div className="modal-south">
                <input type="button" id="remove-song-confirm-button" className="modal-button"  value='Confirm' />
                <input type="button" id="remove-song-cancel-button" className="modal-button"  value='Cancel' />
            </div>
        </div>
    </div>
    );
}

export default DeleteSongModal;