import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(2, "Nome deve ter, no mínimo 2 caracteres"),
  lastName: z.string().max(45),
  phone: z.string().nonempty({ message: "O formato deve ser (XX) XXXXX-XXXX" }),
  email: z.string().email().max(45),
  password: z.string().nonempty({ message: "Senha é obrigatória" }),
});

export const updateUserSchema = z.object({
  /*   id: z.number(),
  createdAt: z.string().optional(), */
  firstName: z
    .string()

    .optional(),
  lastName: z.string().optional(),
  phone: z
    .string()

    .optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export type RegisterData = z.infer<typeof schema>;

export type UpdateData = z.infer<typeof updateUserSchema>;
