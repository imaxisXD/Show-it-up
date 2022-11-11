import React from "react";
import { IoMdSearch, IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
export function Navbar(props: any) {
  const { user, searchKeyword, setSearchKeyword } = props;
  console.log(user);

  if (!user) return null;
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-solid border-2 shadow-md focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search"
          value={searchKeyword}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3 ">
        <Link to={`user-profile/${user?._id}`} className="hidden md:block">
          <img
            src={user.image}
            alt="user-pic"
            className="w-14 h-12 rounded-lg "
          />
        </Link>
        <Link
          to="/create-pin"
          className="bg-rose-400 text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center border-solid border-2 shadow-md hover:bg-rose-600"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
}
export default Navbar;
