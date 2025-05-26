
import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20 md:pt-24 px-4 md:px-6 pb-8 bg-white">
        <div className="max-w-7xl mx-auto bg-transparent">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
