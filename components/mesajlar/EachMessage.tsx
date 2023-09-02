import React from "react";

const EachMessage = ({group, targetUserName}: { group:{sender: string; messages: string[]}, targetUserName: string}) => {
  return (
    <>
    {group.messages.map((message, index) => (
      <div
        key={index} // Provide a unique key for each rendered message
        className={`message ${group.sender === targetUserName ? "" : "owner"}`}
      >
        {message}
      </div>
    ))}
    
    </>
  );
};

export default EachMessage;
