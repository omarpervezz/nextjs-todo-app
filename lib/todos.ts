import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function getTodos(userId: string) {
  const client = await clientPromise;
  const db = client.db();

  const todos = await db
    .collection("todos")
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  return todos.map((todo) => ({
    _id: todo._id.toString(), // convert ObjectId
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(), // convert Date
    updatedAt: todo.updatedAt.toISOString(),
    version: todo.version,
  }));
}

export async function createTodo(title: string, userId: string) {
  const client = await clientPromise;
  const db = client.db();

  const newTodo = {
    userId,
    title,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
  };

  const result = await db.collection("todos").insertOne(newTodo);

  return {
    _id: result.insertedId,
    ...newTodo,
  };
}

export async function updateTodoStatus(
  id: string,
  completed: boolean,
  currentVersion: number,
  userId: string,
) {
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("todos").updateOne(
    {
      _id: new ObjectId(id),
      userId,
      version: currentVersion, // only update if version matches
    },
    {
      $set: {
        completed,
        updatedAt: new Date(),
      },
      $inc: {
        version: 1,
      },
    },
  );

  if (result.matchedCount === 0) {
    return { conflict: true };
  }

  return { success: true };
}

export async function deleteTodo(id: string, userId: string) {
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("todos").deleteOne({
    _id: new ObjectId(id),
    userId,
  });

  if (result.deletedCount === 0) {
    throw new Error("Todo not found");
  }

  return true;
}

export async function searchTodos(query: string, userId: string) {
  const client = await clientPromise;
  const db = client.db();

  const trimmed = query.trim();

  if (!trimmed) {
    return [];
  }

  const todos = await db
    .collection("todos")
    .find({
      userId,
      title: {
        $regex: trimmed,
        $options: "i", // case-insensitive
      },
    })
    .sort({ createdAt: -1 })
    .toArray();

  return todos.map((todo) => ({
    _id: todo._id.toString(),
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
    updatedAt: todo.updatedAt.toISOString(),
    version: todo.version,
  }));
}
