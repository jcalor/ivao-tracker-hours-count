import axios from "axios"
import { OPENID_AUTHORITY, OPENID_CLIENT_ID } from "../auth/configuration"
import { User } from "oidc-client"


const Http = axios.create({
  baseURL: import.meta.env.VITE_IVAO_API_BASE_URL
})

Http.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status === 401) {
      window.location.reload()
    }
    if (error.response?.data?.message)
      return Promise.reject(new Error(error.response.data.message))

    return Promise.reject(error)
  }
)

Http.interceptors.request.use(request => {
  const oidcStorage = window.localStorage.getItem(
    `oidc.user:${OPENID_AUTHORITY}:${OPENID_CLIENT_ID}`
  )
  if (!oidcStorage) {
    return request
  }

  const user = User.fromStorageString(oidcStorage)
  if (!user || !user.access_token) {
    return request
  }

  request.headers = request.headers ?? {}
  request.headers["Authorization"] = `Bearer ${user.access_token}`
  return request
})

export default Http
