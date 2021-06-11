import React from "react";
import { IConversation } from "../../../store/modules/conversations/types";

import { About } from "./About";
import { Members } from "./Members";
import { Pinned } from "./Pinned";

interface IAccordionsProps {
  channel: IConversation;
}

export const Accordeons: React.FC<IAccordionsProps> = ({
  channel,
}: IAccordionsProps) => {
  return (
    <>
      <About channel={channel} />
      <Members channel={channel} />
      <Pinned />
    </>
  );
};
