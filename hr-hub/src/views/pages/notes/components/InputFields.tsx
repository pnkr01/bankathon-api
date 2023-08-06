import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    TextareaProps
} from "@chakra-ui/react";

type InputProps = {
    label: string;
    placeholder?: string;
    value: string | number;
    onChange: (value: string) => void;
    isDisabled?: boolean;
    isRequired?: boolean;
};

type TextAreaInputProps = InputProps & Pick<TextareaProps,"height">

export function TextInput({
    label,
    onChange,
    value,
    isDisabled,
    isRequired,
    placeholder,
}: InputProps) {
    return (
        <FormControl isRequired={isRequired}>
            <VStack gap="1px" alignItems={"flex-start"}>
                <FormLabel color="gray.400" fontSize={"sm"}>
                    {label}
                </FormLabel>
                <Input
                    size="sm"
                    width={"full"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    borderColor="gray.400"
                    placeholder={placeholder || label}
                    focusBorderColor="gray.400"
                    rounded="md"
                    disabled={isDisabled}
                />
            </VStack>
        </FormControl>
    );
}

export function TextAreaInput({
    label,
    onChange,
    value,
    height,
    isDisabled,
    isRequired,
    placeholder,
}: TextAreaInputProps) {
    return (
        <FormControl isRequired={isRequired}>
            <VStack gap="1px" alignItems={"flex-start"}>
                <FormLabel color="gray.400" fontSize={"sm"}>
                    {label}
                </FormLabel>
                <Textarea
                    height={height}
                    size="sm"
                    width={"full"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    borderColor="gray.400"
                    placeholder={placeholder || label}
                    focusBorderColor="gray.400"
                    rounded="md"
                    disabled={isDisabled}
                />
            </VStack>
        </FormControl>
    );
}
