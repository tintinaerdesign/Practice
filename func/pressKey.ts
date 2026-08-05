import { PIN } from '../utils/PIN';


export function pressKey(
    key: string,
    setPIN: React.Dispatch<React.SetStateAction<string>>
    ): void {

    if (key === '') return;

    if (key === '⌫') {
        setPIN((prev) => prev.slice(0, -1));
    return;
    }

    setPIN((prev) => {
        if  (prev.length >= 6) return prev;
        return prev + key;
        });
    }