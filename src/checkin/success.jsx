
import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    firstNameAtom,
    lastNameAtom,
    passTypeAtom,
    hasCheckinInfoAtom,
} from "./atoms";

import ResetButton from "./reset-button";
import CheckInForm from "./check-in-form";
import WelcomeView from "./welcome-view";

export default function CheckInPage() {
    // persisted
    const hasCheckinInfo = useAtomValue(hasCheckinInfoAtom);

    // if (hasCheckinInfo) {
    //     return <WelcomeView />
    // }

    return (

        { successMsg && <Alert severity="success">{successMsg}</Alert>}

    )

}

