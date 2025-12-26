import { useEffect, useState } from "react";
import { useSetAtom, useAtom, useAtomValue } from "jotai";
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
    lastSuccessDateAtom,
    hasCheckinInfoAtom
} from "./atoms";

const ENDPOINT =
    "https://script.google.com/macros/s/AKfycbybVLH_KGr-mzikxuECy-zuUYpLkkXmzL5Teucc3MOHpOiHVN-k7E1thj2tmRgSyRs6/exec";

const PASS_TYPES = ["Day", "Season", "Volunteer", "Other"];

import ResetButton from "./reset-button";
import {
    useFreshToday,
    useFreshTodayTime
} from './useFreshToday'

import headerImage from "../assets/image.png";

export default function CheckInForm() {
    // read current saved values once for defaults
    const [lastSuccessDate, setLastSuccessDate] = useAtom(lastSuccessDateAtom)
    const hasCheckinInfo = useAtomValue(hasCheckinInfoAtom);

    const [firstName, setFirstName] = useAtom(firstNameAtom);
    const [lastName, setLastName] = useAtom(lastNameAtom);
    const [passType, setPassType] = useAtom(passTypeAtom);

    // fresh on every visit
    // const [date, setDate] = useState(getTodayISO());
    const { date, onChangeDate } = useFreshToday();
    const [datetime, setDatetime] = useFreshTodayTime();


    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);


    async function handleSubmit(e) {
        e.preventDefault();
        setSuccessMsg(null);
        setErrorMsg(null);

        if (!firstName.trim() || !lastName.trim()) {
            setErrorMsg("Please enter first and last name.");
            return;
        }

        setSubmitting(true);

        try {
            const payload = {
                name: `${firstName} ${lastName}`.trim(),
                date,
                passType,
            };

            const res = await fetch(ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const result = await res.json();
            if (result.status !== "ok") {
                throw new Error(result.message || "Server error");
            }

            setShowAlert(true)
            setSuccessMsg(`Checked in! Thanks ${firstName.trim()}`);
            setLastSuccessDate(date)

        } catch (err) {
            setErrorMsg(err.message ?? "Submission failed.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Box>

            <Box
                sx={{
                    width: "100%",
                    mb: 1,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    component="img"
                    src={headerImage}
                    alt="Header"
                    sx={{
                        maxWidth: 250,
                        maxHeight: 240,
                        objectFit: "cover",
                        borderRadius: 1,
                    }}
                />
            </Box>

            <Box sx={{ mb: 6, p: 2, display: "flex", justifyContent: "center" }}>
                <Paper elevation={3} sx={{ width: "100%", maxWidth: 520, p: 3 }}>


                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

                    {hasCheckinInfo &&
                        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                            {showAlert && successMsg && <Alert severity="success">{successMsg}</Alert>}

                            {/* <Typography padding={2} variant="h5">Nordic Center Check-In</Typography> */}
                            <Typography padding={2} variant="h5">Welcome back, <strong>{firstName}</strong>!</Typography>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={submitting}
                                startIcon={submitting ? <CircularProgress size={18} /> : undefined}
                            >
                                {submitting ? "Submitting..." : `Check In Now`}
                            </Button>


                        </Stack>
                    }

                    {!hasCheckinInfo &&

                        <Stack spacing={2} component="form" onSubmit={handleSubmit}>

                            <TextField
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />

                            <TextField
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />

                            <TextField
                                label="Pass Type"
                                select
                                value={passType}
                                onChange={(e) => setPassType(e.target.value)}
                                required
                            >
                                {PASS_TYPES.map((pt) => (
                                    <MenuItem key={pt} value={pt}>
                                        {pt}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Date"
                                type="date"
                                value={date}
                                onChange={(e) => onChangeDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                required
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                paddingBottom={8}
                                disabled={submitting}
                                startIcon={submitting ? <CircularProgress size={18} /> : undefined}
                            >
                                {submitting ? "Submitting..." : "Check In Now"}
                            </Button>
                        </Stack>
                    }


                </Paper>
            </Box>

            {hasCheckinInfo &&
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        py: 1.5,
                        px: 2,
                        bgcolor: "background.paper",
                        borderTop: "1px solid",
                        borderColor: "divider",
                        boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            maxWidth: 900,
                            mx: "auto",
                            flexWrap: "wrap",
                            gap: 1,
                        }}
                    >
                        <Typography variant="body1" color="text.secondary">
                            Not <strong>{firstName}</strong>?{" "}
                            <ResetButton />{" "} this form.
                        </Typography>


                        {/* <Typography variant="caption" color="text.disabled">
                            {datetime}
                        </Typography> */}
                    </Box>
                </Box>
            }

        </Box>
    );
}
