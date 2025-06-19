import Header from "../../widgets/Header";
import Sidebar from "../../widgets/Sidebar";
import Workspace from "../../widgets/Workspace";

const NotesPage = () => {
    return (
        <div className="page">
            <div className="page__content">
                <Header />
                <Sidebar />
                <Workspace />
            </div>
        </div>
    );
};

export default NotesPage;
