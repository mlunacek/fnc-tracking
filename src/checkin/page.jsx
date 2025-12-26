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

export default function CheckInPage() {
    // persisted

    // if (hasCheckinInfo) {
    //     return <WelcomeView />
    // }

    return (
        <CheckInForm />

    )

}