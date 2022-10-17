import jsTPS_Transaction from "../common/jsTPS.js"



export default class AddSong_Transaction extends jsTPS_Transaction{
    constructor(initOldList,  initId, initStore){
        super();
        this.oldList = initOldList;
        this.id = initId;
        this.store = initStore;
        console.log("add song transaction made with this oldlist: " + JSON.stringify(this.oldList));
        console.log("this transaction has: " + this.oldList.songs.length + " songs");
    }

    doTransaction(){
        let id = this.id;
        let store= this.store;
        console.log("doing addsong transaction");
        store.createNewSongFromTransaction(id);
    }

    undoTransaction(){
        let list = this.oldList;
        let store = this.store;
        console.log("the old list has " + this.oldList.songs.length + " songs");
        console.log("undoing addsong transaction");
        store.updatePlaylistById(list);
    }
}