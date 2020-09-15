import api from '../../services/api'
import ChangePasswordDAOInterface from './ChangePasswordDAOInterface'

export default async function changePasswordDAO(email: string, cnpj: string, newPass: string) {
    if (!email) {
        throw "Email não pode ser vazio";
    }

    let obj : ChangePasswordDAOInterface = {}

    await api.post('/updatePassword', {
        email: email,
        cnpj: cnpj,
        novaSenha: newPass
    }).catch(error=> {
        obj = {
            error: error.response.data.message ? error.response.data.message : error.response.data.error
        }
    });

    return obj
    
}
