import { useState } from "react";
import { StyleSheet } from "react-native";

import { Text, Button } from "@/components/theme/Themed";
import { presentPaywall } from "@/components/upgrade/CurrentSubOfferings";

export default function UpgradeButton(props: any) {
    const { title = "Upgrade Account" } = props;
    const [isPressed, setIsPressed] = useState(false);
    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <Button
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
                presentPaywall();
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
                {title}
            </Text>
        </Button>
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
