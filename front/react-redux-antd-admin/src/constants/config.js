import createHistory from "history/createBrowserHistory"

export const history = createHistory()

export const config = {
    baseUrl: "http://localhost:8082/re",
    defaultPageSize: 5,
    // token有效期  12小时
    tokenValidTime: 1000 * 60 * 60 * 12
};