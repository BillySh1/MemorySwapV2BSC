export const links = (t: any) => [
  {
    label: t("Home"),
    icon: "HomeIcon",
    href: "/swap",
  },
  {
    label: t("Trade"),
    icon: "TradeIcon",
    items: [
      {
        label: t("Exchange"),
        href: "/swap",
      },
      {
        label: t("Liquidity"),
        href: "/liquidity",
      },
      {
        label: t("Bridge"),
        href: "https://defi.swft.pro?sourceFlag=memory",
      },
    ],
  },
  {
    label: t("Exchange"),
    icon: "IfoIcon",
    href: "/fdaoex",
  },
  // {
  //   label: t("Refund"),
  //   icon: "PoolIcon",
  //   href: "/refund",
  // },
  // {
  //   label: t("Presale"),
  //   icon: "FarmIcon",
  //   href: "/presale",
  // },
  {
    label: t("TimeLock"),
    icon: "TicketIcon",
    // href: "/timeLock",
    href: "/soon",
  },
  {
    label: t("WhiteList"),
    icon: "WhiteListIcon",
    // href: "/whitelist",
    href: "/soon",
  },
  {
    label: t("NFTs"),
    icon: "GroupsIcon",
    items: [
      {
        label: t("Market"),
        href: "/market",
      },
      {
        label: t("BlindBox"),
        href: "/blind",
      },
    ],
  },
  {
    label: t("DAO"),
    icon: "NftIcon",
    href: "/dao",
  },
  {
    label: t("GameFi"),
    icon: "GameFiIcon",
    href: "/gamefi",
  },
  // {
  //   label: t("IDO"),
  //   icon: "IfoIcon",
  //   href: "/ido",
  // },
  {
    label: t("Info"),
    icon: "InfoIcon",
    items: [
      {
        label: t("Overview"),
        href: "/overview",
      },
      {
        label: t("Tokens"),
        href: "/tokens",
      },
      {
        label: t("Pairs"),
        href: "/pairs",
      },
      {
        label: t("Accounts"),
        href: "/accounts",
      },
    ],
  },
  {
    label: t("More"),
    icon: "MoreIcon",
    items: [
      {
        label: t("Docs"),
        href: "https://docs.memorylabs.cloud",
      },
    ],
  },
];

export const socials = [
  {
    label: "Telegram",
    icon: "TelegramIcon",
    items: [
      {
        label: "English",
        href: "https://t.me/MemorySwap_EN",
      },
      {
        label: "简体中文",
        href: "https://t.me/MemorySwapDao",
      },
    ],
  },
  {
    label: "Twitter",
    icon: "TwitterIcon",
    href: "https://twitter.com/Memory_Labs?s=09",
  },
];

export const MENU_HEIGHT = 50;
export const MENU_ENTRY_HEIGHT = 48;
export const MOBILE_MENU_HEIGHT = 44;
export const SIDEBAR_WIDTH_FULL = 240;
export const SIDEBAR_WIDTH_REDUCED = 56;
export const TOP_BANNER_HEIGHT = 70;
export const TOP_BANNER_HEIGHT_MOBILE = 84;
