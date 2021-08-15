import styled from 'styled-components';

const Flex = styled.div`
    display: flex;
`;

const Padding = styled.div`
    padding: 10px;
`;

const Margin = styled.div`
    margin: 10px;
`;

const CloseText = styled.span`
    font-family: 'Permanent Marker', monospace;
    font-size: 30px;
    position: absolute;
    right: -30px;
    cursor: pointer;
    top:-30px;
    color: rgb(173, 87, 227);
`;

export {
    Flex,
    Padding,
    Margin,
    CloseText
}