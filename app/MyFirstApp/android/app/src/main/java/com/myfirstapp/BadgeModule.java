package com.myfirstapp;

import android.app.Activity;
import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import me.leolin.shortcutbadger.ShortcutBadger;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;

/**
 * @author sunh
 * @date 2018\5\19 0019 17:40
 */
public class BadgeModule extends ReactContextBaseJavaModule {


    public BadgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Badge";
    }

    @ReactMethod
    public void showBadge(int badgeNum) {
        boolean success = ShortcutBadger.applyCount(getCurrentActivity(), badgeNum);
        Toast.makeText(getCurrentActivity(), "Set count=" + badgeNum + ", success=" + success, Toast.LENGTH_SHORT).show();
        System.out.println(success);
    }
}

