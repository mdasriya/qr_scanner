import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera'; // Ensure this is correctly imported

function ScanPage() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        Alert.alert('Error requesting camera permission', error.message);
      }
    };

    getCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(`QR code with data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan QR Code</Text>
      {hasPermission && !scanned && (
        <Camera
          style={StyleSheet.absoluteFillObject}
          onBarCodeScanned={handleBarCodeScanned}
        />
      )}
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ScanPage;
