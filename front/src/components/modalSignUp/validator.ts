import { z } from "zod";

export const schema = z.object({
  firstName: z
    .string()
    .nonempty("Nome é obrigatório")
    .min(2, "Deve ter, no mínimo 2 caracteres"),
  lastName: z
    .string()
    .nonempty("Sobrenome é obrigatório")
    .min(2, "Deve ter, no mínimo 2 caracteres")
    .max(45),
  phone: z.string().nonempty("Número do celular é obrigatório"),
  email: z
    .string()
    .nonempty("Email é obrigatório")
    .email("Deve ser um email")
    .max(45),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(6, "Deve ter, no mínimo, 6 caracteres"),
});

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export type RegisterData = z.infer<typeof schema>;

export type UpdateData = z.infer<typeof updateUserSchema>;
