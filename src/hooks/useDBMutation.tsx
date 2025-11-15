"use client";

import { api } from "@/trpc/react";
import { toast } from "sonner";
import { type ChangeEvent, type FormEvent } from "react";
import { todoInput } from "@/types/todo-type";

export default function useDBMutation() {
  const trpc = api.useUtils();

  const { mutate } = api.todo.create.useMutation({
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
    onMutate: async (newTodo) => {
      await trpc.todo.all.cancel();
      const previousData = trpc.todo.all.getData();
      trpc.todo.all.setData(undefined, (prev) => {
        const optimisticTodo = {
          id: Date.now().toString(),
          text: newTodo,
          done: false,
        };
        if (!prev) return [optimisticTodo];
        return [optimisticTodo, ...prev];
      });
      return { previousData };
    },
    onError: () => {
      toast.error("Failed to add new task. Please try again.");
    },
  });
  const { mutate: mutateToggle } = api.todo.toggle.useMutation({
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
    onMutate: async ({ id, done }) => {
      await trpc.todo.all.cancel();
      const previousData = trpc.todo.all.getData();
      trpc.todo.all.setData(undefined, (prev) => {
        return prev?.map((todo) => {
          if (todo.id === id) return { ...todo, done: done };
          return todo;
        });
      });
      return { previousData };
    },
    onError: () => {
      toast.error("Failed to update task status. Please try again.");
    },
  });

  const { mutate: mutateDelete } = api.todo.delete.useMutation({
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
    onMutate: async (id) => {
      await trpc.todo.all.cancel();
      trpc.todo.all.setData(undefined, (prev) => {
        return prev?.filter((todo) => {
          if (todo.id === id) {
            return;
          }
          return todo;
        });
      });
    },
    onError: () => {
      toast.error("Failed to delete task. Please try again.");
    },
  });

  const { mutate: mutateEdit } = api.todo.edit.useMutation({
    onSettled: async () => {
      await trpc.todo.all.invalidate();
    },
    onMutate: async ({ id, text }) => {
      await trpc.todo.all.cancel();
      const previousData = trpc.todo.all.getData();
      trpc.todo.all.setData(undefined, (prev) => {
        return prev?.map((todo) => {
          if (todo.id === id) {
            return { ...todo, text };
          }
          return todo;
        });
      });
      return previousData;
    },
    onError: () => {
      toast.error("Failed to edit task. Please try again.");
    },
  });

  function createTodo(e: FormEvent<HTMLFormElement>, newTodo: string) {
    e.preventDefault();
    const result = todoInput.safeParse(newTodo);
    if (!result.success) {
      toast.error("Task cannot be empty and must be 50 characters or less.");
      return {
        status: false,
        mutate: () => {
          return;
          },
      };
    }
    return {
      status: true,
      mutate: () => mutate(newTodo),
    };
  }

  function toggleDone(e: ChangeEvent<HTMLInputElement>, id: string) {
    mutateToggle({ id, done: e.target.checked });
  }

  function deleteTodo(id: string) {
    mutateDelete(id);
  }

  function editMutation(id: string, text: string) {
    const result = todoInput.safeParse(text)
    if (!result.success){
      toast.error("Task cannot be empty and must be 50 characters or less.")
      return{
        status: false,
        mutate: ()=>{return},
      }
    }
    return{
      status: true,
      mutate: ()=> mutateEdit({ id, text })
    }
  }

  return {
    createTodo,
    toggleDone,
    deleteTodo,
    editMutation,
  };
}
