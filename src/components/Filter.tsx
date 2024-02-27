import React from "react";
import { TextField, FormControlLabel, RadioGroup, Radio, FormControl} from "@mui/material";
import { Param } from "../types/types";

interface FilterProps {
    valueParams: string;
    valueSearch: string;
    onChangeSearchField: (value: string) => void;
    changeRadioButton: (str: Param) => void;
}

export function Filter({valueParams, valueSearch, changeRadioButton, onChangeSearchField }: FilterProps) {

    function handleChangeRadioButton(event: React.ChangeEvent<HTMLInputElement>) {
        changeRadioButton(event.currentTarget.value as Param)
    }

    function handleChangeSearchField(event: React.ChangeEvent<HTMLInputElement>) {
        onChangeSearchField(event.currentTarget.value)
    }

    return (
        <FormControl sx={{
            border: "2px solid white",
            borderRadius: '20px',
            padding: '15px',
        }}>
            <TextField
                id="search"
                label="Поиск"
                variant="outlined"
                value={valueSearch}
                onChange={handleChangeSearchField}
            />
            <RadioGroup
                row
                aria-labelledby="row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={valueParams}
                onChange={handleChangeRadioButton}
            >
                <FormControlLabel value="product" control={<Radio/>} label="product"/>
                <FormControlLabel value="brand" control={<Radio/>} label="brand"/>
                <FormControlLabel value="price" control={<Radio/>} label="price"/>
                <FormControlLabel value="id" control={<Radio/>} label="id"/>
            </RadioGroup>
        </FormControl>
    );
}
