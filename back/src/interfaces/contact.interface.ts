import { z } from "zod";
import {
  contactSchema,
  contactSchemaRequest,
  contactSchemaResponse,
  contactSchemaResponseList,
} from "../schemas/contact.schema";
import { DeepPartial } from "typeorm";

type TContact = z.infer<typeof contactSchema>;
type TContactRequest = z.infer<typeof contactSchemaRequest>;
type TContactResponse = z.infer<typeof contactSchemaResponse>;
type TContactListResponse = z.infer<typeof contactSchemaResponseList>;
type TContactUpdateRequest = DeepPartial<TContactRequest>;

export {
  TContact,
  TContactRequest,
  TContactResponse,
  TContactUpdateRequest,
  TContactListResponse,
};
