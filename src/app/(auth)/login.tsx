import SignInWithAppleButton from "@/components/auth/SignInWithAppleButton";
import SignInWithGoogleButton from "@/components/auth/SignInWithGoogleButton";
import { Platform, Text, View, StyleSheet } from 'react-native';

export default function Login() {
    if (Platform.OS === 'ios') {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        ExpoBase{'\n'}
                    </Text>
                    <View style={styles.line}></View>
                    <Text style={styles.paragraph}>
                        {'\n'}
                        This open-source template provides a solid foundation for developers to swiftly prototype, iterate, and launch their app.
                        {'\n'}{'\n'}Tools:
                    </Text>
                    <Text style={styles.toolList}>
                        {"\n"}⚡ Expo for mobile development
                        {"\n"}🔒 Authentication with Supabase (Apple and Google Auth)
                        {"\n"}🔐 AuthContext for handling authentication state
                        {"\n"}⚛️ React Native for building native apps using React
                        {"\n"}🔥 Type checking with TypeScript
                        {"\n"}📁 File-based routing with Expo Router
                        {"\n"}📏 Linter with ESLint
                        {"\n"}💖 Code Formatter with Prettier
                        {"\n"}🦺 Unit Testing with Jest and React Testing Library
                        {"\n"}💡 Absolute Imports using @ prefix
                        {"\n"}{"\n"}
                    </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.buttonContainer}>
                    <SignInWithAppleButton />
                    <Text>{"\n"}</Text>
                    <SignInWithGoogleButton />
                </View>
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        ExpoBase{'\n'}
                    </Text>
                    <View style={styles.line}></View>
                    <Text style={styles.paragraph}>
                        {'\n'}
                        This open-source template provides a solid foundation for developers to swiftly prototype, iterate, and launch their app.
                        {'\n'}{'\n'}Tools:
                    </Text>
                    <Text style={styles.toolList}>
                        {"\n"}⚡ Expo for mobile development
                        {"\n"}🔒 Authentication with Supabase (Apple and Google Auth)
                        {"\n"}🔐 AuthContext for handling authentication state
                        {"\n"}⚛️ React Native for building native apps using React
                        {"\n"}🔥 Type checking with TypeScript
                        {"\n"}📁 File-based routing with Expo Router
                        {"\n"}📏 Linter with ESLint
                        {"\n"}💖 Code Formatter with Prettier
                        {"\n"}🦺 Unit Testing with Jest and React Testing Library
                        {"\n"}💡 Absolute Imports using @ prefix
                        {"\n"}{"\n"}
                    </Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.buttonContainer}>
                    <SignInWithGoogleButton />
                </View>
            </View>
        );
    }
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
        textAlign: 'left',
    },
    toolList: {
        fontSize: 16,
    },
    paragraph: {
        fontSize: 24,
    },
    line: {
        height: 1,
        backgroundColor: 'black',
        width: '100%',
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
    },
});