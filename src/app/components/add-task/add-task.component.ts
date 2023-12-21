import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
} from '@angular/core';
import CreateTaskDto from 'src/app/dtos/create-task.dto';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnChanges {
  text: string = '';
  @Input() taskToBeEdited: Task = new Task();
  @Output() onAddTask: EventEmitter<CreateTaskDto> = new EventEmitter();
  @Output() onEditTaskChange: EventEmitter<Task> = new EventEmitter();

  ngOnChanges() {
    if (this.taskToBeEdited.text.length > 0)
      this.text = this.taskToBeEdited.text;
  }

  onClick() {
    const createTaskDto: CreateTaskDto = { text: this.text };
    this.onAddTask.emit(createTaskDto);
    this.text = '';
  }

  onEditClick() {
    this.taskToBeEdited.text = this.text;
    this.onEditTaskChange.emit(this.taskToBeEdited);
    this.taskToBeEdited = new Task();
    this.text = '';
  }
}
