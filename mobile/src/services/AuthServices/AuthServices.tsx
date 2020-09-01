import api from '../api'
import verifyTokenDAO from '../../dao/AuthDAO'
import { AsyncStorage } from 'react-native';
import UserInterface from '../Utils/UserInterface';
import { useState } from 'react';

export default async function verifyToken() {

    async function getLoggedUser() {
        const objUser = await AsyncStorage.getItem('loggedUser');

        if(objUser)
            return JSON.parse(objUser) as UserInterface;

        return null;
    }

    async function changeValue() {
        const obj = await getLoggedUser();

        if(!obj)
            return false;

        return verifyTokenDAO(obj.token ? obj.token : "") ? true : false
    }

    return changeValue();
}