import {
  add,
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useContext } from "react";
import { DataContext } from "./../context/DataContext";

const Calendar = () => {
  const { selectedDate, setSelectedDate } = useContext(DataContext);

  let today = startOfToday();

  let [startDate, setStartDate] = useState(today);
  let [endDate, setEndDate] = useState(addDays(today, 4));

  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  let days = eachDayOfInterval({
    start: today,
    end: addDays(today, 4),
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <MdOutlineKeyboardArrowLeft size={27} className="text-[#F39F2D]" />
        <p className="font-semibold text-xl">
          {` ${format(selectedDate, "LLLL")}  ${format(
            startDate,
            "d"
          )} - ${format(endDate, "d")}`}
        </p>
        <MdOutlineKeyboardArrowRight size={27} className="text-[#F39F2D]" />
      </div>

      <div className="flex gap-[30px] pt-4">
        <div className="bg-[#F9F8FA] flex gap-[30px] rounded-lg">
          {days.map((date: any, i: number) => (
            <div
              className={`w-[45px] h-[55px] flex justify-center items-center rounded-lg ${
                isEqual(date, selectedDate) && "bg-[#F39F2D]"
              }`}
              key={i}
            >
              <button
                className={`flex flex-col items-center  leading-5
              ${!isEqual(date, selectedDate) ? "text-[#8C9AAD]" : "text-white"}`}
                onClick={() => setSelectedDate(date)}
              >
                <h2>{format(date, "iiiiii")}</h2>
                <h3
                  className={`${
                    !isEqual(date, selectedDate) && "text-[#111235]"
                  }`}
                >
                  {format(date, "d")}
                </h3>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Calendar;
