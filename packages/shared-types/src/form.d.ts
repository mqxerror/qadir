import { z } from 'zod';
export declare const FormType: z.ZodEnum<["CONTACT", "VIP", "PRESS", "WHOLESALE"]>;
export declare const ContactSubject: z.ZodEnum<["General", "Press", "Wholesale"]>;
export declare const CreateContactSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    subject: z.ZodEnum<["General", "Press", "Wholesale"]>;
    message: z.ZodString;
    honeypot: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    name: string;
    email: string;
    subject: "General" | "Press" | "Wholesale";
    honeypot?: string | undefined;
}, {
    message: string;
    name: string;
    email: string;
    subject: "General" | "Press" | "Wholesale";
    honeypot?: string | undefined;
}>;
export declare const CreateVipSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    message: z.ZodString;
    honeypot: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    message: string;
    name: string;
    email: string;
    honeypot?: string | undefined;
}, {
    message: string;
    name: string;
    email: string;
    honeypot?: string | undefined;
}>;
export declare const FormSubmissionSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["CONTACT", "VIP", "PRESS", "WHOLESALE"]>;
    name: z.ZodString;
    email: z.ZodString;
    subject: z.ZodNullable<z.ZodString>;
    message: z.ZodString;
    clientId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    type: "CONTACT" | "VIP" | "PRESS" | "WHOLESALE";
    id: string;
    name: string;
    email: string;
    createdAt: string;
    subject: string | null;
    clientId?: string | null | undefined;
}, {
    message: string;
    type: "CONTACT" | "VIP" | "PRESS" | "WHOLESALE";
    id: string;
    name: string;
    email: string;
    createdAt: string;
    subject: string | null;
    clientId?: string | null | undefined;
}>;
export type CreateContactInput = z.infer<typeof CreateContactSchema>;
export type CreateVipInput = z.infer<typeof CreateVipSchema>;
export type FormSubmission = z.infer<typeof FormSubmissionSchema>;
//# sourceMappingURL=form.d.ts.map