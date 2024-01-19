import { useContext, useState } from "react";
import {
  VStack,
  Center,
  Heading,
  HStack,
  Spinner,
  Image,
  Box,
  Pressable,
  Icon,
  ScrollView,
  useToast,
  KeyboardAvoidingView,
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialIcons } from "@expo/vector-icons";

import { InputComponent } from "../../components/InputComponent";
import { ButtonComponent } from "../../components/ButtonComponent";

import AuthContext from "../../context/AuthContext";

import { signUpSchema } from "./schema";

import { createUserService } from "../../services/AuthService";

import VigiaUrbanoIcon from "../../../assets/images/vigia-urgano-icon.jpg";

export default function SignUp({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const { setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const onSubmit = async (data: FormDataProps) => {
    try {
      setIsLoading(true);
      const userCredential = await createUserService(data);
      if (userCredential) {
        setUser(userCredential.user);
        navigation.navigate("Home");
      } else {
        toast.show({
          title: "Erro ao criar usuário.",
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack flex="1" px={10} backgroundColor="#fff" w="100%">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading my={4} fontSize="3xl">
              Cadastro
            </Heading>
            <Image source={VigiaUrbanoIcon} alt="Icon logo" />
          </Box>
          <Center>
            <Box display="flex" width="100%" justifyContent="space-between">
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange } }) => (
                  <InputComponent
                    label="Nome"
                    placeholder="Digite seu nome"
                    errorMessage={errors.name?.message}
                    onChangeText={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="CPF"
                render={({ field: { onChange } }) => (
                  <InputComponent
                    label="CPF"
                    placeholder="Digite seu CPF"
                    onChangeText={onChange}
                    errorMessage={errors.CPF?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange } }) => (
                  <InputComponent
                    label="Email"
                    placeholder="Digite seu e-mail"
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
                    placeholder="Digite sua senha"
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
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange } }) => (
                  <InputComponent
                    label="Confirme sua senha"
                    placeholder="Digite novamente a senha"
                    onChangeText={onChange}
                    errorMessage={errors.confirmPassword?.message}
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
              <ButtonComponent
                title="Cadastrar"
                onPress={handleSubmit(onSubmit)}
              />
            </Box>
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
