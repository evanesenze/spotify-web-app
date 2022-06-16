import React, { FC, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AuthComponent: FC<IAuthProps> = ({ spotifyHandler }) => {
  const [searchParams, _] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    if (spotifyHandler && code) {
      spotifyHandler.getUserToken(code).then(() => nav("/"));
    } else {
      if (error) console.error(error);
      nav("/");
    }
  }, []);

  return <Loading text="waiting authorization" />;
};

export default AuthComponent;
