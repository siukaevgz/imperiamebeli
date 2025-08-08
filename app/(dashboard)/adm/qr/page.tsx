"use client";
import { CategoryAll } from "@/app/@types/store";
import { Container } from "@/components/shared";
import { Api } from "@/services/api-client";
import { theProducts } from "@/services/products";

import { Loader2, QrCode, Printer } from "lucide-react";
import React, { useState } from "react";
import QRCode from "react-qr-code";

const HomePage: React.FC = () => {
  const [category, setCategory] = React.useState<CategoryAll>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null
  );
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<
    number | null
  >(null);
  const [selectedChildSubcategory, setSelectedChildSubcategory] =
    React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<theProducts[] | null>(null);
  const [showPrintOverlay, setShowPrintOverlay] = useState(false);

  React.useEffect(() => {
    Api.categorys.getCategoryAll().then((item) => {
      setCategory(item);
    });
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    let result = null;
    if (selectedCategory && selectedSubcategory && selectedChildSubcategory) {
      result = await Api.products.getProductsAll(
        selectedCategory,
        selectedSubcategory,
        selectedChildSubcategory
      );
    } else if (selectedCategory && selectedSubcategory) {
      result = await Api.products.getProductsAll(
        selectedCategory,
        selectedSubcategory
      );
    } else if (selectedCategory) {
      result = await Api.products.getProductsAll(selectedCategory);
    }
    setProducts(result);
    setLoading(false);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(Number(event.target.value));
    setSelectedSubcategory(null);
    setSelectedChildSubcategory(null);
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSubcategory(Number(event.target.value));
    setSelectedChildSubcategory(null);
  };

  const handleChildSubcategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedChildSubcategory(Number(event.target.value));
  };

  const selectedCat = category?.find((cat) => cat.id === selectedCategory);
  const selectedSubcat = selectedCat?.categoryChild.find(
    (subcat) => subcat.id === selectedSubcategory
  );

  const showButton =
    (selectedCategory && !selectedCat?.categoryChild.length) ||
    (selectedSubcategory &&
      selectedSubcat &&
      !selectedSubcat.categoryChildChild.length) ||
    (selectedCategory && selectedSubcategory && selectedChildSubcategory);

  const handlePrint = () => {
    setShowPrintOverlay(true);
    setTimeout(() => {
      window.print();
      setShowPrintOverlay(false);
    }, 100); // Задержка для отображения блока перед печатью
  };

  return (
    <>
      <Container>
        <div className="flex space-x-4">
          <select
            className="border p-2 rounded"
            onChange={handleCategoryChange}
            value={selectedCategory || ""}
          >
            <option value="">Выберите категорию</option>
            {category?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {selectedCategory &&
            selectedCat?.categoryChild &&
            selectedCat.categoryChild.length > 0 && (
              <select
                className="border p-2 rounded"
                onChange={handleSubcategoryChange}
                value={selectedSubcategory || ""}
              >
                <option value="">Выберите подкатегорию</option>
                {selectedCat.categoryChild.map((subcat) => (
                  <option key={subcat.id} value={subcat.id}>
                    {subcat.name}
                  </option>
                ))}
              </select>
            )}

          {selectedSubcategory &&
            selectedSubcat?.categoryChildChild &&
            selectedSubcat.categoryChildChild.length > 0 && (
              <select
                className="border p-2 rounded"
                onChange={handleChildSubcategoryChange}
                value={selectedChildSubcategory || ""}
              >
                <option value="">Выберите подкатегорию подкатегории</option>
                {selectedSubcat.categoryChildChild.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            )}

          {/* Кнопка "Показать" */}
          {showButton && (
            <div className="flex space-x-2">
              {loading ? (
                <button className="flex items-center border p-2 rounded bg-blue-500 text-white">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Показать
                </button>
              ) : (
                <button
                  onClick={fetchProducts}
                  className="flex items-center border p-2 rounded bg-blue-500 text-white"
                >
                  <QrCode className="mr-2" /> Показать
                </button>
              )}
              {products && products.length > 0 && (
                <button
                  onClick={handlePrint}
                  className="flex items-center border p-2 rounded bg-green-500 text-white"
                >
                  <Printer className="mr-2" /> Печать
                </button>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Контейнер для QR-кодов, который будет напечатан */}
      <Container>
        <div className="flex flex-wrap mt-10" id="qrCodeContainer">
          {products
            ? products.map((item) => (
                <div
                  key={item.id}
                  className="w-1/4 flex flex-col justify-center items-center"
                >
                  <div className="flex flex-col justify-center items-center p-10 gap-2">
                    <div className="flex justify-center items-center">
                      <QRCode
                        value={`https://industriamebeli.ru/productInfo/${item.id}`}
                        className="w-full"
                      />
                    </div>
                    <div>{item.name}</div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </Container>

      {/* Блок для печати */}
      {showPrintOverlay && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-white z-50 flex justify-center items-center"
          style={{ backdropFilter: "blur(5px)" }}
        >
          <div className="flex flex-wrap p-10" id="printContainer">
            {products &&
              products.map((item) => (
                <div
                  key={item.id}
                  className="w-1/4 flex flex-col justify-center items-center"
                >
                  <div className="flex flex-col justify-center items-center p-10 gap-2">
                    <div className="flex justify-center items-center">
                      <QRCode
                        value={`https://imperiamebeli.ru/productInfo/${item.id}`}
                        className="w-full"
                      />
                    </div>
                    <div>{item.name}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
