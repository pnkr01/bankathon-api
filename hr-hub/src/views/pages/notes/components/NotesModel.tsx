import {useCallback} from "react"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { ROUTES } from '../../../../config/const';
import { useNavigate, useParams } from "react-router-dom";
import NotesDetails from "./NotesDetails";


export default function NotesModel() {
    const navigate = useNavigate();
    const { id: noteID } = useParams();
    
    if (noteID && noteID !== "create") {
        
    }

    const onClose = useCallback(() => {
        navigate(ROUTES.NOTES);
    }, [navigate]);

    const onSave = ()=>{

    }

  return (
    <Modal isCentered isOpen={true} onClose={onClose} size="3xl">
            <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(5px)" />

            <ModalContent>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>
                    <NotesDetails/>
                </ModalBody>
                <ModalFooter justifyContent={"center"}>
                    <Button
                        onClick={onSave}
                        paddingX={"40px"}
                        bgColor="blue.400"
                        _hover={{
                            bgColor: "blue.500",
                        }}
                        color="white"
                    >
                        SAVE
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
  )
}
