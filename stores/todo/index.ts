import type { Todo, User, UserWithTodo } from '~/types'

export const useTodoStore = defineStore('todo', () => {
  const userWithTodo = ref<UserWithTodo[]>()
  const selectedUser = ref<UserWithTodo>()
  const todoList = ref<Todo[]>()
  const userValue = 10

  const fetchTodoList = async () => {
    // TODO listesini çek
    await fetch('https://jsonplaceholder.typicode.com/todos')
      .then(_response => _response.json())
      .then((_data) => {
        todoList.value = _data.map((item: { title: string, completed: boolean }) => ({
          title: item.title,
          completed: item.completed,
        }))
      })

    // Kullanıcı listesini çek
    await fetch(`https://randomuser.me/api/?results=${userValue}`)
      .then(_response => _response.json())
      .then((_data) => {
        const todosCopy = todoList.value ? [...todoList.value] : [] // Todo listesinin bir kopyasını al
        let counter = 1 // Kullanıcı ID'sini takip etmek için sayaç
        const minTodos = 3 // Kullanıcı başına atanabilecek minimum todo sayısı
        const maxTodos = 10 // Kullanıcı başına atanabilecek maksimum todo sayısı

        userWithTodo.value = _data.results.map((user: User) => {
          const userId = counter++
          if (counter > userValue) {
            counter = 1
          }

          // Kullanıcıya rastgele sayıda todo ekleme
          const userTodos: Todo[] = []
          const todoCount = Math.floor(Math.random() * (maxTodos - minTodos + 1)) + minTodos // Rastgele bir sayı (min ile max arasında)
          for (let i = 0; i < todoCount; i++) {
            if (todosCopy.length === 0)
              break // Eğer todo kopyası boşaldıysa döngüyü kır
            const randomIndex = Math.floor(Math.random() * todosCopy.length)
            userTodos.push(todosCopy.splice(randomIndex, 1)[0]) // Rastgele bir todo'yu seç ve listeden çıkar
          }

          return {
            ...user,
            id: userId,
            name: `${user.name.first} ${user.name.last}`,
            todos: userTodos,
          }
        })
      })
  }

  return {
    todoList,
    userWithTodo,
    selectedUser,
    fetchTodoList,
  }
})
