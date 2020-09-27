import newFornadaDAO from '../../dao/NewFornadaDAO/NewFornadaDAO'
import getLoggedUser from '../Utils/LoggedUser';
import NewFornadaDAOInterface from '../../dao/NewFornadaDAO/NewFornadaDAOInterface';

export default async function newFornadaServices(ultima_fornada: Date) {
    let objResponse: NewFornadaDAOInterface = {};

    if (!ultima_fornada){
        objResponse.error = "Data é obrigatoria"
        return objResponse;
    }

    const obj = await getLoggedUser();

    if(obj?.cnpj && obj?.token)
        await newFornadaDAO(obj.cnpj, obj.token, ultima_fornada)
        .then(response => {
            objResponse = response;
    });
    
    else {
        objResponse.error = "Não foi possivel recuperar o usuario logado";
        return objResponse;
    }

    return objResponse;
}