import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { Navbar } from "../../components/navbar";
import { COLORS, ROUTES } from "../../../config/const";
import { NAVBAR_SAFE_AREA } from "../../../config/ui";
import { useNavigate, useOutlet } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import NoteCard from "./components/NoteCard";
export default function Notes() {
    const outlet = useOutlet();
    const navigate = useNavigate();

    const createNote = () => {
        navigate(ROUTES.NOTES + "/create");
    };

    const deleteNote = (id:string)=>{

    }
    const editNode = (id:string)=>{
        navigate(ROUTES.NOTES + `/${id}`);
    }

    return (
        <Box bg={COLORS.PRIMARY_BACKGROUND}>
            <Navbar
                action={
                    <Navbar.Action>
                        <Navbar.SearchField
                            searchText={""}
                            setSearchText={(value) =>
                                // dispatch(setSearchText(value))
                                {}
                            }
                        />
                        <Navbar.Logout />
                    </Navbar.Action>
                }
            >
                <Flex alignItems="center" gap="10px">
                    <Navbar.Title text="Notes" />
                </Flex>
            </Navbar>

            <Box {...NAVBAR_SAFE_AREA} bg={COLORS.PRIMARY_BACKGROUND}>
                <Box marginX="50px">
                    <Flex
                        justifyContent="flex-start"
                        alignItems="center"
                        marginY="10px"
                    >
                        <Button
                            onClick={createNote}
                            bgColor={COLORS.SECONDARY}
                            opacity={0.85}
                            _hover={{
                                opacity: 1,
                            }}
                            color={"white"}
                            leftIcon={<AddIcon />}
                        >
                            <Text>Create</Text>
                        </Button>
                    </Flex>
                    <Grid marginTop="10" templateColumns="repeat(4, 1fr)" gap="15px">

                        {/* // TODO use map to show all notes */}
                        <NoteCard 
                            id="abc"
                            title="Title"
                            details="Ui design is not complete for Investment." 
                            onDelete={deleteNote} 
                            onEdit={editNode}
                        />
                    </Grid>
                </Box>
            </Box>
            {outlet}
        </Box>
    );
}
