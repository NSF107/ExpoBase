import { useRouter } from "expo-router";
import { Pressable, Text, StyleSheet } from "react-native";

import { signOut } from "@/config/authHandler";

export default function SignOutButton(props: any) {
    const router = useRouter();
    const { title = "Sign Out" } = props;

    return (
        <Pressable style={styles.button} onPress={() => signOut(router)}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});
