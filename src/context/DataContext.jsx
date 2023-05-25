import { useState, createContext } from "react";
export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const today = new Date()

  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState('8c090c9d-b0f4-4d83-a6c2-4bf94f4346bc');

  return (
    <DataContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedWorkoutType,
        setSelectedWorkoutType,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
