import prisma from "@/prisma/prisma-client";
import { cartCalculator } from "./cartCalculator";

export const updateTotalAmountCart = async (token: string) => {
  const cartItems = await prisma.cart.findFirst({
    where: {
      token: token,
    },

    include: {

      items: {
        orderBy: {
          id: 'asc',
        },

        include: {
          product: true,
        },

      },

    },

  });

  if (!cartItems) {
    return null;
  }

  const totalAmount = cartItems.items.reduce((sum, item) => {
    return sum + cartCalculator(item.quantity, item.product.price);
  }, 0);

  const cartActual = await prisma.cart.update({
    where: {
      token: token,
    },
    data: {
      totalAmount: totalAmount,
    },
    include: {
      items: {
        orderBy: {
          id: 'asc',
        },
        include: {
          product: {
            include: {
              photo: true,
            },
          },
        },
      },
    },
  });
  return cartActual;
};
