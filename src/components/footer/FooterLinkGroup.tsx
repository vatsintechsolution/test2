import * as React from "react";
import { FooterLinkGroupProps } from "../../types";

export const FooterLinkGroup: React.FC<FooterLinkGroupProps> = ({
  title,
  links,
}) => {
  return (
    <>
      <div className="mt-8 mb-4 text-xl font-bold leading-none text-center text-white">
        {title}
      </div>
      {links.map((link, index) => (
        <div
          key={index}
          className="mt-2 text-sm leading-loose text-center text-white"
        >
          {link}
        </div>
      ))}
    </>
  );
};
