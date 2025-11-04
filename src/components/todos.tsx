"use client";

import { api } from "@/trpc/react";
import CreateTodo from "./create-todo";
import Todo from "./todo";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { todoInput } from "@/types/todo-type";
import LoadingScreen from "./loading";
import { toast } from "sonner";

export default function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();
  const trpc = api.useUtils();
  const [newTodo, setNewTodo] = useState<string>("");

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    toast.error(
      "Failed to load tasks. Please check your internet connection and try reloading the page.",
    );
    return "";
  }

  const createTodo = (e: FormEvent<HTMLFormElement>, newTodo: string) => {
    e.preventDefault();
    const result = todoInput.safeParse(newTodo);
    if (!result.success) {
      toast.error("Task cannot be empty and must be 50 characters or less.");
      return;
    }
    mutate(newTodo);
    setNewTodo("");
  };

  const toggleDone = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    mutateToggle({ id, done: e.target.checked });
  };

  const deleteTodo = (id: string) => {
    mutateDelete(id);
  };

  const listDoneTodos = todos?.filter((todo) => {
    if (todo.done) {
      return todo;
    }
  });

  const listNotDoneTodos = todos?.filter((todo) => {
    if (!todo.done) {
      return todo;
    }
  });

  return (
    <div>
      <CreateTodo
        handler={createTodo}
        newTodo={newTodo}
        setNewTodo={setNewTodo}
      />
      <div className="mt-10 mb-5 flex flex-row items-center justify-between">
        {todos?.length ? (
          <span className="text-lgpublic font-bold">{`My Tasks (${listNotDoneTodos?.length})`}</span>
        ) : (
          ""
        )}
        {listDoneTodos?.length ? (
          <span className="text-neutral text-sm md:text-base">{`${listDoneTodos?.length} completed`}</span>
        ) : (
          ""
        )}
      </div>
      <div className="relative h-[65vh] overflow-y-auto">
        {todos?.length ? (
          <ul>
            {todos.map((todo) => {
              return (
                <Todo
                  key={todo.id}
                  todo={todo}
                  toggleDone={toggleDone}
                  deleteTodo={deleteTodo}
                />
              );
            })}
          </ul>
        ) : (
          <span className="text-neutral mt-20 block text-center text-lg">
            No tasks yet. Add one to get started!
          </span>
        )}
      </div>
    </div>
  );
}
