import styled from "styled-components";
import { Link } from "react-router-dom";
import { ButtonMenu, ButtonMenuItem } from "../ButtonMenu";

const StyledNav = styled.div`
  margin-bottom: 40px;
`;

function CardNav({ activeIndex = 0 }: { activeIndex?: number }) {
  //   const TranslateString = useI18n()
  return (
    <StyledNav>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          Swap
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          Liquidity
        </ButtonMenuItem>
        <ButtonMenuItem
          id="pool-nav-link"
          as="a"
          href="https://www.bnbchain.org/en/bridge"
          target="_blank"
          rel="noreferrer noopener"
        >
          Bridge
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  );
}

export { CardNav };
