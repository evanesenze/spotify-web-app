import React, { FC } from "react";
import styled from "styled-components";
import { ReactComponent as TriangleDown } from "../../assets/triangleDown.svg";
import avatar from "../../assets/avatar.svg";
import { ReactComponent as Back } from "../../assets/back.svg";
import { ReactComponent as Forward } from "../../assets/forward.svg";

const ProfileAvatar = styled("div")`
  width: 28px;
  height: 28px;
  background-color: #535353;
  display: flex;
  background-image: ${(props: Myprops) => props.backgroundImage};
  background-size: cover;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;

const ProfileButton: FC<IProfileButton> = ({ user }) => {
  return (
    <div className="profile_btn">
      <ProfileAvatar
        backgroundImage={`url("${user?.images[0].url ?? avatar}")`}
      />
      <span className="profile_btn__titile text_ellipsis">
        {user?.display_name ?? "Пользователь"}
      </span>
      <TriangleDown className="profile_btn__show_more" />
    </div>
  );
};

const SignUpButton: FC = () => (
  <div className="signup_btn">
    <a href="https://accounts.spotify.com/authorize?response_type=code&client_id=ec66e7d6e6044da2a3287fd76dc1074c&scope=ugc-image-upload user-read-playback-state user-modify-playback-state user-read-private user-follow-modify user-follow-read user-library-modify user-library-read streaming user-read-playback-position playlist-modify-private playlist-read-collaborative app-remote-control user-read-email playlist-read-private user-top-read playlist-modify-public user-read-currently-playing user-read-recently-played&redirect_uri=http://localhost:3000/auth&state=1234g4g4g">
      Войти
    </a>
  </div>
);

const TopBar: FC<IDefaultTopBar> = ({ user, content }) => {
  return (
    <header className="top_bar__header">
      <div className="navigation_btns">
        <div className="navigation_btn navigation_btn__disabled">
          <Back />
        </div>
        <div className="navigation_btn">
          <Forward />
        </div>
      </div>
      {content}
      {user ? <ProfileButton user={user} /> : <SignUpButton />}
    </header>
  );
};

export default TopBar;
