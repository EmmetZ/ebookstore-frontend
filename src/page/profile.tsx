import React from "react";
import { useParams } from "react-router";
import UserProfile from "../components/user_profile";

interface Param extends Record<string, string | undefined> {
  userId: string;
}

const Profile: React.FC = () => {
  const param = useParams<Param>();
  if (param.userId === "me") {
    return <UserProfile />;
  }
  return <div>other user</div>;
};

export default Profile;
