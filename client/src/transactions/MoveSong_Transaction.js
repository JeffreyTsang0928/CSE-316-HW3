import jsTPS_Transaction from "../common/jsTPS.js"

export default class MoveSong_Transaction extends jsTPS_Transaction{
    constructor(initIndex1, initIndex2, initStore){
        super();
        this.index1=initIndex1;
        this.index2=initIndex2;
        this.store=initStore;
    }

    doTransaction(){
        let store = this.store;
        let sourceIndex = this.index1;
        let targetIndex = this.index2;
        console.log("moving song at index: " + sourceIndex + " to index: " +targetIndex);
        console.log("current list: " + JSON.stringify(store.currentList));
        store.moveSongFromTransaction(sourceIndex, targetIndex);
    }

    undoTransaction(){
        let store = this.store;
        let index1=this.index1;
        let index2=this.index2;
        console.log("moving song at index: " + this.index2 + " to index: " +this.index1);
        console.log("current list: " + JSON.stringify(store.currentList));
        store.moveSongFromTransaction(index2, index1);
    }
}