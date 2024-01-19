import { useContext, useState } from "react";
import {
  VStack,
  Center,
  Heading,
  Pressable,
  Icon,
  Image,
  HStack,
  Spinner,
  useToast,
  KeyboardAvoidingView,
  ScrollView,
} from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";

import { InputComponent } from "../../components/InputComponent";
import { ButtonComponent } from "../../components/ButtonComponent";

import AuthContext from "../../context/AuthContext";
import VigiaLogo from "../../../assets/images/vigia-urbano-logo.png";

import { signInSchema } from "./schema";

type FormDataProps = {
  email: string;
  password: string;
};

export default function SignIn({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  });

  const { setUser } = useContext(AuthContext);
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormDataProps) => {
    setIsLoading(true);
    try {
      // const userCredential = await getUserService(data.email, data.password);
      // if (userCredential) {
      //   setUser(userCredential.user);
      //   navigation.navigate("Home");
      // }
    } catch (error) {
      toast.show({
        title: "Erro ao realizar login.",
        description: "Usuário ou senha inválido.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"      
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack flex={1} px={10} backgroundColor="#fff">
          <Center marginTop={50}>
            <Heading>
              <Image source={VigiaLogo} alt="Logo" />
            </Heading>

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange } }) => (
                <InputComponent
                  label="Email"
                  placeholder="Digite o email cadastrado"
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <InputComponent
                  label="Senha"
                  placeholder="Digite a senha"
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  type={showPassword ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={
                              showPassword ? "visibility" : "visibility-off"
                            }
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
              )}
            />
            <ButtonComponent title="Entrar" onPress={handleSubmit(onSubmit)} />

            <ButtonComponent
              title="Cadastrar"
              contrast={true}
              onPress={onSignUpPressed}
              style={{
                marginTop: 20,
              }}
            />
          </Center>
          {isLoading && (
            <HStack space={8} justifyContent="center" alignItems="center">
              <Spinner size="lg" color="indigo.600" />
            </HStack>
          )}
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
