# react-native-permission-hooks

react native permission hooks.

## Installation

```sh
npm install react-native-permission-hooks
```

This library depends on react-native-permissions, so you also need to

```shell
npm install react-native-permissions
```

## Usage

### Bluetooth Permission

```jsx
export default function App() {
  const { status: bluetoothScanStatus, request: requestBluetoothPer } =
    useBluetoothPermission();

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
```

#### Android Intro

- Android <6: return default GRANTED.
- Android 6-11: check android.permission.ACCESS_FINE_LOCATION permission, in order to scan.
- Android >=12: check android.permission.BLUETOOTH_SCAN, android.permission.BLUETOOTH_ADVERTISE, android.permission.BLUETOOTH_CONNECT permissions.

The following permissions need to be added to the manifest file.

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
  <uses-permission android:name="android.permission.BLUETOOTH"/>
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN"/>
  <uses-permission android:name="android.permission.BLUETOOTH_SCAN"/>
  <uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
  <uses-permission android:name="android.permission.BLUETOOTH_CONNECT"/>

  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>

  <uses-feature android:name="android.hardware.bluetooth_le" android:required="true"/>
</manifest>
```

#### iOS Intro

- return default GRANTED.

Unlike Android, iOS only needs Bluetooth permissions to perform all Bluetooth functions: open/scan/connect.

### TODO Camera Permission
### TODO Location Permission
### TODO Storage Permission

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
