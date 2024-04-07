import { Button } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "@/utils/supabase";
import { useRouter } from 'expo-router';
import { Platform } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import { View } from "./Themed";

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();
console.log("redirectTo: ", redirectTo);

const createSessionFromUrl = async (url: string) => {
  console.log("createSessionFromUrl: ", url);
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  console.log( "session: ", data.session );

  return data.session;
};

const performGoogleOAuth = async (router: any) => {
  // sign in with Google
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: true
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
    router.replace('/home');
  }
};

const performAppleNativeAuth = async (router: any, credential: AppleAuthentication.AppleAuthenticationCredential) => {
  // sign in with Apple
  if (credential.identityToken) {
    const {
      error,
      data: { user },
    } = await supabase.auth.signInWithIdToken({
      provider: 'apple',
      token: credential.identityToken,
    })
    console.log(JSON.stringify({ error, user }, null, 2))
    if (!error) {
      // User is signed in.
      router.replace('/home');
    }
  } else {
    throw new Error('No identityToken.')
  }
};

export default function Auth() {
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