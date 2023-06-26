import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Home from "../screens/Home";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import { View } from "react-native";
import OccurrenceFormScreen from "../screens/OccurrenceFormScreen";

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
          name="ConfirmFormScreen"
          component={OccurrenceFormScreen}
          options={{ headerShown: !!user, headerTitle: ""  }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
