import { useState } from 'react'
import { useApiStatus } from './useApiStatus'
import { PENDING, SUCCESS, ERROR } from '../constants/apiStatus'
import { withAsync } from '@/helpers/withAsync'

interface UseApiConfig<T> {
  initialData?: T
}

type ApiFunction<T = unknown> = (...args: unknown[]) => T | Promise<T>

export function useApi<TData = unknown, TError = unknown>(
  fn: ApiFunction<TData>,
  config: UseApiConfig<TData> = {}
) {
  const { initialData } = config
  const [data, setData] = useState<TData | undefined>(initialData)
  const [error, setError] = useState<TError | unknown>()
  const { status, setStatus, ...normalisedStatuses } = useApiStatus()

  const exec = async <A>(...args: A[]) => {
    setStatus(PENDING)
    const { response, error } = await withAsync(() => fn(...args))
    if (error) {
      setError(error)
      setStatus(ERROR)
    } else {
      setData(response!)
      setStatus(SUCCESS)
    }

    return {
      error,
      response,
    }
  }

  return {
    data,
    setData,
    status,
    setStatus,
    error,
    exec,
    ...normalisedStatuses,
  }
}
