import React from "react";
import styled from "styled-components";
import { SvgProps } from "../../components/Svg";
import * as IconModule from "./icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "./types";
import { useRouter } from "next/router";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  // Close the menu when a user clicks a link on mobile
  const location = useRouter();
  const handleClick = () => {
    if (isMobile) {
      pushNav(false);
    }
  };

  return (
    <Container>
      {links.map((entry) => {
        const Icon = Icons[entry.icon];
        const iconElement = <Icon width="24px" mr="24px" />;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;
        return entry.items ? (
          <Accordion
            key={entry.label}
            isPushed={isPushed}
            pushNav={pushNav}
            icon={iconElement}
            label={entry.label}
            initialOpenState={entry.initialOpenState}
            className={calloutClass}
          >
            {isPushed &&
              entry.items.map((item) => (
                <MenuEntry key={item.label} secondary isActive={item.href === location.pathname} onClick={handleClick}>
                  <MenuLink style={{ fontWeight: 500 }} href={item.href}>
                    {item.label}
                  </MenuLink>
                </MenuEntry>
              ))}
          </Accordion>
        ) : (
          <MenuEntry
            key={entry.label}
            isActive={entry.href === location.pathname}
            className={calloutClass}
            onClick={handleClick}
          >
            <MenuLink href={entry.href}>
              {iconElement}
              <LinkLabel style={{ fontWeight: 500 }} isPushed={isPushed}>
                {entry.label}
              </LinkLabel>
            </MenuLink>
          </MenuEntry>
        );
      })}
    </Container>
  );
};

export default PanelBody;
