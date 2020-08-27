import api from '../../services/api'
import CloseBakeryDAOInterface from './CloseBakeryDAOInterface'

export default async function changePasswordDAO(token: string, cnpj: string, aberto_fechado: boolean) {
    if (!cnpj) {
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
            cnpj: cnpj
        }
    }).catch(error => {
        obj = {
            error: error.response.data.error
        }
        return obj
    });

    return obj
}
