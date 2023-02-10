import { useRouter } from "next/router";
import React, { AnchorHTMLAttributes } from "react";

const MenuLink: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...otherProps }) => {
  const router = useRouter();
  const isHttpLink = href?.startsWith("https") || href?.startsWith('http');

  return (
    <a
      {...otherProps}
      onClick={(e) => {
        if (isHttpLink) window.open(href);
        router.push(href ?? "/");
      }}
    />
  );
};

export default MenuLink;
