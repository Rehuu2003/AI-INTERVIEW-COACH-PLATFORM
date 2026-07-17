import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, BarChart3,
  FileText, Settings, LogOut, Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Interview", icon: MessageSquare, path: "/dashboard/interview" },
  { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { name: "Resume", icon: FileText, path: "/dashboard/resume" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName = user?.name || "User";
  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">

      {/* Sidebar */}
      <aside className="hidden lg:flex w-[240px] border-r border-white/[0.06] bg-[#09090b] flex-col justify-between py-6 px-4 sticky top-0 h-screen shrink-0">

        {/* Top */}
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-2 mb-8">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <Zap size={14} className="text-white" fill="white" />
            </div>
            <span className="text-sm font-semibold text-white">InterviewIQ</span>
          </div>

          {/* User */}
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-violet-600/20 border border-violet-500/25 flex items-center justify-center text-xs font-bold text-violet-300 shrink-0">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{displayName}</p>
                <p className="text-xs text-zinc-500 capitalize truncate">{user?.role || "member"}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm font-medium ${
                      isActive
                        ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                    }`
                  }
                >
                  <Icon size={16} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all border border-transparent"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </aside>

      {/* Main content */}
      <main id="main-content" className="flex-1 overflow-y-auto h-screen bg-[#09090b]">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
