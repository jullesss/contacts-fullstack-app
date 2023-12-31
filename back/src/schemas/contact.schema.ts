import { z } from "zod";

const contactSchema = z.object({
  id: z.number(),
  firstName: z.string().max(45),
  lastName: z.string().max(45),
  phone: z.string(),
  email: z.string().email().max(45),
  createdAt: z.string(),
});

const contactSchemaRequest = contactSchema.omit({ id: true, createdAt: true });

const contactSchemaResponse = contactSchema;

const contactSchemaUpdateRequest = contactSchemaRequest.partial();

const contactSchemaResponseList = z.array(contactSchema);

export {
  contactSchema,
  contactSchemaRequest,
  contactSchemaResponse,
  contactSchemaUpdateRequest,
  contactSchemaResponseList,
};
