import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { Text, Button } from "@/components/theme/Themed";
import { performGoogleOAuth } from "@/lib/authHandler";

export default function SignInWithGoogleButton() {
    const router = useRouter();
    const [isPressed, setIsPressed] = useState(false);

    return (
        <Button
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={() => performGoogleOAuth(router)}
            lightColor="black"
            darkColor="white"
            style={styles.button}
        >
            <Text
                lightColor={isPressed ? "grey" : "white"}
                darkColor={isPressed ? "grey" : "black"}
                style={styles.text}
            >
                Sign in with Google
            </Text>
        </Button>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        width: 200,
        height: 64,
    },
    text: {
        textAlign: "center",
        fontSize: 18,
        lineHeight: 64,
        fontWeight: "600",
    },
});
