import api from '../api'
import sendVerificationEmail from '../../dao/ForgotPasswordDAO/ForgotPasswordDAO'
import { useState } from 'react';
import ForgotPasswordDAOInterface from '../../dao/ForgotPasswordDAO/ForgotPasswordDAOInterface';

export default async function sendVerificationEmailServices(cnpj: string) {
    if(!cnpj) {
        throw "CNPJ não pode ser vazio";
    }

    let obj : ForgotPasswordDAOInterface = {};

    await sendVerificationEmail(cnpj).then(response => {
        obj = response;
    });

    return obj;
}