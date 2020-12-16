import api from '../api'
import changePasswordDAO from '../../dao/ChangePasswordDAO/ChangePasswordDAO'
import { useState } from 'react';
import ChangePasswordDAOInterface from '../../dao/ChangePasswordDAO/ChangePasswordDAOInterface';

export default async function sendVerificationEmailServices(email: string, _id: string, newPass: string) {
    if(!_id || !email || !newPass) {
        throw "Não podem existir campos vazios";
    }

    let obj : ChangePasswordDAOInterface = {}

    await changePasswordDAO(email, _id, newPass).then(response=>{
        obj = response;
    });

    return obj
}