import api from '../services/api'

export default async function changeContactInfoDAO(cnpj: string, token: string, numero_celular?: string, numero_telefone?: string) {
    if (!numero_celular || !cnpj)
        throw "CNPJ e/ou numero de celular não podem ser vazios."

    try {
        var data = {};

        if(numero_telefone){
            data = {
                numero_telefone: numero_telefone,
                numero_celular: numero_celular
            } 
        } else {
            data = {
                numero_celular: numero_celular
            } 
        }

        console.log(data)

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
          });

        return true;
    }
    catch (e) {
        console.log(e)
        return false;
    }
}
