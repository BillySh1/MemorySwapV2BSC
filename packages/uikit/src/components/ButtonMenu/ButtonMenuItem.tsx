import React from "react";
import styled from "styled-components";
import { PolymorphicComponent } from "../../util/polymorphic";
import Button from "../Button/Button";
import { BaseButtonProps, variants } from "../Button/types";
import { ButtonMenuItemProps } from "./types";

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps["as"];
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, "button"> = styled(Button)<InactiveButtonProps>`
  background-color: transparent;
  color: ${({ theme, variant }) => (variant === variants.PRIMARY ? theme.colors.primary : theme.colors.textSubtle)};
  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
`;

const StyledButton = styled(Button)`
  /* background-color: ${({ theme }) => (theme.isDark ? "$007AE3" : "#F1FBFF")}; */
`;

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, "button"> = ({
  isActive = false,
  variant = variants.PRIMARY,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return (
      <InactiveButton
        style={{ fontWeight: 700, fontFamily: "system-ui", whiteSpace: "nowrap" }}
        forwardedAs={as}
        variant={variant}
        {...props}
      />
    );
  }

  return (
    <StyledButton
      style={{ fontWeight: 700, fontFamily: "system-ui", whiteSpace: "nowrap" }}
      as={as}
      variant={variant}
      {...props}
    />
  );
};

export default ButtonMenuItem;
