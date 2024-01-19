import { Box, Text } from "native-base";

type OccurrenceCardComponentProps = {
  occurrence: OccurrenceProps;
};

export default function OccurrenceCardComponent({
  occurrence,
}: OccurrenceCardComponentProps) {
  return (
    <Box
      borderWidth={1}
      minHeight={480}
      style={{
        elevation: 5,
        backgroundColor: "#FAFAFA",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 7,
      }}
      borderRadius={8}
      padding={4}
      marginBottom={8}
    >
      <Text fontSize={20} fontWeight="bold">
        {occurrence.occurrenceId}
      </Text>
      <Box marginTop={4}>
        <Text fontSize={18} fontWeight="bold">
          Endereço
        </Text>
        <Text fontSize={18} fontWeight="light">
          {occurrence.address}
        </Text>
      </Box>
      <Box marginTop={4}>
        <Text fontSize={18} fontWeight="bold">
          CEP
        </Text>
        <Text fontSize={18} fontWeight="light">
          {occurrence.cep}
        </Text>
      </Box>
      <Box marginTop={4}>
        <Text fontSize={18} fontWeight="bold">
          Número
        </Text>
        <Text fontSize={18} fontWeight="light">
          {occurrence.number}
        </Text>
      </Box>
      <Box marginTop={4}>
        <Text fontSize={18} fontWeight="bold">
          Tipo de ocorrência
        </Text>
        <Text fontSize={18} fontWeight="light">
          {occurrence.typeInformacao}
        </Text>
      </Box>
      <Box marginTop={4}>
        <Text fontSize={18} fontWeight="bold">
          Detalhes
        </Text>
        <Text fontSize={18} fontWeight="light">
          {occurrence.detail}
        </Text>
      </Box>
    </Box>
  );
}
