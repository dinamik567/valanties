import {useEffect, useRef, useState} from "react";
import  { fetchCardsId, fetchCard } from "./api/api";
import  { CardI } from "./types/types";
import { ListCard } from "./components/ListCard";
import { MyPagination } from "./components/MyPagination";

import styled from "@emotion/styled";

const AppComponent = styled.div`
  padding: 20px;
  background-color: gray;
`



function App() {
  const [cards, setCards] = useState<CardI[]>([]);
  let step = useRef(0)

  useEffect(() => {
     async function fetchDate() {
      const idCards: string[] =  await fetchCardsId(step.current);
      step.current += 50
      const arrayCards: CardI[] | undefined  = await fetchCard(idCards);
      const uniqueId = new Set();
      const result = (arrayCards || []).filter((card) => {
          if (!uniqueId.has(card.id)) {
              uniqueId.add(card.id);
              return true;
          }
          return false;
      });

      while (uniqueId.size < 50) {

          const arrayId = await fetchCardsId(step.current++, 1)
          if (typeof arrayId === 'undefined' || arrayId.length === 0) continue
          const receiveCard = await fetchCard(arrayId)

          if (typeof receiveCard === 'undefined' || receiveCard.length === 0) continue

          const [card] = receiveCard

          if (!uniqueId.has(card.id)) {
              uniqueId.add(card.id)
              result.push(card)
          }

      }

      uniqueId.clear()

      setCards(result)
    };

     fetchDate()
  }, []);
  
  return <AppComponent className="App">
      <ListCard cards={cards}/>
      {cards.length !== 0
          ?  <MyPagination count={10}/>
          : null
      }
  </AppComponent>;
}

export default App;
