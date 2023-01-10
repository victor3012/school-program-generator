import { createContext, useState } from "react";

export const DataContext = createContext();

// context for easening communication between parent/child components 
// used when fetching data in main/parent component

export function DataProvider({ children }) {
    const [data, setData] = useState(null);

    return (
        <DataContext.Provider value={{
            data,
            setData
        }}>
            {children}
        </DataContext.Provider>
    )
}