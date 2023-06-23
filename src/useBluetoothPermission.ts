import { useState } from 'react';
import { NativeModules, Platform } from 'react-native';
import * as ReactNativePermissions from 'react-native-permissions';
import type { PermissionStatus } from 'react-native-permissions';

const PermissionHooks = NativeModules.PermissionHooks;

function initState() {
  if (Platform.OS === 'android') {
    const systemVersionCode = PermissionHooks.getSystemVersionCode();
    if (systemVersionCode >= 31) {
      const hasScan = PermissionHooks.hasPermission(
        ReactNativePermissions.PERMISSIONS.ANDROID.BLUETOOTH_SCAN
      );
      const hasAdvertise = PermissionHooks.hasPermission(
        ReactNativePermissions.PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE
      );
      const hasConnect = PermissionHooks.hasPermission(
        ReactNativePermissions.PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
      );
      if (hasScan && hasAdvertise && hasConnect) {
        return ReactNativePermissions.RESULTS.GRANTED;
      }
      if (hasScan || hasAdvertise || hasConnect) {
        return ReactNativePermissions.RESULTS.LIMITED;
      }
      return ReactNativePermissions.RESULTS.DENIED;
    }
    if (systemVersionCode >= 23) {
      const hasScan = PermissionHooks.hasPermission(
        ReactNativePermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      return hasScan
        ? ReactNativePermissions.RESULTS.GRANTED
        : ReactNativePermissions.RESULTS.DENIED;
    }
  } else if (Platform.OS === 'ios') {
    const hasPer = PermissionHooks.checkBluetoothPermission();
    return hasPer === 'true'
      ? ReactNativePermissions.RESULTS.GRANTED
      : ReactNativePermissions.RESULTS.DENIED;
  }
  return ReactNativePermissions.RESULTS.GRANTED;
}

export function useBluetoothPermission() {
  const [status, setStatus] =
    useState<ReactNativePermissions.PermissionStatus>(initState);
  const request = async (): Promise<PermissionStatus> => {
    if (Platform.OS === 'android') {
      const systemVersionCode = PermissionHooks.getSystemVersionCode();
      if (systemVersionCode >= 31) {
        const scanPer = await ReactNativePermissions.request(
          ReactNativePermissions.PERMISSIONS.ANDROID.BLUETOOTH_SCAN
        );
        const advertisePer = await ReactNativePermissions.request(
          ReactNativePermissions.PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE
        );
        const connectPer = await ReactNativePermissions.request(
          ReactNativePermissions.PERMISSIONS.ANDROID.BLUETOOTH_CONNECT
        );
        if (
          scanPer === 'granted' &&
          advertisePer === 'granted' &&
          connectPer === 'granted'
        ) {
          setStatus(ReactNativePermissions.RESULTS.GRANTED);
          return ReactNativePermissions.RESULTS.GRANTED;
        }
        if (
          scanPer === 'granted' ||
          advertisePer === 'granted' ||
          connectPer === 'granted'
        ) {
          setStatus(ReactNativePermissions.RESULTS.LIMITED);
          return ReactNativePermissions.RESULTS.LIMITED;
        }
        setStatus(ReactNativePermissions.RESULTS.DENIED);
        return ReactNativePermissions.RESULTS.DENIED;
      } else if (systemVersionCode >= 23) {
        const scanPer = await ReactNativePermissions.request(
          ReactNativePermissions.PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );
        const result = scanPer
          ? ReactNativePermissions.RESULTS.GRANTED
          : ReactNativePermissions.RESULTS.LIMITED;
        setStatus(result);
        return result;
      }
    } else if (Platform.OS === 'ios') {
      const per = await ReactNativePermissions.request(
        ReactNativePermissions.PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
      );
      setStatus(per);
      return per;
    }
    return ReactNativePermissions.RESULTS.GRANTED;
  };
  return {
    status,
    request,
  };
}
