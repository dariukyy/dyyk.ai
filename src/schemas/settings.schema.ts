import { z, ZodType } from "zod";

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 2; // 2MB
export const ACCEPTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have atleast 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    ),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: "Your file size must be less then 2MB",
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: "Only JPG, JPEG & PNG are accepted file formats",
    }),
});

export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};
export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      })
      .refine(
        (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
        "Password should contain only alphabets and numbers"
      )
      .refine((value) => value === "", "Password is required"),
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type DomainSettingsProps = {
  domain?: string;
  image?: any;
  welcomeMessage?: string;
};

export const DomainSettingsSchema = z
  .object({
    domain: z
      .string()
      .min(4, { message: "A domain must have atleast 3 characters" })
      .refine(
        (value) =>
          /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
        "This is not a valid domain"
      )
      .optional()
      .or(z.literal("").transform(() => undefined)),
    image: z.any().optional(),
    welcomeMessage: z
      .string()
      .min(6, "The message must be atleast 6 characters")
      .optional()
      .or(z.literal("").transform(() => undefined)),
  })
  .refine(
    (schema) => {
      if (schema.image?.length) {
        if (
          ACCEPTED_FILE_TYPES.includes(schema.image?.[0].type!) &&
          schema.image?.[0].size <= MAX_UPLOAD_SIZE
        ) {
          return true;
        }
      }
      if (!schema.image?.length) {
        return true;
      }
    },
    {
      message:
        "The fill must be less then 2MB, and on PNG, JPEG & JPG files are accepted",
      path: ["image"],
    }
  );

export type HelpDeskQuestionsProps = {
  question: string;
  answer: string;
};
export const HelpDeskQuestionsSchema = z.object({
  question: z.string().min(1, { message: "Question cannot be left empty" }),
  answer: z.string().min(1, { message: "Question cannot be left empty" }),
});

export const FilterQuestionsSchema = z.object({
  question: z.string().min(1, { message: "Question cannot be left empty" }),
});

export const AddProductSchema = z.object({
  name: z
    .string()
    .min(3, { message: "The name must have atleast 3 characters" }),
  image: z
    .any()
    .refine((files) => files?.[0]?.size <= MAX_UPLOAD_SIZE, {
      message: "Your file size must be less then 2MB",
    })
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), {
      message: "Only JPG, JPEG & PNG are accepted file formats",
    }),
  price: z.string(),
});
