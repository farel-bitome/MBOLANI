import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from "react-native";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc, query, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function GroupListScreen({ navigation, currentUser }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "groups"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setGroups(arr);
    });
    return () => unsub();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Groupes</Text>
        <Button title="Nouveau" onPress={() => navigation.navigate("CreateGroup", { currentUser })} />
      </View>
      <FlatList
        data={groups}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate("Chat", { groupId: item.id, currentUser })}>
            <Text style={styles.groupName}>{item.name}</Text>
            <View style={styles.actions}>
              <Button title="Appeler" onPress={() => navigation.navigate("Call", { roomName: item.id })} />
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={{ marginTop: 16 }}>
        <Button title="Se déconnecter" color="red" onPress={() => signOut(auth)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "700" },
  row: { padding: 12, borderRadius: 8, backgroundColor: "#f2f2f2", marginBottom: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  groupName: { fontSize: 16 },
  actions: { flexDirection: "row" }
});
