export interface ITodo {
  id: number;
  title: string;
  desc: string;
  status: ETodoStatus;
  dueDate: string; // ISO date string
}

export enum ETodoStatus {
  Todo = 'Todo',
  Done = 'Done',
}

export interface IPatchTodoRequest {
  categoryId: number;
  title?: string;
  desc?: string;
  status?: ETodoStatus;
  dueDate?: Date;
}
