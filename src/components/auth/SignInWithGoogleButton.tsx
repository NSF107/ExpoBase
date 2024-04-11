import { Text, StyleSheet, Pressable } from 'react-native';
import { performGoogleOAuth } from "@/config/authHandler";
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SignInWithGoogleButton() {
  const router = useRouter();
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };
  
  return (
    <Pressable  onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={() => performGoogleOAuth(router)} style={styles.button}>
      <Text style={[styles.text,{ color: isPressed ? 'grey' : 'white' }]}>Sign in with Google</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 5,
    width: 200,
    height: 64
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 64,
    fontWeight: '600'
  }
});