import { ComponentProps, ElementType, useRef } from "react";
import { Button } from "./button";

export const CombinedButton = ({
  children,
  FunctionalityButton,
  props,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  FunctionalityButton: ElementType;
  props?: ComponentProps<typeof Button>;
  className?: string;
  onClick?: () => void;
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const hiddenBtn = wrapperRef.current?.querySelector("button");
    hiddenBtn?.click();
    onClick?.();
  };

  return (
    <>
      <Button onClick={handleClick} {...props} className={className}>
        {children || "Disconnect"}
      </Button>

      <div ref={wrapperRef} style={{ display: "none" }}>
        <FunctionalityButton />
      </div>
    </>
  );
};
