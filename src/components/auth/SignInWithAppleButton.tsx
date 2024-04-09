import * as AppleAuthentication from 'expo-apple-authentication'
import { View } from 'react-native';
import { performAppleNativeAuth } from "@/config/authHandler";
import { useRouter } from 'expo-router';

export default function SignInWithAppleButton() {
  const router = useRouter();
  return (
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
  )
}