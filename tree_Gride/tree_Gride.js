import { LightningElement, track, wire } from 'lwc';
import getAccountHierarchy from '@salesforce/apex/TreeNewComponent.getHierarchy';
import { NavigationMixin } from 'lightning/navigation';


// const items = [
//     {
//         label: 'Western Sales Director',
//         name: '1',
//         expanded: true,
//         items: [
//             {
//                 label: 'Western Sales Manager',
//                 name: '2',
//                 expanded: true,
//                 items: [
//                     {
//                         label: 'CA Sales Rep',
//                         name: '3',
//                         expanded: true,
//                         items: [],
//                     },
//                     {
//                         label: 'OR Sales Rep',
//                         name: '4',
//                         expanded: true,
//                         items: [],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         label: 'Eastern Sales Director',
//         name: '5',
//         expanded: false,
//         items: [
//             {
//                 label: 'Eastern Sales Manager',
//                 name: '6',
//                 expanded: true,
//                 items: [
//                     {
//                         label: 'NY Sales Rep',
//                         name: '7',
//                         expanded: true,
//                         items: [],
//                     },
//                     {
//                         label: 'MA Sales Rep',
//                         name: '8',
//                         expanded: true,
//                         items: [],
//                     },
//                 ],
//             },
//         ],
//     },
// ];

// const mapping = {
//     1: 'Western Sales Director',
//     2: 'Western Sales Manager',
//     3: 'CA Sales Rep',
//     4: 'OR Sales Rep',
//     5: 'Eastern Sales Director',
//     6: 'Eastern Sales Manager',
//     7: 'NY Sales Rep',
//     8: 'MA Sales Rep',
// };

export default class Tree_Gride extends NavigationMixin(LightningElement) {

    
    selected = '';
    objectApiName;
    @track fields = [];
    

    @track treeList = [];
    @track recordId = '0015g00001RG5unAAD';
    connectedCallback() {
        console.log('OUTPUT : ===========connectedCallBack');
       this.loadAccountHierarchy();
    }

    

    @wire(getAccountHierarchy, { accountId: '$recordId' })
    wiredAccountHierarchy({ error, data }) {
        if (data) {
            console.log('OUTPUT : data has benn foundeds========>',JSON.stringify(data));
            this.treeList = data;
            console.log('treelist=================>',JSON.stringify(this.treeList));
        } else if (error) {
            console.log('ERROR: ', error);
        }
    }
    

     loadAccountHierarchy() {
        getAccountHierarchy({ accountIds: this.recordId })
            .then(result => {
                this.treeList = result;
                console.log('result :==================>resultssss ',JSON.stringify(result));
               
                console.log('resultId-=======>',element.name);

            })
            .catch(error => {
                console.log('OUTPUT : ',error);
            });
    }
    handleNodeSelect(event) {
        
        this.selected = event.detail.name.split(' ')[0];
        this.objectApiName = event.detail.name.split(' ')[1];
        console.log('this.selected====>>',this.selected);
        console.log('this.objectApiName====>>',this.objectApiName);

        if(this.objectApiName == 'Account'){
            this.fields = ['Name','Industry', 'Phone'];
        }else if (this.objectApiName == 'contact'){
            this.fields = ['FirstName', 'LastName', 'Email', 'Phone'];
        }else if (this.objectApiName == 'Opportunity'){
            this.fields = ['Name', 'StageName', 'Amount', 'CloseDate'];
        
        }else if(this.objectApiName == 'Order'){
            this.fields = ['OrderNumber', 'Status', 'TotalAmount'];
        }
        }
        
        // const selectedElement = this.treeList.find(element => {
        //     var names = element.name.split(' ');
        //     console.log('ames[0] === this.selected== ',names[0] === this.selected);
        //     console.log('this.selected== ', this.selected);
        //     console.log('ames[0] ===== ',names[0]);
        //     return names[0] === this.selected;
        // });

        /*let selectNameList = event.detail.name.split(' ');
        let selectedElement = this.treeList;
        selectNameList.forEach(ele => {
            
            selectedElement = this.treeList.find(element => {
                var names = element.name.split(' ');
                console.log('ames[0] === this.selected== ',names[1] === this.selected);
                console.log('this.selected== ', this.selected);
                console.log('ames[0] ===== ',names[0]);
                console.log('names[0] === this.selected========',names[0] === this.selected);
                
                console.log('this oddkkkkv= = = = >>',names[1]===this.selected);
                return names[0] === this.selected;
                
            });
        });
        
        
            if (selectedElement) {
                var names = selectedElement.name.split(' ');
                this.objectApiName = names[1];
                console.log('objectNameopopop====>', this.objectApiName);
                
            } else {
                console.log('No matching element found.');
                
            }
          
         
            switch (this.objectApiName) {
                case 'Account':
                    this.objectApiName ='Account';
                    this.fields = ['Name','Industry', 'Phone'];
                    break;
            
                case 'Contact':
                    this.objectApiName ='Contact';
                    this.fields = ['FirstName', 'LastName', 'Email', 'Phone'];
                    break;

                case 'Opportunity':
                    this.objectApiName ='Opportunity';
                    this.fields = ['Name', 'StageName', 'Amount', 'CloseDate'];
                    break;

                case 'order':
                    this.objectApiName = 'Order';
                    this.fields = ['OrderNumber', 'Status', 'TotalAmount']; 
                    break;
                
                default:
                    break;
            }
       
        console.log('selected event1===>',this.selected);
        console.log('= event===>',event.detail);
        console.log('= event=detail ==>',event.detail.name);*/

    }


    

