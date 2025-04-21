import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import StarBackground from '../common/StarBackground';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="site-layout">
      <StarBackground />
      <Header />
      <main className="site-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
