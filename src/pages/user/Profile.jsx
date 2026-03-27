import { useState } from "react";

export default function Profile() {
  const [name, setName] = useState("Nguyen Van A");
  const [studentId, setStudentId] = useState("SE190000");
  const [email, setEmail] = useState("email@gmail.com");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-blue-100">
        <div className="px-6 py-6 border-b border-blue-100">
          <h1 className="text-3xl font-bold text-blue-900">Trang cá nhân</h1>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <div className="relative mx-auto h-44 w-44 rounded-xl overflow-hidden bg-blue-100">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400 text-4xl">
                    ⬜
                  </div>
                )}
              </div>
              <label className="mt-4 inline-flex items-center justify-center rounded-lg border border-blue-500 bg-white px-4 py-2 text-blue-600 cursor-pointer hover:bg-blue-50">
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setAvatarUrl("")}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                remove
              </button>
            </div>

            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-bold text-slate-800 mb-4">
                Thông Tin Người Mượn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  <span>Họ và tên</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm focus:border-blue-400 focus:ring-blue-200 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-700">
                  <span>Mã số người mượn</span>
                  <input
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm focus:border-blue-400 focus:ring-blue-200 focus:outline-none"
                  />
                </label>
              </div>

              <label className="mt-4 flex flex-col gap-1 text-sm text-slate-700">
                <span>Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-slate-100 px-3 py-2 text-sm focus:border-blue-400 focus:ring-blue-200 focus:outline-none"
                />
              </label>

              <div className="mt-6 text-right">
                <button className="rounded-lg bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 transition">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
