import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import AddSong_Transaction from '../transactions/AddSong_Transaction';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction';
import EditSong_Transaction from '../transactions/EditSong_Transaction';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
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
    UPDATE_YT: "UPDATE_YT",
    HANDLE_DRAG_START: "HANDLE_DRAG_START",
    HANDLE_DROP: "HANDLE_DROP",
    HANDLE_DRAG_OVER: "HANDLE_DRAG_OVER",
    HANDLE_DRAG_ENTER: "HANDLE_DRAG_ENTER",
    HANDLE_DRAG_LEAVE: "HANDLE_DRAG_LEAVE",
    SET_DELETE_LIST_ID: "SET_DELETE_LIST_ID"

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
        editingYT: "",
        currSongEditingIndex: null,
        isDragging: false,
        draggedTo: false,
        songIndexIsDragging: null,
        songIndexDraggedTo: null,
        newPlaylistId: null,
        listIdBeingEdited: null,
        listIdMarkedForDeletion: false
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
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: true,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: payload.playlistId,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: store.newPlaylistId,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: store.newPlaylistId,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    deleteSongModalActive: false,
                    deleteSongTitle: store.deleteSongTitle,
                    editSongModalActive: false,
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: store.newPlaylistId,
                    listIdBeingEdited: payload,
                    listIdMarkedForDeletion: false
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
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    currSongEditing: null,
                    editingTitle: "",
                    editingArtist: "",
                    editingYT: "",
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    currSongEditing: payload.song,
                    editingTitle: payload.song.title,
                    editingArtist: payload.song.artist,
                    editingYT: payload.song.youTubeId,
                    currSongEditingIndex: payload.index,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    editingYT: null,
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    editingYT: store.editingYT,
                    currSongEditingIndex: store.currSongEditingIndex,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    editingYT: store.editingYT,
                    currSongEditingIndex: store.currSongEditingIndex,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
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
                    editingYT: payload,
                    currSongEditingIndex: store.currSongEditingIndex,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
                })
            }

            case GlobalStoreActionType.HANDLE_DRAG_START: {
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
                    editingYT: null,
                    currSongEditingIndex: null,
                    isDragging: true,
                    draggedTo: store.draggedTo,
                    songIndexIsDragging: payload,
                    songIndexDraggedTo: store.songIndexDraggedTo,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
                })
            }

            case GlobalStoreActionType.HANDLE_DROP: {
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
                    editingYT: null,
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: false,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
                })
            }

            case GlobalStoreActionType.HANDLE_DRAG_ENTER: {
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
                    editingYT: null,
                    currSongEditingIndex: null,
                    isDragging: store.isDragging,
                    draggedTo: true,
                    songIndexIsDragging: store.songIndexIsDragging,
                    songIndexDraggedTo: payload,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
                })
            }

            case GlobalStoreActionType.HANDLE_DRAG_LEAVE: {
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
                    editingYT: null,
                    currSongEditingIndex: null,
                    isDragging: store.isDragging,
                    draggedTo: false,
                    songIndexIsDragging: false,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
                })
            }

            case GlobalStoreActionType.HANDLE_DRAG_OVER: {
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
                    editingYT: null,
                    currSongEditingIndex: null,
                    isDragging: store.isDragging,
                    draggedTo: true,
                    songIndexIsDragging: store.songIndexIsDragging,
                    songIndexDraggedTo: payload,
                    newPlaylistId: null,
                    listIdBeingEdited: null,
                    listIdMarkedForDeletion: false
                })
            }

            case GlobalStoreActionType.SET_DELETE_LIST_ID: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: store.listNameActive,
                    deleteSongModalActive: false,
                    deleteSongTitle: "none",
                    editSongModalActive: false,
                    currSongEditing: null,
                    editingTitle: null,
                    editingArtist: null,
                    editingYT: null,
                    currSongEditingIndex: null,
                    isDragging: false,
                    draggedTo: true,
                    songIndexIsDragging: null,
                    songIndexDraggedTo: null,
                    newPlaylistId: null,
                    listIdBeingEdited: store.listIdBeingEdited,
                    listIdMarkedForDeletion: payload
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

    store.hasTransactionToUndo = function(){
        return tps.hasTransactionToUndo();
    }

    store.hasTransactionToRedo = function(){
        return tps.hasTransactionToRedo();
    }
    
    store.setDeleteListId = function (id){
        storeReducer({
            type: GlobalStoreActionType.SET_DELETE_LIST_ID,
            payload: !store.listIdMarkedForDeletion
        });
    }
    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
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
                let playlist = JSON.parse(JSON.stringify(response.data.playlist));

                // console.log("using reducer to store id: " + playlist._id);
                // storeReducer({
                //     type: GlobalStoreActionType.CREATE_NEW_LIST,
                //     payload: playlist._id
                // });

                // store.loadIdNamePairs();
                // console.log("created list with id: " + playlist._id);
                async function asyncLoadIdNamePairs(playlist) {
                    console.log("attempting to load id name pairs (async)");
                    const response = await api.getPlaylistPairs();
                    console.log("sent api request");
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.CREATE_NEW_LIST,
                            payload:{ 
                                idNamePairs: pairsArray,
                                playlistId: playlist._id
                            }
                        });
                        console.log("API SUCCESSFULLY GOT LIST PAIRS");
                    }
                    else {
                        console.log("API FAILED TO GET THE LIST PAIRS");
                    }
                }
                asyncLoadIdNamePairs(playlist);

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
            payload: {
                song: song,
                index: songIndex
            }
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

    store.handleDragStart = function(index) {
        storeReducer({
            type: GlobalStoreActionType.HANDLE_DRAG_START,
            payload:index
        });
    }

    store.handleDragEnter = function(index) {
        storeReducer({
            type: GlobalStoreActionType.HANDLE_DRAG_ENTER,
            payload:index
        });
    }

    store.handleDragOver = function(index) {
        storeReducer({
            type: GlobalStoreActionType.HANDLE_DRAG_OVER,
            payload:index
        });
    }

    store.handleDragLeave = function() {
        storeReducer({
            type: GlobalStoreActionType.HANDLE_DRAG_LEAVE,
            payload:null
        });
    }

    store.handleDrop = function() {
        storeReducer({
            type: GlobalStoreActionType.HANDLE_DROP,
            payload:null
        });
    }


    store.createNewSong = function (id) {
        console.log("creating new song in store in list id: " + id);
        let oldList = store.currentList;
        store.addAddSongTransaction(oldList, id);
    
    }

    store.createNewSongFromTransaction = function(id) {
        async function asyncCreateNewSong(id){
            let response = await api.createNewSong(id);
            if (response.data.success) {
                async function asyncUpdateCurrentList(id){
                    let response = await api.getPlaylistById(id);
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
        asyncCreateNewSong(id,store); 
    }

    store.updatePlaylistById = function(newPlaylist) {
        console.log("updating playlistbyid with newPlaylist: " + JSON.stringify(newPlaylist));
        async function asyncUpdatePlaylistbyId(newPlaylist){
            let response = await api.updatePlaylistById(newPlaylist._id, newPlaylist);
            if(response.data.success){
                async function asyncUpdateCurrentList(id){
                    response = await api.getPlaylistById(id);
                    if(response.data.success){
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_LIST,
                            payload: response.data.playlist
                        })

                    }
                }
                asyncUpdateCurrentList(newPlaylist._id);
            }
        }
        asyncUpdatePlaylistbyId(newPlaylist);
    }

    store.updateSong = function () {
        let editedSong={
            title: store.editingTitle,
            artist: store.editingArtist,
            youTubeId: store.editingYT
        }

        let originalSong={
            title: store.currSongEditing.title,
            artist: store.currSongEditing.artist,
            youTubeId: store.currSongEditing.youTubeId
        }

        let index = store.currSongEditingIndex;

        store.addEditSongTransaction(editedSong, originalSong, index);

        // console.log("data sent to update song: " + store.currSongEditing.title + " and index: " + store.currSongEditingIndex);
        // async function asyncUpdateSong(song,index){
        //     let playlist=store.currentList;
        //     playlist.songs[index] = song;
        //     let response = await api.updatePlaylistById(playlist._id, playlist);
        //     if(response.data.success) {
        //         async function asyncUpdateCurrentList(id){
        //             response = await api.getPlaylistById(id);
        //             if(response.data.success){
        //                 storeReducer({
        //                     type: GlobalStoreActionType.SET_CURRENT_LIST,
        //                     payload: response.data.playlist
        //                 })
        //                 console.log(JSON.stringify(store.currentList));
        //             }
        //         }
        //         asyncUpdateCurrentList(playlist._id);
        //     }
        // }
        // let editedSong={
        //     title: store.editingTitle,
        //     artist: store.editingArtist,
        //     youTubeId: store.editingYT
        // }
        // asyncUpdateSong(editedSong, store.currSongEditingIndex);
    }

    store.editSongFromTransaction = function(newSong, index) {
        async function asyncUpdateSong(song,index){
            let playlist=store.currentList;
            playlist.songs[index] = song;
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
        }
        asyncUpdateSong(newSong, index);
    }

    store.moveSong = function(sourceIndex, targetIndex){
        store.addMoveSongTransaction(sourceIndex,targetIndex);


        // async function asyncMoveSong(source,target){
        //     let list = store.currentList;
        //     let start = source;
        //     let end = target;
        //     if (start < end) {
        //         let temp = list.songs[start];
        //         for (let i = start; i < end; i++) {
        //             list.songs[i] = list.songs[i + 1];
        //         }
        //         list.songs[end] = temp;
        //     }
        //     else if (start > end) {
        //         let temp = list.songs[start];
        //         for (let i = start; i > end; i--) {
        //             list.songs[i] = list.songs[i - 1];
        //         }
        //         list.songs[end] = temp;
        //     }
        //     let response = await api.updatePlaylistById(list._id, list);
        //     if(response.data.success){
        //         async function asyncUpdateCurrentList(id){
        //             response = await api.getPlaylistById(id);
        //             if(response.data.success){
        //                 storeReducer({
        //                     type: GlobalStoreActionType.SET_CURRENT_LIST,
        //                     payload: response.data.playlist
        //                 })
        //                 console.log(JSON.stringify(store.currentList));
        //             }
        //         }
        //         asyncUpdateCurrentList(list._id);
        //     }
        // }
        // asyncMoveSong(sourceIndex,targetIndex);
    }

    store.moveSongFromTransaction = function(sourceIndex, targetIndex){
        console.log("CURRENT LIST BEFORE MOVING IN TRANSACTION: " + JSON.stringify(store.currentList));
        async function asyncMoveSong(source,target){
            let list = store.currentList;
            let start = source;
            let end = target;
            if (start < end) {
                let temp = list.songs[start];
                for (let i = start; i < end; i++) {
                    list.songs[i] = list.songs[i + 1];
                }
                list.songs[end] = temp;
            }
            else if (start > end) {
                let temp = list.songs[start];
                for (let i = start; i > end; i--) {
                    list.songs[i] = list.songs[i - 1];
                }
                list.songs[end] = temp;
            }
            let response = await api.updatePlaylistById(list._id, list);
            if(response.data.success){
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
                asyncUpdateCurrentList(list._id);
            }
        }
        asyncMoveSong(sourceIndex,targetIndex);
    }

    store.removeSong = function (index) {

        let oldList = JSON.parse(JSON.stringify(store.currentList)); //deep copy??
        store.addDeleteSongTransaction(oldList, index);

    }

    store.removeSongFromTransaction = function(index){
        async function asyncRemoveSong(index){
            let playlist = JSON.parse(JSON.stringify(store.currentList));
            playlist.songs.splice(index, 1);
            console.log("REMOVING FROM THIS LIST: " + playlist.songs);
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
        // let list = store.currentList;
        // async function asyncUpdateCurrentList(id){
        //     let response = await api.getPlaylistById(id);
        //     if(response.data.success){
        //         storeReducer({
        //             type: GlobalStoreActionType.SET_CURRENT_LIST,
        //             payload: response.data.playlist
        //         })
        //         console.log(JSON.stringify(store.currentList));
        //     }
        // }
        // asyncUpdateCurrentList(list._id);
        
    }
    store.redo = function () {
        tps.doTransaction();
        // let list = store.currentList;
        // async function asyncUpdateCurrentList(id){
        //     let response = await api.getPlaylistById(id);
        //     if(response.data.success){
        //         storeReducer({
        //             type: GlobalStoreActionType.SET_CURRENT_LIST,
        //             payload: response.data.playlist
        //         })
        //         console.log(JSON.stringify(store.currentList));
        //     }
        // }
        // asyncUpdateCurrentList(list._id);

    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function (id) {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: id
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

    store.addAddSongTransaction = function(oldList, id){
        let transaction = new AddSong_Transaction(oldList,id, store);
        tps.addTransaction(transaction);
        // let list = store.currentList;
        // async function asyncUpdateCurrentList(id){
        //     let response = await api.getPlaylistById(id);
        //     if(response.data.success){
        //         storeReducer({
        //             type: GlobalStoreActionType.SET_CURRENT_LIST,
        //             payload: response.data.playlist
        //         })
        //         console.log(JSON.stringify(store.currentList));
        //     }
        // }
        // asyncUpdateCurrentList(list._id);
    }

    store.addDeleteSongTransaction = function(oldList, index){
        console.log("adding delete song transaction with the following oldLIST: " + JSON.stringify(oldList));
        let transaction = new DeleteSong_Transaction(oldList, index, store);
        tps.addTransaction(transaction);
    }

    store.addEditSongTransaction = function(editedSong, originalSong, editIndex){
        let transaction = new EditSong_Transaction(editedSong, originalSong, editIndex, store);
        tps.addTransaction(transaction);
    }

    store.addMoveSongTransaction = function(index1, index2){
        let transaction = new MoveSong_Transaction(index1, index2, store);
        tps.addTransaction(transaction);
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}