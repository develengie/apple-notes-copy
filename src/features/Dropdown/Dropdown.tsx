import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useAuth } from "../../app/providers/AuthProvider";

const Dropdown = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const getName = () => {
        return localStorage.getItem("user-name");
    };

    return (
        <>
            <Tooltip title="Open dropdown">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {getName()}
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default Dropdown;
