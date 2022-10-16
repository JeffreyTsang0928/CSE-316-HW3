import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
import DeleteSongModal from './DeleteSongModal';
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let enabledButtonClass = "playlister-button";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    function handleAddSong(event){
        console.log("pressed add song button");
        event.stopPropagation();
        if(store.currentList){
            console.log("there is a currentList, adding new song");
            store.createNewSong(store.currentList._id);
        }
        else{
            console.log("there is no currentList");
        }
    }

    let modalClassName="modal";
    if(store.deleteSongModalActive && store.currentList){
        modalClassName+=' is-visible';
    }

    let songTitle="err";
    if(store.deleteSongTitle){
        songTitle=store.deleteSongTitle;
    }

    let editStatus = false;
    if (store.isListNameEditActive && store.currentList) {
        editStatus = true;
    }
    // let song=null;
    // if(store.currentList && store.currentList.songs[store.deleteSongIndex]){
    //     song=store.currentList.songs[store.deleteSongIndex];
    //     console.log("SONG------------------------------");
    //     console.log(song);
    // }
    // else{
    //     if(!store.currentList){
    //         console.log("currentlist is null");
    //     }
    //     else if(!store.currentList.songs[store.deleteSongIndex]){
    //         console.log("currentList.songs[index] is null...");
    //     }
    // }
    //idk if delete song modal belongs here
    return (
        <span id="edit-toolbar">
            <div
            id="remove-song-modal"
            className={modalClassName}
            data-animation="slideInOutLeft"
            >
                <DeleteSongModal title={songTitle} />
            </div>
            <input
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={enabledButtonClass}
                onClick={handleAddSong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                value="⟲"
                className={enabledButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={enabledButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={enabledButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;