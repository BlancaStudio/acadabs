import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("contact.send", () => {
  it("should send contact form with valid data", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.send({
      name: "Juan Pérez",
      email: "juan@example.com",
      subject: "Consulta sobre servicios",
      message: "Me gustaría conocer más sobre vuestros servicios de consultoría nutricional."
    });

    expect(result).toEqual({ success: true });
  });

  it("should reject invalid email", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.send({
        name: "Juan Pérez",
        email: "invalid-email",
        subject: "Consulta",
        message: "Test message"
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("Email");
    }
  });

  it("should reject empty required fields", async () => {
    const ctx: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contact.send({
        name: "",
        email: "test@example.com",
        subject: "Test",
        message: "Test"
      });
      expect.fail("Should have thrown an error");
    } catch (error: any) {
      expect(error.message).toContain("nombre");
    }
  });
});
