import { fetchDog, fetchCat } from '@/api/animalApi'
import { withAsync } from '@/helpers/withAsync'
import { useState, useEffect } from 'react'
import { IDLE, PENDING, SUCCESS, ERROR, ApiStatus } from '@/constants/apiStatus'
import LazyLoader from './LazyLoader'
const useFetchDog = () => {
  const [dog, setDog] = useState<string>()
  const [fetchDogStatus, setFetchDogStatus] = useState<ApiStatus>('IDLE')
  const initFetchDog = async () => {
    setFetchDogStatus(PENDING)
    const { response, error } = await withAsync(() => fetchDog())
    if (error) {
      setFetchDogStatus(ERROR)
    } else if (response) {
      setDog(response.data.message)
      setFetchDogStatus(SUCCESS)
    }
  }

  return {
    dog,
    fetchDogStatus,
    initFetchDog,
  }
}

const useFetchCat = () => {
  const [cat, setCat] = useState<string>()
  const initFetchCat = async () => {
    const response = await fetchCat()
    setCat(response.data?.[0].url)
  }
  return {
    cat,
    initFetchCat,
  }
}

const useFetchAnimals = () => {
  const { dog, initFetchDog } = useFetchDog()
  const { cat, initFetchCat } = useFetchCat()
  const fetchAnimals = () => {
    initFetchDog()
    initFetchCat()
  }
  useEffect(() => {
    fetchAnimals()
  }, [])
  return {
    dog,
    cat,
    fetchAnimals,
  }
}

function AnimalExampleWithApiStates() {
  const { dog, fetchDogStatus, initFetchDog } = useFetchDog()
  useEffect(() => {
    initFetchDog()
  }, [])
  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="flex justify-center gap-8">
        <div className="w-64 h-64">
          {fetchDogStatus === IDLE ? <p>Welcome</p> : null}
          <LazyLoader show={fetchDogStatus === PENDING} delay={400} />
          {fetchDogStatus === ERROR ? <p>There was a problem</p> : null}
          {fetchDogStatus === SUCCESS ? (
            <img className="h-64 w-full object-cover" src={dog} alt="Dog" />
          ) : null}
        </div>
      </div>
      <button
        onClick={initFetchDog}
        className="mt-4 bg-blue-800 text-blue-100 p-4"
      >
        Fetch animals
      </button>
    </div>
  )
}
export default AnimalExampleWithApiStates
// function AnimalExample() {
//   const { dog, cat, fetchAnimals } = useFetchAnimals()
//   return (
//     <div className="my-8 mx-auto max-w-2xl">
//       <div className="flex gap-8">
//         <div className="w-1/2">
//           {cat ? (
//             <img className="h-64 w-full object-cover" src={cat} alt="Cat" />
//           ) : null}
//         </div>
//         <div className="w-1/2">
//           {dog ? (
//             <img className="h-64 w-full object-cover" src={dog} alt="Dog" />
//           ) : null}
//         </div>
//       </div>
//       <button
//         onClick={fetchAnimals}
//         className="mt-4 bg-blue-800 text-blue-100 p-4"
//       >
//         Fetch animals
//       </button>
//     </div>
//   )
// }
// export default AnimalExample
