package com.myfirstapp;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;
import com.facebook.react.ReactActivity;
import me.leolin.shortcutbadger.ShortcutBadger;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MyFirstApp";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        boolean success = ShortcutBadger.applyCount(MainActivity.this, 55);

        Toast.makeText(getApplicationContext(), "Set count=" + 55 + ", success=" + success, Toast.LENGTH_SHORT).show();
    }
}
