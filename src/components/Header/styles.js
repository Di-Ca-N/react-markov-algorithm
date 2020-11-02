import styled from 'styled-components';

import {primaryColor, backgroundColor} from '../../Common/colorPalette';

export const Container = styled.div`
    background-color: ${primaryColor};
    padding: 1em;
`;

export const Title = styled.h1`
    color: ${backgroundColor};
    font-size: ${props => props.fontSize ? props.fontSize : 25}px;
`;


