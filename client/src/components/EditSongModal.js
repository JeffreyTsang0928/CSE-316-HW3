import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreActionType, GlobalStoreContext } from '../store'

function EditSongModal(props){
    const {store, storeReducer} = useContext(GlobalStoreContext);
    const { song } = props;

    let currTitle = "";
    let currArtist = "";
    let currYT = "";

    if(song){
        currTitle = song.title;
        currArtist = song.artist;
        currYT = song.youTubeId;
    }

    function handleCancel(event){
        store.cancelEditSongModal();
    }

    function handleEditSongTitle(event){
        store.updateSongName(event.target.value);
    }

    function handleEditSongArtist(event){
        store.updateArtist(event.target.value);
    }

    function handleEditSongYT(event){
        store.updateYT(event.target.value);
    }

    return(

        <div className="modal-dialog" id='verify-remove-song-root' data-animation="slideInOutLeft">
            <div className="modal-header">
                Edit song
            </div>
            <div className="modal-text">
                <div className="modal-center-content" >
                    <div id="title-prompt" className="modal-prompt">Title:</div>
                    <input id="edit-song-modal-title-textfield" className='modal-textfield' type="text" value={store.editingTitle} onChange={handleEditSongTitle} />
                    <div id="artist-prompt" className="modal-prompt">Artist:</div>
                    <input id="edit-song-modal-artist-textfield" className='modal-textfield' type="text" value={store.editingArtist} onChange={handleEditSongArtist} />
                    <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
                    <input id="edit-song-modal-youTubeId-textfield" className='modal-textfield' type="text" value={store.editingYT} onChange={handleEditSongYT}/>
                </div>
            </div>
            <div className="modal-footer">
                <input type="button" id="remove-song-confirm-button" className="modal-button"  value='Confirm' />
                <input type="button" id="remove-song-cancel-button" className="modal-button"  value='Cancel' onClick={handleCancel}/>
            </div>
        </div>

    )


}

export default EditSongModal;