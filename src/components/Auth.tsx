import { Button } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { supabase } from "@/utils/supabase";
import { useRouter } from 'expo-router';

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

export default function Auth() {
  const router = useRouter();

  return (
    <>
      <Button onPress={() => performGoogleOAuth(router)} title="Sign in with Google" />
    </>
  );
}