import { Heading, Box, Image } from "native-base";
import VigiaUrbanoIcon from "../../../assets/images/vigia-urgano-icon.jpg";

type HeaderComponentProps = {
    user: User | null;
}

export function HeaderComponent({ user } : HeaderComponentProps){

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
        <Image source={VigiaUrbanoIcon} alt="Icon logo" />
      </Box>
    </Box>
  );
}
