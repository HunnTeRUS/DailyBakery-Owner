import api from '../../services/api'
import ChangeContactInfoDAOInterface from './ChangeContactInfoDAOInterface';

export default async function changeContactInfoDAO(_id: string, token: string, numero_celular?: string, numero_telefone?: string) {
    if (!numero_celular || !_id)
        throw "CNPJ e/ou numero de celular não podem ser vazios."

    var data = {};

    if (numero_telefone) {
        data = {
            numero_telefone: numero_telefone,
            numero_celular: numero_celular
        }
    } else {
        data = {
            numero_celular: numero_celular
        }
    }

    let obj: ChangeContactInfoDAOInterface = {}

    await api({
        method: 'put', //you can set what request you want to be
        url: '/updatePhoneNumber',
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
        return obj;
    });

    return obj;
}

