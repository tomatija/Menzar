import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { withRouter, useNavigate, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../Login/LoginActions";

// This example was taken from:
// https://mui.com/material-ui/react-app-bar/

const appName = "Menzar";

const Navigation = (props) => {
    const isUserLoggedIn = props.auth.isAuthenticated;
    const username = isUserLoggedIn ? props.auth.user.username : "Anonimni uporabnik";
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const history = useHistory();

    const handleLogin = () => {
        history.push("/login");
    };

    const handleLogout = () => {
        props.logout();
    };

    const handleDinerClick = () => {
        history.push("/diners");
    };

    const handleProfileClick = () => {
        history.push("/dashboard");
    };

    const settings = [
        {
            name: username,
            callback: () => {},
        },
        {
            name: isUserLoggedIn ? "Odjava" : "Prijava",
            callback: isUserLoggedIn ? handleLogout : handleLogin,
        },
    ];
    const pages = [
        {
            name: "Menze",
            callback: handleDinerClick,
        },
        {
            name: "Profil",
            callback: handleProfileClick,
        },
    ];

    return (
        <AppBar
            style={{ background: "#f3aa20" }}
            position="static"
            sx={{
                mb: 4,
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disablegutters="true">
                    <Typography
                        variant="h6"
                        noWrap
                        disablegutters="true"
                        onClick={() => {
                            history.push("/");
                        }}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "#841e62",
                            textDecoration: "none",
                        }}
                    >
                        {appName}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={page.callback}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "#688052",
                            textDecoration: "none",
                        }}
                    >
                        {appName}
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={page.callback}
                                sx={{ my: 2, color: "#346b6d", display: "block" }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Odpri možnosti">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={username} src="/static/images/avatar/2.jpg" />
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
                            {settings.map((setting, index) => (
                                <MenuItem key={index} onClick={setting.callback}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {
    logout,
})(withRouter(Navigation));
