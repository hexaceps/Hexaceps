import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import MainPage from './pages/MainPage'

import IndexPage from './pages/qna/IndexPage'
import ListPage from './pages/qna/ListPage';
import ReadPage from './pages/qna/ReadPage';
import AddPage from './pages/qna/AddPage';
import ModifyPage from './pages/qna/ModifyPage';

import ProductIndexPage from './pages/products/ProductIndexPage';
import ProductAddPage from './pages/products/ProductAddPage';
import ProductReadPage from './pages/products/ProductReadPage';
import ProductListPage from './pages/products/ProductListPage';
import ProductModifyPage from './pages/products/ProductModifyPage';

import MyPageComponent from './components/home/MyPageComponent';
import ModifyMemberComponent from './components/mypageSub/ModifyMemberComponent';
import LoginPage from './pages/member/LoginPage';
import LogoutPage from './pages/member/LogoutPage';
import AddMemberPage from './pages/member/AddMemberPage';
import MyPage from './pages/member/MyPage';

import BrandNew from './pages/products/BrandNew';
import Luxary from './pages/products/Luxary';
import Brand from './pages/products/Brand';
import Collection from './pages/products/Collection';
import Size from './pages/products/Size';
import Price from './pages/products/Price';

import NoticePage from './pages/board/NoticePage';
import FAQPage from './pages/board/FAQPage';
import AboutUsPage from './pages/board/AboutUsPage';
import BoardDetailPage from './pages/board/BoardDetailPage';
import BoardCreatePage from './pages/board/BoardCreatePage'
import BoardUpdatePage from './pages/board/BoardUpdatePage';

import OrderPage from './pages/order/OrderPage';
import CartPage from './pages/cart/CartPage';
import LikePage from './pages/like/LikePage';
import Agreement from './pages/info/Agreement';
import PrivacyPage from './pages/info/PrivacyPage'
import BoardQueryPage from './pages/board/BoardQueryPage';
import KakaoRedirectPage from './pages/member/KakaoRedirectPage';
import KakaoModifyPage from './pages/member/KakaoModifyPage';
import GoogleRedirectPage from './pages/member/GoogleRedirectPage';
import MemberEmailPage from './pages/member/MemberEmailPage';
import Search from './pages/products/Search';

import AdminPage from './pages/admin/AdminPage';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<MainPage />}/>
        <Route path="/search" element={<Search />} />
        <Route path='/mypage'>  
          <Route index element={<MyPage /> } />
          <Route path="/mypage" element={<MyPageComponent />} />
          <Route path="/mypage/modify" element={<ModifyMemberComponent />} />
        </Route>
        <Route path="/member">
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<MainPage />} />
          <Route path="add" element={<AddMemberPage />} />
          <Route path="kakao" element={<KakaoRedirectPage />} />
          <Route path="modify" element={<KakaoModifyPage />} />
          <Route path='modifyN' element={<ModifyMemberComponent />} />
          <Route path="google" element={<GoogleRedirectPage />} />
          <Route path="email" element={<MemberEmailPage />} />
        </Route>
        <Route path="/qna/">
          <Route index element={<IndexPage />}/>
          <Route path="add" element={<AddPage />} />
          <Route path="list" element={<ListPage />} />
          <Route path="read/:qno" element={<ReadPage />} />
          <Route path="modify/:qno" element={<ModifyPage />} />
        </Route>
        <Route path="/products/">
          <Route index element={<ProductIndexPage />} />
          <Route path="add" element={<ProductAddPage />} />
          <Route path="list" element={<ProductListPage />} />
          <Route path="read/:productId" element={<ProductReadPage />} />
          <Route path="modify/:productId" element={<ProductModifyPage />} />
          <Route path='brandnew' element={<BrandNew />} />
          <Route path='luxary' element={<Luxary />} />
          <Route path='brand' element={<Brand />} />
          <Route path='collection' element={<Collection />} />
          <Route path='size' element={<Size />} />
          <Route path='price' element={<Price />} />
        </Route>
        <Route path="/board" >
          <Route path="notice" element={<NoticePage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path=':board_id' element={<BoardDetailPage />} />
          <Route path='update/:board_id' element={<BoardUpdatePage />} />
          <Route path='search/' element={<BoardQueryPage />} />
          <Route path='create' element={<BoardCreatePage />} />
          <Route path="agreement" element={<Agreement />} />
          <Route path='privacy' element={<PrivacyPage />} />
        </Route>
        <Route path="/like" element={<LikePage/>}/>
        <Route path="/order/:cartId" element={<OrderPage/>}/>
        <Route path="/myshop/">
          <Route path="cart" element={<CartPage/>}/>
        </Route>
        <Route path='/admin' element={<AdminPage />} />
      </Route>
    </Routes>
  );
}

export default App;