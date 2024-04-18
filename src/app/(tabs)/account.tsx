import { StyleSheet } from "react-native";
import SignOutButton from "@/components/auth/SignOutButton";
import { View, Text } from "@/components/theme/Themed";
import UpgradeButton from "@/components/upgrade/UpgradeButton";
import ProfileDetails from "@/components/profile/ProfileDetails";

export default function Account() {
    return (
        <View style={styles.container}>
            <ProfileDetails />
            <Text>{"\n"}</Text>
            <UpgradeButton />
            <Text>{"\n"}</Text>
            <SignOutButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    }
});
