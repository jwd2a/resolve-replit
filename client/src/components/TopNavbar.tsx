import { FC } from "react";
import { useLocation, Link } from "wouter";

interface TopNavbarProps {
  className?: string;
}

const TopNavbar: FC<TopNavbarProps> = ({ className = "" }) => {
  const [location] = useLocation();

  return (
    <div className={`bg-primary px-6 py-1 flex items-center text-white ${className}`}>
      <div className="flex space-x-6">
        <Link href="/course">
          <span className={`py-2 border-b-2 cursor-pointer ${location === '/course' || location === '/' ? 'border-white font-semibold' : 'border-transparent hover:border-white/50'}`}>
            Course
          </span>
        </Link>
        <Link href="/parenting-plan">
          <span className={`py-2 border-b-2 cursor-pointer ${location === '/parenting-plan' ? 'border-white font-semibold' : 'border-transparent hover:border-white/50'}`}>
            Parenting Plan
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopNavbar;