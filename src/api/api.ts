import { Md5 } from 'ts-md5';
import {CardI, Param} from "../types/types";
import {getDate} from "../utils";

const date = getDate()
const PASSWORD = 'Valantis'
const TOKEN = Md5.hashStr(`${PASSWORD}_${date}`)


export async function filterCardsId(param: Param, value: string) {
    const correctValue = param === "price" ? parseInt(value) : value
    try {
        const response = await fetch("https://api.valantis.store:41000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth": TOKEN,
            },
            body: JSON.stringify({
                action: "filter",
                params: {[param]: correctValue}
            }),
        });

        if (!response.ok) {
            throw new Error(`Error during fetch arrayId ${response.status}`);
        }

        const result : {result : string[]} = await response.json();
        return result.result;
    } catch (err) {
        if (err instanceof Error && err.message.includes('500')) {
            console.log('Повторный запрос id карточек')
            await fetchCardsId()
        }
    }
}

export async function fetchCardsId() {
    try {
        const response = await fetch("https://api.valantis.store:41000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth": TOKEN,
            },
            body: JSON.stringify({
                action: "get_ids",
            }),
        });

        if (!response.ok) {
            throw new Error(`Error during fetch arrayId ${response.status}`);
        }

        const result : {result : string[]} = await response.json();
        return result.result;
    } catch (err) {
        if (err instanceof Error && err.message.includes('500')) {
            console.log('Повторный запрос id карточек')
            await fetchCardsId()
        }
    }
}

export async function fetchCard(arrayId: string[]) {
    try {
        const response = await fetch("https://api.valantis.store:41000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth": TOKEN,
            },
            body: JSON.stringify({
                action: "get_items",
                params: {
                    ids: arrayId,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Error during fetch cards ${response.status}`);
        }

        const result: { result: CardI[] } = await response.json();
        return result.result;
    } catch (err) {
        if (err instanceof Error && err.message.includes('500')) {
            console.log('Повторный запрос даных о карточках')
            await fetchCard(arrayId)
        }
    }
}
