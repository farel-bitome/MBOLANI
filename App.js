import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import AuthScreen from "./screens/AuthScreen";
import GroupListScreen from "./screens/GroupListScreen";
import CreateGroupScreen from "./screens/CreateGroupScreen";
import ChatScreen from "./screens/ChatScreen";
import CallScreen from "./screens/CallScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Groups">
              {(props) => <GroupListScreen {...props} currentUser={user} />}
            </Stack.Screen>
            <Stack.Screen name="CreateGroup">
              {(props) => <CreateGroupScreen {...props} currentUser={user} />}
            </Stack.Screen>
            <Stack.Screen name="Chat">
              {(props) => <ChatScreen {...props} currentUser={user} />}
            </Stack.Screen>
            <Stack.Screen name="Call" component={CallScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
