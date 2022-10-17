import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api, { createNewSong } from '../api'
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    DELETE_LIST: "DELETE_LIST",
    RELOAD_CURRENT_LIST: "RELOAD_CURRENT_LIST",
    ENABLE_DELETE_SONG_MODAL: "TOGGLE_DELETE_SONG_MODAL",
    CANCEL_DELETE_SONG_MODAL: "CANCEL_DELETE_SONG_MODAL",
    ENABLE_EDIT_SONG_MODAL: "ENABLE_EDIT_SONG_MODAL",
    CANCEL_EDIT_SONG_MODAL: "CANCEL_EDIT_SONG_MODAL",
    UPDATE_SONG_NAME: "UPDATE_SONG_NAME",
    UPDATE_ARTIST: "UPDATE_ARTIST",
    UPDATE_YT: "UPDATE_YT"
    // SET_DELETE_SONG_TITLE: "SET_DELETE_SONG_TITLE"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        deleteSongModalActive: false, //this is an absolute mess ATM.... it would be alot better if we just stored the song right????
        deleteSongTitle: "none",
        editSongModalActive: false,
        currSongEditing: null,
        editingTitle: "",
        editingArtist: "",
        editingYT: ""
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null
                });
            }

            //RELOADS THE CURRENT LIST TO UPDATE SONG DISPLAY???
            case GlobalStoreActionType.RELOAD_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null
                })
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.DELETE_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter - 1,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null
                });
            }
            case GlobalStoreActionType.ENABLE_DELETE_SONG_MODAL: {
                console.log("toggling delete song modal. curr song title: " + store.deleteSongTitle);
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: true,
                    deleteSongTitle: payload,
                    editSongModalActive: false,
                    currSongEditing: null
                })
            }

            case GlobalStoreActionType.CANCEL_DELETE_SONG_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: "none",
                    editSongModalActive: false,
                    currSongEditing: null
                })
            }

            case GlobalStoreActionType.ENABLE_EDIT_SONG_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: "none",
                    editSongModalActive: true,
                    currSongEditing: payload,
                    editingTitle: payload.title,
                    editingArtist: payload.artist,
                    editingYT: payload.youTubeId
                })
            }

            case GlobalStoreActionType.CANCEL_EDIT_SONG_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: "none",
                    editSongModalActive: false,
                    currSongEditing: null,
                    editingTitle: null,
                    editingArtist: null,
                    editingYT: null
                })
            }

            case GlobalStoreActionType.UPDATE_SONG_NAME: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: "none",
                    editSongModalActive: store.editSongModalActive,
                    currSongEditing: store.currSongEditing,
                    editingTitle: payload,
                    editingArtist: store.editingArtist,
                    editingYT: store.editingYT
                })
            }

            case GlobalStoreActionType.UPDATE_ARTIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: "none",
                    editSongModalActive: store.editSongModalActive,
                    currSongEditing: store.currSongEditing,
                    editingTitle: store.editingTitle,
                    editingArtist: payload,
                    editingYT: store.editingYT
                })
            }

            case GlobalStoreActionType.UPDATE_YT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: "none",
                    editSongModalActive: store.editSongModalActive,
                    currSongEditing: store.currSongEditing,
                    editingTitle: store.editingTitle,
                    editingArtist: store.editingArtist,
                    editingYT: payload
                })
            }

            // case GlobalStoreActionType.SET_DELETE_SONG_TITLE: {
            //     // console.log("in the state case for set delete song title");
            //     // console.log("our payload: " + payload);
            //     return setStore({
            //         idNamePairs: store.idNamePairs,
            //         currentList: store.currentList,
            //         newListCounter: store.newListCounter,
            //         listNameActive: false,
            //         deleteSongModalActive: store.deleteSongModalActive,
            //         deleteSongTitle: payload
            //     })
            // }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }
    

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    store.createNewList = function () {
        console.log("creating list..");
        async function asyncCreateNewList(){
            let response = await api.createPlaylist();
            if (response.data.success) {
                let playlist = response.data.playlist;
               
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: {
                        playlist: playlist
                    }
                });
                store.loadIdNamePairs();
                console.log("created list");
            }
        }
        asyncCreateNewList();
    }

    store.enableDeleteSongModal = function (songIndex) {
        let songTitle = store.currentList.songs[songIndex].title
        storeReducer({
            type: GlobalStoreActionType.ENABLE_DELETE_SONG_MODAL,
            payload: songTitle
        });
    }

    store.enableEditSongModal = function (songIndex) {
        let song = store.currentList.songs[songIndex];
        console.log("song sent to enableEditSongModal: " +song.title );
        storeReducer({
            type: GlobalStoreActionType.ENABLE_EDIT_SONG_MODAL,
            payload: song
        })
    }

    store.updateSongName = function (newSongName) {
        storeReducer({
            type:GlobalStoreActionType.UPDATE_SONG_NAME,
            payload: newSongName
        })
    }

    store.updateArtist = function (newArtist) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_ARTIST,
            payload: newArtist
        })
    }

    store.updateYT = function(newYT) {
        storeReducer({
            type: GlobalStoreActionType.UPDATE_YT,
            payload: newYT
        })
    }

    store.cancelDeleteSongModal = function () {
        storeReducer({
            type: GlobalStoreActionType.CANCEL_DELETE_SONG_MODAL,
            payload: null
        });
    }

    store.cancelEditSongModal = function() {
        console.log("cancelling edit song modal!");
        //this should set all the values back to their defaults, but idk if its working
        storeReducer({
            type: GlobalStoreActionType.CANCEL_EDIT_SONG_MODAL,
            payload: null
        });
        console.log(store.editingTitle);
    }

    // store.setDeleteSongTitle = function(songIndex) {
    //     console.log("in store setDeleteSongTitle....");
    //     console.log("title from the currentList.songs[songIndex]: " + store.currentList.songs[songIndex].title);
    //     let songTitle = store.currentList.songs[songIndex].title
    //     storeReducer({
    //         type: GlobalStoreActionType.SET_DELETE_SONG_TITLE,
    //         payload: songTitle
    //     });
    //     console.log("set the store.deleteSongTitle to: " + store.deleteSongTitle);
    // }

    store.createNewSong = function (id) {
        console.log("creating new song in store in list id: " + id);
        async function asyncCreateNewSong(id){
            let response = await api.createNewSong(id);
            if (response.data.success) {
                async function asyncUpdateCurrentList(id){
                    response = await api.getPlaylistById(id);
                    if(response.data.success){
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: response.data.playlist
                        })
                        console.log(JSON.stringify(store.currentList));
                    }
                }
                asyncUpdateCurrentList(id);
            }
        }
        asyncCreateNewSong(id); 
        console.log("bababooey");
    }

    // store.updateSong = function (newSong) {
    //     async function
    // }

    store.removeSong = function (index) {
        async function asyncRemoveSong(index){
            let playlist = store.currentList
            playlist.songs.splice(index, 1);
            console.log(playlist.songs);
            let response = await api.updatePlaylistById(playlist._id, playlist);
            if(response.data.success) {
                async function asyncUpdateCurrentList(id){
                    response = await api.getPlaylistById(id);
                    if(response.data.success){
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: response.data.playlist
                        })
                        console.log(JSON.stringify(store.currentList));
                    }
                }
                asyncUpdateCurrentList(playlist._id);
            }
            else{
                console.log("response failed.");
            }
        }
        asyncRemoveSong(index);
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            console.log("attempting to load id name pairs (async)");
            const response = await api.getPlaylistPairs();
            console.log("sent api request");
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
                console.log("API SUCCESSFULLY GOT LIST PAIRS");
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }
    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    store.deleteList = function (id) {
        console.log("preparing to delete list with id: " + id );
        async function asyncDeleteList(id){
            let response = await api.deletePlaylist(id);
            if(response.data.success){
                //do something?? maybe
                storeReducer({
                    type: GlobalStoreActionType.DELETE_LIST,
                    payload: null
                });
                store.loadIdNamePairs();
            }
        }
        asyncDeleteList(id);
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}