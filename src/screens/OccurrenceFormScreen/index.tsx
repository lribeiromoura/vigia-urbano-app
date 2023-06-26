import { VStack, Center, HStack, Spinner, Box } from "native-base";

import AuthContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useToast } from "native-base";

import { createOccurrence } from "../../services/OccurrenceServer";
import { HeaderComponent } from "../../components/HeaderComponent";
import { OccurrenceFormComponent } from "./components/OccurrenceForm";

export default function OccurrenceFormScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onSubmit = async (data: OccurrenceFormProps) => {
    try {
      setIsLoading(true);
      const userCredential = await createOccurrence(data);
      if (userCredential) {
        toast.show({
          title: "Ocorrência criada com sucesso.",
          description: "Qualquer dúvida entraremos em contato.",
        });
        navigation.navigate("Home");
      } else {
        toast.show({
          title: "Erro ao criar ocorrência.",
          description:
            "Verifique se todos os campos foram preenchidos corretamente.",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack flex={1} px={10} backgroundColor="#fff">
      <HeaderComponent user={user} />
      <Center>
        <Box display="flex" width="100%" justifyContent="space-between">
          <OccurrenceFormComponent onSubmit={onSubmit} />
        </Box>
      </Center>
      {isLoading && (
        <HStack space={8} justifyContent="center" alignItems="center">
          <Spinner size="lg" color="indigo.600" />
        </HStack>
      )}
    </VStack>
  );
}
