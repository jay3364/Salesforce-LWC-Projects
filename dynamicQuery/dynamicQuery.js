import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getObject from '@salesforce/apex/DynamicQuery.getObjectList';
import getRecords from '@salesforce/apex/DynamicQuery.getRecords';

export default class DynamicQuery extends LightningElement {
    @track objectOptions = [];
    @track fieldOptions = [];
    selectedObject = '';
    @track selectedFields = [];
    @track records = [];
    @track qeary;
    column=[];
    limit= 0;
    //selectedFields = '';

    handleObjectSelection(event) {
        this.selectedObject = event.target.value;
        this.selectedFields = [];
        console.log("selected object: ", this.selectedObject);
        console.log('objectOptions: ', JSON.stringify(this.objectOptions));
    }

    handleFieldSelection(event) {
        this.selectedFields = Array.from(event.target.options)
        .filter(option => option.selected)
        .map(option => option.value);
        console.log("selected field has occure....after Map........");
        //this.selectedFields = selectedFields.length > 0 ? selectedFields : [];
        console.log("thgis is the call function");
        console.log("selected fields: ", JSON.stringify(this.selectedFields));

    }
    
    

    @wire(getObjectInfo, { objectApiName: '$selectedObject' })
    wireObjectinfo({ error, data }) {
        if (data) {
            console.log('data====>', data.fields);
            
            this.fieldOptions = Object.keys(data.fields).map(fieldName => ({
                label:fieldName,
                value: fieldName
            }));
            console.log("fhffhfhf=========>>>>>>>>>>>>", JSON.stringify(this.fieldOptions));
            console.log("this is data =>>>", data);
        } else if (error) {
            console.log("error==>>>>>>>>", error);
        }
    }

    connectedCallback() {
        this.retrieveObjectList();
    }

    retrieveObjectList() {
        getObject()
            .then(result => {
                this.objectOptions = result.map(objectName => ({
                    label: objectName,
                    value: objectName
                }));
            })
            .catch(error => {
                console.log('error fetching object list', error);
            });
            
    }
    async handleButtonClick(){
        console.log("fffbfbfbbfff ");
        if((this.selectedObject && this.selectedFields)!=null){
            
            this.qeary = `SELECT ${this.selectedFields.join(',  ')} FROM ${this.selectedObject} `;
            if (this.limit) {
                this.qeary += ` LIMIT ${this.limit}`;
            }
            console.log("query========>",this.qeary);

            getRecords({ query: this.qeary })
            .then(result =>{
                console.log('this is result jfjjff ===>',result);
                this.records=result;
                console.log("this recodeoe===>>",JSON.stringify(this.records));
                this.column =this.selectedFields.map(fields=>({
                    label:fields,
                    fieldName : fields
                }));
            })
        }else{
            
            console.log("errrororo====>selected object and fielod");
        }
       

        //fatch record based on query

        try{
            console.log("fjfjfjfjjf===",this.qeary);
            const result = await getRecords({ query: this.qeary });
            console.log("result records===>",result);
            if(result){
                this.records =[...result];
                console.log("fatch the Records====>",JSON.stringify(this.records));
                
                // console.log("count records == > ",this.count);

            }
            
                // this.records = this.records.slice(0,limit);
                // console.log("this.records===>>",this.records);
    
                console.log("Before slicing ===>", JSON.stringify(this.records));
                this.records = this.records.slice( limit);
                console.log("After slicing ===>", JSON.stringify(this.records));
            
        }
        catch(error){
            console.log("errrororo====>selected object and field");
        }
        
    }
    

    limits(event){
        this.limit = parseInt(event.target.value);
        console.log("limite===>",this.limit);
        // if(!isNaN(limit) && limit>0){
        //     // this.records = this.records.slice(0,limit);
        //     // console.log("this.records===>>",this.records);

        //     console.log("Before slicing ===>", JSON.stringify(this.records));
        //     this.records = this.records.slice(0, limit);
        //     console.log("After slicing ===>", JSON.stringify(this.records));
        // }

    }

    // get selectedFieldsJoined() {
    //     return this.selectedFields.join(', ');
    // }
}