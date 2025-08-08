"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { Search } from "lucide-react";
import debounce from "lodash/debounce";
import { Api } from "@/services/api-client";
import { search } from "@/app/@types/store";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

export const SearchInput: React.FC = () => {
  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });
  ///////////import { useMediaQuery } from "react-responsive";
  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  const [active, setActive] = React.useState(false);
  const [change, setChange] = React.useState("");
  const [search, setSearch] = React.useState<search>(null);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const debouncedSearch = React.useCallback(
    debounce((value: string) => {
      console.log("Отправка запроса с:", value);
      Api.search.sendSearch(value).then((item) => setSearch(item));
      // Здесь отправьте запрос на сервер
    }, 600),
    [] // Зависимости, пустой массив означает, что функция создается один раз
  );

  React.useEffect(() => {
    if (change) {
      debouncedSearch(change);
    }
    return () => {
      debouncedSearch.cancel(); // Очистка при размонтировании
    };
  }, [change, debouncedSearch]);

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && event.target instanceof Node) {
      if (!inputRef.current.contains(event.target)) {
        setActive(false);
      }
    }
  };

  const handleChange = (event: any) => {
    setChange(event.target.value);
  };

  React.useEffect(() => {
    // Добавляем обработчик события клика
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Убираем обработчик при размонтировании компонента
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={`flex flex-col h-8 relative ${
          isDesktop ? "w-[60%]" : "w-[80%]"
        }   ${active ? "z-20 w-[90%]" : ""}`}
      >
        <div
          className={`flex flex-1 justify-between items-center h-8 relative ${
            isDesktop ? "ml-10 mr-10" : ""
          }`}
        >
          <Search className="absolute h-5 left-3 text-gray-400" />
          <input
            className={`pl-11 rounded-md bg-gray-200 h-9 w-full outline-none `}
            placeholder="Поиск..."
            value={change}
            onChange={handleChange}
            ref={inputRef}
            onClick={() => setActive(true)}
          />
        </div>
        {change.length > 0 && (
          <div
            className={`absolute  h-auto  gap-4  bg-gray-200 rounded-md p-4 top-10 ${
              isDesktop ? " ml-10 mr-10 w-[90%]" : "w-full"
            }`}
          >
            {search == null
              ? ""
              : search.map((item) => (
                  <Link
                    href={"/productInfo/" + item.id}
                    key={item.id}
                    onClick={() => setChange("")}
                    className="flex mt-5 items-center hover:cursor-pointer hover:bg-slate-300 rounded-xl  justify-between p-4"
                  >
                    <div className="flex">
                      {item.photo.length !== 0 ? (
                        <img
                          src={item.photo[0]?.photoUrl}
                          alt={"photo"}
                          className="w-[50px] h-[50px]"
                        />
                      ) : (
                        <img
                          src={process.env.NEXT_PUBLIC_URL + "/image-none.svg"}
                          alt={"photo"}
                          className="w-[50px] h-[50px]"
                        />
                      )}
                      <div className="ml-4">
                        <div>{item.name}</div>
                        <div className="text-sm text-gray-400 font-light">
                          Арт. {item.article}
                        </div>
                      </div>
                    </div>

                    <div className="font-bold ml-4">{item.price} ₽/шт</div>
                  </Link>
                ))}
          </div>
        )}
      </div>
      {active && (
        <div className="absolute left-0 top-0 h-full w-full bg-black opacity-50 z-10 justify-center"></div>
      )}
    </>
  );
};

export default SearchInput;
