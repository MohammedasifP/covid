import { COVID } from "./DataAction";
const initState={songs:[]};
export const datareducer=(store=initState,{type,payload})=>{
      
    switch(type){
        case COVID:{

             return {...store,coviddata:payload};
        }

       default:
           return store;
                  }

}