import { View, Text } from "react-native";

import SignOutButton from "@/components/auth/SignOutButton";
import { useAuth } from "@/context/AuthProvider";

export default function Accout() {
    const { user } = useAuth();

    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Account info:</Text>
            <Text>Email: {user?.email}</Text>
            <Text>
                Display Name:{" "}
                {user?.user_metadata.full_name
                    ? user?.user_metadata.full_name
                    : "Stranger"}
            </Text>
            <Text>Last Login: {user?.last_sign_in_at}</Text>
            <Text>
                Provider: {user?.app_metadata.provider}
                {"\n"}
                {"\n"}
            </Text>
            <SignOutButton />
        </View>
    );
}
