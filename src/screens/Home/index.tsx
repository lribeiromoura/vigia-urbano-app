import { Box, VStack } from "native-base";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { ButtonComponent } from "../../components/ButtonComponent";
import { useToast } from "native-base";
import { HeaderComponent } from "../../components/HeaderComponent";
import { MapComponent } from "./Components/MapComponent";

export default function Home({ navigation }: any) {
  const { user } = useContext(AuthContext);

  const toast = useToast();

  const handleConfirm = () => {
<<<<<<< Updated upstream
    navigation.navigate("OccurrenceFormScreen");
=======
    navigation.navigate("ConfirmFormScreen");
>>>>>>> Stashed changes
  };

  return (
    <>
      <VStack backgroundColor="#fff" px={10} paddingTop="40px">
        <HeaderComponent user={user} navigation={navigation}/>
      </VStack>
<<<<<<< Updated upstream
      <MapComponent handleConfirm={handleConfirm} />
    </>
=======
      <MapComponent />
      <Box
        justifyContent="center"
        alignItems="center"
        padding={10}
        style={{
          position: "absolute",
          bottom: 24,
          width: "100%",
        }}
      >
        <ButtonComponent title="Confirmar" onPress={handleConfirm} />
      </Box>
    </LocationProvider>
>>>>>>> Stashed changes
  );
}
