import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        if(store.listNameActive){
            console.log("button disabled");
        }
        else{
            store.createNewList();
        }
    }
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                newListId = {store.newPlaylistId}
                selected={false}
            />
        ))
    }
    let enabledButtonClass = "add-list-button";
    let disabledButtonClass = "add-list-button disabled";
    let editingListNameActive = store.listNameActive;
    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
            <div id="playlist-selector-heading">
                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className={!editingListNameActive? enabledButtonClass : disabledButtonClass}
                    value="+" />
                Your Lists
            </div>                {
                    listCard
                }
            </div>
        </div>)
}

export default ListSelector;