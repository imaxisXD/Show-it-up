import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import loginVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../scripts/clientConnectionSanity";

interface GoogleAuthObj {
  clientId?: string;
  credential?: string;
  select_by?: string;
}
interface UserData {
  name: string;
  picture: string;
  email: string;
  sub: string;
}

export default function Login() {
  const navigate = useNavigate();

  const onSuccessHandler = (credResponse: GoogleAuthObj) => {
    if (credResponse.credential) {
      const decodedResponse = jwtDecode(credResponse.credential);
      const { name, picture, email, sub }: UserData =
        decodedResponse as UserData;
      const doc = {
        _id: sub,
        _type: "users",
        Username: name,
        image: picture,
        email: email,
      };
      client.createIfNotExists(doc).then((res: any) => {
        console.log(`User was created, document ID is ${res._id}`);
        navigate("/", { replace: true });
      });
      localStorage.setItem("userDetails", JSON.stringify(decodedResponse));
    } else {
      console.log("ERROR: Google OAUTH Response doesnt contain credentials");
    }
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={loginVideo}
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo.png" width="200px" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              theme="filled_blue"
              text="signin"
              logo_alignment="center"
              onSuccess={onSuccessHandler}
              onError={() => {
                console.log("Error");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
