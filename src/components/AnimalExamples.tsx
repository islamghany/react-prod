import { useEffect } from 'react'
import { fetchDog } from '@/api/animalApi'
import LazySpinner from './LazyLoader'
import { useApi } from '@/hooks/useApi'

const useFetchDog = () => {
  const {
    data: dog,
    exec: initFetchDog,
    status: fetchDogStatus,
    isIdle: isFetchDogStatusIdle,
    isPending: isFetchDogStatusPending,
    isError: isFetchDogStatusError,
    isSuccess: isFetchDogStatusSuccess,
  } = useApi(() => fetchDog().then((response) => response.data.message))

  return {
    dog,
    fetchDogStatus,
    initFetchDog,
    isFetchDogStatusIdle,
    isFetchDogStatusPending,
    isFetchDogStatusError,
    isFetchDogStatusSuccess,
  }
}

function Animal() {
  const {
    dog,
    initFetchDog,
    isFetchDogStatusIdle,
    isFetchDogStatusPending,
    isFetchDogStatusError,
    isFetchDogStatusSuccess,
    fetchDogStatus,
  } = useFetchDog()

  useEffect(() => {
    initFetchDog()
  }, [])
  return (
    <div className="my-8 mx-auto max-w-2xl">
      <div className="flex justify-center gap-8">
        <div className="w-64 h-64">
          <LazySpinner show={isFetchDogStatusPending} delay={400} />
          {isFetchDogStatusIdle ? <p>Welcome</p> : null}
          {isFetchDogStatusError ? <p>There was a problem</p> : null}
          {isFetchDogStatusSuccess ? (
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

export default Animal
