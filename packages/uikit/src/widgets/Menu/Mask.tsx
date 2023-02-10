import styled from "styled-components";
type OverlayProps = {
  show: boolean;
  zIndex?: number;
};

const Mask = styled.div.attrs({ role: "presentation" })<OverlayProps>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  transition: opacity 0.4s;
  opacity: ${({ show }) => (show ? 0.6 : 0)};
  z-index: ${({ zIndex }) => zIndex};
  pointer-events: ${({ show }) => (show ? "initial" : "none")};
`;

Mask.defaultProps = {
  show: false,
  zIndex: 10,
};

export default Mask;
