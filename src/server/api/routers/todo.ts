import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { todoInput } from "@/types/todo-type";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const allTodos = await ctx.db.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy:{
        createdAt: 'desc'
      }
    });
    return allTodos.map(({ id, text, done }) => ({ id, text, done }));
  }),

  create: protectedProcedure
    .input(todoInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.create({
        data: {
          text: input,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  toggle: protectedProcedure
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .mutation(async ({ ctx, input: { id, done } }) => {
      return ctx.db.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }),

    delete: protectedProcedure.input(z.string()).mutation(async ({ctx,input})=>{
      return ctx.db.todo.delete({
        where:{
          id: input
        },
      })
    }),

    edit: protectedProcedure.input(z.object({id: z.string(),text: z.string()})).mutation(async({ctx, input:{id,text}})=>{
      return ctx.db.todo.update({
        where:{
          id
        },
        data:{
          text
        }
      })
    })
});
