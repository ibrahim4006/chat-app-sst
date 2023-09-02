"use client"
import Image from 'next/image'
import {useState} from 'react'

const Search = () => {
    const [userName, setUserName] = useState("")
  return (
    <div className="w-full h-[10%] flex justify-start border-b border-black">
      <div className="basis-3/4 flex justify-start items-center ml-[5%] relative">
        <input
          type="text"
          className="bg-transparent rounded-tl-md rounded-bl-md border w-[85%] h-8 flex p-3"
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Find a user"
          value={userName}
        />
        <button className="flex justify-center rounded-tr-md rounded-br-md items-center bg-transparent h-8 p-3">
          <Image
            src="/search.svg"
            alt="search icon"
            width={20}
            height={20}
            className="object-contain"
          />
        </button>
      </div>
      <div className="basis-1/4 flex justify-center space-x-6 items-center">
        <Image
            src="/trashbox.svg"
            alt="trash icon"
            width={25}
            height={25}
            className="object-contain"
          />
        <Image
            src="/Plus.svg"
            alt="plus icon"
            width={20}
            height={20}
            className="object-contain"
          />
        <Image
            src="/grup.svg"
            alt="grup icon"
            width={40}
            height={25}
            className="object-contain"
          />
      </div>
    </div>
  )
}

export default Search
