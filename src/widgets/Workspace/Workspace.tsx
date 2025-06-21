import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleMdeReact, {
    type SimpleMDEReactProps,
} from "react-simplemde-editor";
import { Button } from "@mui/material";
import { useNotes } from "../../app/providers/NotesProvider";
import { useDebounce } from "../../shared/hooks/useDebounce";
import Modal from "../../features/Modal";
import "easymde/dist/easymde.min.css";
import "./Workspace.scss";

const delay = 1000;

const Workspace = () => {
    const { id: noteId } = useParams();
    const { notes, addNote, editNote } = useNotes();
    const [value, setValue] = useState("");
    const [isPreview, setIsPreview] = useState(true);
    const [isModal, setIsModal] = useState(false);
    const currentNote = notes.find((note) => note._id.toString() === noteId);
    const isNoteExists = notes.some((note) => note._id.toString() === noteId);
    const autosavedValue = localStorage.getItem("smde_demo") || value;
    const options = useMemo(() => {
        return {
            autosave: {
                enabled: true,
                uniqueId: "demo",
                delay,
            },
            hideIcons: ["preview", "side-by-side", "fullscreen", "guide"],
        } as SimpleMDEReactProps;
    }, []);

    useDebounce(
        () => {
            editNote(noteId!, value);
        },
        1000,
        [noteId!, value]
    );

    const handleChange = useCallback(
        (value: string) => {
            setValue(value);
        },
        [noteId]
    );

    const handleAddNote = () => {
        addNote(notes.length + 1);
    };

    const handleTogglePreview = () => {
        setIsPreview((prevState) => !prevState);
    };

    const handleOpenModal = () => {
        setIsModal(true);
    };

    const handleCloseModal = () => {
        setIsModal(false);
    };

    const getMdeInstance = useCallback(
        (instance: any) => {
            instance.togglePreview();
        },
        [isPreview]
    );

    useEffect(() => {
        localStorage.removeItem("smde_demo");
        setValue(currentNote?.text as string);
        localStorage.setItem("smde_demo", currentNote?.text as string);
    }, [noteId]);

    return (
        <div className="workspace">
            {noteId && isNoteExists ? (
                <SimpleMdeReact
                    id="demo"
                    getMdeInstance={getMdeInstance}
                    options={options}
                    value={autosavedValue}
                    onChange={handleChange}
                />
            ) : (
                <div className="workspace__message">
                    Add a new note or select a note on the left
                </div>
            )}

            <div className="workspace__buttons">
                <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 1 }}
                    onClick={handleAddNote}
                >
                    Add
                </Button>
                {noteId && isNoteExists && (
                    <>
                        <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={handleTogglePreview}
                        >
                            {isPreview ? "Edit" : "View"}
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleOpenModal}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </div>

            {isModal && (
                <Modal
                    isModal={isModal}
                    onCloseModal={handleCloseModal}
                    noteId={noteId!}
                />
            )}
        </div>
    );
};

export default Workspace;
