import React, { ReactElement } from "react";
import { IoClose } from "react-icons/io5";

interface IProps {
  children: ReactElement | string;
  setVisible: (newStatus: boolean) => void;
  isVisible: boolean;
}

export const Dialog: React.FC<IProps> = ({
  children,
  setVisible,
  isVisible,
}) => {
  return (
    isVisible && (
      <div className="z-[3] fixed top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
        <div className=" w-[50vw] min-w-[300px] bg-white rounded-xl border ">
          {/* header */}
          <div className=" flex justify-between items-center py-2.5 px-4 border-b">
            <h2 className="font-medium text-gray-800 ">{"Title"}</h2>
            <button
              onClick={() => setVisible(false)}
              className=" inline-flex h-[32px] w-[32px] justify-center items-center gap-x-2 rounded-full border  border-transparent bg-gray-100 text-gray-800  hover:bg-gray-200 "
            >
              <IoClose size={16} />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};
