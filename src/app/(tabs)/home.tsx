import { StyleSheet } from "react-native";

import SendNotificationButton from "@/components/pushNotifications/NotificationButton";
import TestSentryButton from "@/components/sentry/TestSentryButton";
import { Text, View } from "@/components/theme/Themed";
import UpgradeButton from "@/components/upgrade/UpgradeButton";
import { useAuth } from "@/context/AuthProvider";

export default function Home() {
    const { user } = useAuth();

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
                {"\n"}
                {"\n"}
                {"\n"}
            </Text>
            <TestSentryButton />
            <Text>{"\n"}</Text>
            <SendNotificationButton />
            <Text>{"\n"}</Text>
            <UpgradeButton />
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
