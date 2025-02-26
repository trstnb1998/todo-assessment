import { db } from "@/store";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState, FormEvent } from "react";
import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import Todo from "@/Todo";

import useUserId from "@/hooks/useUser";

type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
};

function Todos() {
  const [todos, setTodos] = useState<TodoItem[]>();
  const [completedTodos, setCompletedTodos] = useState<TodoItem[]>([]);
  const userId = useUserId();
  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [activeTab, setActiveTab] = useState("all");

  // Sort todos function priority order by key values
  function sortTodos(todos: TodoItem[]) {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3
    };

    return todos.sort((a, b) => {
      // Sort by priority
      return priorityOrder[a.priority] - priorityOrder[b.priority] || a.title.localeCompare(b.title); // or if priority is the same, sort by title
    });
  }

  // Sort the todos if they exist
  const sortedTodos = todos ? sortTodos(todos) : [];

  // Function to add a new todo
  function onAddTodo() {
    if (!userId || !newTask) {
      return;
    }

    // Add a new document to the Firestore
    addDoc(collection(db, "users", userId, "todos"), {
      title: newTask,
      completed: false,
      priority: newTaskPriority,
    });

    // Reset the input fields after adding the todo
    setNewTask("");
  }

  // Function to remove a todo
  function onRemoveTodo(todoId: string) {
    if (!userId) {
      return;
    }

    // Delete the document from Firestore
    deleteDoc(doc(db, "users", userId, "todos", todoId));
  }

  // Function to mark a todo as completed
  function onCompleteTodo(todoId: string) {
    if (!userId) {
      return;
    }

    // Update the document in Firestore to mark it as completed
    updateDoc(doc(db, "users", userId, "todos", todoId), {
      completed: true,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddTodo();
  }

  useEffect(() => {
    if (!userId) {
      return;
    }

    // Not sure how to fix wrong types
    const _unsubscribe = onSnapshot(
      collection(db, "users", userId, "todos"),
      (collection) => {
        // NOTE: types are wrong here
        const todos = collection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TodoItem[];
        setTodos(todos);
      },
    );
    return _unsubscribe; // return _unsubscribe
  }, [userId]);

  useEffect(() => {
    if (!todos) {
      return;
    }

    // Filter and set the completed todos
    setCompletedTodos(todos.filter((todo) => todo.completed));
  }, [todos]);

  // Render Todo list UI
  return (
    <Card className="w-full md:w-[60%] mx-auto">
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
        <CardDescription>Add new items using form below.</CardDescription>
      </CardHeader>
      {/* <CardContent></CardContent>  I don't know what the purpoose of this is so I've commented it out*/}
      <CardFooter className="flex justify-between flex-col">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value={"all"}>
            <ul>
              {/* Render all todos */}
              {sortedTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onRemove={onRemoveTodo}
                  onComplete={onCompleteTodo}
                />
              ))}
            </ul>
          </TabsContent>
          <TabsContent value={"Active"}>
            <ul className={"list-none space-y-2"}>
              {/* Render active todos */}
              {sortedTodos
                .filter((todo) => !todo.completed)
                .map((todo) => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    onRemove={onRemoveTodo}
                    onComplete={onCompleteTodo}
                  />
                ))}
            </ul>
          </TabsContent>
          <TabsContent value={"completed"}>
            <ul className={"list-none space-y-2"}>
              {/* Render completed todos */}
              {completedTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onRemove={onRemoveTodo}
                  onComplete={onCompleteTodo}
                />
              ))}
            </ul>
          </TabsContent>
        </Tabs>

        {activeTab !== "completed" && (
          <form onSubmit={handleSubmit} className="w-full">
            {/* Add new todo input */}
            <div className="flex gap-2 w-full mt-4">
              <Input
                required
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1"
              />
              <div>
                <Select value={newTaskPriority} onValueChange={setNewTaskPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit">Add</Button>
            </div>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}

export default Todos;


// TODO:
// - When on Completed tab hide add task field.
// - Add active tab to display only active tasks. -fixed
// - Fix priority order -fixed
// - Keep focus on input when adding task(use case is for when/ if user plans multiple tasks at once) -fixed
// - Add handleSubmit so user can press enter to add task -fixed
// - When webpage is below 770px priority tag disappear -fixed
// - Last priority should be remembered - fixed (setNewTaskPriority("medium") removed so when new task is added, the priority select field doesn't reset to medium everytime but resets on refresh) )
// - Removed setNewTaskPriority("medium") from onAddTodo() function so last priority is remembered - fixed
// - Add hover effect to Todo list items - fixed

// Issue: required message kept popping up on submit -fixed (upon adding handleSubmit to form the button which initially had onClick(addToDo) was causing the addToDo function to run twice and therefore the message kept popping up)

// Commented out CardContent due to build failing to compile