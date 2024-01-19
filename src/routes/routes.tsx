import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";

import AuthContext from "../context/AuthContext";
import OccurrenceFormScreen from "../screens/OccurrenceFormScreen";
import OccurrencesScreen from "../screens/Occurrences";

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "Home" : "SignIn"}>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: !!user }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: !user, headerTitle: "" }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: !user }}
          />
          <Stack.Screen
            name="OccurrenceFormScreen"
            component={OccurrenceFormScreen}
            options={{ headerShown: !!user, headerTitle: "" }}
          />
          <Stack.Screen
            name="OccurrenceScreen"
            component={OccurrencesScreen}
            options={{ headerShown: !!user, headerTitle: "" }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
