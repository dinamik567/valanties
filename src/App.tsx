import {useEffect, useMemo, useState} from "react";
import {fetchCardsId, fetchCard, filterCardsId} from "./api/api";
import {CardI, Param} from "./types/types";
import {ListCard} from "./components/ListCard";
import {MyPagination} from "./components/MyPagination";

import styled from "@emotion/styled";
import {Filter} from "./components/Filter";

const AppComponent = styled.div`
  padding: 20px;
  background-color: gray;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

function transformTo2DArray(inputArray: any[], chunkSize: number) {
    const result = [];

    for (let i = 0; i < inputArray.length; i += chunkSize) {
        result.push(inputArray.slice(i, i + chunkSize));
    }

    return result;
}

function App() {
    const [arrayId, setArrayId] = useState<string[]>([])
    const [step, setStep] = useState(1)
    const [cards, setCards] = useState<CardI[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [param, setParam] = useState<Param>("product")


    useEffect(() => {
        async function fetchData() {
            let idCards
            if (searchValue !== '') {
               idCards = await filterCardsId(param, searchValue)
            } else {
               idCards = await fetchCardsId();
            }
            const uniqueArrayId = Array.from(new Set(idCards));
            setArrayId(uniqueArrayId);
        }

        fetchData()

    }, [param, searchValue]);

    const transformedArray = useMemo(() => {
        return transformTo2DArray(arrayId, 50);
    }, [arrayId]);


    useEffect(() => {
        async function fetchDate() {

            if (!transformedArray.length) return
            const arrayCards: CardI[] | undefined = await fetchCard(transformedArray[step - 1]);
            const uniqueId = new Set()

            const result = (arrayCards || []).filter((card) => {
                if (!uniqueId.has(card.id)) {
                    uniqueId.add(card.id);
                    return true;
                }
                return false;
            });
            setCards(result)
        }

        fetchDate()
    }, [transformedArray, step]);

    return <AppComponent className="App">
        <Filter
            valueParams={param}
            valueSearch={searchValue}
            changeRadioButton={(param) => setParam(param)}
            onChangeSearchField={(value) => setSearchValue(value)}
        />
        <ListCard cards={cards}/>
        {cards.length !== 0
            ? <MyPagination
                changePage={(n) => setStep(n)}
                page={step}
                count={transformedArray.length}
            />
            : null
        }
    </AppComponent>;
}

export default App;
