import { LightningElement } from 'lwc';
const delay = 300;
export default class MovieSearch extends LightningElement {

selectedType = '';
loading = false;
selectedSearch = '';
selectedPageNumber = '1';
delaytimeout;
searchResult = [];
get options() {
        return [
             { label: 'null', value: '' },
            { label: 'Movie', value: 'Movie' },
            { label: 'Series', value: 'Series' },
            { label: 'episode', value: 'episode' },
        ];
    }


    handleChange(event){
        let{name,value} = event.target.value;
        this.loading = true;
        if(name == 'type'){
            this.selectedType =value;
        }
        else if(name=='search'){
            this.selectedSearch = value;
        }
        else if(name=='Page Number'){
            this.selectedPageNumber = value;
        }
        clearTimeout(this.delaytimeout);
        //de-bouncing == delaying prtocess for [perticuller secods]
        this.delaytimeout = setTimeout(()=>{this.searchMovie();
        },delay);
        
    }
//this method will search for enter movi8e
async searchMovie(){
    
    const url = `https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNumber}&apikey=741a4d82`;
   const rest = await fetch(url);
   const data = await rest.json();
   console.log('OUTPUT : movie search ',data);
   this.loading =false;
   
   if(data.responce == true){
       this.searchResult = data.search;
   }
}
}