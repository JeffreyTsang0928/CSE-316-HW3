import jsTPS_Transaction from "../common/jsTPS.js"
import api from '../api'
import { GlobalStoreActionType, GlobalStoreContext } from '../store'


export default class AddSong_Transaction extends jsTPS_Transaction{
    constructor(initOldList,  initId, initStore){
        super();
        this.oldList = initOldList;
        this.id = initId;
        this.store = initStore
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
        console.log("undoing addsong transaction");
        store.updatePlaylistById(list);
    }
}