import styled from "@emotion/styled";
import { Card } from "./Card";
import { CardI } from "../types/types";

interface ListCardProps {
    cards: CardI[]
}

const ListCardComponent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 250px));

  justify-content: center;
  gap: 15px;
`

export function ListCard({cards} : ListCardProps) {
    return <ListCardComponent>
        {cards.map((card) => <Card key={card.id} card={card}/>)}
    </ListCardComponent>
}