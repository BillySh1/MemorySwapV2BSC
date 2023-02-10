import Metamask from "../../components/Svg/Icons/Metamask";
import WalletConnect from "../../components/Svg/Icons/WalletConnect";
import TokenPocket from "../../components/Svg/Icons/TokenPocket";
import CoinbaseWallet from "../../components/Svg/Icons/CoinbaseWallet";
import OKXWalletIcon from "../../components/Svg/Icons/OKX";

import { Config, ConnectorNames } from "./types";

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 2,
    href: "https://metamask.app.link/dapp/pancakeswap.finance/",
  },
  {
    title: "Coinbase Wallet",
    icon: CoinbaseWallet,
    connectorId: ConnectorNames.WalletLink,
    priority: 4,
  },

  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    priority: 5,
  },
  {
    title: "TokenPocket",
    icon: TokenPocket,
    connectorId: ConnectorNames.Injected,
    priority: 3,
  },
  {
    title: "OKXWallet",
    icon: OKXWalletIcon,
    connectorId: ConnectorNames.OKX,
    priority: 1,
  },
];

export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";
