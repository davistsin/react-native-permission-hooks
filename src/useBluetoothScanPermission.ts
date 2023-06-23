import { useState } from 'react';
import { NativeModules, Platform } from 'react-native';
import * as ReactNativePermissions from 'react-native-permissions';

const PermissionHooks = NativeModules.PermissionHooks;

function initState() {
  if (Platform.OS === 'android') {
    const systemVersionCode = PermissionHooks.getSystemVersionCode();
    if (systemVersionCode >= 31) {
      const result = PermissionHooks.hasPermission(
        ReactNativePermissions.PERMISSIONS.ANDROID.BLUETOOTH_SCAN
      );
      return result
        ? ReactNativePermissions.RESULTS.GRANTED
        : ReactNativePermissions.RESULTS.DENIED;
    }
    if (systemVersionCode >= 23) {
      const result = PermissionHooks.hasPermission(
        ReactNativePermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      return result
        ? ReactNativePermissions.RESULTS.GRANTED
        : ReactNativePermissions.RESULTS.DENIED;
    }
  } else if (Platform.OS === 'ios') {
  }
  return ReactNativePermissions.RESULTS.GRANTED;
}

export function useBluetoothScanPermission() {
  const [status, setStatus] =
    useState<ReactNativePermissions.PermissionStatus>(initState);
  const request = () => {
    if (Platform.OS === 'android') {
      const systemVersionCode = PermissionHooks.getSystemVersionCode();
      if (systemVersionCode >= 31) {
        ReactNativePermissions.request(
          ReactNativePermissions.PERMISSIONS.ANDROID.BLUETOOTH_SCAN
        ).then((value) => {
          setStatus(value);
        });
      } else if (systemVersionCode >= 23) {
        ReactNativePermissions.request(
          ReactNativePermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        ).then((value) => {
          setStatus(value);
        });
      }
    }
  };
  return {
    status,
    request,
  };
}
