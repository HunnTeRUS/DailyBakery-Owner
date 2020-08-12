import api from '../services/api'

export default async function sendVerificationEmail(email: string) {
    if (!email) {
        throw "Email não pode ser vazio";
    }

    const response = await api.post('/forgotPassword', {
        email: email,
    });

    const obj = {
        email: response.data.email,
        codigoEnviado: response.data.codigoEnviado,
    }

    return obj;
}
