import React from "react";
import { Image, Text, View } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';


const Cardd = () => {

    

    let time =42 
    let distance=8.1
    return(
        <View style={{
            width: 342,
            height: 130,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'#063A34DE',
            top:45,
            shadowColor: '#000',
            shadowOffset: {
                width:5,
                height:5
            },
            position:'absolute',
            left: 20, // Adjust this value as needed
            zIndex: 1

        }} >
                <SimpleLineIcons name="heart" size={24} color="white" position="absolute" />
                <Text style={{color:'#ffffff'}}>Tesla CS23 {time} min ({distance}) km{'\n'} Fastest route despite the usual trafic{'\n'} you have enough battery to reach </ Text>
                
                <Image source={require('/home/pingu468/mapz/gmapss/assets/send.png')} />
        </ View>
    )
};

    
export default Cardd;