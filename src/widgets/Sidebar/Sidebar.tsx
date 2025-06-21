import { Drawer, List } from "@mui/material";
import { orderBy } from "lodash";
import { useNotes } from "../../app/providers/NotesProvider";
import Notes from "../../entities/Notes";

const Sidebar = () => {
    const { notes, noteSearch } = useNotes();
    const sortedNotes = orderBy(notes, ["_id"], ["desc"]);
    const filteredNotes = sortedNotes.filter((note) =>
        note?.text?.toLowerCase().includes(noteSearch.toLowerCase())
    );

    return (
        <Drawer
            sx={{
                "& .MuiDrawer-paper": {
                    width: "300px",
                    position: "fixed",
                    top: "59px",
                    left: "0",
                    zIndex: "1",
                },
            }}
            variant="permanent"
        >
            <List>
                <Notes notes={filteredNotes} />
            </List>
        </Drawer>
    );
};

export default Sidebar;
