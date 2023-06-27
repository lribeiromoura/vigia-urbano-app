import { Box, VStack } from "native-base";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { logoutUser } from "../../services/AuthService";
import { ButtonComponent } from "../../components/ButtonComponent";
import { useToast } from "native-base";
import { LocationProvider } from "../../context/LocationContext";
import { HeaderComponent } from "../../components/HeaderComponent";
import { MapComponent } from "./Components/MapComponent";

export default function Home({ navigation }: any) {
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const log = await logoutUser();
      if (log) {
        setUser(null);
        navigation.navigate("SignIn");
        setIsLoading(false);
        toast.show({
          title: "Logout realizado",
          description: "Você fez logout.",
        });
      }
    } catch (error) {
      toast.show({
        title: "Erro ao realizar logout.",
        description: "Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
