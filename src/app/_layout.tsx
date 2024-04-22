import { Slot, useNavigationContainerRef  } from "expo-router";
import React from 'react';
import AuthProvider from "@/context/AuthProvider";
import * as Sentry from '@sentry/react-native';
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
