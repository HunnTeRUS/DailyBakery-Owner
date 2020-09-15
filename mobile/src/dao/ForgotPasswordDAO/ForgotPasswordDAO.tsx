import api from '../../services/api'
import ForgotPasswordDAOInterface from './ForgotPasswordDAOInterface';

export default async function sendVerificationEmail(cnpj: string) {
    if (!cnpj) {
        throw "Email não pode ser vazio";
    }

    let obj: ForgotPasswordDAOInterface = {};

    await api.post('/forgotPassword', {
        cnpj: cnpj,
    }).then(response => {
        obj = {
            cnpj: response.data.cnpj,
            email: response.data.email,
            codigoEnviado: response.data.codigoEnviado
        }
        return obj
    }).catch(Error => {
        obj = {
            error: Error.response.data.message ? Error.response.data.message : Error.response.data.Error
        }
        return obj
    });

    return obj
}
