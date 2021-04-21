import React from "react";

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { About } from "./About";
import { Members } from "./Members";
import { Pinned } from "./Pinned";


// СДЕЛАТЬ ПАПКУ АККОРДЕОНОВ И СДЕЛАТЬ КАЖДЫЙ АККОРДЕОН КОМПОНЕНТОЙ

const channel = {
    name: "testchannel",
    topic: "This is my topic",
    description: "This is my desc",
    dateCreated: new Date(Date.now()),
    channelOwner: {}
}

const user = {
  name: "Alina",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
}

const users = new Array(2).fill(user)

export const Accordeons = () => {
  return (
    <>
    <About channel={channel} />
    <Members users={users} />
    <Pinned />
    </>
  );
};
