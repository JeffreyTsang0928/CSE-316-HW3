import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreActionType, GlobalStoreContext } from '../store'

function EditSongModal(props){
    const {store, storeReducer} = useContext(GlobalStoreContext);
    const { song, title} = props;

    let songTitle = "";
    let songArtist = "";
    let songYT = "";

    

}