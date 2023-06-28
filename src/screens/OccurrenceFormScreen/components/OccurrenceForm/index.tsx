import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputComponent } from "../../../../components/InputComponent";
import { ButtonComponent } from "../../../../components/ButtonComponent";
import { TextAreaComponent } from "../../../../components/TextAreaComponent";

import { confirmFormSchema } from "../../schema";
import { useContext, useEffect } from "react";
import { LocationContext } from "../../../../context/LocationContext";
import { Select } from "native-base";
import { SelectComponent } from "../../../../components/SelectComponent";

type OccurrenceFormComponentProps = {
  onSubmit: (data: OccurrenceFormProps) => void;
  isLoading: boolean;
};

const OccurrenceTypes = [
  "Buracos na rua ou calçada",
  "Iluminação pública defeituosa",
  "Acúmulo de lixo ou entulho",
  "Vandalismo (grafite, danos ao patrimônio público, etc.)",
  "Calçadas danificadas ou obstruídas",
  "Falta de acessibilidade para deficientes",
  "Sinalização de trânsito danificada ou ausente",
  "Vegetação excessiva ou mal cuidada em espaços públicos",
  "Problemas de esgoto ou drenagem",
  "Construções irregulares ou ilegais",
  "Ruído excessivo (devido a construções, tráfego, eventos, etc.)",
  "Poluição do ar",
  "Poluição da água (rios, lagos, etc.)",
  "Infestação de pragas (ratos, pombos, insetos, etc.)",
  "Problemas com equipamentos públicos (bancos quebrados, parques destruídos, etc.)",
];

export function OccurrenceFormComponent({
  onSubmit,
  isLoading,
}: OccurrenceFormComponentProps) {
  const { addressLocation } = useContext(LocationContext);
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
        defaultValue={(addressLocation && addressLocation.street) || ""}
        render={({ field: { onChange, value } }) => (
          <InputComponent
            label="Endereço"
            placeholder="Digite o endereço"
            errorMessage={errors.address?.message}
            onChangeText={onChange}
            value={value}
            isDisabled={!!(addressLocation && addressLocation.street)}
          />
        )}
      />
      <Controller
        control={control}
        name="cep"
        defaultValue={(addressLocation && addressLocation.postalCode) || ""}
        render={({ field: { onChange, value } }) => (
          <InputComponent
            label="CEP"
            placeholder="Digite o CEP"
            value={value}
            onChangeText={onChange}
            errorMessage={errors.cep?.message}
            isDisabled={addressLocation?.postalCode !== undefined}
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
        render={({ field: { onChange, value } }) => (
          <SelectComponent
            selectedValue={value}
            onValueChange={onChange}
            label="Tipo de ocorrência"
            placeholder="Selecione uma opção"
            options={OccurrenceTypes}
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
      <ButtonComponent title="Cadastrar" onPress={handleSubmit(onSubmit)} disabled={isLoading} />
    </>
  );
}
