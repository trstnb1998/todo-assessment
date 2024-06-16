import { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

// eslint-disable-next-line
function Todo({ todo: externalTodo, onRemove, onComplete }: any) {
  const [todo, setTodo] = useState<any>(); // eslint-disable-line

  useEffect(() => {
    setTodo(externalTodo);
  }, [externalTodo]);

  if (!todo) {
    return null;
  }

  return (
    <li
      className={`flex items-center justify-between rounded-md px-4 py-2 gap-2`}
    >
      <Checkbox
        id={`task-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onComplete(todo.id)}
      />
      <label
        htmlFor={`task-${todo.id}`}
        className={`text-base flex-1 font-medium ${
          todo.completed
            ? "line-through text-gray-500 dark:text-gray-400"
            : "text-gray-900 dark:text-gray-50"
        }`}
      >
        {todo.title}
      </label>
      <div
        className={`rounded-md px-2 py-1 text-xs font-medium invisible md:visible ${
          todo.priority === "high"
            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
            : todo.priority === "medium"
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
              : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
        }`}
      >
        {todo.priority}
      </div>
      <Button variant="ghost" size="icon" onClick={() => onRemove(todo.id)}>
        <Trash2Icon className="w-4 h-4" />
      </Button>
    </li>
  );
}

export default Todo;
