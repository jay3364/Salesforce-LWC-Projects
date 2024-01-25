import { LightningElement,api, wire} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import fileRecord from '@salesforce/apex/UserSearch.getRelatedFilesByRecordId';
//import Account from '@salesforce/schema/Case.Account';
export default class DownloadFile extends NavigationMixin(LightningElement) {
    @api recordId = '0015g00001RG5unAAD';
    fileList = [];
    @wire(fileRecord,{recordId :'$recordId'})
    filesOfAllRecord({data, error}){
        if(data){
            console.log('data======>',fileRecord);
            this.fileList = Object.keys(data).map(item=>({'label':data[item],
            "value" : item,
             "url": `/sfc/servlet.shepherd/document/download/${item}`}));

         console.log('filelist : ', JSON.stringify(this.fileList));
        }
        else if(error){
            console.log('error=====>',error);
        }
    }
    previewHandler(event) {
        console.log('Preview button clicked.');
        console.log('Data ID:', event.target.dataset.id); // Check if this prints the ContentDocumentId
        
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state: {
                selectedRecordId: event.target.dataset.id
            }
        }).catch(error => {
            console.error('Navigation error:', error);
        });
    }
}