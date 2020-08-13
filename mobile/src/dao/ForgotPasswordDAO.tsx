import api from '../services/api'

export default async function sendVerificationEmail(cnpj: string) {
    if (!cnpj) {
        throw "Email não pode ser vazio";
    }

    const response = await api.post('/forgotPassword', {
        cnpj: cnpj,
    });

    const obj = {
        cnpj: response.data.cnpj,
        email: response.data.email,
        codigoEnviado: response.data.codigoEnviado,
    }

    return obj;
}
