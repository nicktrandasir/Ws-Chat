import React from "react";
import { useGetListUsersQuery } from "../../api/users";
import { Layout } from "../../common/components/layout";
import { useAppDispatch } from "../../common/store";
import { rtkApi } from "../../api/baseApi";

interface IProps {}

export const Users = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetListUsersQuery(1);
  return isLoading ? (
    <div className="flex items-center justify-center w-96 h-full bg-black w-3 text-white">Loading ...</div>
  ) : (
    <Layout>
      {data?.map((user) => (
        <div key={user.id} className="flex justify-between p-2">
          <p>{user.id}</p>
          <p>{user.name} </p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.website}</p>
          <p>{user.company.name}</p>
        </div>
      ))}

      <button
        className="bg-green-700 text-white p-2 hover:bg-green-600"
        onClick={() => dispatch(rtkApi.util.resetApiState())}
      >
        Clear users
      </button>
    </Layout>
  );
};
