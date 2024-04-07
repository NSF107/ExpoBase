import { View, Text, Pressable } from "react-native";

export default function Accout() {
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Account</Text>
      {/* <Text>{ user && user.name }</Text> */}
      <Text>Log out</Text>
      {/* <Pressable onPress={() => setUser(null)}>
        <Text>Log out</Text>
      </Pressable> */}
    </View>
  );
}