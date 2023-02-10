import React, { useState } from "react";
import styled from "styled-components";
import { Box } from "../../components/Box";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Mask from "./Mask";
import Logo from "./components/Logo";
import {
  MENU_HEIGHT,
  SIDEBAR_WIDTH_FULL,
  SIDEBAR_WIDTH_REDUCED,
  links,
} from "./config";
import { NavProps } from "./types";
import { MenuContext } from "./context";
import Panel from "./Panel";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.topbar};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  transform: translate3d(0, 0, 0);

  padding-left: 16px;
  padding-right: 16px;
`;

const FixedContainer = styled.div<{ showMenu: boolean; height?: number }>`
  position: fixed;
  top: ${({ showMenu, height }) => (showMenu ? 0 : `-${height ?? 0}px`)};
  left: 0;
  transition: top 0.2s;
  height: ${({ height }) => `${height}px`};
  width: 100%;
  z-index: 20;
`;

const BodyWrapper = styled(Box)`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-left 0.2s;
  transform: translate3d(0, 0, 0);
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  }
  max-width: 100%;
  overflow-x:hidden;
  overflow-y: auto;
  max-height: calc(100vh - 50px);
`;
const MobileOnlyOverlay = styled(Mask)`
  position: fixed;
  height: 100%;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

// const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
//   flex-grow: 1;
//   transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
//   transform: translate3d(0, 0, 0);
//   max-width: 100%;
// `;

const Menu: React.FC<NavProps> = ({
  linkComponent = "a",
  userMenu,
  banner,
  globalMenu,
  isDark,
  toggleTheme,
  currentLang,
  setLang,
  cakePriceUsd,
  footerLinks,
  activeItem,
  activeSubItem,
  langs,
  buyCakeLabel,
  children,
  t,
}) => {
  const { isMobile, isMd } = useMatchBreakpoints();
  const [isPushed, setIsPushed] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  return (
    <MenuContext.Provider value={{ linkComponent }}>
      <Wrapper>
        <FixedContainer showMenu={showMenu}>
          <StyledNav>
            <Flex>
              <Logo
                isPushed={isPushed}
                togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
                isDark={isDark}
                href={"/"}
              />
            </Flex>
            <Flex alignItems="center" height="100%">
              {userMenu}
            </Flex>
          </StyledNav>
        </FixedContainer>

        <BodyWrapper>
          <Panel
            isPushed={isPushed}
            isMobile={isMobile}
            showMenu={showMenu}
            isDark={isDark}
            toggleTheme={toggleTheme}
            langs={langs}
            setLang={setLang as any}
            currentLang={currentLang}
            cakePriceUsd={cakePriceUsd}
            pushNav={setIsPushed}
            links={links(t)}
            priceLink={" "}
          />
          <Inner isPushed={isPushed} showMenu={showMenu}>
            {children}
          </Inner>
          <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
        </BodyWrapper>
      </Wrapper>
    </MenuContext.Provider>
  );
};

export default Menu;
