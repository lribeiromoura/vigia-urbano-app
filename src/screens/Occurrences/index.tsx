import { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  ScrollView,
  HStack,
  Spinner,
} from "native-base";
import AuthContext from "../../context/AuthContext";
import { getOccurrenceByUser } from "../../services/OccurrenceServer";
import OccurrenceCardComponent from "../../components/OccurrenceCardComponent";

export default function OccurrencesScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [occurrences, setOccurrences] = useState<OccurrenceProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async () => {
    setLoading(true);
    if (user) {
      const data = await getOccurrenceByUser(user);
      setOccurrences(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <VStack backgroundColor="#fff" height="100%" px={10} paddingTop="10px">
        <Heading my={4} fontSize="3xl">
          {user?.displayName}
        </Heading>
        <Box marginBottom={25}>
          <Text fontWeight="bold" fontSize={21}>
            Minhas ocorrências
          </Text>
        </Box>
        {loading ? (
          <HStack
            space={8}
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="lg" color="indigo.600" />
          </HStack>
        ) : (
          occurrences.map((occurrence) => (
            <OccurrenceCardComponent
              key={occurrence.occurrenceId}
              occurrence={occurrence}
            />
          ))
        )}
      </VStack>
    </ScrollView>
  );
}
