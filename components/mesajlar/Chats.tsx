import React from 'react'
import MessageUserContainer from './MessageUserContainer'
import { Client } from '@/pages/messages'

const Chats = ({clients,setTargetNickName}: {clients: Client[], setTargetNickName: (nickname: string) => void}) => {
  return (
    <div className='h-[90%] flex-col overflow-scroll pt-14'>
      {clients.map((client,index)=> (
        <MessageUserContainer key={index} name={client.userName} setTargetNickName={setTargetNickName}/>
      ))}
    </div>
  )
}

export default Chats
