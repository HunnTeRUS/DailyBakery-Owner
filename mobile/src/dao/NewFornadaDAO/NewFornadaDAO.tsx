import api from '../../services/api'
import NewFornadaDAOInterface from './NewFornadaDAOInterface';

export default async function newFornadaDAO(cnpj: string, token: string, ultima_fornada: Date) {
    if (!ultima_fornada)
        throw "Data e hora da fornada não podem ser vazias."

    var data = {
        ultima_fornada: ultima_fornada
    };

    let obj: NewFornadaDAOInterface = {}

    await api({
        method: 'put', //you can set what request you want to be
        url: '/updateLastBatch',
        data,
        headers: {
            'x-auth-token': token
        },
        params: {
            cnpj: cnpj
        }
    }).catch(error => {
        obj = {
            error: error.response.data.error,
        }
        return obj;
    });

    return obj;
}

