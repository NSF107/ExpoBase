import { Button } from "react-native";
import { Platform } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import { View } from "./Themed";
import { performGoogleOAuth, performAppleNativeAuth } from "@/config/authHandler";
import { useRouter } from 'expo-router';

export default function AuthButtons() {
  const router = useRouter();
  
  if (Platform.OS === 'ios')
    return (
      <View>
        <Button onPress={() => performGoogleOAuth(router)} title="Sign in with Google" />
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={{ width: 200, height: 64 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              })
              // Sign in via Supabase Auth.
              performAppleNativeAuth(router, credential);
            } catch (e) {
              if ((e as any).code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        />
      </View>
    )
  else
  {
    return (
      <Button onPress={() => performGoogleOAuth(router)} title="Sign in with Google" />
    );
  }
}