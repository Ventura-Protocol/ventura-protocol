import styled from 'styled-components';

const StyledButton = styled.button`
    border-radius: 3px;
    position: relative;
    border 1px solid white;
    padding: 10px;
    background: transparent;
    color: white;
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
    border 1px solid white;
`

const Button = ({size, children, ...rest} : {size: number, children: any}) => {
    return(
        <StyledButton {...rest}>
            <InnerBox></InnerBox>
            {children}
        </StyledButton>
    )
}

export default Button;