import { Fragment } from 'react';
import { useModals } from '../hooks/usemodals';
import NewAsk from './form/new-ask';

const ModalContent = () => {
    const { popModal } = useModals();
    return(
        <Fragment>
            <div onClick={popModal}>test modal content (click to close)</div>
            <NewAsk />
        </Fragment>
    )
}

const AskFlowStart = () => {
    const { pushModal } = useModals();
    return (
        <button onClick={
            ()=>pushModal(<ModalContent />, { overlay: true })
        }>Modal open</button>
    )
}

export default AskFlowStart;