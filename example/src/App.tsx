import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { useBluetoothScanPermission } from 'react-native-permission-hooks';

export default function App() {
  const { status: bluetoothScanStatus, request: requestBluetoothPer } =
    useBluetoothScanPermission();

  return (
    <View style={styles.container}>
      <Text>{`Bluetooth Scan permission: ${bluetoothScanStatus}`}</Text>
      <Button
        title="request bluetooth scan permission"
        onPress={() => {
          requestBluetoothPer();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
