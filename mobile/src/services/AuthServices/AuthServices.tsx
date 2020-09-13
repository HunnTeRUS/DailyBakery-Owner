import api from '../api'
import verifyTokenDAO from '../../dao/AuthDAO/AuthDAO'
import UserInterface from '../Utils/UserInterface';
import getLoggedUser from '../Utils/LoggedUser';

export default async function verifyToken() {

    let objResponse : UserInterface = {};

    const obj = await getLoggedUser();

    if(obj.token && obj.cnpj){

        await verifyTokenDAO(obj?.token, obj.cnpj)
            .then(response => {
                objResponse = response;
                return objResponse;
        })
    }

    return objResponse;
}