import api from '../api'
import sendVerificationEmail from '../../dao/ForgotPasswordDAO'

export default async function sendVerificationEmailServices(emails: string): string{
    if(!emails) {
        throw "Email não pode ser vazio";
    }
   
    return String((await sendVerificationEmail(emails)).codigoEnviado);
}