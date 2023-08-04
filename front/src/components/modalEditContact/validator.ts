import { z } from "zod";
import { schema } from "../../components/modalAddContact/validator";

export const schemaaaa = schema.partial();

export type EditContactData = z.infer<typeof schemaaaa>;
