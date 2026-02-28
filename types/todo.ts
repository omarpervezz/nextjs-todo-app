export type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  isPending?: boolean;
};
