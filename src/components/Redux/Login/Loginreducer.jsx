import { Login_Loading, Log_Out } from "./Loginaction";
import { Login_Success } from "./Loginaction";
import { Login_Failure} from "./Loginaction";
import { LOGOUT } from "./Loginaction";

const initstate={loading:false,isAuthenticated:false,error:false,user:{}}

export const loginreducer=(store=initstate,{type,payload})=>{
    switch (type) {
        case Login_Loading:{
            return {...store,loading:true}
        }
        case Login_Success:{
            return {...store ,loading:false,isAuthenticated:true,user:payload}
        }

        case Login_Failure:{
            return {...store,loading:false,error:true}
        }
        case LOGOUT:{
            return {...store,loading:false,isAuthenticated:false,error:false,user:{}}
        }
        default :{
            return store;
        }
    }
}