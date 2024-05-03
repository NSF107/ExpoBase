import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";

import { View, Text, TextInput, Button } from "@/components/theme/Themed";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabaseClient";

export default function ProfileDetails() {
    const { user, session } = useAuth();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const [subscription, setSubscription] = useState<string | null>(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isPressed, setIsPressed] = useState(false);
    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    useEffect(() => {
        let ignore = false;
        async function getProfile() {
            setLoading(true);

            const { data, error } = await supabase
                .from("profiles")
                .select(`username, subscription, avatar_url`)
                .eq("id", user?.id)
                .single();

            if (!ignore) {
                if (error) {
                    console.warn(error);
                } else if (data) {
                    setUsername(data.username);
                    setSubscription(data.subscription);
                    setAvatarUrl(data.avatar_url);
                }
            }

            setLoading(false);
        }

        getProfile();

        return () => {
            ignore = true;
        };
    }, [user?.id]);

    async function updateProfile() {
        setLoading(true);

        const updates = {
            id: user?.id,
            username,
            subscription,
            avatar_url: avatarUrl,
            updated_at: new Date(),
        };

        const { error } = await supabase.from("profiles").upsert(updates);

        if (error) {
            alert(error.message);
        } else {
            setAvatarUrl(avatarUrl);
        }
        setLoading(false);
    }

    return (
        <View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>{"\n"}Profile Picture</Text>
                <Image
                    source={{
                        uri: avatarUrl || "https://i.pravatar.cc/150?img=3",
                    }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.inputReadOnly}
                    value={session?.user?.email ?? "Unknown"}
                    editable={false}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Auth Provider</Text>
                <TextInput
                    style={styles.inputReadOnly}
                    value={session?.user?.app_metadata?.provider ?? "Unknown"}
                    editable={false}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Display Name</Text>
                <TextInput
                    style={styles.inputReadOnly}
                    value={session?.user?.user_metadata?.full_name ?? "Unknown"}
                    editable={false}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>My Subscription</Text>
                <TextInput
                    style={styles.inputReadOnly}
                    value={subscription ?? "Free"}
                    editable={false}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username ?? "Unknown"}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <Button
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={updateProfile}
                disabled={loading}
                lightColor="black"
                darkColor="white"
                style={styles.button}
            >
                <Text
                    lightColor={isPressed ? "grey" : "white"}
                    darkColor={isPressed ? "grey" : "black"}
                    style={styles.text}
                >
                    {loading ? "Loading..." : "Update Profile"}
                </Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
    },
    inputReadOnly: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
        color: "grey",
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
});
