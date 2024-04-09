import { Button } from "react-native";
import { performGoogleOAuth } from "@/config/authHandler";
import { useRouter } from 'expo-router';

export default function SignInWithGoogleButton() {
  const router = useRouter();
  return (
    <Button onPress={() => performGoogleOAuth(router)} title="Sign in with Google" />
  );
}