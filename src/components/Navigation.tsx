
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, PlusCircle, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/" 
                className="text-food-green font-bold text-xl flex items-center gap-2"
              >
                <span className="text-food-orange">Food</span>Share
              </Link>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/">
              <Button variant="ghost" className="flex gap-2 items-center">
                <Home size={18} />
                Home
              </Button>
            </Link>
            <Link to="/post">
              <Button variant="ghost" className="flex gap-2 items-center">
                <PlusCircle size={18} />
                Share Food
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" className="flex gap-2 items-center">
                <User size={18} />
                Profile
              </Button>
            </Link>
            <Link to="/notifications">
              <Button variant="ghost" className="flex gap-2 items-center">
                <Bell size={18} />
                Notifications
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="default" className="bg-food-green hover:bg-food-green-light">
                Login
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-4 space-y-1 px-4">
          <Link to="/" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full justify-start">
              <Home size={18} className="mr-2" />
              Home
            </Button>
          </Link>
          <Link to="/post" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full justify-start">
              <PlusCircle size={18} className="mr-2" />
              Share Food
            </Button>
          </Link>
          <Link to="/profile" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full justify-start">
              <User size={18} className="mr-2" />
              Profile
            </Button>
          </Link>
          <Link to="/notifications" onClick={toggleMenu}>
            <Button variant="ghost" className="w-full justify-start">
              <Bell size={18} className="mr-2" />
              Notifications
            </Button>
          </Link>
          <Link to="/login" onClick={toggleMenu}>
            <Button variant="default" className="w-full bg-food-green hover:bg-food-green-light">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
