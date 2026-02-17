import { z } from 'zod';
export declare const OlfactiveNoteSchema: z.ZodObject<{
    category: z.ZodEnum<["Top", "Heart", "Base"]>;
    notes: z.ZodArray<z.ZodString, "many">;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    category: "Top" | "Heart" | "Base";
    notes: string[];
}, {
    description: string;
    category: "Top" | "Heart" | "Base";
    notes: string[];
}>;
export declare const BlendSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    role: z.ZodString;
    meaning: z.ZodString;
    description: z.ZodString;
    olfactiveProfile: z.ZodArray<z.ZodObject<{
        category: z.ZodEnum<["Top", "Heart", "Base"]>;
        notes: z.ZodArray<z.ZodString, "many">;
        description: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        description: string;
        category: "Top" | "Heart" | "Base";
        notes: string[];
    }, {
        description: string;
        category: "Top" | "Heart" | "Base";
        notes: string[];
    }>, "many">;
    imageUrl: z.ZodNullable<z.ZodString>;
    sortOrder: z.ZodNumber;
    price: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    sku: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    inventory: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    currency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    olfactiveProfile: {
        description: string;
        category: "Top" | "Heart" | "Base";
        notes: string[];
    }[];
    description: string;
    meaning: string;
    slug: string;
    id: string;
    name: string;
    role: string;
    imageUrl: string | null;
    sortOrder: number;
    price?: number | null | undefined;
    sku?: string | null | undefined;
    inventory?: number | null | undefined;
    currency?: string | null | undefined;
}, {
    olfactiveProfile: {
        description: string;
        category: "Top" | "Heart" | "Base";
        notes: string[];
    }[];
    description: string;
    meaning: string;
    slug: string;
    id: string;
    name: string;
    role: string;
    imageUrl: string | null;
    sortOrder: number;
    price?: number | null | undefined;
    sku?: string | null | undefined;
    inventory?: number | null | undefined;
    currency?: string | null | undefined;
}>;
export type OlfactiveNote = z.infer<typeof OlfactiveNoteSchema>;
export type Blend = z.infer<typeof BlendSchema>;
//# sourceMappingURL=blend.d.ts.map