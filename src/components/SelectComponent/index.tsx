import { ISelectProps, FormControl, Select } from "native-base";

type SelectComponentProps = ISelectProps & {
  errorMessage?: string | null;
  label?: string | null;
  options: string[];
};

export function SelectComponent({
  errorMessage = null,
  label,
  options,
  ...props
}: SelectComponentProps) {
  const invalid = !!errorMessage;
  return (
    <FormControl mb={4} isRequired isInvalid={invalid}>
      {label ? <FormControl.Label>{label}</FormControl.Label> : null}
      <Select
        selectedValue={props.selectedValue}
        onValueChange={props.onValueChange}
        bg="gray.50"
        fontSize="md"
        h={16}
        {...props}
      >
        {options.map((option: any) => (
          <Select.Item key={option} label={option} value={option} />
        ))}
      </Select>
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  );
}
