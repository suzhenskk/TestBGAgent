import { Menu } from 'lucide-react';

interface TopBarProps {
  onMenuClick: () => void;
  title: string;
}

export const TopBar = ({ onMenuClick, title }: TopBarProps) => {
  return (
    <header className="bg-white shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium">A</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};