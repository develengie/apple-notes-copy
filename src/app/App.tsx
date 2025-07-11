import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, NotesProvider, ProtectedRoute } from "./providers";
import { MainLayout } from "./layouts";
import AuthPage from "../pages/AuthPage";
import NotesPage from "../pages/NotesPage";

const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/:type?" element={<AuthPage />} />
                    <Route
                        path="/notes/:id?"
                        element={
                            <NotesProvider>
                                <ProtectedRoute>
                                    <NotesPage />
                                </ProtectedRoute>
                            </NotesProvider>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
