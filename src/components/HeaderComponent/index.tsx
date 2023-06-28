import { Heading, Box, Image, Pressable } from "native-base";
import VigiaUrbanoIcon from "../../../assets/images/vigia-urgano-icon.jpg";

type HeaderComponentProps = {
  user: User | null;
  navigation: any;
};

export function HeaderComponent({ user, navigation }: HeaderComponentProps) {
  const handleNavigate = () => {
    navigation.navigate("OccurrenceScreen");
  };
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading my={4} fontSize="3xl">
          {user?.displayName}
        </Heading>
        <Pressable onPress={handleNavigate}>
          <Image source={VigiaUrbanoIcon} alt="Icon logo" />
        </Pressable>
      </Box>
    </Box>
  );
}
