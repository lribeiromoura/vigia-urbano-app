import {
  HStack,
  Spinner,
  ScrollView,
  View,
  FlatList,
  KeyboardAvoidingView,
} from "native-base";

import AuthContext from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useToast } from "native-base";

import { createOccurrence } from "../../services/OccurrenceServer";
import { HeaderComponent } from "../../components/HeaderComponent";
import { OccurrenceFormComponent } from "./components/OccurrenceForm";
import { LocationContext } from "../../context/LocationContext";

export default function OccurrenceFormScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const { setAddressLocation, setLocation } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (data: OccurrenceFormProps) => {
    try {
      setIsLoading(true);
      if (!user) return;
      const userCredential = await createOccurrence({
        ...data,
        uid: user.uid,
      });
      if (userCredential) {
        toast.show({
          title: "Ocorrência criada com sucesso.",
          description: "Qualquer dúvida entraremos em contato.",
        });
        setLocation(null);
        setAddressLocation(null);
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

  const renderItem = () => (
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View px={10} backgroundColor="#fff">
          <HeaderComponent user={user} navigation={navigation} />
          <OccurrenceFormComponent onSubmit={onSubmit} isLoading={isLoading} />
          {isLoading && (
            <HStack space={8} justifyContent="center" alignItems="center">
              <Spinner size="lg" color="indigo.600" />
            </HStack>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  return (
    <FlatList
      flex={1}
      backgroundColor="#fff"
      data={[{}]} // Não temos dados reais para renderizar, então passamos um array vazio
      renderItem={renderItem} // O que queremos renderizar
      keyExtractor={(item, index) => index.toString()} // Cada item precisa de uma chave única
    />
  );
}
