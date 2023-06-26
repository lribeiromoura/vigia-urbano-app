import { Input, IInputProps, FormControl } from "native-base";

type InputComponentProps = IInputProps & {
  errorMessage?: string | null;
  label?: string | null;
};

export function InputComponent({
  errorMessage = null,
  isInvalid,
  label,
  ...props
}: InputComponentProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl mb={4} isInvalid={invalid}>
      {label ? <FormControl.Label>{label}</FormControl.Label> : ""}
      <Input
        bg="gray.50"
        fontSize="md"
        h={16}
        isInvalid={invalid}
        _focus={{
          bg: "gray.100",
          borderWidth: 2,
          borderColor: "gray.100",
        }}
        _invalid={{
          borderWidth: 2,
          borderColor: "red.500",
        }}
        {...props}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
