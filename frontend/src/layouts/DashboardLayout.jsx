import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, MessageSquare, BarChart3,
  FileText, Settings, LogOut, Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName = user?.name || "User";
  const initial = displayName.charAt(0).toUpperCase();
  const role = user?.role || "Member";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Interview", icon: MessageSquare, path: "/dashboard/interview" },
    { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
    { name: "Resume", icon: FileText, path: "/dashboard/resume" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex">

      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-[270px] border-r border-white/10 bg-white/[0.02] flex-col justify-between p-6 sticky top-0 h-screen shrink-0">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_24px_rgba(34,211,238,0.2)]">
              <Sparkles size={22} className="text-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">InterviewIQ</h1>
              <p className="text-gray-500 text-xs">AI Workspace</p>
            </div>
          </div>

          {/* User card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black font-bold text-sm shrink-0">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate">{displayName}</p>
                <p className="text-gray-400 text-xs capitalize truncate">{role} Developer</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="flex-1 text-center px-2 py-1.5 rounded-lg bg-cyan-400/10 text-cyan-300 text-xs border border-cyan-400/15">
                0 sessions
              </span>
              <span className="flex-1 text-center px-2 py-1.5 rounded-lg bg-purple-400/10 text-purple-300 text-xs border border-purple-400/15">
                Score: 0
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-400/12 to-purple-500/12 border border-cyan-400/20 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                    }`
                  }
                >
                  <Icon size={19} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/15 transition font-medium text-sm"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </aside>

      {/* MAIN */}
      <main id="main-content" className="flex-1 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
