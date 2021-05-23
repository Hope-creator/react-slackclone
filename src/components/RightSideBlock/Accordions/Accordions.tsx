import React from "react";
import { IConversation } from "../../../store/modules/conversations/types";
import { IUser } from "../../../store/modules/user/types";

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
      <Members users={channel.members as IUser[]} />
      <Pinned />
    </>
  );
};
