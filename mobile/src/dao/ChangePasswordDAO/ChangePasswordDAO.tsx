import api from '../../services/api'
import ChangePasswordDAOInterface from './ChangePasswordDAOInterface'

export default async function changePasswordDAO(email: string, _id: string, newPass: string) {
    if (!email) {
        throw "Email não pode ser vazio";
    }

    let obj : ChangePasswordDAOInterface = {}

    await api.post('/updatePassword', {
        email: email,
        _id: _id,
        novaSenha: newPass
    }).catch(error=> {
        console.log(error.response.data.message ? error.response.data.message : error.response.data.error)
        obj = {
            error: error.response.data.message ? error.response.data.message : error.response.data.error
        }
    });

    return obj
    
}
