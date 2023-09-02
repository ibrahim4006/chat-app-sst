import React from "react";
import { Message } from "@/pages/messages";
import EachMessage from "./EachMessage";

const Messages = ({
  messages,
  userName,
  targetUserName,
}: {
  messages: Message[],
  userName: String,
  targetUserName: string
}) => {
  const groupedMessages = messages.reduce<
    { sender: string; messages: string[] }[]
  >((acc, curr) => {
    if (acc.length > 0 && acc[acc.length - 1].sender === curr.sender) {
      acc[acc.length - 1].messages.push(curr.message);
    } else {
      acc.push({
        sender: curr.sender,
        messages: [curr.message],
      });
    }

    return acc;
  }, []);

  return (
    <div className="h-[68%] border border-white p-2 overflow-scroll">
      {groupedMessages.map((group,index) => (
        <EachMessage key={index} group={group} targetUserName={targetUserName}/>
      ))}
    </div>
  );
};

export default Messages;
