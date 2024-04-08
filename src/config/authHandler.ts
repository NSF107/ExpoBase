import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "@/config/supabase";
import * as AppleAuthentication from 'expo-apple-authentication'

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

export async function performGoogleOAuth( router: any){
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

export async function performAppleNativeAuth(router: any, credential: AppleAuthentication.AppleAuthenticationCredential){
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