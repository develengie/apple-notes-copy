import { ListItemText } from "@mui/material";

interface NoteProps {
    primary: string;
    secondary: string;
}

const Note = ({ primary, secondary }: NoteProps) => {
    return (
        <ListItemText
            primary={primary.replace(/[*#>]/g, "")}
            secondary={secondary}
        />
    );
};

export default Note;
