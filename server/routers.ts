import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    send: publicProcedure
      .input(z.object({
        name: z.string().min(1, 'El nombre es requerido'),
        email: z.string().email('Email inválido'),
        subject: z.string().min(1, 'El asunto es requerido'),
        message: z.string().min(1, 'El mensaje es requerido')
      }))
      .mutation(async ({ input }) => {
        try {
          await notifyOwner({
            title: `Nuevo mensaje de contacto de ${input.name}`,
            content: `Email: ${input.email}\nAsunto: ${input.subject}\n\nMensaje:\n${input.message}`
          });
          return { success: true };
        } catch (error) {
          console.error('Error sending contact notification:', error);
          throw new Error('Error al enviar el mensaje');
        }
      })
  })
});

export type AppRouter = typeof appRouter;
