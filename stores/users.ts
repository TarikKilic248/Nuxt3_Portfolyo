import type { User } from "~/types"

export const useUserStore = defineStore('user', () => {

    const userList = ref<User[]>()
    let counter = 1
    
    const fetchUserList = async () => {
        await fetch('https://randomuser.me/api/?results=200')
        .then((_response) => _response.json())
        .then((_data) => {userList.value = _data.results

        userList.value = _data.results.map((user: any) => {
          return {
            userId: counter++,
            name: `${user.name.first} ${user.name.last}`,
            thumbnail: user.picture.thumbnail,
          }
        })
      })
  }

  return {
    userList,
    fetchUserList,
  }
})
