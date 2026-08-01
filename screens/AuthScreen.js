import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      Alert.alert("Erreur", e.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      Alert.alert("Erreur", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prototype Chat</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={styles.row}>
        <Button title="Se connecter" onPress={login} />
        <Button title="S'inscrire" onPress={register} />
      </View>
      <Text style={styles.note}>Utilise un email valide pour tester.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginVertical: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center", marginBottom: 16 },
  note: { marginTop: 20, textAlign: "center", color: "#666" }
});
