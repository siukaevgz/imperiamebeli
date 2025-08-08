import { z } from "zod";

export const orderShema = z.object({
  name: z
    .string()
    .min(2, { message: "Имя должно содержать не менее 2-х символов" }),
  surname: z
    .string()
    .min(2, { message: "Фамилия должна содержать не менее 2-х символов" }),
  email: z.string().email({ message: "Введите корректную почту" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Телефон должен содержать минимум 10 цифр" }),
});

export type TorderShema = z.infer<typeof orderShema>;
