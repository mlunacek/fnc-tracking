import { useEffect, useState } from "react";
import {
    getTodayISO,
    getTodayTimeISO
} from "./get-today-iso";

export function useFreshToday() {
    const [date, setDate] = useState(() => getTodayISO());
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        const refreshIfNotEdited = () => {
            if (!edited) setDate(getTodayISO());
        };

        const onVisibility = () => {
            if (document.visibilityState === "visible") refreshIfNotEdited();
        };

        window.addEventListener("focus", refreshIfNotEdited);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            window.removeEventListener("focus", refreshIfNotEdited);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [edited]);

    const onChangeDate = (newDate) => {
        setEdited(true);
        setDate(newDate);
    };

    return { date, onChangeDate, setDate, edited };
}

export function useFreshTodayTime() {
    const [datetime, setDatetime] = useState(() => getTodayTimeISO());

    useEffect(() => {
        const refresh = () => setDatetime(getTodayTimeISO());

        // when tab becomes visible again
        const onVisibility = () => {
            if (document.visibilityState === "visible") refresh();
        };

        // optional: when window regains focus
        const onFocus = () => refresh();

        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("focus", onFocus);

        return () => {
            document.removeEventListener("visibilitychange", onVisibility);
            window.removeEventListener("focus", onFocus);
        };
    }, []);

    return [datetime, setDatetime];
}