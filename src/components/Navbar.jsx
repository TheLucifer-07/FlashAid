// FILE: src/components/Navbar.jsx
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/', matchPath: '/' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Volunteer', to: '/volunteer', matchPath: '/volunteer' },
  { label: 'About', to: '/#about' },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="glass flex h-10 w-10 items-center justify-center rounded-2xl">
        <svg viewBox="0 0 64 64" className="h-5 w-5 text-[#e63946]" fill="currentColor" aria-hidden="true">
          <path d="M24 8h16v16h16v16H40v16H24V40H8V24h16z" />
        </svg>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Emergency Response</span>
        <span className="text-base font-semibold tracking-tight text-white">FlashAid</span>
      </div>
    </div>
  );
}

function NavItem({ label, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative px-4 py-2 text-sm font-medium tracking-[0.01em] transition-all duration-200 ${
        isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      <span>{label}</span>
      <span
        className={`absolute inset-x-4 bottom-0 h-0.5 origin-left rounded-full bg-[#e63946] transition-transform duration-200 ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </button>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorNavigation = (target) => {
    if (target.startsWith('/#')) {
      const id = target.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        window.requestAnimationFrame(() => {
          window.setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 120);
        });
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    navigate(target);
  };

  const activePath = links.find((link) => link.matchPath === location.pathname)?.matchPath ?? null;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(9,11,16,0.78)] backdrop-blur-xl">
      <div className="section-shell flex h-[68px] items-center justify-between gap-6">
        <button type="button" onClick={() => navigate('/')} className="transition-default hover:opacity-90">
          <Logo />
        </button>

        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <NavItem
              key={link.label}
              label={link.label}
              isActive={activePath === link.matchPath}
              onClick={() => handleAnchorNavigation(link.to)}
            />
          ))}
        </div>

        <NavLink
          to="/emergency"
          className="red-glow transition-default rounded-xl border border-[#e63946]/20 bg-[#e63946] px-4 py-2.5 text-sm font-semibold tracking-[0.01em] text-white hover:bg-[#dc3441] hover:scale-[1.01]"
        >
          Report Emergency
        </NavLink>
      </div>
    </nav>
  );
}
