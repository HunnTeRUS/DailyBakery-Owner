import api from '../services/api'

export default async function verifyToken(token:string){
    if(!token)
        throw "token não pode ser vazio"
    
    try {
        await api.post(`/verifyToken`, {
           token: token
        });
        return true;
    }
    catch (e) {
        console.log(e);
        return false
    }
}
