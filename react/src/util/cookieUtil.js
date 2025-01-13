    import { Cookies } from "react-cookie";


    const cookies = new Cookies()
    document.cookie = "name=value; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";

    //쿠키저장
    export const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setUTCDate(expires.getUTCDate() + days);
        console.log(`Setting cookie: ${name} = ${value}, expires at: ${expires}`);
        cookies.set(name, value, { path: '/', expires });
    };
    


    ///쿠키삭제
    export const removeCookie = (name, path = "/") => {

        cookies.remove(name, { path })
    }

    //조회
    export const getCookie = (name) => {

        return cookies.get(name)
    }