import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function CallScreen({ route }) {
  const { roomName } = route.params;
  const jitsiUrl = `https://meet.jit.si/${roomName}#config.prejoinPageEnabled=false`;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: jitsiUrl }} startInLoadingState javaScriptEnabled />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});
