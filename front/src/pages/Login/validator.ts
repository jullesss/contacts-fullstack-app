import { z } from "zod";

export const schema = z.object({
  email: z.string().email({ message: "Deve ser um e-mail" }),
  password: z.string().nonempty({ message: "Senha é obrigatória" }),
});

export type LoginData = z.infer<typeof schema>;
