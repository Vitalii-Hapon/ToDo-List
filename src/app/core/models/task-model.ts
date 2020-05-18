export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  date: string;
}

export class TaskModel implements ITask {
  id: number;
  title: string;
  completed: boolean;
  date: string;

  constructor({
                id = null,
                title = 'new',
                completed = false,
                date = new Date().toISOString()
              }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.date = date;
  }
}
