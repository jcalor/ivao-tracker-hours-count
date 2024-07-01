import { useQuery } from "react-query"
import Http from "../../utils/Http"
import { useAuth } from "./useAuth"
import { useCallback } from "react"

const fetchUser = id => Http({ url: `/v2/users/${id ?? "me"}` })

export const useUser = (id = undefined) => {
  const fetchEntity = useCallback(id => fetchUser(id), [])
  const auth = useAuth()
  const { data: user, ...rest } = useQuery(
    [`user${id ? `_${id}` : ""}`],
    () => fetchEntity(id),
    {
      enabled: auth.isAuthenticated,
      staleTime: Infinity
    }
  )

  return {
    user,
    ...rest
  }
}
