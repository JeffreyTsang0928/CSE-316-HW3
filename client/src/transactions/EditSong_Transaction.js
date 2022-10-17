import jsTPS_Transaction from "../common/jsTPS.js"

export default class EditSong_Transaction extends jsTPS_Transaction{
    constructor(initEditedSong, initOriginalSong, initEditIndex, initStore){
        super();
        // this.oldList = initOldList;
        this.editedSong = initEditedSong;
        this.originalSong = initOriginalSong;
        this.editIndex = initEditIndex;
        this.store = initStore
    }

    doTransaction(){
        let newSong = this.editedSong;
        let index = this.editIndex;
        let store = this.store;
        store.editSongFromTransaction(newSong, index);
    }

    undoTransaction(){
        let newSong = this.originalSong;
        let index = this.editIndex;
        let store = this.store;
        store.editSongFromTransaction(newSong, index);
    }
}