import { Link, useLocation } from 'react-router-dom';
import { Book, Gamepad2, Trophy, User, Home, Menu, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Learning', icon: Book, path: '/learning' },
    { name: 'Games', icon: Gamepad2, path: '/games' },
    { name: 'Progress', icon: Trophy, path: '/progress' },
    { name: 'Parent', icon: User, path: '/parent' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-500">Kids English</h1>
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-gray-100 text-gray-700'
                      }
                    `}
                    onClick={onClose}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-700 font-medium">
              Remember to have fun while learning!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};