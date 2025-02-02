import { useForm, Controller } from "react-hook-form";
import { Input } from "../../UI/Input";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { IUser } from "@/types/user";
import axios from "axios";

const SearchSelect = ({
  setUsers,
}: {
  setUsers: (users: string[]) => void;
}) => {
  const [sudgestList, setSudgestList] = useState<IUser[]>([]);
  const [userList, setUserList] = useState<IUser[]>([]);
  const { register, watch, setValue } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });

  const search = watch("search");

  const searchOptionList = async () => {
    if (!search.trim()) {
      setSudgestList([]);
      return;
    }
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/sudgest/users",
        {
          params: { search: search.trim() },
        }
      );
      setSudgestList(data);
    } catch (error) {
      console.error("Error fetching suggestions", error);
    }
  };

  useEffect(() => {
    searchOptionList();
  }, [search]);

  const addUserToList = (event: React.MouseEvent<HTMLElement>, user: IUser) => {
    event.stopPropagation();
    setUserList([...userList, user]);
    setUsers([...userList, user]?.map((i) => i?._id));
    setValue("search", "");
  };

  const deleteUserInList = (
    event: React.MouseEvent<HTMLElement>,
    _id: string
  ) => {
    event.stopPropagation();
    const newList = userList?.filter((i) => i?._id !== _id);
    setUserList(newList);
    setUsers(newList?.map((i) => i?._id));
  };
  return (
    <div className="relative">
      <Input type="text" {...register("search")} placeholder="Search..." />

      {search && sudgestList.length > 0 && (
        <div className="absolute mt-2 bg-white border shadow-lg rounded-lg transition-opacity p-[10px] w-[100%]">
          <div className="flex flex-col gap-[4px]">
            {sudgestList
              ?.filter((i) => !userList?.map((i) => i?._id)?.includes(i?._id))
              .map((i) => (
                <button
                  key={i._id}
                  onClick={(event) => addUserToList(event, i)}
                  type="button"
                  className="px-[6px] py-[2px] rounded-md hover:bg-gray-100 duration-300 text-start"
                >
                  {i?.full_name}
                </button>
              ))}
          </div>
        </div>
      )}

      {userList.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mt-2">
          {userList.map((i) => (
            <div
              key={i?._id}
              className="px-[6px] py-[2px] flex gap-[6px] items-center rounded-full bg-gray-200"
            >
              <span>{i?.full_name}</span>
              <button
                className="flex p-1 items-center justify-center text-black hover:text-red-500"
                type="button"
                onClick={(event) => deleteUserInList(event, i?._id)}
              >
                <IoClose className="h-[14px] w-[14px]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
