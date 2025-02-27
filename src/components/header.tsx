import "../tailwind.css";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-slate-600 w-full">
      <Link to="/"><h1>Seiwa Api</h1></Link>
      <nav className="flex gap-2">
        <Link to="/">Requirements</Link>
        <Link to="/add">Add</Link>
      </nav>
    </header>
  );
};
