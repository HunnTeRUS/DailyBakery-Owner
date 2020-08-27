import { AsyncStorage } from "react-native";
import UserInterface from "./UserInterface";

export default async function getLoggedUser(){
    const objUser = await AsyncStorage.getItem('loggedUser');
    return JSON.parse(objUser ? objUser : "") as UserInterface;
}

export async function setAndChangeLoggedUser(obj: UserInterface){
    const objResponse = await AsyncStorage.getItem('loggedUser'); 

    if(objResponse) {
        await AsyncStorage.removeItem('loggedUser')
        await AsyncStorage.setItem('loggedUser', JSON.stringify(obj));
    }

    else{
        await AsyncStorage.setItem('loggedUser', JSON.stringify(obj));
    }
}

export async function removeLoggedUser(indexId: string){
    const objResponse = await AsyncStorage.getItem(indexId); 

    if(objResponse) {
        await AsyncStorage.removeItem(indexId)
    }
}