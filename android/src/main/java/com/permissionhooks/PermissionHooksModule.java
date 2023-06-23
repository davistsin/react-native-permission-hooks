package com.permissionhooks;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = PermissionHooksModule.NAME)
public class PermissionHooksModule extends ReactContextBaseJavaModule {
  public static final String NAME = "PermissionHooks";

  private ReactApplicationContext context;
  public PermissionHooksModule(ReactApplicationContext reactContext) {
    super(reactContext);
    context = reactContext;
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public int getSystemVersionCode() {
    return Build.VERSION.SDK_INT;
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean hasPermission(String per) {
    int result = ContextCompat.checkSelfPermission(context, per);
    return result == PackageManager.PERMISSION_GRANTED;
  }
}
