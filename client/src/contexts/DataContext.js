import { createContext, useState } from "react";

export const DataContext = createContext();

// context for easening communication between parent/child components 
// used when fetching data in main/parent component

export function DataProvider({ children }) {
    const [data, setData] = useState(null);

    const removeById = (id) => {
        setData(d => {
            const selectedIdx = d.findIndex(x => x.id === id);
            return d.slice(0, selectedIdx).concat(d.slice((selectedIdx + 1)));
        });
    }

    const updateById = (id, newObject) => {
        setData(d => {
            const selectedIdx = d.findIndex(x => x.id === id);
            const newData = d.slice();
            newData[selectedIdx] = newObject;
            return newData;
        });
    }

    return (
        <DataContext.Provider value={{
            data,
            setData,
            removeById,
            updateById
        }}>
            {children}
        </DataContext.Provider>
    )
}