import api from '../api'
import verifyTokenDAO from '../../dao/AuthDAO/AuthDAO'
import { AsyncStorage } from 'react-native';
import UserInterface from '../Utils/UserInterface';
import { useState } from 'react';
import getLoggedUser from '../Utils/LoggedUser';
import AuthDAOInterface from '../../dao/AuthDAO/AuthDAOInterface';

export default async function verifyToken() {

    let objResponse : AuthDAOInterface = {};

    const obj = await getLoggedUser();

    await verifyTokenDAO(obj?.token ? obj.token : "")
        .then(response => {
            objResponse = response;
            return objResponse;
    })

    return objResponse;
}