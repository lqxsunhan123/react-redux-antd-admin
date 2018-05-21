package com.myfirstapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.reactnativecomponent.barcode.RCTCapturePackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  // private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
  private ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RCTCapturePackage(),
            new ImagePickerPackage(),
              new BadgePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  //添加以下代码
  public void setReactNativeHost(ReactNativeHost reactNativeHost) {
    mReactNativeHost = reactNativeHost;
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
