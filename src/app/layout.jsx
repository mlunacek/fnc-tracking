import React, { useState, useMemo, useEffect } from 'react';

import {
    Box,
    Grid,
    Paper,
    Drawer,
    CssBaseline,
    Toolbar,
    Typography,
    useMediaQuery,
    Fade,
    Collapse,
    Divider
} from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';

import { Drawer as CustomDrawer } from '@/app/drawer';
import { useAtom, useAtomValue } from 'jotai';
import { showHeaderAtom, drawerOpenAtom, showFooterAtom } from '@/app/atoms';

const drawerWidth = 240;

const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'isMobile' && prop !== 'open',
})((props) => ({
    // flexGrow: 1,
    padding: props.theme.spacing(3),
    marginLeft: 0, //props.isMobile ? 0 : props.open ? drawerWidth : 0,
    transition: props.theme.transitions.create(['margin', 'width'], {
        easing: props.theme.transitions.easing.sharp,
        duration: props.theme.transitions.duration.leavingScreen,
    }),
})
);


function Layout({ children }) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useAtom(drawerOpenAtom);
    const showHeader = useAtomValue(showHeaderAtom);
    const atomShowFooter = useAtomValue(showFooterAtom);
    const [drawerTop, setDrawerTop] = useState(0);

    const paddingTop = useMemo(() => {
        return isMobile ? 8 : 0;
    }, [isMobile])

    const headerHeight = useMemo(() => {
        if (showHeader) {
            // return isMobile ? '90px' : '130px';
            return '130px';
        }
        return 0;
    }, [isMobile, showHeader]);

    useEffect(() => {
        if (isMobile) {
            setDrawerOpen(false)
        }
        // if (isMobile) {
        //     setDrawerOpen(false); //false
        //     setDrawerTop(85);
        // } else {
        //     setDrawerTop(showHeader ? '180px' : '50px');
        // }
        setDrawerTop(showHeader ? '180px' : '180px');
    }, [isMobile, showHeader]);

    // console.log("isMobile", isMobile)

    return (
        <Box
            sx={{
                display: 'flex',
                overflow: 'visible',
                minHeight: `calc(100vh - ${drawerTop})`,
            }}
        >
            <Box border={0} sx={{
                overflow: 'hidden', // or 'auto', 'scroll', etc., depending on your need
                width: '100%',
                height: '100%',
            }}>

                {children}
            </Box>
        </Box>
    );
}

export default Layout;
