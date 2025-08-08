"use client";
import { productObj } from "@/app/@types/store";
import { Container, Title } from "@/components/shared";
import { BreadcrumbComp } from "@/components/shared/";
import { Button } from "@/components/ui";
import { Api } from "@/services/api-client";
import { useCartStore } from "@/store";
import { useProductStore } from "@/store/product";
import { Clock2, Loader2, PackageCheck } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

type UrlParams = {
  id?: string;
};

type BreadcrumbParams = {
  params: {
    categoryId: string;
    categoryChildId?: string;
    categoryChildChildId?: string;
  };
};

export default function ProfilePage() {
  const { id } = useParams<UrlParams>();

  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });

  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);

  const setProductObj = useProductStore((state) => state.setProductObj);
  const productObj = useProductStore((state) => state.productObj);
  const [breadcrumb, setBreadcrumb] = React.useState<BreadcrumbParams>({
    params: { categoryId: "" },
  });

  const setCartObj = useCartStore((state) => state.setCartObj);
  const cartObj = useCartStore((state) => state.cartObj);

  const [loading, setLoading] = React.useState(false);
  const [mainImg, setMainImg] = React.useState("");

  const addProduct = async (id: number) => {
    setLoading(true);
    toast("Товар добавлен в корзину.");
    Api.cart.addProduct(id).then((resp) => {
      setCartObj(resp);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    if (id) {
      Api.product.getProduct(Number(id)).then((item) => {
        setProductObj(item);
      });
    }
  }, [id, setProductObj]);

  React.useEffect(() => {
    if (productObj) {
      setMainImg("");
      if (productObj.photo[0]) {
        setMainImg(productObj.photo[0].photoUrl);
      }

      const newBreadcrumb: BreadcrumbParams = {
        params: { categoryId: String(productObj.categoryId) },
      };

      if (productObj.categoryChildId) {
        newBreadcrumb.params.categoryChildId = String(
          productObj.categoryChildId
        );
      }
      if (productObj.categoryChildChildId) {
        newBreadcrumb.params.categoryChildChildId = String(
          productObj.categoryChildChildId
        );
      }

      setBreadcrumb(newBreadcrumb);
    }
  }, [productObj]);

  return (
    <>
      {breadcrumb.params.categoryId === "" ? (
        ""
      ) : (
        <BreadcrumbComp className="mt-4" req={breadcrumb} />
      )}

      <Container
        className={`flex ${
          isDesktop ? "flex-row gap-40 mt-20" : "flex-col gap-5"
        } justify-center`}
      >
        <div
          className={`flex flex-col ${isDesktop ? "w-[50%]" : "w-full p-4"}`}
        >
          <div
            className={`flex ${
              isDesktop ? "flex-row" : "flex-col"
            } w-full justify-between`}
          >
            <div
              className={`flex gap-2 overflow-scroll ${
                isDesktop
                  ? "h-[400px] flex-col overflow-x-hidden"
                  : "h-[100px] flex-row overflow-y-hidden"
              }`}
            >
              {productObj?.photo[0] ? (
                productObj.photo.map((mini) => (
                  <div
                    key={mini.id}
                    className="flex justify-center w-[100px] items-center rounded-lg border-2 hover:cursor-pointer border-gray-300"
                  >
                    <img
                      src={mini.photoUrl}
                      onClick={() => setMainImg(mini.photoUrl)}
                      alt="photo"
                      width={100}
                      height={100}
                    />
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center rounded-lg border-2 hover:cursor-pointer border-gray-300">
                  <img
                    src={process.env.NEXT_PUBLIC_URL + "/image-none.svg"}
                    alt={productObj?.name}
                    width={100}
                    height={100}
                  />
                </div>
              )}
            </div>
            <div>
              {mainImg ? (
                <img src={mainImg} alt={`photo`} width={450} height={450} />
              ) : (
                <img
                  src={process.env.NEXT_PUBLIC_URL + "/image-none.svg"}
                  alt={productObj?.name}
                  width={450}
                  height={450}
                />
              )}
            </div>
          </div>

          {isDesktop && (
            <div className="p-4 flex flex-col gap-4">
              <div className="font-bold text-xl">Описание товара</div>
              <div className="text-md">
                Товар собран качественно и прослужит много лет, в целях создания
                качественного товара использованы лучшие материалы. Все что
                использовалось в данном материале прослужит много лет. Вы можете
                не сомневаться в долговечности данного товара, так как мы
                гарантируем его долговечность.
              </div>
            </div>
          )}
        </div>
        <div className={`${isDesktop ? "flex w-[30%]" : "flex w-full"}`}>
          <div
            className={`flex w-full flex-col ${
              isDesktop ? "shadow-2xl" : ""
            } rounded-md p-4 gap-2`}
          >
            {productObj ? (
              <>
                <div className="font-light text-gray-500 text-sm">
                  Арт. {productObj.article}
                </div>
                <div className="font-bold text-xl">{productObj.name}</div>
                <div className="flex justify-start items-center gap-2">
                  <div className="font-bold text-2xl">{productObj.price}</div>
                  <div className="font-bold">₽/шт.</div>
                </div>

                {loading ? (
                  <Button className="text-sm w-full h-[36px] items-center font-bold bg-gray-800 hover:bg-black">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => addProduct(productObj.id)}
                    className="text-sm w-full h-[36px] items-center font-bold bg-gray-800 hover:bg-black"
                  >
                    В КОРЗИНУ
                  </Button>
                )}
                <div className="flex gap-2">
                  <PackageCheck /> В наличии 5шт
                </div>
                <div className="flex gap-2">
                  <Clock2 /> Срок поставки сверх лимита 2 дня
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {!isDesktop && (
          <div className="p-4 flex flex-col gap-4">
            <div className="font-bold text-xl">Описание товара</div>
            <div className="text-md">
              Товар собран качественно и прослужит много лет, в целях создания
              качественного товара использованы лучшие материалы. Все что
              использовалось в данном материале прослужит много лет. Вы можете
              не сомневаться в долговечности данного товара, так как мы
              гарантируем его долговечность.
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
