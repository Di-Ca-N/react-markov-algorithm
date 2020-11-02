import styled from "styled-components";
import { secondaryColor } from "../../Common/colorPalette";

export const Tr = styled.tr`
    input {
        padding: .25rem;
        border: 1px solid ${secondaryColor};
        border-radius: 5px;
        width: 100%;
        height: 2rem;
    }
    
    td {
        padding: .5rem;

        button {
            background-color: red;
            width: 2rem;
            height: 2rem;
            display: flex;
            border-radius: 7px;
            cursor: pointer;
            color: white;
        }
    }
`