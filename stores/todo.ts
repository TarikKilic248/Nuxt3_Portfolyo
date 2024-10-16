import type { Todo, UserWithTodo } from "~/types";

export const useTodoStore = defineStore('todo', () => {
  
  const todoList = ref<Todo[]>();
  const UserWithTodo = ref<UserWithTodo[]>();
  let counter = 1;
  const apiValue = 10;

  const fetchTodoList = async () => {
    await fetch('https://jsonplaceholder.typicode.com/todos')
      .then((_response) => _response.json())
      .then((_data) => {
        todoList.value = _data;
      });

    await fetch(`https://randomuser.me/api/?results=${apiValue}`)
      .then((_response) => _response.json())
      .then((_data) => {
        UserWithTodo.value = _data.results.map((user: any) => {
          
          const userTodos = todoList.value?.filter((todo: Todo) => todo.userId === counter)
          const userId = counter++;
          if(counter > apiValue){
            counter = 1
          }
          return {
            id: userId,
            name: `${user.name.first} ${user.name.last}`,
            picture: user.picture.thumbnail,
            todos: userTodos && userTodos.length > 0 ? userTodos : []
          };
        });
      });
  };

  return {
    todoList,
    UserWithTodo,
    fetchTodoList,
  };
});
