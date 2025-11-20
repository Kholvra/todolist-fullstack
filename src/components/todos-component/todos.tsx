"use client";

import { api } from "@/trpc/react";
import CreateTodo from "./create-todo";
import LoadingScreen from "@/components/loading";
import { toast } from "sonner";
import CompletedTodos from "./completed-todos";
import IncompleteTodos from "./incomplete-todos";
import ClearAllModal from "../modal/clear-todo-all-modal";

export default function Todos() {
  const { data: todos, isLoading, isError } = api.todo.all.useQuery();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    toast.error(
      "Failed to load tasks. Please check your internet connection and try reloading the page.",
    );
    return "";
  }

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
      <CreateTodo/>
      <div className="mt-10 mb-5 flex flex-row items-center justify-between">
        {todos?.length ? (
          <span className="text-lg font-bold">{`My Tasks (${listNotDoneTodos?.length})`}</span>
        ) : (
          ""
        )}
      </div>
      {listNotDoneTodos?.length ? (
        <IncompleteTodos todo={listNotDoneTodos} />
      ) : (
        <span
          className={` ${
            listDoneTodos?.length
              ? "text-neutral block" //class for "No incomplete tasks"
              : "text-neutral block text-center text-lg" //class for "No tasks yet. Add one to get started!"
          } select-none`}
        >
          {listDoneTodos?.length
            ? "No incomplete tasks"
            : "No tasks yet. Add one to get started!"}
        </span>
      )}
      {listDoneTodos?.length ? <CompletedTodos todo={listDoneTodos}/>  : ""}
    </div>
  );
}
