import React from "react";
import { IConversation } from "../../../store/modules/conversations/types";

import { About } from "./About/About";
import { Members } from "./Members";

interface IAccordionsProps {
  channel: IConversation;
}

export const Accordeons: React.FC<IAccordionsProps> = ({ channel }) => {
  return (
    <>
      <About channel={channel} />
      <Members channel={channel} />
    </>
  );
};
