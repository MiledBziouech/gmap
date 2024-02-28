import React, { useState, useEffect,useRef } from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import customMapStyle from './customMapStyle';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
//import Cardd from './Cardd';
import axios from 'axios';


const GOOGLE_MAPS_APIKEY = 'AIzaSyArDHKxkI_wPzZB71m3HUjZgIuiZrGfg-k';

export default function App() {

  
  
  


  const mapRef = useRef(null);

  const [pin, setPin] = useState({
    latitude: 43.770919,
    longitude: 11.270960,
  });

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

  const [destination, setDestination] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    if (destination.latitude !== 0 && destination.longitude !== 0) {
      const origin = `${pin.latitude},${pin.longitude}`;
      const dest = `${destination.latitude},${destination.longitude}`;
      const API_KEY = GOOGLE_MAPS_APIKEY;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${dest}&mode=bicycling&key=${API_KEY}`
        )
        .then((response) => {
          console.log('Distance Matrix API Response:', response.data); // Log the entire response for debugging
          const elements = response.data.rows[0].elements;
          if (elements && elements.length > 0 && elements[0].distance && elements[0].duration) {
            const distance = elements[0].distance.text;
            const duration = elements[0].duration.text;
            setDistance(distance);
            setDuration(duration);
            console.log('Distance:', distance, 'Duration:', duration);
          } else {
            console.error('Invalid response data structure');
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [destination]);

  const onPlaceSelected = (data, details) => {
    console.log('Place Selected:', data);
    console.log('Place Details:', details);

  const { lat, lng } = details.geometry.location;

  setDestination({
    latitude: lat,
    longitude: lng,
  });
  
useEffect(() => {
  // Auto-zoom to the selected place
  if (mapRef.current && destination) {
    mapRef.current.fitToCoordinates(
      [pin, destination],
      {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      }
    );
  }
}, [destination]); 
  };

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
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColors="#111111"
          optimizeWaypoints={true}
          strokeColor="white"
        />
        <Marker
        coordinate={pin}
        title='userLocation'
        description='userLocation marker' />
        <Marker
        coordinate={destination}
        title='userDestination'
        description='userDestination marker' />
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
})