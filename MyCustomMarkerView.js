import React from 'react';
import {Image,ImageBackground} from 'react-native';

const MyCustomMarkerView = () => {
    return (
      <ImageBackground
        source={require('./assets/Ellipse.png')}
        style={{ height: 60, width: 60, justifyContent: 'center' }}
      >
        <Image
          style={{
            width: 54,
            height: 35,
          }}
          source={require('./assets/bicycle.png')}
        />
      </ImageBackground>
    );
  }
  export default MyCustomMarkerView;