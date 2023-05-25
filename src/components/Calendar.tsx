import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useContext } from "react";
import { DataContext } from "./../context/DataContext";
import dayjs from "dayjs";

const Calendar = () => {
  const { selectedDate, setSelectedDate } = useContext(DataContext);

  let today = dayjs();
  const [intervalDate, setIntervalDate] = useState(today);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = today.add(4 * count, "day");
    setIntervalDate(interval);
  }, [count]);

  let days: any[] = [];
  const dateRange = () => {
    const times = 5;
    for (let i = 0; i < times; i++) {
      const toPrint = dayjs(intervalDate).add(1 * i, "day");
      days.push(toPrint);
    }
  };
  dateRange();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <MdOutlineKeyboardArrowLeft
          size={27}
          className="text-[#F39F2D] cursor-pointer"
          onClick={() => count > 0 && setCount(count - 1)}
        />
        <p className="font-semibold text-xl">
          {` ${dayjs(intervalDate).format("MMM")}  ${dayjs(intervalDate).format(
            "D"
          )} -   ${dayjs(intervalDate).add(4, "day").format("D")}`}
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
                dayjs(date).isSame(selectedDate, "d") && "bg-[#F39F2D]"
              }`}
              key={i}
            >
              <button
                className={`flex flex-col items-center  leading-5
              ${
                !dayjs(date).isSame(selectedDate, "d")
                  ? "text-[#8C9AAD]"
                  : "text-white"
              }`}
                onClick={() => setSelectedDate(date.toDate())}
              >
                <h2>{dayjs(date).format("dd")}</h2>
                <h3
                  className={`${
                    !dayjs(date).isSame(selectedDate, "d") && "text-[#111235]"
                  }`}
                >
                  {dayjs(date).format("D")}
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
