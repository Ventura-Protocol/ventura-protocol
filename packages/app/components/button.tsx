import styled from 'styled-components';

const StyledButton = styled.button`
    border-radius: 3px;
    position: relative;
    border: ${({dark})=>!dark ? `1px solid white`:`1px solid #5b00ff`};
    padding: 10px;
    background: transparent;
    color: ${({dark})=>!dark ? `white`:`#5b00ff`};
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: rgb(255,255,255,0.4);
    }
    text-transform: uppercase;
`;

const InnerBox = styled.div`
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border: ${({dark})=>!dark ? `1px solid white`:`1px solid #5b00ff`};
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