import { Fragment , useState, useEffect} from 'react';
import styled from 'styled-components';
import Svg from './svg-patterns';
import { encode } from "universal-base64";
import { useModals } from '../hooks/usemodals';
import NewAsk from './form/new-ask';
import Button from './button';
import Avatar from './avatar';
import { Padding, Flex } from './layout-helpers';

const StyledAskBox = styled.div`
    padding: 10px;
    margin: -10px -10px 10px -10px;
    background: #FFFFFF;
    background-image: ${
        ()=>`url("data:image/svg+xml;base64,${encode(
            Svg({ color: '#ff360080', density: 2, opacity: 1 })
        )}")`}

`;

const Input = styled.input`
    padding: 8px;
    height: 37px;
    border: 1px solid #5b00ff;
    width: 100%;
`;

const Title = styled.h2`
    font-family: 'Permanent Marker', monospace;
    font-size: 30px;
    color: #5b00ff;
    margin-bottom: 10px;
`;

const Content = styled.div`
    display: flex;
    align-items: flex-start;
`;

const StyledHandleDropdown = styled.div`
    position: absolute;
    background: white;
    padding: 0px 10px;
    z-index: 50;
    width: 350px;
`;

const ProfileItem = styled(Flex)`
    margin: 0px -10px;
    &:hover {
        color: #FFFFFF;
        background-color: #5b00ff;
        background-image: ${
            ()=>`url("data:image/svg+xml;base64,${encode(
                Svg({ color: '#FFFFFF', density: 3, opacity: 0.7 })
            )}")`}
    }
`;

const ModalContent = () => {
    const { popModal } = useModals();
    return(
        <Fragment>
            <div onClick={popModal}>test modal content (click to close)</div>
            <NewAsk />
        </Fragment>
    )
}

const HandleDropdown = (props: any) => {
    const cleanHandle = props.handle.replace('@', '');
    return(
            <StyledHandleDropdown>
                <ProfileItem style={{alignItems: 'center', borderBottom: '1px dotted black', padding: '10px'}}>
                    <Avatar multiHandle={`TW:${cleanHandle}`} />
                    <div style={{marginLeft: '10px'}}>{props.handle} on Twitter</div>
                </ProfileItem>
                <ProfileItem style={{alignItems: 'center', padding: '10px'}}>
                    <Avatar multiHandle={`IG:${cleanHandle}`} />
                    <div style={{marginLeft: '10px'}}>{props.handle} on Instagram</div>
                </ProfileItem>
            </StyledHandleDropdown>
        )
}

const AskFlowStart = () => {
    const { pushModal } = useModals();
    const [handle, setHandle] = useState();
    const [debouncedHandle, setDebouncedHandle] = useState();
    const [timeoutId, setTimeoutId] = useState();


    useEffect(()=> {
        clearTimeout(timeoutId);
        const id = setTimeout(()=>setDebouncedHandle(handle), 1000);
        setTimeoutId(id);
    }, [handle])

    return (
        <StyledAskBox>
            <div>
                <Title>Create new</Title>
            </div>
            <Content>
                <Flex style={{alignItems: 'center'}}>
                    <label htmlFor="handle">Asking</label>
                    <div style={{position: 'relative', marginLeft: '10px', zIndex: handle ? 10 : 0}}>
                        <Input name="handle" id="handle" type="text" placeholder="@handle" value={handle} onChange={e=>setHandle(e.target.value)}></Input>
                        {handle && debouncedHandle && <HandleDropdown handle={debouncedHandle} />}
                    </div>
                </Flex>
                <div style={{marginLeft: 'auto'}}>
                    <Button dark onClick={
                    ()=>pushModal(<ModalContent />, { overlay: true })}>Modal open</Button>
                </div>
            </Content>

        
        </StyledAskBox>

    )
}

export default AskFlowStart;