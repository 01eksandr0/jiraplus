import { useForm, Controller } from "react-hook-form";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { IUser } from "@/types/user";
import axios from "axios";

const SearchSelect = () => {
  const [sudgestList, setSudgestList] = useState<IUser[]>([]);
  const { control, watch } = useForm<{ search: string }>({
    defaultValues: { search: "" },
  });

  const search = watch("search");

  const searchOptionList = async () => {
    try {
      const { data } = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/api/sudgest/users",
        {
          params: {
            search,
          },
        }
      );
      setSudgestList(data);
    } catch (error) {}
  };

  useEffect(() => {
    searchOptionList();
  }, [search]);

  return (
    <div className="relative">
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <Input type="text" {...field} placeholder="Search..." />
        )}
      />
      {search && (
        <div className="absolute mt-2 bg-white border shadow-lg rounded-lg transition-opacity p-[10px] w-[100%]">
          {sudgestList?.length ? (
            <div className="flex flex-col gap-[4px]">
              {sudgestList.map((i) => (
                <button className="px-[6px] py-[2px] rounded-md hover:bg-gray-100 duration-300 text-start">
                  {i?.full_name}
                </button>
              ))}
            </div>
          ) : (
            "Nothing found..."
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
