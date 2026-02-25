import { Outlet, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import {
  User,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Users,
  Waves,
  Scale,
  Anchor,
  Target,
} from 'lucide-react';
import { useState } from 'react';

export function DashboardLayout() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const initials = profile?.full_name
    ? profile.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? '??';

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Inicio', end: true },
    { to: '/dashboard/rowers', icon: Users, label: 'Plantilla', end: false },
    { to: '/dashboard/weigh-ins', icon: Scale, label: 'Pesajes', end: false },
    { to: '/dashboard/lineups', icon: Anchor, label: 'Alineaciones', end: false },
    { to: '/dashboard/tests', icon: Target, label: 'Test', end: false },
    { to: '/dashboard/profile', icon: User, label: 'Mi Perfil', end: false },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Waves className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3>TraineraPro</h3>
            <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>Gestion de remo</p>
          </div>
          <button
            className="ml-auto lg:hidden text-muted-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Separator />

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <Separator />

        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-secondary">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate" style={{ fontSize: '0.875rem' }}>
                {profile?.full_name || 'Usuario'}
              </p>
              <p className="text-muted-foreground truncate" style={{ fontSize: '0.75rem' }}>
                {user?.email}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesion
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </header>
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}