import { Text, View } from "@/components/theme/Themed";
import UpgradeNowButton from "@/components/upgrade/UpgradeNowButton";
import { Link } from 'expo-router';
import { StyleSheet } from "react-native";

export default function Modal() {
  
    return (
        <View style={styles.container}>
            <Text style={styles.upgradeText}>
                No ads.{'\n'}
                Offline access.{'\n'}
                $5.99/month.
            </Text>
            <Text>Cancel anytime. Restrictions apply{'\n'}{'\n'}</Text>
            <UpgradeNowButton />
            <Link href="..">
                <Text style={styles.link}>{'\n'}Dismiss</Text>
            </Link>
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
    upgradeText: {
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 20,
        alignItems: "center",
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
    link: {
        marginTop: 20,
        textDecorationLine: 'underline'
    }
});