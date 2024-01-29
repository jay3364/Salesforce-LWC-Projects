import { LightningElement, api } from 'lwc';

export default class NewPagination extends LightningElement {
    currentPage =1
    totalRecords
    @api recordSize = 5
    totalPage = 0
    get records(){
        return this.visibleRecords
    }
    @api 
    set records(data){
        if(data){ 
            this.totalRecords = data
            // this.recordSize = Number(this.recordSize)
            this.totalPage =Number(Math.ceil(data.length/this.recordSize))
            this.updateRecords()
        }
    }

    get disablePrevious(){ 
        return this.currentPage<=1
    }
    get disableNext(){ 
        return this.currentPage>=this.totalPage
    }
    previousHandler(){ 
        if(this.currentPage>1){
            this.currentPage = this.currentPage-1
            this.updateRecords()
        }
    }
    nextHandler(){
        if(this.currentPage < this.totalPage){
            this.currentPage = this.currentPage+1
            this.updateRecords()
        }
    }
    updateRecords(){ 
       // this.currentPage = this.currentPage -1; 
        const start = (this.currentPage-1)*this.recordSize
        console.log('currentPage',this.currentPage);
        console.log('recordSize',this.recordSize);
        console.log('start Records=====>',start);
        const end = this.recordSize*this.currentPage
        console.log('end Record====>',end);
        this.visibleRecords = this.totalRecords.slice(start, end)
        this.dispatchEvent(new CustomEvent('update',{ 
            detail:{ 
                records:this.visibleRecords
            }
        }))
    }

}