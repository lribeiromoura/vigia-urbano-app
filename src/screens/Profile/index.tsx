import { useContext } from "react";
import { View } from "react-native";
import { Container, Card, Text, VStack } from "native-base";
import { HeaderComponent } from "../../components/HeaderComponent";
import AuthContext from "../../context/AuthContext";

export function ProfileScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  return (
    <VStack backgroundColor="#fff" px={10} paddingTop="10px">
      <HeaderComponent user={user} navigation={navigation} />
    </VStack>
  );
}
