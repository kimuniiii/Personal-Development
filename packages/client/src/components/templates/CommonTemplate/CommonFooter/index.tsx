import type { VFC } from "react";

export const CommonFooter: VFC = () => {
  return (
    <footer>
      Copyright(c) ${new Date().getFullYear()} RIOT inc. All Rights Reserved
    </footer>
  );
};
