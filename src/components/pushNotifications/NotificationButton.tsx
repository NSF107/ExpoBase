import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, Platform } from "react-native";

import { Text, Button, View } from "@/components/theme/Themed";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

/**
 * Send a push notification to the user
 * @param expoPushToken
 * @param sound
 * @param title
 * @param body
 * @param data
 */
async function sendPushNotification(
    expoPushToken: string,
    sound: string,
    title: string,
    body: string,
    data: { [key: string]: string },
) {
    const message = {
        to: expoPushToken,
        sound,
        title,
        body,
        data,
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    });
}

function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            handleRegistrationError(
                "Permission not granted to get push token for push notification!",
            );
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError("Project ID not found");
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(pushTokenString);
            return pushTokenString;
        } catch (e: unknown) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError(
            "Must use physical device for push notifications",
        );
    }
}

export default function SendNotificationButton() {
    const [isPressed, setIsPressed] = useState(false);

    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >(undefined);
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token) => setExpoPushToken(token ?? ""))
            .catch((error: any) => setExpoPushToken(`${error}`));

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                },
            );

        return () => {
            notificationListener.current &&
                Notifications.removeNotificationSubscription(
                    notificationListener.current,
                );
            responseListener.current &&
                Notifications.removeNotificationSubscription(
                    responseListener.current,
                );
        };
    }, []);

    return (
        <View>
            <Text>Here is your Expo push token: {expoPushToken}</Text>
            <Button
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                onPress={async () => {
                    await sendPushNotification(
                        expoPushToken,
                        "default",
                        "Hello!",
                        "This is a push notification sent from the ExpoBase app",
                        {},
                    );
                }}
                lightColor="black"
                darkColor="white"
                style={styles.button}
            >
                <Text
                    lightColor={isPressed ? "grey" : "white"}
                    darkColor={isPressed ? "grey" : "black"}
                    style={styles.text}
                >
                    Press me to send a push notification
                </Text>
            </Button>
        </View>
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
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
});
