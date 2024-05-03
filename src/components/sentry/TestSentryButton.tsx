import * as Sentry from "@sentry/react-native";
import { UserFeedback } from "@sentry/react-native";
import { useState } from "react";
import { Alert, Modal, StyleSheet, useColorScheme } from "react-native";

import { Text, View, Button, TextInput } from "@/components/theme/Themed";
import { useAuth } from "@/context/AuthProvider";

/**
 * Function to report feedback to Sentry with user comments on submission of the modal form
 * @param comments
 */
function ReportFeedbackToSentry(comments: string, user: any) {
    try {
        throw new Error("New Sentry issue!");
    } catch (error) {
        const sentryID = Sentry.captureException(error);
        const userFeedback: UserFeedback = {
            event_id: sentryID,
            name: user?.user_metadata.name,
            email: user?.email,
            comments,
        };

        Sentry.captureUserFeedback(userFeedback);
    }
}

/**
 * Function to show how to use Sentry in a button component to report user feedback
 * remove this function if you don't want to use it
 * @returns
 */
export default function TestSentryButton() {
    const [isPressed, setIsPressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [comments, setComments] = useState<string>("");
    const colorScheme = useColorScheme();
    const { user } = useAuth();

    return (
        <View>
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View
                        style={{
                            margin: 20,
                            borderRadius: 20,
                            padding: 35,
                            alignItems: "center",
                            shadowColor:
                                colorScheme === "dark" ? "#fff" : "#000", // Set shadow color based on theme
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <Text style={styles.modalText}>Report an issue:</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Enter your comments here"
                            onChangeText={(text) => setComments(text)}
                        />
                        <Text>{"\n"}</Text>
                        <View style={styles.modalButtons}>
                            <Button
                                lightColor="black"
                                darkColor="white"
                                style={styles.button}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    ReportFeedbackToSentry(comments, user);
                                }}
                            >
                                <Text
                                    lightColor={isPressed ? "grey" : "white"}
                                    darkColor={isPressed ? "grey" : "black"}
                                    style={styles.buttonText}
                                >
                                    Submit
                                </Text>
                            </Button>
                            <Button
                                lightColor="black"
                                darkColor="white"
                                style={styles.button}
                                onPress={() => {
                                    setModalVisible(false); // Close the modal
                                }}
                            >
                                <Text
                                    lightColor={isPressed ? "grey" : "white"}
                                    darkColor={isPressed ? "grey" : "black"}
                                    style={styles.buttonText}
                                >
                                    Cancel
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Button
                onPress={() => {
                    setModalVisible(true);
                    setIsPressed(true);
                }}
                onPressOut={() => setIsPressed(false)}
                lightColor="black"
                darkColor="white"
                style={styles.button}
            >
                <Text
                    lightColor={isPressed ? "grey" : "white"}
                    darkColor={isPressed ? "grey" : "black"}
                    style={styles.buttonText}
                >
                    Report an Error!
                </Text>
            </Button>
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
        marginRight: 10,
    },
    modalButtons: {
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 24,
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
    },
});
