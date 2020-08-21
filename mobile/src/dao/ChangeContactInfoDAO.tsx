import api, { API_DEFAULT_PARAMS } from '../services/api'

export default async function changeContactInfoDAO(cnpj: string, token: string, numero_celular?: string, numero_telefone?: string) {
    if (!cnpj)
        throw "CNPJ não pode ser vazio"

    try {
        await api({
            method: 'put', //you can set what request you want to be
            url: '/updatePhoneNumber',
            data: {
                numero_celular: numero_celular,
                numero_telefone: numero_telefone,},
            headers: {
                'x-auth-token': token
            },
            params: {
                cnpj: cnpj
            }
          });

        return true;
    }
    catch (e) {
        console.log(e)
        return false;
    }
}
