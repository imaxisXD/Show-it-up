import { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import {
  userCreatedPinsQuery,
  userFetcher,
  userSavedPinsQuery,
} from "../scripts/sanityQueries";
import { client } from "../scripts/clientConnectionSanity";
import MasonryLayout from "./MasonryLayout";
import userInfoGetter from "../scripts/userInfoGetter";
import { Oval } from "react-loader-spinner";
import { googleLogout } from "@react-oauth/google";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-transparent hover:text-white hover:bg-red-300 mr-4 ml-4 text-white font-bold p-2 rounded-full w-20 outline-none border border-red-400 hover:border-transparent";

const UserProfile = () => {
  const [user, setUser] = useState<any>();
  const [pinInformation, setPinInformation] = useState<any>();
  const [text, setText] = useState<any>("Created");
  const [activeBtn, setActiveBtn] = useState<any>("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const User = userInfoGetter();

  useEffect(() => {
    if (userId) {
      const query = userFetcher(userId);
      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPinInformation(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPinInformation(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/login");
  };

  if (!user)
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Oval
          ariaLabel="loading-indicator"
          height={70}
          width={70}
          strokeWidth={5}
          strokeWidthSecondary={1}
          color="#FB7185"
          secondaryColor="#a1dbfa"
        />
      </div>
    );

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="user-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user?.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3 text-primary capitalize">
            {user?.Username}
          </h1>
          <div className="absolute top-0 z-1 right-0 p-2">
            {userId === User.sub && (
              <button
                type="button"
                onClick={logout}
                className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
              >
                <AiOutlineLogout color="red" fontSize={21} />
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-7">
          <button
            type="button"
            onClick={(e) => {
              setText((e.target as HTMLElement).textContent);
              setActiveBtn("created");
            }}
            className={`${
              activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Created
          </button>
          <button
            type="button"
            onClick={(e) => {
              setText((e.target as HTMLElement).textContent);
              setActiveBtn("saved");
            }}
            className={`${
              activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
            }`}
          >
            Saved
          </button>
        </div>

        <div className="px-2">
          <MasonryLayout pinInformation={pinInformation} />
        </div>

        {pinInformation?.length === 0 && (
          <div className="flex justify-center font-bold items-center w-full text-1xl mt-2 text-primary">
            No Pins Found!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
