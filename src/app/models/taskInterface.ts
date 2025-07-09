export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done'; 
    dueDate: string; 
    priority: 'P1' | 'P2' | 'P3'; 
  }
  