class Task {
  constructor({ id, title, description, status, priority }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
  }
}

module.exports = Task;
