import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import {Marker} from "react-native-maps";


const Directi = () => {

    const GOOGLE_MAPS_APIKEY = 'AIzaSyArDHKxkI_wPzZB71m3HUjZgIuiZrGfg-k';

    const [state, setState] = useState({
      pickUpCords:{
        latitude: 43.770919, 
        longitude: 11.270960,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      },
      dropLocationCords:{
        latitude: 43.766764, 
        longitude: 11.251349,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }
    })

    const[pickUpCords, dropLocationCords] = state

    return(
        <View>
            <MapViewDirections
            origin={pickUpCords}
            destination={dropLocationCords}
            apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
            strokeWidth={4}
            strokeColors="#111111"
            optimizeWaypoints={true}
            strokeColor="white"
            />
            
            </View>
    )
}
export default Directi;