import { Fragment, useRef, createContext, useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Svg from './svg-patterns';
import { encode } from "universal-base64";
const Modal = (props: any) => {

    const newRef = useRef();
    const initialFocus = props.initialFocus ? props.initialFocus : newRef;
    
    const styles = {
        Dialog: {
            position: 'fixed',
            zIndex: 50,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
        },
        Container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '10px',
        },
        Overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            opacity: 0.7,
        },
        Content: {
            zIndex: 0,
            backgroundColor: 'white',
            backgroundImage: `url("data:image/svg+xml;base64,${encode(
                    Svg({ color: '#000000', density: 3, opacity: 1 })
                )}")`
        },
        InnerContent: {
            margin: '20px',
            padding: '20px',
            backgroundColor: 'white',
        }
    }

    return(
    <Dialog
        as="div"
        static
        initialFocus={initialFocus}
        open={true}
        onClose={()=>undefined}
        style={styles.Dialog}
      >

        <div style={styles.Container} className="">
            {props.overlay && <Dialog.Overlay style={styles.Overlay} className="loading-animation" />}
            <div style={styles.Content} className="loading-animation">
                <div style={styles.InnerContent} className="" ref={!props.initialFocus && initialFocus}>
                    {props.children}
                </div>
            </div>
        </div>
    </Dialog>
)}

export const ModalContext = createContext(null);

export type ContextType = {
    stack: {}[], 
    pushModal: (component: any, modalProps: {}) => void,
    popModal: () => void,
    popAllModals: () => void,
}

const { Provider } = ModalContext;

const ModalProvider = (props: any) => {
    const [stack, setStack] = useState([]);
    const contextValue: ContextType = {
        stack, 
        pushModal: (component, modalProps) => setStack(current=>[...current, { component, modalProps}]),
        popModal: () => setStack(current=>current.slice(0, current.length - 1)),
        popAllModals: () => setStack([]),
    }
    return (
        <Fragment>
            <Provider value={contextValue}>
                {props.children}
                {stack.map((stackItem, i)=> <Modal key={i} {...stackItem.modalProps}>{stackItem.component}</Modal>)}
            </Provider>
        </Fragment>
    )
}


export default ModalProvider