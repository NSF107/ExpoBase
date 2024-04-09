import { View, Text, Pressable } from "react-native";
import SignOutButton from "@/components/auth/SignOutButton";

export default function Accout() {
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Account</Text>
      <SignOutButton />
    </View>
  );
}