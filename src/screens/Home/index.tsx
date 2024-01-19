import { Box, VStack } from "native-base";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { logoutUser } from "../../services/AuthService";
import { ButtonComponent } from "../../components/ButtonComponent";
import { useToast } from "native-base";
import { HeaderComponent } from "../../components/HeaderComponent";
import { MapComponent } from "./Components/MapComponent";

export default function Home({ navigation }: any) {
  const { user } = useContext(AuthContext);

  const toast = useToast();

  const handleConfirm = () => {
    navigation.navigate("OccurrenceFormScreen");
  };

  return (
    <>
      <VStack backgroundColor="#fff" px={10} paddingTop="40px">
        <HeaderComponent user={user} navigation={navigation}/>
      </VStack>
      <MapComponent handleConfirm={handleConfirm} />
    </>
  );
}
