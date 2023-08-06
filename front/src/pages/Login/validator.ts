import { z } from "zod";

export const schema = z.object({
  email: z
    .string()
    .nonempty("O email é obrigatório")
    .email({ message: "Deve ser um email" }),
  password: z.string().nonempty("A senha é obrigatória"),
});

export type LoginData = z.infer<typeof schema>;
