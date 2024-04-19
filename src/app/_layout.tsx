import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import AuthProvider from '@/context/AuthProvider';
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

const APIKeys = {
  apple: process.env.EXPO_PUBLIC_RC_IOS_KEY || "RC_IOS_KEY",
  google: process.env.EXPO_PUBLIC_RC_ANDROID_KEY || "RC_ANDROID_KEY",
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (!loaded) {
      return;
    }
  }, [loaded]);
  
  if (!loaded) {
    return null;
  }

  Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
  
  const setup = async () => {
    // if (Platform.OS == "android") {
    //   Purchases.configure({ apiKey: APIKeys.google });
    // } 
    // else 
    if ( Platform.OS == "ios") {
      console.log("Setting up Purchases for iOS");
      Purchases.configure({ apiKey: "appl_WXZehsaRksZxZcIZIWGRlOUhHlm" });
    }
    else {
      console.log("Platform not supported");
    }
  };

  setup()
    .catch(console.log);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AuthProvider>
        {/* <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="upgrade" options={{ presentation: 'modal', headerShown: false }} />
        </Stack> */}
        <Slot />
    </AuthProvider>
  );
}
