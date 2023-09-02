"use client";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";


export default function page() {
  const router = useRouter();
  const [open_animation, setOpenAnimation] = useState(false);
  const [userName, setUserName] = useState("")


  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Add any desired animation logic here
    setOpenAnimation(!open_animation)
    setUserName(userName)

    // Redirect to the desired page after the animation or transition
    setTimeout(() => {
      router.push({ pathname: "/messages", query: { Name: userName } })
    }, 500);
  };

  return (
    <div
      className={
        open_animation
          ? "center animate_content_opening"
          : "center animate_content_closing"
      }
    >
      <div className="logincard fade">
        <div className="logbackground"></div>
        <div className="logframe">
          <div className="logframe-top"></div>
          <div className="logframe-bottom"></div>
        </div>
        <div className="logtop-part">
          <div className="flex justify-center items-center">
            <Image
              src="/boomeranglogin.svg"
              alt="Bommerang Logo"
              priority={true}
              width={250}
              height={80}
              className="mt-12"
            />
          </div>
        </div>
        <div className="logbottom-part">
            <input
              type="text"
              className="flex justify-start items-center border-b w-[90%] h-10 bg-transparent focus:border-b-4 focus:border focus:border-[#f7f6f1] text-[#f7f6f1] outline-0"
              placeholder="email"
              onChange={(e)=>setUserName(e.target.value)}
              value={userName}
            />
            <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="flex justify-center items-center border border-b-4 border-[#f7f6f1] text-[#f7f6f1] w-28 h-10"
                  onClick={handleButtonClick}
                >
                  Giriş
                </button>
            </div>
        </div>
      </div>
    </div>
    // </div>
  );
}