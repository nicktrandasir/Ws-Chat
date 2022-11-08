import React from "react";
import { useAddUserMutation, useGetListUsersQuery } from "../../api/users";
import { Layout } from "../../common/components/layout";
import { IUser } from "./components/IUser";
import { useController, useForm } from "react-hook-form";

interface IProps {}

export const Users = (props: IProps) => {
  const { data, isLoading } = useGetListUsersQuery([]);

  const [addUser] = useAddUserMutation();
  const { control, handleSubmit, resetField } = useForm({ mode: "onChange" });
  const { field: name } = useController({ control, name: "name", defaultValue: "" });
  const onSubmit = async () => {
    const id = Math.floor(Math.random() * 100);

    await addUser(
      JSON.stringify({
        id: id,
        name: name.value,
      })
    );
    resetField("name");
  };

  return (
    <Layout>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <p className="font-bold">Users from custom API:</p>
          <div>
            {data?.map((item: IUser) => (
              <p className="flex flex-row gap-8" key={item.id}>
                <span>{item.name}</span>
              </p>
            ))}
          </div>
          <form className="flex flex-col bg-grey py-12" onSubmit={handleSubmit(onSubmit)}>
            <label>
              <strong>Enter name</strong>
            </label>
            <input
              required
              className="border-2 border-black border-solid px-2"
              placeholder="Type here ..."
              value={name.value}
              defaultValue={""}
              onChange={name.onChange}
              type="text"
              onBlur={name.onBlur}
            />
            <button className="bg-lime-400 border-2 border-lime-600 border-solid my-2 text-white hover:bg-green-400">
              Add user
            </button>
          </form>
        </>
      )}
    </Layout>
  );
};
