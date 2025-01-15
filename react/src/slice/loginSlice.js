import { createSlice } from '@reduxjs/toolkit'
import { loginPost } from '../api/memberApi'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCookie,removeCookie, getCookie } from '../util/cookieUtil'




const initState = {
    email: '',


}

//쿠키에서 로그인 정보 로딩
const loadMemberCookie = () => { 
    const memberInfo = getCookie("member1")

    //닉네임 처리 
    if (memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }
    return memberInfo
}


//createAsyncThuck('이름', () => {})
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) =>{
        return loginPost(param)
})

export const kakaoLoginPostAsync = createAsyncThunk('kakaoLoginPostAsync', async (kakaoToken) => {
    const response = await loginPost(kakaoToken);  // 카카오 로그인 API 호출
    return response;
  });

  export const googleLoginPostAsync = createAsyncThunk('googleLoginPostAsync', async (googleToken) => {
    try {
        const response = await loginPost(googleToken);  // 구글 로그인 API 호출
        return response;  
    } catch (error) {
        console.error("Google login failed:", error);
        throw error;  // 에러 처리
    }
});

const loginSlice = createSlice({
    name:'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers:{
        login: (state, action) => {
            console.log("login.....")
               //소셜회원이면
           const payload = action.payload
           const memberData = {
            email: payload.email,
            nickname: payload.nickname,
            accessToken: payload.accessToken,
            refreshToken: payload.refreshToken,
            like: payload.like
        };
    
        setCookie("member1", JSON.stringify(memberData), 1); // 멤버 쿠키에 토큰 포함 저장
        localStorage.setItem("like", JSON.stringify(payload.like));
        localStorage.setItem("accessToken", payload.accessToken);
        localStorage.setItem("refreshToken", payload.refreshToken);   
    //    localStorage.setItem("like", payload.{like});

            return {
                ...state, // 기존 상태는 그대로 두고, 변경된 부분만 덮어씌웁니다.
                email: payload.email,
                nickname: payload.nickname,
                accessToken: payload.accessToken,
                refreshToken: payload.refreshToken
              };
        },
        logout: (state, action) => {
            console.log("logout...")
            removeCookie("member1")
            localStorage.clear();
            return { ...initState}

        }
    } ,
    extraReducers:(builder) => {
        builder
        .addCase(loginPostAsync.pending, (state,action) => {
         
            console.log("Pending : 데이터 오는중")
          })
          .addCase(loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled : 성공")
            const payload = action.payload

            //정상적인 로그인시 쿠키저장  (값에 JSON  양식으로 payload data를 넣느다.)
            if(!payload.error){
                setCookie("member1", JSON.stringify(payload),1)
            //    const { email } = action.meta.arg;
                state.email = payload.email;
                state.nickname = payload.nickname;

               // localStorage.setItem('email', email);
                console.log("페이로드",payload)
            }
  
          })
          .addCase(loginPostAsync.rejected, (state, action) => {
            //데이터 받기 실패
            console.log("rejected : 실패")
    }).addCase(kakaoLoginPostAsync.pending, (state) => {
        console.log("카카오 로그인 요청 중...");
      })
      .addCase(kakaoLoginPostAsync.fulfilled, (state, action) => {
        console.log("카카오 로그인 성공", action.payload);
        const payload = action.payload;

        // 카카오 로그인 성공 시, 쿠키에 저장
        if (!payload.error) {
          setCookie("member1", JSON.stringify(payload), 1); // 1일 동안 유지
          state.email = payload.email;
          state.nickname = payload.nickname;
        }
      })
      .addCase(kakaoLoginPostAsync.rejected, (state, action) => {
        console.log("카카오 로그인 실패", action);
        state.error = action.payload?.error || action.error?.message || "카카오 로그인 실패: 알 수 없는 오류";
    }).addCase(googleLoginPostAsync.pending, (state) => {
        console.log("구글 로그인 요청 중...");
      })
      .addCase(googleLoginPostAsync.fulfilled, (state, action) => {
        console.log("구글 로그인 성공", action.payload);
        const payload = action.payload;

        
        // 카카오 로그인 성공 시, 쿠키에 저장
        if (!payload.error) {
          setCookie("member1", JSON.stringify(payload), 1); // 1일 동안 유지
          state.email = payload.email;
        }
      })
      .addCase(googleLoginPostAsync.rejected, (state, action) => {
        console.log("구글 로그인 실패", action);
        state.error = action.payload?.error || action.error?.message || "구글 로그인 실패: 알 수 없는 오류";
    });
  }
}
)

export const {login, logout } = loginSlice.actions

export default loginSlice.reducer












