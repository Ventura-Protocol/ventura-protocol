import { Fragment, useRef, createContext, useContext, useState } from 'react';

export const AppStateContext = createContext(null);
const { Provider } = AppStateContext;
const AppStateProvider = ({ children, entities = {} }) => {
    const storage = [];
    const entityKeys = Object.keys(entities);
    for (const key of entityKeys) {
        const initialValue = entities[key];
        storage.push(useState(initialValue));
    }
    const contextValue = storage.reduce((acc, eachStorage, i) => ({ 
            ...acc,  
            [entityKeys[i]]: {
                itself: eachStorage[0], 
                set: eachStorage[1]
            }
        }), {});
    return(
        <Provider value={contextValue}> 
            {children}
        </Provider>
    )
}

export default AppStateProvider;