import styled from "@emotion/styled";
import {Pagination} from "@mui/material";

interface MyPaginationProps {
    count: number
}

const WrapperPaginationComponent = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`

export function MyPagination({count} : MyPaginationProps) {
    return (
        <WrapperPaginationComponent>
            <Pagination count={count} shape="rounded" />
        </WrapperPaginationComponent>
    )
}