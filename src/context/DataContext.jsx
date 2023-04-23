import { useState, createContext } from "react";
import { startOfToday } from "date-fns";
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  let today = startOfToday();

  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <DataContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
