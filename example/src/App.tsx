import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { useBluetoothPermission } from 'react-native-permission-hooks';

export default function App() {
  const { status: bluetoothPerStatus, request: requestBluetoothPer } =
    useBluetoothPermission();

  return (
    <View style={styles.container}>
      <Text>{`Bluetooth permission: ${bluetoothPerStatus}`}</Text>
      <Button
        title="request bluetooth permission"
        onPress={() => {
          requestBluetoothPer().then((result) => {
            console.log('requestBluetoothPer', result);
          });
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
