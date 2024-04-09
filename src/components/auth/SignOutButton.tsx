import { Button } from "react-native";
import { signOut } from "@/config/authHandler";
import { useRouter } from 'expo-router';

export default function SignOutButton() {
    const router = useRouter();
  
    return (
        <Button onPress={() => signOut(router)} title="Sign out" />
    );
}