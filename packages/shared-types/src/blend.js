"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlendSchema = exports.OlfactiveNoteSchema = void 0;
const zod_1 = require("zod");
exports.OlfactiveNoteSchema = zod_1.z.object({
    category: zod_1.z.enum(['Top', 'Heart', 'Base']),
    notes: zod_1.z.array(zod_1.z.string()),
    description: zod_1.z.string(),
});
exports.BlendSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    role: zod_1.z.string().min(1),
    meaning: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    olfactiveProfile: zod_1.z.array(exports.OlfactiveNoteSchema),
    imageUrl: zod_1.z.string().nullable(),
    sortOrder: zod_1.z.number().int(),
    price: zod_1.z.number().nullable().optional(),
    sku: zod_1.z.string().nullable().optional(),
    inventory: zod_1.z.number().int().nullable().optional(),
    currency: zod_1.z.string().nullable().optional(),
});
//# sourceMappingURL=blend.js.map