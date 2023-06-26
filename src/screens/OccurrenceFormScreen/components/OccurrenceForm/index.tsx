import { InputComponent } from "../../../../components/InputComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { ButtonComponent } from "../../../../components/ButtonComponent";

import { confirmFormSchema } from "../../schema";
import { TextAreaComponent } from "../../../../components/TextAreaComponent";

type OccurrenceFormComponentProps = {
  onSubmit: (data: OccurrenceFormProps) => void;
};

export function OccurrenceFormComponent({ onSubmit }: OccurrenceFormComponentProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OccurrenceFormProps>({
    resolver: yupResolver(confirmFormSchema),
  });
  return (
    <>
      <Controller
        control={control}
        name="address"
        render={({ field: { onChange } }) => (
          <InputComponent
            label="Endereço"
            placeholder="Digite o endereço"
            errorMessage={errors.address?.message}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        control={control}
        name="cep"
        render={({ field: { onChange } }) => (
          <InputComponent
            label="CEP"
            placeholder="Digite o CEP"
            onChangeText={onChange}
            errorMessage={errors.cep?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="number"
        render={({ field: { onChange } }) => (
          <InputComponent
            label="Número"
            placeholder="Digite o número aproximado da ocorrência"
            onChangeText={onChange}
            errorMessage={errors.number?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="typeInformacao"
        render={({ field: { onChange } }) => (
          <InputComponent
            label="Tipo da ocorrência"
            placeholder="Escolha o tipo de ocorrência"
            onChangeText={onChange}
            errorMessage={errors.typeInformacao?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="detail"
        render={({ field: { onChange } }) => (
          <TextAreaComponent
            label="Detalhe da ocorrência"
            placeholder="Descreva a ocorrência"
            onChangeText={onChange}
            errorMessage={errors.detail?.message}
          />
        )}
      />
      <ButtonComponent title="Cadastrar" onPress={handleSubmit(onSubmit)} />
    </>
  );
}
