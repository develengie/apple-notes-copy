import { NavLink } from "react-router-dom";
import { ListItem, ListItemButton } from "@mui/material";
import Note from "../../Note/Note";
import type { NotesItem } from "../model/types";

interface NotesProps {
    notes: NotesItem[];
}

const Notes = ({ notes }: NotesProps) => {
    return (
        <>
            {notes.map((note) => (
                <NavLink
                    key={note._id}
                    className={({ isActive }) =>
                        isActive ? "note  active" : "note"
                    }
                    to={`/notes/${note._id}`}
                >
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Note primary={note.text} secondary={note.date} />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            ))}
        </>
    );
};

export default Notes;
