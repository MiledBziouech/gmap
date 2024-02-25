import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete as PlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Constants from 'expo-constants';

const GOOGLE_MAPS_APIKEY = 'AIzaSyArDHKxkI_wPzZB71m3HUjZgIuiZrGfg-k';

const  GooglePlacesAutocomplete = () => {
    return(
        <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
                styles={{ textInput: styles.input }}
                placeholder={"Search"}
                fetchDetails
                onPress={(data, details = null) => {
                    onPlaceSelected(data, details);
                }}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                }}
            />
        </View>
    )
};
const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    width: "90%",
    opacity: 1,
    top: Constants.statusBarHeight,
    backgroundColor: "transparent",

  },
  input: {
    borderColor: "#01F2CF",
    borderWidth: 1,
    backgroundColor: "transparent",
    color: '#01F2CF'
  }
})


export default  GooglePlacesAutocomplete;