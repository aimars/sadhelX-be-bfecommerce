import AsyncStorage from '@react-native-async-storage/async-storage'

export const getData = async (key) => {
    try{
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            //value previously stored
            return JSON.parse(value)
        }
    } catch(e) {
        //error reading value
    }
}
