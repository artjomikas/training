import Tooltip from "../components/Tooltip";

interface IntensityProps {
  name: string;
}

const Intensity = ({ name }: IntensityProps) => {
  const data = ["Very Light", "Light", "Moderate", "Hard", "Extremely Hard"];
  const classNames = [
    "from-[#90C959] to-[#B1CD56]",
    "from-[#B1CD56] to-[#E1D65E]",
    "from-[#E1D65E] to-[#FBBC2B]",
    "from-[#FBBC2B] to-[#F67C26]",
    "from-[#F67C26] to-[#F13D1F]",
  ];
  const numOfIndex = data.indexOf(name);

  return (
    <div className="flex gap-2">
      {classNames.map((gradient, index) => (
        <Tooltip message={name} key={index}>
          <div
            key={index}
            className={`${gradient} bg-gradient-to-r  w-[20px] h-[7px] rounded-md my-auto ${
              numOfIndex < index && "hidden"
            }`}
          ></div>
        </Tooltip>
      ))}
    </div>
  );
};
export default Intensity;
