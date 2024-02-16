import { atom } from "jotai";
import { ICountries } from "../interfaces/countries";
export const selectedItemAtom = atom<ICountries | null>(null);
