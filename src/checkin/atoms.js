import { atom } from 'jotai';
import { atomWithStorage } from "jotai/utils";

export const firstNameAtom = atomWithStorage("checkin:firstName", "");
export const lastNameAtom = atomWithStorage("checkin:lastName", "");
export const passTypeAtom = atomWithStorage("checkin:passType", "");
export const lastSuccessDateAtom = atomWithStorage("checkin:lastSuccessDate", "");

export const hasCheckinInfoAtom = atom((get) => {
    const firstName = get(firstNameAtom);
    const lastName = get(lastNameAtom);
    const passType = get(passTypeAtom);
    const lastSuccessDate = get(lastSuccessDateAtom);

    return Boolean(
        firstName?.trim() &&
        lastName?.trim() &&
        passType?.trim() &&
        lastSuccessDate?.trim()
    );
});