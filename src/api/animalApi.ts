import api from './api'

const URLS = {
  fetchDogUrl: 'breeds/image/random',
}

export type DogData = {
  message: string
  status: 'success' | 'error'
}

export const fetchDog = () => {
  return api.get<DogData>(URLS.fetchDogUrl, {
    baseURL: 'https://dog.ceo/api/',
  })
}
