import React, { useState, useEffect } from "react";

interface TeacherProfileProps {
  setIsOpnePlans: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TeacherProfile: React.FC<TeacherProfileProps> = ({ setIsOpnePlans }) => {
  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchTeacher();
  }, []);

  async function fetchTeacher() {
    try {
      const res = await fetch("http://localhost:8080/api/v1/teacher/profile", {
        credentials: "include",
      });
      const data = await res.json();
      setTeacher(data.teacher);
      setLoading(false);
    } catch (err) {
      setError("Failed to load teacher profile.");
      setLoading(false);
    }
  }

  function handleUpdateProfile() {
    setSuccess("Profile updated successfully ✅");
    setEditing(false);
  }

  if (loading) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f8f9ff] to-[#fffdfd] shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Teacher Profile</h2>

      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src="/default-avatar.png"
          alt="Profile"
          className="w-24 h-24 rounded-full shadow-md border-4 border-white"
        />
        <div>
          <h3 className="text-2xl font-medium text-gray-800">{teacher.name}</h3>
          <p className="text-gray-500">{teacher.tuitionClassName || "Your Tuition"}</p>
        </div>
      </div>

      {/* Editable Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div>
          <label className="block text-gray-500 mb-1">Full Name</label>
          <input
            disabled={!editing}
            defaultValue={teacher.name}
            className="w-full p-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block text-gray-500 mb-1">Email</label>
          <input
            disabled
            value={teacher.email}
            className="w-full p-2 rounded-xl bg-gray-100 border"
          />
        </div>
        <div>
          <label className="block text-gray-500 mb-1">Phone</label>
          <input
            disabled={!editing}
            defaultValue={teacher.phone}
            className="w-full p-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block text-gray-500 mb-1">Tuition Name</label>
          <input
            disabled={!editing}
            defaultValue={teacher.tuitionClassName}
            className="w-full p-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Update Password */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-700 mb-3">Update Password</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="password"
            placeholder="Current password"
            className="p-2 border rounded-xl focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="New password"
            className="p-2 border rounded-xl focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="p-2 border rounded-xl focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <button className="mt-4 bg-gradient-to-r from-orange-500 to-orange-400 text-white px-5 py-2 rounded-xl shadow hover:opacity-90">
          Update Password
        </button>
      </div>

      {/* Plan Section */}
      <div className="p-5 rounded-2xl bg-white/60 backdrop-blur-md shadow-inner mb-8">
        <h4 className="text-xl font-semibold mb-3 text-gray-800">Your Plan</h4>
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <p className="text-gray-700">
              <strong>Plan Type:</strong> {teacher.planType}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  teacher.planStatus === "active"
                    ? "bg-[#E8FFF3] text-[#0F9D58]"
                    : "bg-[#FFF1F0] text-[#E53935]"
                }`}
              >
                {teacher.planStatus}
              </span>
            </p>
            <p className="text-gray-700">
              <strong>Student Limit:</strong> {teacher.studentLimit}
            </p>
            {teacher.planActivatedAt && (
              <p className="text-gray-700">
                <strong>Activated:</strong>{" "}
                {new Date(teacher.planActivatedAt).toLocaleDateString()}
              </p>
            )}
            {teacher.planExpiresAt && (
              <p className="text-gray-700">
                <strong>Expires:</strong>{" "}
                {new Date(teacher.planExpiresAt).toLocaleDateString()}
              </p>
            )}
          </div>

          <button
            onClick={() => setIsOpnePlans(true)}
            className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-6 py-2 rounded-xl shadow-md hover:opacity-90"
          >
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setEditing((prev) => !prev)}
          className="bg-gradient-to-r from-[#6366f1] to-[#a78bfa] text-white px-6 py-2 rounded-xl shadow-md hover:opacity-90"
        >
          {editing ? "Save Changes" : "Edit Profile"}
        </button>

        <button className="text-red-500 border border-red-300 px-5 py-2 rounded-xl hover:bg-red-50">
          Logout
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mt-4 p-3 rounded-xl bg-[#FFF1F0] text-[#E53935] border border-[#F5B5B0]">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 p-3 rounded-xl bg-[#E8FFF3] text-[#0F9D58] border border-[#A0EAC5]">
          {success}
        </div>
      )}
    </div>
  );
};
