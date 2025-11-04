import React, { useState } from "react";

interface Props {
  student: { id: string; name: string } | null;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
}

const DeleteForm: React.FC<Props> = ({ student, setIsDelete, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleDelete() {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.SERVER_URL}/api/v1/student/${student?.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Please try again");

      const resData = await response.json();

      if (!resData.success) {
        setMessage({
          type: "error",
          text: resData.error || "Failed to delete record",
        });
        return;
      }

      await fetchData();
      setMessage({ type: "success", text: "Student deleted successfully!" });
      setIsDelete(false);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to delete record" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center backdrop-blur-2xl px-5">
      <div className="bg-[linear-gradient(to_bottom_right,#FFFFFF_0%,#F0F4FF_50%,#E8DFFF_100%)] backdrop-blur-sm p-3 sm:p-6 rounded-xl shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-800">
          Are you sure?
        </h2>
        {message && (
          <div
            className={`py-1.5 px-4 mb-3 mt-1 rounded-md text-sm font-medium bg-gradient-to-bl from-[#E8DFFF]/30 to-[#DDEBFF]/30 shadow-xl shadow-black/10 border border-white/50
          ${message.type === "success" ? "text-[#0F9D58]" : "text-[#E53935]"}
          `}
          >
            {message.text}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete();
          }}
          className="flex flex-col gap-3 mt-2"
        >
          <span className="text-heading">Delete: {student?.name}</span>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsDelete(false)}
              className="px-4 py-2 border border-slate-300 rounded-md text-sm sm:text-base text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary hover:bg-[#ea580c] text-white rounded-md text-sm sm:text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteForm;
