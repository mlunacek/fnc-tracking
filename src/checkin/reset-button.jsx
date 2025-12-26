import { useSetAtom } from "jotai";
import {
    firstNameAtom,
    lastNameAtom,
    passTypeAtom,
    lastSuccessDateAtom,
} from "./atoms";

import {
    Button,
    Link
} from '@mui/material'

export default function ResetButton() {
    const setFirstName = useSetAtom(firstNameAtom);
    const setLastName = useSetAtom(lastNameAtom);
    const setPassType = useSetAtom(passTypeAtom);
    const setLastSuccessDateAtom = useSetAtom(lastSuccessDateAtom);

    const clearValues = () => {
        setFirstName("");
        setLastName("");
        setPassType("");
        setLastSuccessDateAtom("");
    };

    return (
        <Link
            component="button"
            type="button"
            onClick={clearValues}
            underline="hover"
            color="primary"
            sx={{
                font: "inherit",
                lineHeight: "inherit",
                verticalAlign: "baseline",
                padding: 0,
                minWidth: "unset",
            }}
        >
            Reset
        </Link>
    );
}