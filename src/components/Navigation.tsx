
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, CheckSquare, Home, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 w-full bg-transparent">
          <div className="flex items-center justify-between bg-transparent">
            <div className="flex items-center space-x-8 bg-transparent">
              <h1 className="text-2xl font-montserrat font-bold logo-white">Focus</h1>
              <div className="flex space-x-1 bg-transparent">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-foreground hover:text-primary hover:bg-secondary'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
        <div className="px-4 py-4 bg-transparent">
          <div className="flex items-center justify-between bg-transparent">
            <h1 className="text-xl font-montserrat font-bold logo-white">Focus</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 bg-transparent"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card/90 backdrop-blur-md border-t border-border animate-slide-in">
            <div className="px-4 py-4 space-y-2 bg-transparent">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-foreground hover:text-primary hover:bg-secondary'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
