import React from "react";
import styled from "@emotion/styled";
import { Pagination } from "@mui/material";


interface MyPaginationProps {
    count: number;
    page: number;
    changePage: (value: number) => void
}

const WrapperPaginationComponent = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`

export function MyPagination({count, page, changePage} : MyPaginationProps) {
    function handleChangePage(e: unknown, page: number) {
        changePage(page)
    }

    return (
        <WrapperPaginationComponent>
            <Pagination
                color={'secondary'}
                page={page}
                onChange={handleChangePage}
                count={count}
                shape="rounded"
            />
        </WrapperPaginationComponent>
    )
}