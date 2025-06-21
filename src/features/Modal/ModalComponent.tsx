import { Box, Button, Modal, Typography } from "@mui/material";
import { useNotes } from "../../app/providers/NotesProvider";

interface ModalComponentProps {
    isModal: boolean;
    onCloseModal: () => void;
    noteId: string;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

const ModalComponent = ({
    isModal,
    onCloseModal,
    noteId,
}: ModalComponentProps) => {
    const { deleteNote } = useNotes();

    const handleDeleteNote = () => {
        deleteNote(noteId);
        onCloseModal();
    };

    return (
        <Modal
            open={isModal}
            onClose={onCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to delete this note?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{ mr: 1 }}
                        onClick={handleDeleteNote}
                    >
                        Delete
                    </Button>
                    <Button variant="contained" onClick={onCloseModal}>
                        Cancel
                    </Button>
                </Typography>
            </Box>
        </Modal>
    );
};

export default ModalComponent;
