import styled from "styled-components";

import {secondaryColor, accentColor, backgroundColor} from '../../Common/colorPalette';

export const Container = styled.div`
`;

export const Table = styled.table`
    border: 1px solid ${secondaryColor};
    border-radius: 5px;
    border-collapse: collapse;

    tr:nth-child(even){
        background-color: #dddddd;
    }
`;

export const THead = styled.thead`
    background-color: ${secondaryColor};
    color: ${backgroundColor};
    text-align: left;

    th {
        padding: .25rem .5rem;
    }
`;

export const Button = styled.button`
    background-color: ${props => props.backgroundColor};
    border: 0;
    padding: 1em;
    width: 100px;
    border-radius: 5px;
    box-shadow: 0 0 5px -2px black;
    cursor: pointer;
`;