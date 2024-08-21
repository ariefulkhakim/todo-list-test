export interface Todo {
  id: string;
  title: string;
  description: string;
  datetime: string;
  status?: "complete" | "incomplete";
}
