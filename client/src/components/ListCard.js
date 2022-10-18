import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
/*
    This is a card in our list of playlists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ editActive, setEditActive ] = useState(false);
    const [ markedForDeletion, setMarkedForDeletion] = useState(false);
    store.history = useHistory();
    const { idNamePair, selected, newListId } = props;
    const [ text, setText ] = useState(props.idNamePair.name);
    const [ listCardButtonClassName, setListCardButtonClassName] = useState("list-card-button")
    
    // let newListId = store.newPlaylistId;


    function handleLoadList(event) {
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(_id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        if(!store.listNameActive && !store.listIdMarkedForDeletion){
            toggleEdit();
        }
    }

    function toggleEdit() {
        
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive(idNamePair._id);
        }
        setEditActive(newActive);
    }

    function handleMarkForDeletion(event) {
        event.stopPropagation();
        if(!store.listNameActive && !store.listIdMarkedForDeletion){
            toggleMarkedForDeletion();
        }
    }

    function toggleMarkedForDeletion() {
        let newMarkedForDeletion = !markedForDeletion;
        setMarkedForDeletion(newMarkedForDeletion);
        store.setDeleteListId();
    }

    function handleDeleteList(event){
        event.stopPropagation();
        let id = event.target.id.substring("confirm-delete-list-".length);
        store.deleteList(id);
        toggleMarkedForDeletion();
    }

    function handleDialogClose(event){
        event.stopPropagation();
        setMarkedForDeletion(false);
        store.setDeleteListId();
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            console.log("pressed enter");
            if(text == ""){
                console.log("text is empty string?");
                console.log(idNamePair.name);
                setText(idNamePair.name);
                console.log("text value right now: " + text);
            }
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value );
    }



    useEffect(()=>{
        if(idNamePair._id === store.newPlaylistId){
            console.log("idnamepair is equal to the one in store");
            toggleEdit();
        }
        else{
            console.log("idnamepair is NOT equal to the one in store in playlist with id: " + idNamePair._id + "when comparing to: " + store.newPlaylistId);
            if(editActive){
                setEditActive(!editActive)
            }
        }

        if(store.listNameActive && !(idNamePair._id === store.listIdBeingEdited)){
            console.log("listName is active! ");
            console.log("idnamepair is NOT equal to the one in store in playlist with id: " + idNamePair._id + "when comparing to: " + store.listIdBeingEdited);
            setListCardButtonClassName(listCardButtonClassName + " disabled");
            if(editActive){
                setEditActive(!editActive)
            }
        }
        else{
            console.log("idnamepair IS equal to the one in store in playlist with id: " + idNamePair._id + "when comparing to: " + store.listIdBeingEdited);
            setListCardButtonClassName("list-card-button");
            // toggleEdit();
        }
        }, [store.newPlaylistId]
    );


    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        listCardButtonClassName += " disabled";
    }
    let cardElement =
        <div
            id={idNamePair._id}
            key={idNamePair._id}
            onClick={handleLoadList}
            className={'list-card ' + selectClass}>
            <span
                id={"list-card-text-" + idNamePair._id}
                key={"span-" + idNamePair._id}
                className="list-card-text">
                {idNamePair.name}
            </span>
            <input
                type="button"
                id={"delete-list-" + idNamePair._id}
                className={listCardButtonClassName}
                onClick={handleMarkForDeletion}
                value={"\u2715"}
            />
            <input
                type="button"
                id={"edit-list-" + idNamePair._id}
                className={listCardButtonClassName}
                onClick={handleToggleEdit}
                value={"\u270E"}
            />
            <dialog open={markedForDeletion} className="dialog-box">
                    Are you sure you would like to delete <b>{idNamePair.name}</b>?
                
                <input
                    type="button"
                    id={"cancel-delete-list-" + idNamePair._id}
                    className="list-card-button"
                    value={"\u2715"}
                    onClick={handleDialogClose}
                />
                <input
                    type="button"
                    id={"confirm-delete-list-" + idNamePair._id}
                    className="list-card-button"
                    value={"✓"}
                    onClick={handleDeleteList}
                />
            </dialog>
        </div>;

    let cardElement2 =  
        <input
        id={"list-" + idNamePair._id}
        className='list-card'
        type='text'
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        onBlur={handleUpdateText}
        defaultValue={idNamePair.name}
        />;

    if (editActive || idNamePair._id === newListId) {
        console.log("editActive: " + editActive);
        console.log("newListId: " + newListId);
        console.log("idNamePair._id: " + idNamePair._id);
        console.log("newList id equal?: " + idNamePair._id === newListId);
        // cardElement =
        //     <input
        //         id={"list-" + idNamePair._id}
        //         className='list-card'
        //         type='text'
        //         onKeyPress={handleKeyPress}
        //         onChange={handleUpdateText}
        //         defaultValue={idNamePair.name}
        //     />;
    }

    return (
        (editActive? cardElement2:cardElement)
    );
}

export default ListCard;