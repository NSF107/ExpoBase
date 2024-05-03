import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Sentry from "@sentry/react-native";
import { useFonts } from "expo-font";
import { Slot, useNavigationContainerRef } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import Purchases from "react-native-purchases";

import AuthProvider from "@/context/AuthProvider";

const APIKeys = {
    apple: process.env.EXPO_PUBLIC_RC_IOS_KEY || "RC_IOS_KEY",
    google: process.env.EXPO_PUBLIC_RC_ANDROID_KEY || "RC_ANDROID_KEY",
};

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// import Constants from 'expo-constants';
// Construct a new instrumentation instance. This is needed to communicate between the integration and React
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();
const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;

Sentry.init({
    dsn: sentryDsn,
    debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
    integrations: [
        // new Sentry.ReactNativeTracing({
        //   // Pass instrumentation to be used as `routingInstrumentation`
        //   routingInstrumentation,
        //   enableNativeFramesTracking: Constants.appOwnership !== 'expo', // Only in native builds, not in Expo Go.
        // }),
    ],
});

function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (!loaded) {
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

    const setup = async () => {
        if (Platform.OS === "android") {
            Purchases.configure({ apiKey: APIKeys.google });
        } else if (Platform.OS === "ios") {
            console.log("Setting up Purchases for iOS");
            Purchases.configure({ apiKey: APIKeys.apple });
        } else {
            console.log("Platform not supported");
        }
    };

    setup().catch(console.log);

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    // Capture the NavigationContainer ref and register it with the instrumentation.
    const ref = useNavigationContainerRef();

    React.useEffect(() => {
        if (ref) {
            routingInstrumentation.registerNavigationContainer(ref);
        }
    }, [ref]);

    return (
        // Set up the auth context and render our layout inside of it.
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}

// Wrap the Root Layout route component with `Sentry.wrap` to capture gesture info and profiling data.
export default Sentry.wrap(RootLayout);
