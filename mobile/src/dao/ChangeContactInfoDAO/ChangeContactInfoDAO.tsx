import api from '../../services/api'
import ChangeContactInfoDAOInterface from './ChangeContactInfoDAOInterface';

export default async function changeContactInfoDAO(cnpj: string, token: string, numero_celular?: string, numero_telefone?: string) {
    if (!numero_celular || !cnpj)
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
            cnpj: cnpj
        }
    }).catch(Error => {
        obj = {
            error: Error.response.data.message ? Error.response.data.message : Error.response.data.Error
        }
        return obj;
    });

    return obj;
}

