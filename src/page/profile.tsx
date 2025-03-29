import React from "react";
import { useParams } from "react-router";
import OtherUserProfile from "../components/other_user_profile";
import UserProfile from "../components/user_profile";

interface Param extends Record<string, string | undefined> {
  userId: string;
}

const ProfilePage: React.FC = () => {
  const param = useParams<Param>();
  if (param.userId === "me") {
    return <UserProfile />;
  }
  return <OtherUserProfile userId={param.userId!} />;
};

export default ProfilePage;
