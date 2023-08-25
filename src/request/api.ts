import service from '.'

interface loginData {
  username: string,
  password: string
}

export function login(data: loginData) {
  return service({
    url: "/login",
    method: "post",
    data
  })
}

export function getGoodsList() {
  return service({
    url: "/getGoodsList",
    method: "get"
  })
}