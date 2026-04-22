import { useLocation } from "wouter";
import { LayoutDashboard, Package, Radio, MessageSquare, Settings, LogOut } from "lucide-react";

const navItems = [
  { label: "Painel", href: "/", icon: LayoutDashboard },
  { label: "Estoque", href: "/inventory", icon: Package },
  { label: "Canais", href: "/channels", icon: Radio },
  { label: "Mensagens", href: "/messages", icon: MessageSquare },
  { label: "Configurações", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const [location, setLocation] = useLocation();

  return (
    <aside className="w-60 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      {/* Logo / Header */}
      <div className="px-6 py-6 border-b border-sidebar-border">
        <h1 className="text-lg font-semibold tracking-tight">Garage Sale</h1>
        <p className="text-xs text-sidebar-foreground/60 mt-1">Pinheiros, SP</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <button
              key={item.href}
              onClick={() => setLocation(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-75 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-border hover:text-sidebar-foreground"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors duration-75">
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
