import api from '../../services/api'
import AuthDAOInterface from './AuthDAOInterface';

export default async function verifyToken(token:string){
    let obj : AuthDAOInterface = {}

    if(!token)
        return obj;
    
    await api.post(`/verifyToken`, {
        token: token
    }).then(response =>{
        obj = {
            error: response.data.error,
            status: response.status
        }
        return obj;
    }).catch(error => {
        obj = {
            error: error.response.data.error,
            status: error.response.status
        }
        return obj;
    }); 
    return obj;
}
