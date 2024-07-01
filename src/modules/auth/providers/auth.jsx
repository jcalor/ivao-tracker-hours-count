import { AuthProvider as InternalAuthProvider } from "react-oidc-context"
import {
  OPENID_AUTHORITY,
  OPENID_CLIENT_ID,
  OPENID_REDIRECT_URI
} from "../configuration"
import { WebStorageStateStore } from "oidc-client"

const oidcConfig = {
  authority: OPENID_AUTHORITY,
  client_id: OPENID_CLIENT_ID,
  redirect_uri: OPENID_REDIRECT_URI,
  scope: "profile configuration tracker",
  post_logout_redirect_uri: window.location.origin,
  metadataSeed: {
    end_session_endpoint: window.location.origin
  },
  
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  revokeTokensOnSignout: true
}

export const AuthProvider = ({ children }) => {
  return <InternalAuthProvider {...oidcConfig}>{children}</InternalAuthProvider>
}
