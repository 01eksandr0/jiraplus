import React, { useState, useRef, useEffect } from "react";

export const Popover = ({
  isOpen = false,
  placement = "right",
  gap = 0,
  width = "",
  disabled = false,
  children,
  title,
}: {
  isOpen?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  gap?: number;
  width?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  title?: React.ReactNode;
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const popoverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      window.addEventListener("scroll", updatePopoverPosition);
      window.addEventListener("resize", updatePopoverPosition);
      updatePopoverPosition();
    } else {
      window.removeEventListener("scroll", updatePopoverPosition);
      window.removeEventListener("resize", updatePopoverPosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePopoverPosition);
      window.removeEventListener("resize", updatePopoverPosition);
    };
  }, [isVisible]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    const handlePopState = () => setIsVisible(false);

    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("popstate", handlePopState); // Close on browser back button

    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const togglePopover = () => {
    if (!disabled) {
      setIsVisible(!isVisible);
    }
  };

  const updatePopoverPosition = () => {
    if (popoverRef.current && contentRef.current) {
      const toggleRect = popoverRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      let top, left;

      switch (placement) {
        case "top":
          top = toggleRect.top - contentRect.height - gap;
          left = toggleRect.left + toggleRect.width / 2 - contentRect.width / 2;
          break;
        case "bottom":
          top = toggleRect.bottom + gap;
          left = toggleRect.left + toggleRect.width / 2 - contentRect.width / 2;
          break;
        case "left":
          top = toggleRect.top + toggleRect.height / 2 - contentRect.height / 2;
          left = toggleRect.left - contentRect.width - gap;
          break;
        case "right":
          top = toggleRect.top + toggleRect.height / 2 - contentRect.height / 2;
          left = toggleRect.right + gap;
          break;
        default:
          top = toggleRect.bottom + gap;
          left = toggleRect.left + toggleRect.width / 2 - contentRect.width / 2;
      }

      contentRef.current.style.top = `${top}px`;
      contentRef.current.style.left = `${left}px`;
    }
  };

  return (
    <div className="relative">
      <div
        ref={popoverRef}
        onClick={togglePopover}
        className={`cursor-pointer ${
          disabled ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {title || (
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Click me!
          </button>
        )}
      </div>
      {isVisible && (
        <div
          ref={contentRef}
          className={`fixed bg-white border shadow-lg rounded-lg  transition-opacity ${
            width ? `w-${width}` : "w-auto"
          }`}
          style={{ zIndex: 2 }}
        >
          <div className="relative">
            {children || <span>Popover content</span>}
          </div>
        </div>
      )}
    </div>
  );
};
