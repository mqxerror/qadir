import { z } from 'zod';
export declare const AppointmentType: z.ZodEnum<["IN_STORE_CONSULTATION", "PRIVATE_DISCOVERY"]>;
export declare const AppointmentStatus: z.ZodEnum<["PENDING", "CONFIRMED", "CANCELLED"]>;
export declare const CreateAppointmentSchema: z.ZodObject<{
    type: z.ZodEnum<["IN_STORE_CONSULTATION", "PRIVATE_DISCOVERY"]>;
    date: z.ZodString;
    time: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    date: string;
    type: "IN_STORE_CONSULTATION" | "PRIVATE_DISCOVERY";
    name: string;
    time: string;
    email: string;
    message?: string | undefined;
}, {
    date: string;
    type: "IN_STORE_CONSULTATION" | "PRIVATE_DISCOVERY";
    name: string;
    time: string;
    email: string;
    message?: string | undefined;
}>;
export declare const AppointmentSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["IN_STORE_CONSULTATION", "PRIVATE_DISCOVERY"]>;
    date: z.ZodString;
    time: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    message: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<["PENDING", "CONFIRMED", "CANCELLED"]>;
    clientId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    date: string;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    message: string | null;
    type: "IN_STORE_CONSULTATION" | "PRIVATE_DISCOVERY";
    id: string;
    name: string;
    time: string;
    email: string;
    createdAt: string;
    clientId?: string | null | undefined;
}, {
    date: string;
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    message: string | null;
    type: "IN_STORE_CONSULTATION" | "PRIVATE_DISCOVERY";
    id: string;
    name: string;
    time: string;
    email: string;
    createdAt: string;
    clientId?: string | null | undefined;
}>;
export type CreateAppointmentInput = z.infer<typeof CreateAppointmentSchema>;
export type Appointment = z.infer<typeof AppointmentSchema>;
//# sourceMappingURL=appointment.d.ts.map