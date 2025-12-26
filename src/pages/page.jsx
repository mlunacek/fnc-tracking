import { useState } from "react";
import { useAtom } from "jotai";
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
} from "./atoms";

const ENDPOINT =
    "https://script.google.com/macros/s/AKfycbybVLH_KGr-mzikxuECy-zuUYpLkkXmzL5Teucc3MOHpOiHVN-k7E1thj2tmRgSyRs6/exec";

const PASS_TYPES = ["Day", "Season", "Volunteer", "Other"];

function getTodayISO() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}


export default function CheckInPage() {
    // persisted
    const [firstName, setFirstName] = useAtom(firstNameAtom);
    const [lastName, setLastName] = useAtom(lastNameAtom);
    const [passType, setPassType] = useAtom(passTypeAtom);

    // fresh on every visit
    const [date, setDate] = useState(getTodayISO());

    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

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

            setSuccessMsg("Checked in! Thanks.");
            setDate(getTodayISO()); // reset to today again after submit
        } catch (err) {
            setErrorMsg(err.message ?? "Submission failed.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
            <Paper elevation={3} sx={{ width: "100%", maxWidth: 520, p: 3 }}>
                <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h5">Nordic Center Check-In</Typography>

                    {successMsg && <Alert severity="success">{successMsg}</Alert>}
                    {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

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
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        InputLabelProps={{ shrink: true }}
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

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={18} /> : undefined}
                    >
                        {submitting ? "Submitting..." : "Check In"}
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
}
