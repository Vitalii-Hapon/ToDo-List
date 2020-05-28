export interface ITask {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

export class TaskModel implements ITask {
  id: string;
  title: string;
  date: string;
  completed: boolean;

  constructor({
                id = '',
                title = 'new',
                completed = false,
                date = new Date().toISOString()
              }) {
    this.id = id;
    this.title = title.toUpperCase();
    this.date = date;
    this.completed = completed;
  }
}
