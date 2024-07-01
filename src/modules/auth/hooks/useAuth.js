import { useAuth as __useAuth } from "react-oidc-context"
import { useNavigate } from "react-router-dom"
import { jwtDecode as jwt_decode } from "jwt-decode"

export const useAuth = () => {
  const auth = __useAuth()
  const navigate = useNavigate()

  auth.startSilentRenew()

  if (auth.error) {
    console.error(auth.error)
  }

  if (auth.user?.access_token) {
    auth.user.tokenData = jwt_decode(auth.user.access_token)
    if (auth.user.tokenData)
      auth.user.tokenData.permissions = auth.user.tokenData.permission.split(
        " "
      )
  }

  const signIn = async () => {
    if (auth.isLoading || auth.activeNavigator || auth.isAuthenticated) return
    let redirect = window.location.href.substring(window.location.origin.length)
    if (redirect === "/logout" || redirect === "logout") redirect = "/"
    window.sessionStorage.setItem("redirect", redirect)
    await auth.signinRedirect()
  }

  const hasRedirect = () => window.sessionStorage.getItem("redirect")

  const redirect = () => {
    const redirectUrl = window.sessionStorage.getItem("redirect")
    if (!redirectUrl) {
      return
    }
    window.sessionStorage.removeItem("redirect")
    navigate(redirectUrl)
  }

  const hasPermission = key => {
    return (
      auth.user?.access_token &&
      auth.user?.tokenData &&
      auth.user.tokenData.permissions.includes(key)
    )
  }

  return { ...auth, signIn, hasRedirect, redirect, hasPermission }
}
