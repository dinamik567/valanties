import styled from "@emotion/styled";
import {CardI} from "../types/types";

interface CardPropsI {
    card: CardI;
}

const CardComponent = styled.div`
  padding: 15px;
  background-color: black;
  color: orange;
  border-radius: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`

export function Card({card} : CardPropsI) {
    return (
        <CardComponent>
            <div>id{card.id}</div>
            {card.brand && <div>Бренд {card.brand}</div>}
            <div>Цена: {card.price}</div>
            <div>Продукт: {card.product}</div>
        </CardComponent>
    )
}