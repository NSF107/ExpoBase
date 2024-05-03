import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

/**
 * The main configuration function for the Expo app, which sets up environment-specific variables
 * and any additional configurations required for the app to function correctly.
 *
 * @param {ConfigContext} context - The context provided by Expo, containing the current config state.
 * @returns {ExpoConfig} The configuration object that Expo uses to build the app.
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    name: "ExpoBoilerplate",
    slug: "expoboilerplate",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "expoboilerplate",
    userInterfaceStyle: "automatic",
    splash: {
        image: "./src/assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: true,
        bundleIdentifier: "com.nfett10.expoboilerplate",
        usesAppleSignIn: true,
        userInterfaceStyle: "automatic",
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./src/assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff",
        },
        package: "com.nfett10.expoboilerplate",
        userInterfaceStyle: "automatic",
        googleServicesFile: process.env.GOOGLE_SERVICES_JSON, // Path to the google-services.json file secret in EAS
    },
    web: {
        bundler: "metro",
        output: "static",
        favicon: "./src/assets/images/favicon.png",
    },
    plugins: [
        "expo-router",
        "expo-apple-authentication",
        [
            'expo-build-properties',
            {
              android: {
                minSdkVersion: 24, // needed for revenuecat paywall integration (https://community.revenuecat.com/sdks-51/expo-android-dev-client-build-fails-due-to-minsdkversion-conflict-with-purchases-hybrid-common-ui-4289)
              }
            }
        ],
        [
            "@sentry/react-native/expo",
            {
                url: "https://sentry.io/",
                organization: "expobase",
                project: "expobase",
                SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
            },
        ],
    ],
    experiments: {
        typedRoutes: true,
    },
    extra: {
        router: {
            origin: false,
        },
        eas: {
            projectId: "f05dbea3-f682-45f0-99db-4be188e495ab",
        },
    },
    owner: "nfett10",
    runtimeVersion: {
        policy: "appVersion",
    },
    updates: {
        url: "https://u.expo.dev/f05dbea3-f682-45f0-99db-4be188e495ab",
        enabled: true,
        fallbackToCacheTimeout: 0,
        checkAutomatically: "ON_LOAD",
    },
});
