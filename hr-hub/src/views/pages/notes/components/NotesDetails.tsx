import { Box, VStack } from "@chakra-ui/react";
import { TextAreaInput, TextInput } from "./InputFields";


export default function NotesDetails() {
    return (
        <Box>
            <VStack spacing={"10px"}>
                <TextInput
                    label="Title"
                    onChange={() => {}}
                    value={""}
                    isRequired
                    placeholder="Title"
                />
                <TextAreaInput
                    label="Description"
                    onChange={() => {}}
                    value={""}
                    isRequired
                    placeholder="Add your text here"
                    height={"300px"}
                />
            </VStack>
        </Box>
    );
}
