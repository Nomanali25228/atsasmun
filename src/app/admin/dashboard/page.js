"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaUsers,
  FaBlog,
  FaPlane,
  FaArrowRight,
  FaGlobeAmericas,
  FaChartLine,
  FaClock,
} from "react-icons/fa";

const destinationInfo = [
  { name: "Istanbul", slug: "istanbul", emoji: "🇹🇷", color: "from-red-500 to-orange-500" },
  { name: "Dubai", slug: "dubai", emoji: "🇦🇪", color: "from-emerald-500 to-teal-500" },
  { name: "Azerbaijan", slug: "azerbaijan", emoji: "🇦🇿", color: "from-blue-500 to-cyan-500" },
  { name: "USA", slug: "usa", emoji: "🇺🇸", color: "from-blue-600 to-indigo-600" },
  { name: "Saudi", slug: "saudi", emoji: "🇸🇦", color: "from-green-500 to-emerald-500" },
  { name: "UK", slug: "uk", emoji: "🇬🇧", color: "from-red-600 to-blue-600" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        window.location.href = "/admin";
        return;
      }

      const response = await fetch("/api1/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Welcome Back, Admin 👋
        </h1>
        <p className="text-gray-500">
          Here&apos;s an overview of your ATSAS MUN platform.
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Registrations */}
        <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <FaUsers className="text-blue-400" size={20} />
              </div>
              <FaChartLine className="text-blue-400/50" size={16} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">
              Total Registrations
            </h3>
            <p className="text-3xl font-bold text-white">
              {stats?.totalRegistrations || 0}
            </p>
          </div>
        </div>

        {/* Active Destinations */}
        <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <FaGlobeAmericas className="text-purple-400" size={20} />
              </div>
              <FaPlane className="text-purple-400/50" size={16} />
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">
              Active Destinations
            </h3>
            <p className="text-3xl font-bold text-white">6</p>
          </div>
        </div>

        {/* Total Blogs */}
        <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <FaBlog className="text-emerald-400" size={20} />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">
              Total Blog Posts
            </h3>
            <p className="text-3xl font-bold text-white">
              {stats?.totalBlogs || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Destination Cards Grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaPlane className="text-blue-400" />
          Registrations by Destination
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {destinationInfo.map((dest) => (
            <Link
              key={dest.slug}
              href={`/admin/registrations/${dest.slug}`}
              className="bg-[#0d1221] border border-[#1a2035] rounded-2xl p-5 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dest.color} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {dest.emoji}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{dest.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {stats?.destinations?.[dest.slug] || 0} registrations
                    </p>
                  </div>
                </div>
                <FaArrowRight className="text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Registrations */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <FaClock className="text-blue-400" />
          Recent Registrations
        </h2>
        <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl overflow-hidden">
          {stats?.recentRegistrations?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1a2035]">
                    <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                      Name
                    </th>
                    <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                      Email
                    </th>
                    <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                      Destination
                    </th>
                    <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentRegistrations.map((reg, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#1a2035]/50 hover:bg-[#1a2035]/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-white text-sm font-medium">
                          {reg.RegistrationType === 'group' && reg.GroupName 
                            ? `${reg.GroupName} (Group)` 
                            : `${reg.FirstName || reg.firstName || "-"} ${reg.LastName || reg.lastName || ""}`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-sm">
                          {reg.Email || reg.email || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium">
                          {reg.destination || reg.Destinations || "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-500 text-sm">
                          {reg.createdAt
                            ? new Date(reg.createdAt).toLocaleDateString()
                            : "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <FaUsers className="text-gray-700 mx-auto mb-3" size={40} />
              <p className="text-gray-500">No recent registrations</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
