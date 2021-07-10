import React from "react";

import { HeadTemplate } from "../components/templates/HeadTemplate";
import { CommonTemplate } from "src/components/templates/CommonTemplate";

const TopPage = () => {
  return (
    <React.Fragment>
      <HeadTemplate pageTitle="TopPage" />
      <CommonTemplate>TopPage</CommonTemplate>
    </React.Fragment>
  );
};

export default TopPage;
