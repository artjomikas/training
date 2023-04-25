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
  const [intervalDate, setIntervalDate] = useState(today);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const date = addDays(startDate, 4 * count);
    setIntervalDate(date);
  }, [count]);

  let days = eachDayOfInterval({
    start: intervalDate,
    end: addDays(intervalDate, 4),
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <MdOutlineKeyboardArrowLeft
          size={27}
          className="text-[#F39F2D] cursor-pointer"
          onClick={() => count > 0 && setCount(count - 1)}
        />
        <p className="font-semibold text-xl">
          {` ${format(intervalDate, "LLLL")}  ${format(
            intervalDate,
            "d"
          )} - ${format(addDays(intervalDate, 4), "d")}`}
        </p>
        <MdOutlineKeyboardArrowRight
          size={27}
          className="text-[#F39F2D] cursor-pointer"
          onClick={() => setCount(count + 1)}
        />
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
              ${
                !isEqual(date, selectedDate) ? "text-[#8C9AAD]" : "text-white"
              }`}
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
