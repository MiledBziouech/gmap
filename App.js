import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import customMapStyle from './customMapStyle';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import Cardd from './Cardd';

const GOOGLE_MAPS_APIKEY = 'AIzaSyArDHKxkI_wPzZB71m3HUjZgIuiZrGfg-k';

export default function App() {
  const [state, setState] = useState({
    pickUpCords: {
      latitude: 35.8328294,
      longitude: 10.6266979,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    },
    dropLocationCords: {
      latitude: 35.492545,
      longitude: 8.873156,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    },
  });

  const { pickUpCords, dropLocationCords } = state;

  const [pin, setPin] = useState({
    latitude: 43.770919,
    longitude: 11.270960,
  });

  const onPlaceSelected = (data, details) => {
    console.log('Place Selected:', data);
    console.log('Place Details:', details);
    // Add your logic here to handle the selected place
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access Location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const { width, height } = Dimensions.get('window');

  const Aspect_Ratio = width / height;
  const LATTUDE_DELTA = 0.2;
  const LONGITUDE_DELTA = LATTUDE_DELTA * Aspect_Ratio;
  const INITIAL_POSITION = {
    latitude: 43.766764,
    longitude: 11.251349,
    latitudeDelta: LATTUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
       
      <MapView
        followUserLocation={true}
        zoomEnabled={true}
        showsCompass={true}
        customMapStyle={customMapStyle}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
        onUserLocationChange={(e) => {
          console.log('onUserLocationChange', e.nativeEvent.coordinate);
        }}
      >
        
        <MapViewDirections
          origin={pin}
          destination={dropLocationCords}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColors="#111111"
          optimizeWaypoints={true}
          strokeColor="white"
        />
      </MapView>
      <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder={"Search"}
            fetchDetails={true}
            onPress={(data, details = null) => {
                onPlaceSelected(data, details);
                console.log("Place Selected", data)
            }}
            query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
            }}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  map: {
  flex:1
  },
  searchContainer: {
    position: 'absolute',
    width: "100%",
    opacity: 1, // Adjusted width
    top:Constants.statusBarHeight, // Ensure autocomplete appears above map
    backgroundColor: 'transparent',
    zIndex: 1
  },
  input: {
    borderColor: "#01F2CF",
    borderWidth: 1,
    backgroundColor: "transparent",
    color: '#01F2CF'
  }
});
