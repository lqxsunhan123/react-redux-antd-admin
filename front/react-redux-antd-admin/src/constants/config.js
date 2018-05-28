import createHistory from "history/createBrowserHistory"

export const history = createHistory()

/**
 * 一些默认设置
 * @type {{baseUrl: string, defaultPageSize: number, tokenValidTime: number}}
 */
export const config = {
    // fetchUtils项目请求的基url
    baseUrl: "http://localhost:8082/re",
    // 默认的分页器,table请求中
    pager: {defaultPageSize:5, current: 1, pageSize: 5},
    // token有效期  12小时  登录后设置token
    tokenValidTime: 1000 * 60 * 60 * 12
};