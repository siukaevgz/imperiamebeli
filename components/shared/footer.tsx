"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";
import Container from "./container";

const Footer = () => {
  const [isDesktop, setIsDesktop] = React.useState(false);
  const display = useMediaQuery({ query: "(min-width: 1024px)" });
  ///////////
  React.useEffect(() => {
    setIsDesktop(display);
  }, [display]);
  return (
    <footer
      className={` ${
        isDesktop ? "bg-gray-800 text-white py-6" : "bg-gray-800 text-white p-4"
      }`}
    >
      <Container>
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <p>© 2024 im. Все права защищены.</p>
          </div>
          <div>
            <h5 className="font-bold">Контакты</h5>
            <ul className="mt-2">
              <li>Email: info@im</li>
              <li>Телефон: +7 (999) 999-99-99</li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
