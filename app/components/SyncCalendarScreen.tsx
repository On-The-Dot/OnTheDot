import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import QRCode from 'react-native-qrcode-svg'; // Import QRCode for generating QR codes

type SyncCalendarScreenProps = {
  closeSyncCalendarModal: () => void;
};

const SyncCalendarScreen: React.FC<SyncCalendarScreenProps> = ({ closeSyncCalendarModal }) => {
  const [facing, setFacing] = useState<'back' | 'front'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert('QR Code Scanned', `Data: ${data}`);
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={closeSyncCalendarModal} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sync with Others</Text>
        <CameraView
          style={styles.camera}
          facing={facing}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'], // Specify the barcode types you want to scan
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
        {scanned && (
          <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Generate QR Code</Text>
        <QRCode value="SampleQRCodeValue" size={200} />
        <Text style={styles.username}>abcd</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(245,240,228,1.00)',
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 25,
    color: '#8e44ad',
  },
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#8e44ad',
  },
  camera: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    color: '#8e44ad',
  },
});

export default SyncCalendarScreen;
