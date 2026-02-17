"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSubmissionSchema = exports.CreateVipSchema = exports.CreateContactSchema = exports.ContactSubject = exports.FormType = void 0;
const zod_1 = require("zod");
exports.FormType = zod_1.z.enum(['CONTACT', 'VIP', 'PRESS', 'WHOLESALE']);
exports.ContactSubject = zod_1.z.enum(['General', 'Press', 'Wholesale']);
exports.CreateContactSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(100),
    email: zod_1.z.string().email('Please provide a valid email address'),
    subject: exports.ContactSubject,
    message: zod_1.z.string().min(1, 'Message is required').max(2000),
    honeypot: zod_1.z.string().max(0).optional(),
});
exports.CreateVipSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').max(100),
    email: zod_1.z.string().email('Please provide a valid email address'),
    message: zod_1.z.string().min(1, 'Message is required').max(2000),
    honeypot: zod_1.z.string().max(0).optional(),
});
exports.FormSubmissionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    type: exports.FormType,
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    subject: zod_1.z.string().nullable(),
    message: zod_1.z.string(),
    clientId: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.string(),
});
//# sourceMappingURL=form.js.map