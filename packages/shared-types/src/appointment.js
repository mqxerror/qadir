"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSchema = exports.CreateAppointmentSchema = exports.AppointmentStatus = exports.AppointmentType = void 0;
const zod_1 = require("zod");
exports.AppointmentType = zod_1.z.enum(['IN_STORE_CONSULTATION', 'PRIVATE_DISCOVERY']);
exports.AppointmentStatus = zod_1.z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']);
exports.CreateAppointmentSchema = zod_1.z.object({
    type: exports.AppointmentType,
    date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
    time: zod_1.z.string().regex(/^\d{2}:\d{2}$/, 'Time must be HH:MM format'),
    name: zod_1.z.string().min(1, 'Name is required').max(100),
    email: zod_1.z.string().email('Please provide a valid email address'),
    message: zod_1.z.string().max(1000).optional(),
});
exports.AppointmentSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    type: exports.AppointmentType,
    date: zod_1.z.string(),
    time: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    message: zod_1.z.string().nullable(),
    status: exports.AppointmentStatus,
    clientId: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.string(),
});
//# sourceMappingURL=appointment.js.map