import React, { useEffect, useState, useRef } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { db } from "../firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function ChatScreen({ route }) {
  const { groupId, currentUser } = route.params;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const listRef = useRef();

  useEffect(() => {
    const q = query(collection(db, "groups", groupId, "messages"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, snap => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(arr);
    });
    return () => unsub();
  }, [groupId]);

  const send = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, "groups", groupId, "messages"), {
      text,
      senderId: currentUser.uid,
      createdAt: serverTimestamp()
    });
    setText("");
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.container}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <View style={[styles.msg, item.senderId === currentUser.uid ? styles.self : null]}>
              <Text style={{ fontWeight: "600" }}>{item.senderId === currentUser.uid ? "Moi" : item.senderId}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />
        <View style={styles.inputRow}>
          <TextInput style={styles.input} placeholder="Message..." value={text} onChangeText={setText} />
          <Button title="Envoyer" onPress={send} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  msg: { padding: 8, borderRadius: 8, backgroundColor: "#eee", marginVertical: 4 },
  self: { backgroundColor: "#d1ffd6", alignSelf: "flex-end" },
  inputRow: { flexDirection: "row", alignItems: "center", paddingTop: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginRight: 8 }
});
