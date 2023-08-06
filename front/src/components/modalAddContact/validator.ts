import { schema } from "../../components/modalSignUp/validator";
import { z } from "zod";

export const contactSchema = schema.omit({ password: true });

export type ContactData = z.infer<typeof schema>;
