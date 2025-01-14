const app = Vue.createApp({
    data() {
      return {
        newTask: '',
        newPriority: 'Medium',
        newDeadline: '',
        newTag: '',
        tasks: this.loadTasks() // Load tasks from Local Storage on initialization
      };
    },
    methods: {
      addTask() {
        if (this.newTask.trim() !== '' && this.newDeadline.trim() !== '') {
          this.tasks.push({
            text: this.newTask.trim(),
            priority: this.newPriority,
            deadline: this.newDeadline,
            tag: this.newTag.trim(),
            completed: false
          });
          this.newTask = '';
          this.newPriority = 'Medium';
          this.newDeadline = '';
          this.newTag = '';
          this.saveTasks(); // Save tasks to Local Storage
        }
      },
      toggleTask(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks(); // Save updated tasks
      },
      removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks(); // Save updated tasks
      },
      saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
      }
    }
  });

  app.mount('#app');