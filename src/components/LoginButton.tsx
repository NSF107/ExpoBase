import { Button } from "react-native";
import { useRouter } from 'expo-router';

export default function LoginButton() {
    // Handle linking into app from email app.
    const router = useRouter();
  
    // onpress function to redirect to login
    const redirectUri = async (router: any) => {
        router.push("/login");
    }

    return (
        <>
        <Button onPress={() => redirectUri(router)} title="Login!" />
        </>
    );
}