interface TooltipProps {
  message: string;
  children: JSX.Element;
}

const Tooltip = ({ message, children } : TooltipProps) => {
  return (
    <div className="group relative flex">
      {children}
      <p className="absolute w-max top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white  group-hover:scale-100">
        {message}
      </p>
    </div>
  );
};
export default Tooltip;
