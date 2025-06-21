import {
    createContext,
    use,
    useEffect,
    useState,
    type ChangeEvent,
    type ReactNode,
} from "react";
import { axios } from "../axios";
import moment from "moment";
import { Loader } from "../../shared/ui";
import type { AxiosError } from "axios";
import type { NotesItem } from "../../entities/Notes/model/types";

interface Notes {
    notes: NotesItem[];
    noteSearch: string;
    handleNoteSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    addNote: (noteNumber: number) => void;
    editNote: (noteId: string, text: string) => void;
    deleteNote: (noteId: string) => void;
    getNotes: () => void;
}

interface NotesProviderProps {
    children: ReactNode;
}

const NotesContext = createContext({} as Notes);

export const useNotes = () => {
    return use(NotesContext);
};

const NotesProvider = ({ children }: NotesProviderProps) => {
    const [notes, setNotes] = useState<NotesItem[]>([]);
    const [noteSearch, setNoteSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const idToken = localStorage.getItem("jwt-id-token");
    const userId = localStorage.getItem("user-local-id");

    const handleNoteSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setNoteSearch(event.target.value.replace(/[*#>]/g, ""));
    };

    const addNote = async (noteNumber: number) => {
        const newNote = {
            _id: Date.now(),
            userId,
            text: `Новая заметка ${noteNumber}`,
            date: moment().format("MMMM DD, YYYY"),
        };

        try {
            const { data } = await axios.put<NotesItem>(
                `notes/${newNote._id}.json`,
                newNote,
                {
                    params: {
                        auth: idToken,
                    },
                }
            );
            setNotes((prevState) => [...prevState, data]);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setError(error.message);
        }
    };

    const editNote = async (noteId: string, text: string) => {
        try {
            const { data } = await axios.patch<NotesItem>(
                `notes/${noteId}.json`,
                { text },
                {
                    params: {
                        auth: idToken,
                    },
                }
            );
            const editedNotes = notes.map((note) => {
                return note._id.toString() === noteId
                    ? { ...note, text: data.text }
                    : note;
            });
            setNotes(editedNotes);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setError(error.message);
        }
    };

    const deleteNote = async (noteId: string) => {
        try {
            const { data } = await axios.delete<NotesItem>(
                `notes/${noteId}.json`,
                {
                    params: {
                        auth: idToken,
                    },
                }
            );

            if (data === null) {
                setNotes((prevState) =>
                    prevState.filter((note) => note._id.toString() !== noteId)
                );
            }
        } catch (e: unknown) {
            const error = e as AxiosError;
            setError(error.message);
        }
    };

    const getNotes = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get("notes.json", {
                params: {
                    auth: idToken,
                },
            });
            const notes = Object.values(data as NotesItem[]).filter(
                (note) => note.userId === userId
            );
            setNotes(notes);
            setIsLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setIsLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        getNotes();
    }, [userId]);

    useEffect(() => {
        if (error !== "") {
            setError("");
        }
    }, [error]);

    const value = {
        notes,
        noteSearch,
        handleNoteSearch,
        addNote,
        editNote,
        deleteNote,
        getNotes,
    };

    return (
        <NotesContext value={value}>
            {!isLoading ? children : <Loader />}
        </NotesContext>
    );
};

export default NotesProvider;
