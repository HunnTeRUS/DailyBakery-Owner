import { AsyncStorage } from "react-native";
import UserInterface from "./UserInterface";

export default async function getLoggedUser(){
    let objUser : UserInterface = {};
    var i = 0;

    while(i<3) {
        let obj = await AsyncStorage.getItem('loggedUser');
        if(obj)
            objUser = JSON.parse(obj) as UserInterface
        i = i + 1;
    }

    return objUser as UserInterface;
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