"use client";
import { useState, useEffect } from "react";
import {
  FaPaperPlane,
  FaTimes,
  FaEnvelope,
  FaEye,
  FaCheckCircle,
  FaDesktop,
  FaMobileAlt,
  FaSpinner,
  FaExclamationTriangle
} from "react-icons/fa";

export default function SendEmailModal({ isOpen, onClose, delegate, onEmailSent }) {
  const [templateType, setTemplateType] = useState("acceptance");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewData, setPreviewData] = useState({ html: "", subject: "", title: "" });
  const [previewError, setPreviewError] = useState("");
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [viewMode, setViewMode] = useState("desktop"); // 'desktop' or 'mobile'

  useEffect(() => {
    if (isOpen && delegate) {
      setSentSuccess(false);
      fetchPreview(templateType);
    }
  }, [isOpen, delegate, templateType]);

  const fetchPreview = async (selectedType) => {
    setPreviewLoading(true);
    setPreviewError("");
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api1/admin/email/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          templateType: selectedType,
          registration: delegate
        })
      });

      const data = await res.json();
      if (data.success) {
        setPreviewData({
          html: data.html,
          subject: data.subject,
          title: data.title
        });
      } else {
        setPreviewError(data.message || "Failed to generate preview");
      }
    } catch (err) {
      console.error("Preview error:", err);
      setPreviewError(err.message || "Error loading email preview");
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleSend = async () => {
    if (!delegate?.Email && !delegate?.email) {
      alert("Delegate has no valid email address.");
      return;
    }

    const templateNames = {
      acceptance: "Letter of Acceptance (Official 8-Hour Letter)",
      confirmation: "1st Email — Registration Confirmation",
      early_bird: "3rd Email — Early Bird Discount Offer"
    };

    const confirmMsg = `Are you sure you want to send "${templateNames[templateType]}" to:\n${delegate.Email || delegate.email}?`;
    if (!window.confirm(confirmMsg)) return;

    setSending(true);
    try {
      const token = localStorage.getItem("admin_token");
      const destSlug = (delegate.destination || delegate.Destinations || "istanbul").toLowerCase();
      let targetCollection = "registrations_istanbul";
      if (destSlug.includes("dubai") || destSlug.includes("uae")) targetCollection = "registrations_dubai";
      else if (destSlug.includes("baku") || destSlug.includes("azerbaijan")) targetCollection = "registrations_azerbaijan";
      else if (destSlug.includes("usa") || destSlug.includes("new york")) targetCollection = "registrations_usa";
      else if (destSlug.includes("saudi") || destSlug.includes("riyadh")) targetCollection = "registrations_saudi";
      else if (destSlug.includes("uk") || destSlug.includes("london")) targetCollection = "registrations_uk";

      const res = await fetch("/api1/admin/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          templateType,
          registration: delegate,
          targetCollection
        })
      });

      const data = await res.json();
      if (data.success) {
        setSentSuccess(true);
        if (onEmailSent) {
          onEmailSent(delegate, templateType);
        }
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        alert("Failed to send: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Send error:", err);
      alert("Error sending email: " + err.message);
    } finally {
      setSending(false);
    }
  };

  if (!isOpen || !delegate) return null;

  const fullName = `${delegate.FirstName || delegate.firstName || ""} ${delegate.LastName || delegate.lastName || ""}`.trim() || delegate.FirstName || "Delegate";
  const email = delegate.Email || delegate.email || "-";
  const destination = delegate.destination || delegate.Destinations || "Istanbul";

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#0b101f] border border-[#1e293b] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1e293b] bg-[#0d1326] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FaPaperPlane size={16} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                Manual Email Dispatch & Live Preview
              </h3>
              <p className="text-gray-400 text-xs">
                To: <span className="text-white font-medium">{fullName}</span> &lt;{email}&gt; • {destination}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1a233a] text-gray-400 hover:text-white hover:bg-[#253252] transition-all"
          >
            <FaTimes size={16} />
          </button>
        </div>

        {/* Success Banner */}
        {sentSuccess && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-3 flex items-center gap-2 text-emerald-400 text-sm font-medium animate-fadeIn">
            <FaCheckCircle className="text-emerald-400" size={16} />
            Email sent successfully! Database updated.
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          
          {/* Controls: Template Selection & View Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#080c18] p-4 rounded-xl border border-[#1a233a]">
            
            {/* Template Dropdown */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Select Email Template to Send:
              </label>
              <select
                value={templateType}
                onChange={(e) => setTemplateType(e.target.value)}
                disabled={sending}
                className="w-full bg-[#12192e] border border-[#232f4e] text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium cursor-pointer"
              >
                <option value="acceptance">
                  ✉️ 2nd Email — Official Acceptance Letter (8h Letter)
                </option>
                <option value="confirmation">
                  ✉️ 1st Email — Registration Confirmation (Welcome Email)
                </option>
                <option value="early_bird">
                  ✉️ 3rd Email — Early Bird Special Discount Offer
                </option>
              </select>
            </div>

            {/* Viewport switcher */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Preview Frame:
              </label>
              <div className="flex bg-[#12192e] p-1 rounded-xl border border-[#232f4e]">
                <button
                  type="button"
                  onClick={() => setViewMode("desktop")}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "desktop"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FaDesktop size={12} /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("mobile")}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    viewMode === "mobile"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FaMobileAlt size={12} /> Mobile
                </button>
              </div>
            </div>

          </div>

          {/* Subject Line Preview */}
          <div className="flex items-center gap-2 bg-[#080c18] px-4 py-2.5 rounded-xl border border-[#1a233a] text-xs">
            <span className="text-gray-500 font-semibold uppercase">Subject:</span>
            <span className="text-gray-200 font-medium truncate">{previewData.subject || "Loading subject..."}</span>
          </div>

          {/* Live Preview Frame */}
          <div className="border border-[#1e293b] rounded-xl overflow-hidden bg-[#1a2035]/30">
            <div className="bg-[#0d1326] px-4 py-2 border-b border-[#1e293b] flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5 font-medium">
                <FaEye className="text-blue-400" /> Live Rendered Email Preview
              </span>
              <span className="text-[11px] text-gray-500">
                Personalized for {fullName}
              </span>
            </div>

            <div className="p-4 bg-[#060913] flex justify-center min-h-[380px] max-h-[500px] overflow-y-auto">
              {previewLoading ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                  <FaSpinner className="animate-spin text-blue-500" size={32} />
                  <p className="text-sm">Rendering personalized email preview...</p>
                </div>
              ) : previewError ? (
                <div className="flex flex-col items-center justify-center py-12 gap-2 text-red-400">
                  <FaExclamationTriangle size={28} />
                  <p className="text-sm font-medium">{previewError}</p>
                </div>
              ) : (
                <div
                  className={`transition-all bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 ${
                    viewMode === "mobile" ? "w-[375px]" : "w-full max-w-[650px]"
                  }`}
                >
                  <iframe
                    title="Email Preview"
                    srcDoc={previewData.html}
                    className="w-full h-[480px] border-0"
                    sandbox="allow-same-origin"
                  />
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0d1326] border-t border-[#1e293b] flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Clicking send will dispatch this email via Office 365 SMTP and update the status in database.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={sending}
              className="px-4 py-2 rounded-xl bg-[#1a233a] text-gray-300 hover:text-white hover:bg-[#253252] transition-all text-sm font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleSend}
              disabled={sending || previewLoading || sentSuccess}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {sending ? (
                <>
                  <FaSpinner className="animate-spin" size={14} />
                  Sending to {email}...
                </>
              ) : sentSuccess ? (
                <>
                  <FaCheckCircle size={14} /> Sent!
                </>
              ) : (
                <>
                  <FaPaperPlane size={13} />
                  Agree &amp; Send Email Now
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
