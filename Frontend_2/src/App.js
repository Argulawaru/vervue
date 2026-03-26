import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import UploadPage from './pages/UploadPage/UploadPage';
import GetPage from './pages/GetPage/GetPage';
import ViewPage from './pages/ViewPage/ViewPage';
import WeeklyPage from './pages/WeeklyPage/WeeklyPage';
import ShowPage from './pages/ShowPage/ShowPage';
import TryOnPage from './pages/TryOnPage/TryOnPage';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<PageWrapper component={HomePage} page="home" />} />
          <Route path="/upload" element={<PageWrapper component={UploadPage} page="upload" />} />
          <Route path="/get" element={<PageWrapper component={GetPage} page="get" />} />
          <Route path="/view" element={<PageWrapper component={ViewPage} page="view" />} />
          <Route path="/weekly" element={<PageWrapper component={WeeklyPage} page="weekly" />} />
          <Route path="/show" element={<PageWrapper component={ShowPage} page="show" />} />
          <Route path="/tryon" element={<PageWrapper component={TryOnPage} page="tryon" />} />
        </Routes>
      </div>
    </Router>
  );
};

const PageWrapper = ({ component: Component, page }) => (
  <>
    <div className="main-content">
      <Component />
    </div>
    <Footer currentPage={page} />
  </>
);

export default App;

