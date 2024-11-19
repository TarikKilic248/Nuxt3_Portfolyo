export interface Todo {
  title: any
  completed: boolean
}

export interface User {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
    postcode: number
    coordinates: {
      latitude: string
      longitude: string
    }
    timezone: {
      offset: string
      description: string
    }
  }
  email: string
  login: {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
  }
  dob: {
    date: string
    age: number
  }
  registered: {
    date: string
    age: number
  }
  phone: string
  cell: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

export interface UserWithTodo extends User {
  id: number
  todos: Todo[]
}

export interface Pokemons {
  name: string
  abilities: object
  base_experience: number
  cries: string
  height: number
  sprites: {
    back: string
    front: string
  }
  stats: {
    attack: { base_stat: number, url: string }
    hp: { base_stat: number, url: string }
    special_attack: { base_stat: number, url: string }
    special_defence: { base_stat: number, url: string }
    speed: { base_stat: number, url: string }
  }
  types: object
  weight: number
  location_area_encounters: string
}

export interface Media {
  first_air_date: string
  release_date: string
  title: any
  name: any
  adult: boolean
  backdrop_path: string
  genres: object
  homepage: string
  id: number
  origin_country: []
  original_language: string
  popularity: number
  poster_path: string
  spoken_language: []
  status: string
  tagline: string
  vote_average: number
  vote_count: number
  overview: string

}

export interface Movie extends Media {
  belongs_to_collection: object
  budget: number
  imdb_id: string
  original_title: string
  release_date: string
  revenue: number
  runtime: number
  title: string
  video: boolean
}

export interface TVShow extends Media {
  created_by: []
  episode_run_time: number[]
  first_air_date: string
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: object
  name: string
  next_episode_to_air: object
  networks: string[]
  number_of_episodes: number
  number_of_seasons: number
  original_name: string
  seasons: []
  type: string
}

export interface MediaList {
  page: number
  results: Media[]
  total_pages: number
  total_results: number
}
