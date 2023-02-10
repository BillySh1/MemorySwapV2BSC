import { darkColors, lightColors } from "../../theme/colors";

export interface NavThemeType {
  topbar: string;
  background: string;
}

export const light: NavThemeType = {
  topbar: '#B7D4F4',
  background: lightColors.backgroundNav,
};

export const dark: NavThemeType = {
  topbar:'#37376E',
  background: darkColors.backgroundNav,
};
