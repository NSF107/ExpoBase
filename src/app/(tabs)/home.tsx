import { useState } from "react";
import { StyleSheet } from "react-native";

import SendNotificationButton from "@/components/pushNotifications/NotificationButton";
import { Text, View, Button } from "@/components/theme/Themed";
import { useAuth } from "@/context/AuthProvider";

export default function Home() {
    const { user } = useAuth();
    const [isPressed, setIsPressed] = useState(false);

    function handlePress() {
        throw new Error("New Sentry error!");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>
                Hello,{" "}
                {user?.user_metadata.name
                    ? user?.user_metadata.name
                    : "Unknown"}
                !
            </Text>
            <Text style={styles.paragraph}>
                Welcome to the coolest app on the planet.{"\n"}
            </Text>
            <Button
                onPress={handlePress}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                lightColor="black"
                darkColor="white"
                style={styles.button}
            >
                <Text
                    lightColor={isPressed ? "grey" : "white"}
                    darkColor={isPressed ? "grey" : "black"}
                    style={styles.buttonText}
                >
                    Press me to test Sentry
                </Text>
            </Button>
            <Text>{"\n"}</Text>
            <SendNotificationButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
});
