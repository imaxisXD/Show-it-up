import { useState, useEffect, useRef } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import logo from "../assets/logo.png";

import { SideBar, UserProfile } from "../components";
import Pins from "./Pins";

import { client } from "../scripts/clientConnectionSanity";
import { userFetcher } from "../scripts/sanityQueries";
import userInfoGetter from "../scripts/userInfoGetter";

interface User {
  Username: string;
  image: string;
  email: string;
  _id: string;
}
export default function Home() {
  const [toggleSideBar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState<User | null | void>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const userInfo = userInfoGetter();
  useEffect(() => {
    const query = userFetcher(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-50 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="logo"
              className="w-12 h-auto rounded-full"
            />
          </Link>
        </div>
        {toggleSideBar && (
          <div className="fixed w-2/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in ">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={22}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <SideBar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div
        className="pb-2 flex-1 h-screen overflow-y-scroll bg-themeColor"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
}
