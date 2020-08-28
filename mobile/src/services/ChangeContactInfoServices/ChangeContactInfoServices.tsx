import changeContactInfoDAO from '../../dao/ChangeContactInfoDAO/ChangeContactInfoDAO'
import getLoggedUser from '../Utils/LoggedUser';
import ChangeContactInfoDAOInterface from '../../dao/ChangeContactInfoDAO/ChangeContactInfoDAOInterface';
import changeLoggedUserInfo from '../Utils/ChangeLoggedUserInfos';

export default async function changeContactInfoServices(numero_celular: string, numero_telefone?: string) {
    let objResponse: ChangeContactInfoDAOInterface = {};

    if (!numero_celular){
        objResponse.error = "Número de celular não pode ser vazio"
        return objResponse;
    }

    const obj = await getLoggedUser();

    if(obj.cnpj && obj.token)
        await changeContactInfoDAO(obj.cnpj ? obj.cnpj : "", obj.token ? obj.token : "", numero_celular, numero_telefone)
        .then(response => {
            objResponse = response;
        });
    
    else {
        objResponse.error = "Não foi possivel recuperar o usuario logado";
        return objResponse;
    }

    return objResponse;
}