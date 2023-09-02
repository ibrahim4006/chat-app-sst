import React from 'react'

const MessageUserContainer = ({name,setTargetNickName}: {name:string; setTargetNickName: (nickname: string) => void}) => {
  return (
    <div className='w-full flex justify-start border-b cursor-pointer p-3' onClick={() => setTargetNickName(name)}>
      <div className='w-full flex-col justify-center ml-[10%]'>
        <div className='text-lg'><b>{name}</b></div>
        <div className='text-sm'><p>Ödevi yaptın mı</p></div>
      </div>
    </div>
  )
}

export default MessageUserContainer
