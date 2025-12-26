import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar as MuiAppBar,
    Toolbar,
    Divider,
    Typography,
    Select,
    MenuItem,
    Box,
    useMediaQuery,
    Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import { Menu as MenuIcon } from '@mui/icons-material';

import { useAtom, useAtomValue } from 'jotai';
import {
    showAppBarAtom,
    drawerOpenAtom,
    appBarTitleAtom,
    forceMobileAtom,
} from '@/Layout/atoms';


import { SvgIcon } from '@mui/material';

function MSquareIcon(props) {
    return (
        <SvgIcon {...props} viewBox="0 0 30 30">
            <rect width="30" height="30" rx="3" fill="#1976d2" />
            <text x="6" y="22" fontSize="20" fill="white" fontWeight="bold">M</text>
        </SvgIcon>
    );
}


export default function AppBar({ children }) {

    const theme = useTheme();
    const pagelocation = useLocation();
    const navigate = useNavigate();

    const showAppBar = useAtomValue(showAppBarAtom);
    const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
    const [forceMobile, setForceMobile] = useAtom(forceMobileAtom);

    const appBarTile = useAtomValue(appBarTitleAtom);


    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    const isLandscape = useMediaQuery('(orientation: landscape)');
    const isMobileLandscape = isLandscape && window.innerWidth <= 900;

    useEffect(() => {
        setForceMobile(isSmallScreen || isMobileLandscape)
    }, [isSmallScreen, isMobileLandscape])


    if (!showAppBar) {
        return null;
    }



    return (
        <MuiAppBar elevation={0} position="sticky" color="inherit" variant="dense">
            <Divider />
            <Toolbar variant="dense">

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 1 }}
                    onClick={() => setDrawerOpen((prev) => !prev)}
                >
                    {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
                </IconButton>

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    component={Link}
                    sx={{ color: "grey", mr: 1 }}
                    to={"/"}
                >
                    <MSquareIcon />
                </IconButton>


                {children}

            </Toolbar>

            <Divider />
        </MuiAppBar >
    );
}

