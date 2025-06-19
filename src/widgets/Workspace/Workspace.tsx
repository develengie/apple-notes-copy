import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleMdeReact, {
    type SimpleMDEReactProps,
} from "react-simplemde-editor";
import { Button } from "@mui/material";
import Modal from "../../features/Modal";
import "easymde/dist/easymde.min.css";
import "./Workspace.scss";

const delay = 1000;

const Workspace = () => {
    const { id } = useParams();
    const [value, setValue] = useState(id);
    const [isPreview, setIsPreview] = useState(true);
    const [isModal, setIsModal] = useState(false);
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

    const handleChange = useCallback((value: string) => {
        setValue(value);
    }, []);

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
        setValue(id);
        localStorage.setItem("smde_demo", id!);
    }, [id]);

    return (
        <div className="workspace">
            {id ? (
                <>
                    <SimpleMdeReact
                        id="demo"
                        getMdeInstance={getMdeInstance}
                        options={options}
                        value={autosavedValue}
                        onChange={handleChange}
                    />

                    <div className="workspace__buttons">
                        <Button
                            variant="contained"
                            color="success"
                            sx={{ mr: 1 }}
                        >
                            Add
                        </Button>
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
                    </div>
                </>
            ) : (
                <div className="workspace__message">Выберите заметку слева</div>
            )}

            <Modal isModal={isModal} onCloseModal={handleCloseModal} />
        </div>
    );
};

export default Workspace;
