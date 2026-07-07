
import {
  Outlet,
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

const DashboardLayout = () => {
  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "aiUser"
      )
    ) || {};

  /* LOGOUT */

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      name: "Interview",
      icon: MessageSquare,
      path: "/dashboard/interview",
    },

    {
      name: "Analytics",
      icon: BarChart3,
      path: "/dashboard/analytics",
    },

    {
      name: "Resume",
      icon: FileText,
      path: "/dashboard/resume",
    },

    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex">

      {/* SIDEBAR */}

      <aside className="hidden lg:flex w-[290px] border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl flex-col justify-between p-6 sticky top-0 h-screen">

        {/* TOP */}

        <div>

          {/* LOGO */}

          <div className="flex items-center gap-4 mb-12">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.25)]">

              <Sparkles
                size={28}
                className="text-black"
              />
            </div>

            <div>

              <h1 className="text-2xl font-black">
                AI Interview
              </h1>

              <p className="text-gray-400 text-sm">
                Premium Workspace
              </p>
            </div>
          </div>

          {/* USER */}

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 mb-8">

            <h2 className="text-xl font-bold mb-2">
              {user.name ||
                "User"}
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              {user.role ||
                "Frontend Developer"}
            </p>

            <div className="flex items-center gap-3">

              <div className="px-4 py-2 rounded-xl bg-cyan-400/10 text-cyan-300 text-sm border border-cyan-400/20">
                Interviews:
                {" "}
                {user.interviews ||
                  0}
              </div>

              <div className="px-4 py-2 rounded-xl bg-purple-400/10 text-purple-300 text-sm border border-purple-400/20">
                Score:
                {" "}
                {user.score ||
                  0}
              </div>
            </div>
          </div>

          {/* NAVIGATION */}

          <div className="space-y-3">

            {navItems.map(
              (item, index) => {
                const Icon =
                  item.icon;

                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    end={
                      item.path ===
                      "/dashboard"
                    }
                    className={({
                      isActive,
                    }) =>
                      `premium-hover flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-400/15 to-purple-500/15 border border-cyan-400/20 text-white"
                          : "bg-white/[0.03] border border-transparent text-gray-400 hover:text-white hover:bg-white/[0.06]"
                      }`
                    }
                  >

                    <Icon size={22} />

                    <span className="font-semibold">
                      {item.name}
                    </span>
                  </NavLink>
                );
              }
            )}
          </div>
        </div>

        {/* LOGOUT */}

        <button
          onClick={
            handleLogout
          }
          className="premium-button-hover flex items-center justify-center gap-3 w-full h-14 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold"
        >

          <LogOut size={20} />

          Logout
        </button>
      </aside>

      {/* MAIN */}

      <main className="flex-1 overflow-x-hidden">

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

