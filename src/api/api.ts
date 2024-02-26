import { CardI} from "../types/types";

const TOKEN = 'cd0bfbcb48b87cbb908ce771120bb507'

export async function fetchCardsId(step: number, limit = 50) {
    try {
        const response = await fetch("http://api.valantis.store:40000/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth": TOKEN,
            },
            body: JSON.stringify({
                action: "get_ids",
                params: { limit: limit, offset: step },
            }),
        });

        if (!response.ok) {
            throw new Error(`Error during fetch arrayId ${response.status}`);
        }

        const result = await response.json();
        return result.result;
    } catch (err) {
        if (err instanceof Error && err.message.includes('500')) {
            console.log('Повторный запрос id карточек')
            await fetchCardsId(step, limit)
        }
    }
}

export async function fetchCard(arrayId: string[]) {

    try {
        const response = await fetch("http://api.valantis.store:40000/", {
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
