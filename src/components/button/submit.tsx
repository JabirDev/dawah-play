"use client";

import { FC } from "react";
import { Button, ButtonProps } from "../ui/button";

interface Props extends ButtonProps {
  isPending: boolean;
}

const ButtonSubmit: FC<Props> = ({
  isPending,
  children,
  disabled,
  ...props
}) => {
  return (
    <Button
      className="mt-10 w-full rounded-lg"
      size="sm"
      {...props}
      disabled={isPending || disabled}
      type="submit"
    >
      {isPending ? "Processing..." : children}
    </Button>
  );
};

export default ButtonSubmit;
