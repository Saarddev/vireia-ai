import { ReactNode } from "react";

interface PopunderWrapperProps {
  children: ReactNode;
  scriptUrl?: string;
}

const PopunderWrapper = ({
  children,
  scriptUrl = "//pl27171284.profitableratecpm.com/e2/2b/2d/e22b2d7ff274122d0be5ae9c8efc4161.js",
}: PopunderWrapperProps) => {
  const handleClick = () => {
    // Direct click event
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export default PopunderWrapper;
