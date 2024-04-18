import { StyleSheet } from "react-native";
import { Text, View } from "@/components/theme/Themed";
import { useAuth } from "@/context/AuthProvider";
import UpgradeButton from "@/components/upgrade/UpgradeButton";

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
                Welcome to the coolest app on the planet.{"\n"}{"\n"}{"\n"}{"\n"}
                Upgrade your plan to get access to our premium features!{"\n"}{"\n"}
            </Text>
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
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
});
