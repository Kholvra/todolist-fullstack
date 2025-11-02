import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/server/api/root";
import { z } from "zod";

type RouterOutputs = inferRouterOutputs<AppRouter>
type allTodosOutput = RouterOutputs['todo']['all']
export type todoAll = allTodosOutput[number]

export const todoInput = z.string({
    required_error: 'desrcibe your todo'
}).min(1).max(50)