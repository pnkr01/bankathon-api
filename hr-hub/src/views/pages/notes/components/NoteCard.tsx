import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    HStack,
    Heading,
    Text,
} from "@chakra-ui/react";
import { COLORS } from "../../../../config/const";

type NodeCardProps = {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    id:string;
    title:string;
    details:string;
};

export default function NoteCard({ 
    onDelete,
    onEdit,
    id,
    details,
    title
}: NodeCardProps) {
    return (
        <Card height={[200, 300, 350]}>
            <CardHeader>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading size="md">{title}</Heading>
                    <HStack spacing="10px">
                        <EditIcon
                            onClick={()=>onEdit(id)}
                            color={"blue.400"}
                            cursor="pointer"
                        />
                        <DeleteIcon
                            onClick={()=>onDelete(id)}
                            color={COLORS.SECONDARY}
                            cursor="pointer"
                        />
                    </HStack>
                </Flex>
            </CardHeader>
            <CardBody overflowY="scroll">
                <Text>{details}</Text>
            </CardBody>
        </Card>
    );
}
