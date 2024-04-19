import { Text, View } from "@/components/theme/Themed";
import { Link } from 'expo-router';
import { StyleSheet } from "react-native";

import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

// Display current offering
// export default function Paywall() {
  
//     return (
//         <View style={styles.container}>
//             <View style={{ flex: 1 }}>
//                 <RevenueCatUI.Paywall />
//             </View>
//             <Link href="..">
//                 <Text style={styles.link}>{'\n'}Dismiss</Text>
//             </Link>
//         </View>
//     );
// }

export async function presentPaywall(): Promise<boolean> {
    // Present paywall for current offering:
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywall();

    switch (paywallResult) {
        case PAYWALL_RESULT.NOT_PRESENTED:
        case PAYWALL_RESULT.ERROR:
        case PAYWALL_RESULT.CANCELLED:
            return false;
        case PAYWALL_RESULT.PURCHASED:
        case PAYWALL_RESULT.RESTORED:
            return true;
        default:
            return false;
    }
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
