import jsTPS_Transaction from "../common/jsTPS.js"

export default class DeleteSong_Transaction extends jsTPS_Transaction{
    constructor(initOldList, initIndex, initStore){
        super();
        this.oldList = initOldList;
        this.index = initIndex;
        this.store = initStore;
        console.log("delete song transaction made with this oldlist: " + JSON.stringify(this.oldList));
        console.log("this transaction has: " + this.oldList.songs.length + " songs");
    }

    doTransaction(){
        let index = this.index;
        let store = this.store;
        store.removeSongFromTransaction(index);
    }

    undoTransaction(){
        console.log("the old list has " + this.oldList.songs.length + " songs");
        let list = this.oldList;
        console.log("undoing delete song, reverting to: " + JSON.stringify(list));
        console.log("the old list has " + list.songs.length + " songs");
        let store = this.store;
        console.log("undoing deleteSong transaction");
        store.updatePlaylistById(list);
    }
}