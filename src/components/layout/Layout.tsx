import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import StarBackground from '../common/StarBackground';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="site-layout">
      <StarBackground />
      <Header />
      <main className="site-main">
        {children}
      </main>
      {!isHomePage && <Footer />}
    </div>
  );
};

export default Layout;