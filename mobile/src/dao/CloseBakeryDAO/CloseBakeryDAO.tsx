import api from '../../services/api'
import CloseBakeryDAOInterface from './CloseBakeryDAOInterface'

export default async function changePasswordDAO(token: string, _id: string, aberto_fechado: boolean) {
    if (!_id) {
        throw "CNPJ não pode ser vazio";
    }

    let obj: CloseBakeryDAOInterface = {};

    let data = {
        aberto_fechado: aberto_fechado,
    }

    await api({
        method: 'put', //you can set what request you want to be
        url: '/updateOpenedOrClosed',
        data,
        headers: {
            'x-auth-token': token
        },
        params: {
            _id: _id
        }
    }).catch(error => {
        console.log(error.response.data.message ? error.response.data.message : error.response.data.error)
        obj = {
            error: error.response.data.message ? error.response.data.message : error.response.data.error
        }
        return obj
    });

    return obj
}
