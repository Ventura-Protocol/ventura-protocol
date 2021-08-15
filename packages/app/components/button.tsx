import styled from 'styled-components';
import Svg from './svg-patterns';
import { encode } from "universal-base64";

const StyledButton = styled.button`

    font-family: Courier, monospace;  
    cursor: pointer;
    &:hover {
        background-color: rgb(240,240,240,1);
    }

    position: relative;
    padding: 8px 12px;;
    font-size: 1rem;
    border-style: solid;
    border-width: 2px;
    border-color: rgb(255, 255, 255) rgb(10, 10, 10) rgb(10, 10, 10) rgb(255, 255, 255);
    // box-shadow: rgb(0 0 0 / 35%) 4px 4px 10px 0px, rgb(254 254 254) 1px 1px 0px 1px inset, rgb(132 133 132) -1px -1px 0px 1px inset;
    box-sizing: border-box;
    display: inline-block;
    background: rgb(230, 210, 110);
    color: rgb(10, 10, 10);
    background-image: ${
        ()=>`url("data:image/svg+xml;base64,${encode(
            Svg({ color: '#FFFFFF', density: 1, opacity: 0.9 })
        )}")`}
`;

const InnerBox = styled.div`
    // position: absolute;
    // top: 2px;
    // left: 2px;
    // right: 2px;
    // bottom: 2px;
    // border: ${({dark})=>!dark ? `1px solid white`:`1px solid #5b00ff`};
`

const Button = ({size, dark, children, ...rest} : {size: number, dark: boolean, children: any}) => {
    return(
        <StyledButton dark={dark} {...rest}>
            <InnerBox dark={dark}></InnerBox>
            {children}
        </StyledButton>
    )
}

export default Button;