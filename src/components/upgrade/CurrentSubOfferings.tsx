// import React, { useEffect, useState } from 'react';
// import { Platform } from 'react-native';
// import { View, Text } from '@/components/theme/Themed';
// import Purchases, { PurchasesOffering } from 'react-native-purchases';

// const APIKeys = {
//   apple: process.env.RC_IOS_KEY || "RC_IOS_KEY",
//   google: process.env.RC_ANDROID_KEY || "RC_ANDROID_KEY",
// };

// export default function CurrentSubOfferings() {
//   const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null);

//   useEffect(() => {
//     const setup = async () => {
//       if (Platform.OS == "android") {
//         Purchases.configure({ apiKey: APIKeys.google });
//       } else {
//         Purchases.configure({ apiKey: APIKeys.apple });
//       }
      
//       const offerings = await Purchases.getOfferings();
//       setCurrentOffering(offerings.current);
//     };

//     // Purchases.setDebugLogsEnabled(true);

//     setup()
//       .catch(console.log);
//   }, []);

//   if (!currentOffering) {
//     return <Text>Loading...</Text>;
//   } else {
//     return (
//       <View>
//         <Text>Current Offering: {currentOffering.identifier}</Text>
//         <Text>Package Count: {currentOffering.availablePackages.length}</Text>
//         {
//           currentOffering.availablePackages.map((pkg) => {
//             return <Text>{ pkg.product.identifier }</Text>
//           })
//         }
//       </View>
//     );
//   }
// }

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

// import { StyleSheet } from "react-native";

import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";

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

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 20,
//     },
//     button: {
//       alignItems: "center",
//       justifyContent: "center",
//       paddingVertical: 12,
//       paddingHorizontal: 32,
//       borderRadius: 4,
//       elevation: 3,
//     },
//     text: {
//         fontSize: 16,
//         lineHeight: 21,
//         fontWeight: "bold",
//         letterSpacing: 0.25,
//     },
//     upgradeText: {
//         fontSize: 36,
//         fontWeight: "bold",
//         marginBottom: 20,
//         alignItems: "center",
//     },
//     image: {
//         flex: 1,
//         width: '100%',
//         backgroundColor: '#0553',
//     },
//     link: {
//         marginTop: 20,
//         textDecorationLine: 'underline'
//     }
// });
