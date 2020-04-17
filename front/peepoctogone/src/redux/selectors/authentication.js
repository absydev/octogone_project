export const isAuthorized = store =>
  store.authentication.authorized

export const authorizedUser = store =>
  store.authentication.user
