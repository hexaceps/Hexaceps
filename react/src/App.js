import logo from './logo.svg';
import './App.css';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/member/LoginPage';
import LogoutPage from './pages/member/LogoutPage';
import AddMemberPage from './pages/member/AddMemberPage';
import MyPage from './pages/member/MyPage';
import BrandNew from './pages/products/BrandNew';
import Luxary from './pages/products/Luxary';
import Brand from './pages/products/Brand';
import Collection from './pages/products/Collection';


function App() {
  
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<MainPage />}/>
        <Route path='/mypage'>  
          <Route index element={<MyPage /> } />
        </Route>
        <Route path="/member">
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<MainPage />} />
          <Route path="add" element={<AddMemberPage />} />
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
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
