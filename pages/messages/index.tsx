"use client"
import Chats from "@/components/mesajlar/Chats";
import InputMessage from "@/components/mesajlar/InputMessage";
import Messages from "@/components/mesajlar/Messages";
import Search from "@/components/mesajlar/Search";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import WebSocketConnector from "@/utils/WebSocketConnector";
import { send } from "process";
import { v4 } from "uuid";

export type Client = {
    connectionId: string;
    userName: string;
  };
export type Message = {
    messageId: string,
    nicknameToNickname: string,
    message: string,
    sender: string,
    createdAt: number
  };

  const WS_URL = "wss://iz3g0o8ork.execute-api.us-east-1.amazonaws.com/dev";
const webSocketConnector = new WebSocketConnector()

const Mesajlar = () => {
    const router = useRouter();
    const { Name } = router.query;
    const userName = Name as string;
    

    const [clients, setClients] = useState<Client[]>([])
    const [targetNickName, setTargetNickName] = useState("")
    const [messages, setMessages] = useState<Message[]>([])

    const websocketConnectorRef = useRef(webSocketConnector)

    const name = userName as string

    const url = `${WS_URL}?userName=${name}`;

    const ws = websocketConnectorRef.current.getConnection(url)

    ws.onopen = () => {
        ws.send(JSON.stringify({
            action: "getClients"
        }))
    }

    ws.onmessage = (e) => {
        const message = JSON.parse(e.data) as {
            type: string
            value: unknown
        }

        console.log(message)

        if(message.type === "clients"){
            setClients((message.value as {clients: Client[]}).clients)
        }
        if(message.type === "messages"){
            setMessages((message.value as {messages: Message[]}).messages.reverse())
        }
        if(message.type === "message"){
            setMessages([...messages, (message.value as {message: Message}).message])
        }
    }


    const setTargetName = (name: string) => {
        ws.send(JSON.stringify({
            action: "getMessages",
            targetNickName: name,
            limit: 100
        }))
        setTargetNickName(name)
    }

    const sendMessage = (message: string) => {
        ws.send(JSON.stringify({
            action: "sendMessage",
            recipientUsername: targetNickName,
            message,
        }))

        setMessages([...messages,{
            message,
            sender: userName,
            createdAt: new Date().getTime(),
            messageId: v4(),
            nicknameToNickname: [userName,targetNickName].sort().join("#")
        }])
    }

  return (
    <main>
      <div className="flex">
        <div className="flex-none h-[60vw] w-[50%] border flex-col">
            <Search />
            <Chats clients={clients} setTargetNickName={setTargetName}/>
        </div>
        <div className="flex-auto h-[60vw] border bg-[#0D0D0D] color-[#F7F6F1] flex-col">
            <div className="h-[25%] border border-white text-[#F7F6F1] flex justify-end items-end pr-[5%] pb-[1%] capitalize">{targetNickName}</div>
            <Messages messages={messages} userName={userName} targetUserName={targetNickName}/>
            <InputMessage sendMessage={sendMessage}/>
        </div>
      </div>
    </main>
  );
};

export default Mesajlar;
