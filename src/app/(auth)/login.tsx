import { StyleSheet } from "react-native";
import SignInWithAppleButton from "@/components/auth/SignInWithAppleButton";
import SignInWithGoogleButton from "@/components/auth/SignInWithGoogleButton";
import { Platform, Text, View } from 'react-native';

export default function Login() {
    if (Platform.OS === 'ios') {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ExpoBase: The free & open source React Native SaaS template</Text>
                <SignInWithAppleButton />
                <SignInWithGoogleButton />
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>ExpoBase: The free & open source React Native SaaS template</Text>
                <SignInWithGoogleButton />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});