import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import User from "./User";

const Users = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("https://afternoon-caverns-76904.herokuapp.com/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="px-6 lg:px-12">
      <h2 className="text-xl py-2">All Users - {users.length}</h2>
      <div class="overflow-x-auto mt-2 lg:mt-5">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Admin Action</th>
              <th>User Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <User
                key={user._id}
                user={user}
                index={index}
                refetch={refetch}
              ></User>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
