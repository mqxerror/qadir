import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';
import type { NestExpressApplication } from '@nestjs/platform-express';

// Native import() for ESM-only packages (AdminJS v7+).
// TypeScript CJS compilation transforms import() to require(),
// which cannot load ESM modules on Node < 22.
const importEsm = <T = any>(modulePath: string): Promise<T> =>
  new Function('modulePath', 'return import(modulePath)')(modulePath);

export async function mountAdminJS(app: NestExpressApplication) {
  const { default: AdminJS } = await importEsm('adminjs');
  const AdminJSPrisma = await importEsm('@adminjs/prisma');
  const AdminJSExpress = await importEsm('@adminjs/express');

  AdminJS.registerAdapter({
    Database: AdminJSPrisma.Database,
    Resource: AdminJSPrisma.Resource,
  });

  const prisma = new PrismaClient();

  const admin = new AdminJS({
    rootPath: '/admin',
    loginPath: '/admin/login',
    logoutPath: '/admin/logout',
    branding: {
      companyName: 'QADIR Montreal',
      logo: false,
      softwareBrothers: false,
    },
    resources: [
      // --- Products ---
      {
        resource: { model: AdminJSPrisma.getModelByName('Blend'), client: prisma },
        options: {
          navigation: { name: 'Products', icon: 'Package' },
          listProperties: ['name', 'slug', 'role', 'price', 'sortOrder', 'updatedAt'],
          properties: {
            description: { type: 'textarea' },
            olfactiveProfile: { type: 'mixed' },
            price: { description: 'Price in cents (e.g. 42500 = $425.00)' },
          },
          sort: { sortBy: 'sortOrder', direction: 'asc' },
        },
      },
      // --- Bookings ---
      {
        resource: { model: AdminJSPrisma.getModelByName('Appointment'), client: prisma },
        options: {
          navigation: { name: 'Bookings', icon: 'Calendar' },
          listProperties: ['name', 'email', 'type', 'date', 'time', 'status', 'createdAt'],
          actions: {
            new: { isAccessible: false },
          },
        },
      },
      // --- Inquiries ---
      {
        resource: { model: AdminJSPrisma.getModelByName('FormSubmission'), client: prisma },
        options: {
          navigation: { name: 'Inquiries', icon: 'MessageSquare' },
          listProperties: ['name', 'email', 'type', 'subject', 'createdAt'],
          actions: {
            new: { isAccessible: false },
            edit: { isAccessible: false },
            delete: { isAccessible: false },
          },
        },
      },
      // --- Orders ---
      {
        resource: { model: AdminJSPrisma.getModelByName('Order'), client: prisma },
        options: {
          navigation: { name: 'Orders', icon: 'DollarSign' },
          listProperties: ['email', 'status', 'totalCents', 'currency', 'createdAt'],
          properties: {
            totalCents: { description: 'Total in cents' },
          },
          actions: {
            new: { isAccessible: false },
          },
        },
      },
      {
        resource: { model: AdminJSPrisma.getModelByName('OrderItem'), client: prisma },
        options: {
          navigation: { name: 'Orders', icon: 'ShoppingCart' },
          actions: {
            new: { isAccessible: false },
            edit: { isAccessible: false },
            delete: { isAccessible: false },
          },
        },
      },
      // --- Content ---
      {
        resource: { model: AdminJSPrisma.getModelByName('PageContent'), client: prisma },
        options: {
          navigation: { name: 'Content', icon: 'FileText' },
          listProperties: ['page', 'updatedAt'],
          properties: {
            content: { type: 'mixed' },
          },
        },
      },
      // --- System ---
      {
        resource: { model: AdminJSPrisma.getModelByName('WebhookConfig'), client: prisma },
        options: {
          navigation: { name: 'System', icon: 'Settings' },
          listProperties: ['event', 'url', 'active', 'createdAt'],
        },
      },
      {
        resource: { model: AdminJSPrisma.getModelByName('AdminUser'), client: prisma },
        options: {
          navigation: { name: 'System', icon: 'Shield' },
          listProperties: ['email', 'role', 'createdAt'],
          properties: {
            passwordHash: { isVisible: false },
            password: {
              type: 'password',
              isVisible: { list: false, edit: true, show: false, filter: false },
            },
          },
          actions: {
            new: {
              before: async (request: any) => {
                if (request.payload?.password) {
                  request.payload.passwordHash = await bcryptjs.hash(request.payload.password, 10);
                  delete request.payload.password;
                }
                return request;
              },
            },
            edit: {
              before: async (request: any) => {
                if (request.payload?.password) {
                  request.payload.passwordHash = await bcryptjs.hash(request.payload.password, 10);
                  delete request.payload.password;
                }
                return request;
              },
            },
          },
        },
      },
    ],
  });

  const router = AdminJSExpress.default.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email: string, password: string) => {
        const user = await prisma.adminUser.findUnique({ where: { email } });
        if (!user) return null;
        const valid = await bcryptjs.compare(password, user.passwordHash);
        return valid ? { email: user.email, role: user.role, id: user.id } : null;
      },
      cookieName: 'adminjs',
      cookiePassword: process.env.SESSION_SECRET || 'qadir-session-secret',
    },
    undefined,
    {
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'qadir-session-secret',
    },
  );

  // Mount AdminJS router on Express app directly
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use(admin.options.rootPath, router);

  console.log('AdminJS mounted at /admin');
}
