import Todo from "@/components/todos-component/todo";
import { type todoAll } from "@/types/todo-type";

interface IncompleteTodosProps {
  todo: todoAll[] | undefined;
}

export default function IncompleteTodos({ todo }: IncompleteTodosProps) {
  return (
    <div className="relative max-h-[30dvh] overflow-y-auto">
      <ul>
        {todo?.map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
      </ul>
    </div>
  );
}
