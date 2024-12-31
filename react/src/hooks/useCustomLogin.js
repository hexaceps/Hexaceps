import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginPostAsync } from "../slice/loginSlice"
import { logout } from "../slice/loginSlice"
import { Navigate } from "react-router-dom"
import { getOne } from "../api/qnaApi"


const useCustomLogin = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //로그인 상태
    const loginState = useSelector(state => state.loginSlice)


    //로그인 여부
    const isLogin = loginState.email ? true : false

    //로그인 함수
    const doLogin = async (loginParm) => {
        const action = await dispatch(loginPostAsync(loginParm))
        console.log("로그인 성공",action)
        return action.payload
    }

    //로그아웃 함수
    const doLogout = () => {
        dispatch(logout())
    }

    //페이지 이동
    const moveToPath = (path) => {
        navigate({ pathname : path}, {replace : true})
    }

    //로그인 페이지로 이동
    const moveToLogin = () => {
        navigate({ pathname : '/member/login'}, {replace : true})
    }

    //로그인 페이지로 이동
    const moveToLoginReturn = () => {
        return <Navigate repace to ="/member/login" />
    }


return {loginState, isLogin, doLogin, doLogout, moveToLogin, moveToLoginReturn, moveToPath}

}

export default useCustomLogin