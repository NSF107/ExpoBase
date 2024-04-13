import { FlatList, Platform, StyleSheet } from "react-native";

import SignInWithAppleButton from "@/components/auth/SignInWithAppleButton";
import SignInWithGoogleButton from "@/components/auth/SignInWithGoogleButton";
import { Text, View } from "@/components/theme/Themed";

export default function Login() {
    const toolList = [
        '⚡ Expo React Native for building native apps',
        '🚀 Supabase Hosted Postges Database',
        '🔒 Supabase Authentication (Apple and Google implemented, many more providers available)',
        '🔐 AuthContext for handling authentication state',
        // '📱 In-app purchases with Expo In-App-Purchases',
        // '🔔 Push notifications with Expo Notifications',
        // '📈 Performance Monitoring with Sentry',
        '🔥 Type checking with TypeScript',
        '📁 File-based routing with Expo Router',
        '📏 Linter with ESLint',
        '💖 Code Formatter with Prettier',
        '🦺 Unit Testing with Jest and React Testing Library',
        '📡 Github Actions for CI/CD (Lint, Test, Build, ect.)',
        '📦 Integrated with Expo Application Services to build and publish the app',
        '💡 Absolute Imports using @ prefix',
        '🌈 Dark Mode support',
        '📄 MIT License',
        '\n'
    ];

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>ExpoBase{"\n"}</Text>
                <View
                    lightColor="black"
                    darkColor="white"
                    style={styles.line}
                />
                <Text style={styles.CTA}>
                    {"\n"}
                    The starter kit for building native apps with Expo and Supabase.{"\n"}
                </Text>
                <FlatList
                    data={toolList}
                    renderItem={({ item }) => <Text style={styles.toolList}>{item}</Text>}
                    keyExtractor={item => item}
                />
            </View>
            <View lightColor="black" darkColor="white" style={styles.line} />
            <View style={styles.buttonContainer}>
                {Platform.OS === "ios" ? (
                    <>
                        <SignInWithAppleButton />
                        <Text></Text>
                        <SignInWithGoogleButton />
                    </>
                ) : (
                    <SignInWithGoogleButton />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "left",
    },
    toolList: {
        fontSize: 16,
        marginBottom: 4,
    },
    CTA: {
        fontSize: 20,
    },
    line: {
        height: 1,
        width: "100%",
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "column",
        alignItems: "center",
    },
});
