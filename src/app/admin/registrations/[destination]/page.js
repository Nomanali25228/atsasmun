"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaSearch,
  FaTrash,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaUsers,
  FaEye,
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const destinationNames = {
  istanbul: { name: "Istanbul, Turkey", emoji: "🇹🇷" },
  dubai: { name: "Dubai, UAE", emoji: "🇦🇪" },
  azerbaijan: { name: "Baku, Azerbaijan", emoji: "🇦🇿" },
  usa: { name: "New York, USA", emoji: "🇺🇸" },
  saudi: { name: "Riyadh, Saudi Arabia", emoji: "🇸🇦" },
  uk: { name: "London, UK", emoji: "🇬🇧" },
};

export default function RegistrationModule() {
  const params = useParams();
  const destination = params.destination;
  const destInfo = destinationNames[destination] || { name: destination, emoji: "🌍" };

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, [destination, page, search]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        window.location.href = "/admin";
        return;
      }

      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: "15",
        search,
      });

      const response = await fetch(
        `/api1/admin/registrations/${destination}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (data.success) {
        setRegistrations(data.data || []);
        setPagination(data.pagination || {});
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `/api1/admin/registrations/${destination}?id=${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.success) {
        setRegistrations(registrations.filter((r) => r.id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDeleting(false);
    }
  };

  const exportCSV = () => {
    if (registrations.length === 0) return;
    const headers = Object.keys(registrations[0]);
    const csv = [
      headers.join(","),
      ...registrations.map((row) =>
        headers
          .map((h) => {
            const val = row[h];
            if (typeof val === "string") return `"${val.replace(/"/g, '""')}"`;
            if (typeof val === "object" && val !== null) return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
            return val || "";
          })
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations_${destination}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <span className="text-3xl">{destInfo.emoji}</span>
            {destInfo.name}
          </h1>
          <p className="text-gray-500 mt-1">
            {pagination.total || 0} total registrations
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 px-4 py-2 rounded-xl hover:bg-emerald-600/30 transition-all text-sm font-medium"
        >
          <FaDownload size={14} />
          Export CSV
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          id="search-registrations"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name, email, city..."
          className="w-full bg-[#0d1221] border border-[#1a2035] text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder-gray-600"
        />
      </div>

      {/* Table */}
      <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading registrations...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="p-12 text-center">
            <FaUsers className="text-gray-700 mx-auto mb-3" size={40} />
            <p className="text-gray-500">No registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a2035]">
                  <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                    #
                  </th>
                  <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                    Name
                  </th>
                  <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                    Email
                  </th>
                  <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                    Phone
                  </th>
                  <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                    Gender
                  </th>
                  <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                    Date
                  </th>
                  <th className="text-left text-gray-500 text-xs font-medium uppercase tracking-wider px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg, idx) => (
                  <tr
                    key={reg.id}
                    className="border-b border-[#1a2035]/50 hover:bg-[#1a2035]/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-gray-600 text-sm">
                        {(page - 1) * 15 + idx + 1}
                      </span>
                    </td>
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
                      <span className="text-gray-400 text-sm">
                        {reg.PhoneNumber || reg.phoneNumber || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-400 text-sm">
                        {reg.Gender || reg.gender || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-500 text-sm">
                        {reg.createdAt
                          ? new Date(reg.createdAt).toLocaleDateString()
                          : "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedRecord(reg)}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all"
                          title="View Details"
                        >
                          <FaEye size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(reg.id)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                          title="Delete"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pageCount > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#1a2035]">
            <p className="text-gray-500 text-sm">
              Page {page} of {pagination.pageCount} ({pagination.total} total)
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="p-2 rounded-lg bg-[#1a2035] text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronLeft size={14} />
              </button>
              <button
                onClick={() =>
                  setPage(Math.min(pagination.pageCount, page + 1))
                }
                disabled={page >= pagination.pageCount}
                className="p-2 rounded-lg bg-[#1a2035] text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#0d1221] border-b border-[#1a2035] px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-bold text-lg">
                Registration Details
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 rounded-lg bg-[#1a2035] text-gray-400 hover:text-white transition-all"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {Object.entries(selectedRecord).map(([key, value]) => {
                if (key === "id" || key === "updatedAt") return null;
                return (
                  <div key={key} className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs uppercase tracking-wider font-medium">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <div className="text-white text-sm bg-[#0a0e1a] px-4 py-2 rounded-lg border border-[#1a2035]">
                      {typeof value === 'object' && value !== null ? (
                        <pre className="whitespace-pre-wrap font-sans">
                          {JSON.stringify(value, null, 2)}
                        </pre>
                      ) : (
                        value || "-"
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d1221] border border-[#1a2035] rounded-2xl max-w-md w-full p-6">
            <h3 className="text-white font-bold text-lg mb-2">
              Delete Registration?
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              This action cannot be undone. This will permanently delete the
              registration record.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl bg-[#1a2035] text-gray-400 hover:text-white transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-all text-sm flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <FaTrash size={12} />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
