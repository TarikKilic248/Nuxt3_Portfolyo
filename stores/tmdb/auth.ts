export const useAuthStore = defineStore('auth', () => {
  const auth = ref()
  const config = useRuntimeConfig()

  const url = 'https://api.themoviedb.org/3/authentication'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${config.public.tmdbToken}`,
    },
  }

  const fetchAuth = async () => {
    await fetch(url, options)
      .then(res => res.json())
      .then(json => auth.value = json)
      .catch(err => console.error(err))
  }

  return {
    auth,

    fetchAuth,
  }
})
