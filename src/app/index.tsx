import { Redirect } from "expo-router";
import * as Updates from "expo-updates";
import { useEffect } from "react";

// When a user loads your app and an update is detected, it will be automatically downloaded for them on a refresh.
async function onFetchUpdateAsync() {
    try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
            await Updates.fetchUpdateAsync();
            await Updates.reloadAsync();
        }
    } catch (error) {
        // You can also add an alert() here if needed for your purposes
        console.log(`Error fetching latest Expo update: ${error}`);
    }
}

const Index = () => {
    // Check for updates when the app is loaded (only in non-development mode)
    useEffect(() => {
        if (!__DEV__) {
            onFetchUpdateAsync();
        }
    }, []);

    return <Redirect href="/login" />; // Redirect to the login page.
};
export default Index;
