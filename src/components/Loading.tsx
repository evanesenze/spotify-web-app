import React, { FC } from "react";
import loading from "../assets/loading.gif";

const Loading: FC<ILoading> = ({ text }) => (
  <div>
    {text}
    <img width="20px" src={loading} />
  </div>
);

export default Loading;
