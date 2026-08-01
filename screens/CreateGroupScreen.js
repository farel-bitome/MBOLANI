import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore";

export default function CreateGroupScreen({ navigation, route }) {
  const { currentUser } = route.params;
  const [name, setName] = useState("");

  const createGroup = async () => {
    if (!name.trim()) return Alert.alert("Nom requis");
    const groupsRef = collection(db, "groups");
    const gDoc = await addDoc(groupsRef, {
      name,
      createdBy: currentUser.uid,
      createdAt: serverTimestamp()
    });
    // add member
    await setDoc(doc(db, "groups", gDoc.id, "members", currentUser.uid), {
      role: "owner",
      joinedAt: serverTimestamp(),
      displayName: currentUser.email || null
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nom du groupe" value={name} onChangeText={setName} />
      <Button title="Créer" onPress={createGroup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginBottom: 12 }
});
