import React, { useState } from "react";
import { useAddUserMutation, useDeleteUserMutation, useEditUserMutation, useGetListUsersQuery } from "../../api/users";
import { Layout } from "../../common/components/layout";
import { IUser } from "./components/IUser";
import { useController, useForm } from "react-hook-form";

interface IProps {}

export const Users = (props: IProps) => {
  const { data, isLoading } = useGetListUsersQuery([]);
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();
  const [editedUser, setEditedUser] = useState<IUser | undefined>(undefined);
  const { control, handleSubmit, resetField, setValue, reset } = useForm({ mode: "onChange" });
  const { field: name } = useController({ control, name: "name" });
  const onSubmit = async () => {
    if (editedUser) {
      await editUser(
        JSON.stringify({
          ...editedUser,
          name: name.value,
        })
      );
      reset();
    }
    if (!editedUser && name.value) {
      const id = Math.floor(Math.random() * 100);
      await addUser(
        JSON.stringify({
          id: id,
          name: name.value,
        })
      );
      setValue("name", undefined);
      reset();
      resetField("name");
    }
  };
  const onDelete = async (id: string) => {
    await deleteUser(id);
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
              <div className="flex flex-row gap-8" key={item.id}>
                <p className="flex">{item.name} </p>
                <p>
                  <span
                    className="bg-red-500 rounded-xl px-2 text-white cursor-pointer mr-1"
                    onClick={() => onDelete(String(item?._id))}
                  >
                    delete
                  </span>
                  <span
                    className="bg-green-500 rounded-xl px-2 text-white cursor-pointer"
                    onClick={() => {
                      setEditedUser(item);
                      setValue("name", item.name);
                    }}
                  >
                    edit
                  </span>
                </p>
              </div>
            ))}
          </div>
          <form className="flex flex-col bg-grey py-12" onSubmit={handleSubmit(onSubmit)}>
            <label>
              <strong>{editedUser ? "Edit name:" : "Enter name:"}</strong>
            </label>
            <input
              required
              className="border-2 border-black border-solid px-2"
              placeholder="Type here ..."
              value={name.value}
              onChange={name.onChange}
              type="text"
              onBlur={name.onBlur}
            />
            <button className="bg-lime-400 border-2 border-lime-600 border-solid my-2 text-white hover:bg-green-400">
              {editedUser ? "Edit user" : "Add user"}
            </button>
          </form>
        </>
      )}
    </Layout>
  );
};
