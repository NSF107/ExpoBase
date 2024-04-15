import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';

//...

export default function Paywall () {

    // Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
       Purchases.configure({apiKey: "appl_WXZehsaRksZxZcIZIWGRlOUhHlm"});
       console.log("iOS");
    } else if (Platform.OS === 'android') {
       Purchases.configure({apiKey: "goog_GibctDPxqJMINYDmujDPqDxslqH"});
    }
}