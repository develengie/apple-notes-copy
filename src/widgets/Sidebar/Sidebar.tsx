import { Drawer, List } from "@mui/material";
import Notes from "../../entities/Notes";

const Sidebar = () => {
    const notes = [
        { _id: 1, text: "Text 1", date: "Jun 1, 2025" },
        { _id: 2, text: "Text 2", date: "Jun 2, 2025" },
        { _id: 3, text: "Text 3", date: "Jun 3, 2025" },
        { _id: 4, text: "Text 4", date: "Jun 4, 2025" },
        { _id: 5, text: "Text 5", date: "Jun 5, 2025" },
    ];

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
                <Notes notes={notes} />
            </List>
        </Drawer>
    );
};

export default Sidebar;
