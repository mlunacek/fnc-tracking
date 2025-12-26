import { atomWithStorage } from "jotai/utils";

export const firstNameAtom = atomWithStorage("checkin:firstName", "");
export const lastNameAtom = atomWithStorage("checkin:lastName", "");
export const passTypeAtom = atomWithStorage("checkin:passType", "");