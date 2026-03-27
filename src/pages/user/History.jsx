import { useMemo, useState } from "react";

const HISTORY_DATA = [
  {
    id: 1,
    name: "Jane Doe",
    role: "Senior Designer",
    laptop: 'MacBook Pro 16"',
    borrowDate: "2026-03-15",
    returnDate: "2026-03-20",
    status: "Đã trả",
    reason: "Hoàn thành dự án",
  },
  {
    id: 2,
    name: "Jane Doe",
    role: "Senior Designer",
    laptop: "Dell XPS 13",
    borrowDate: "2026-03-10",
    returnDate: "2026-03-14",
    status: "Đã trả",
    reason: "Báo cáo nội bộ",
  },
  {
    id: 3,
    name: "Jane Doe",
    role: "Senior Designer",
    laptop: "HP Spectre x360",
    borrowDate: "2026-02-25",
    returnDate: "2026-03-03",
    status: "Trễ hạn",
    reason: "Test thiết bị",
  },
  {
    id: 4,
    name: "Jane Doe",
    role: "Senior Designer",
    laptop: "Lenovo ThinkPad X1",
    borrowDate: "2026-02-12",
    returnDate: "2026-02-18",
    status: "Đã trả",
    reason: "Đào tạo",
  },
  {
    id: 5,
    name: "Jane Doe",
    role: "Senior Designer",
    laptop: "MS Surface Laptop 4",
    borrowDate: "2026-01-22",
    returnDate: "2026-01-29",
    status: "Đã trả",
    reason: "Demo khách hàng",
  },
  {
    id: 6,
    name: "Jane Doe",
    role: "Senior Designer",
    laptop: "Acer Swift 5",
    borrowDate: "2026-01-05",
    returnDate: "2026-01-12",
    status: "Đã trả",
    reason: "Nghiên cứu",
  },
];

const PAGE_SIZE = 5;

export default function History() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(HISTORY_DATA.length / PAGE_SIZE);

  const pagedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return HISTORY_DATA.slice(start, start + PAGE_SIZE);
  }, [page]);

  const statusClass = (status) => {
    if (status === "Đã trả") return "bg-emerald-100 text-emerald-700";
    if (status === "Trễ hạn") return "bg-rose-100 text-rose-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-blue-100 shadow-sm">
        <header className="px-6 py-5 border-b border-blue-100">
          <h1 className="text-3xl font-black text-blue-900">Lịch sử mượn</h1>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="bg-blue-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Tên Laptop</th>
                <th className="px-4 py-3">ngày mượn</th>
                <th className="px-4 py-3">ngày trả</th>
                <th className="px-4 py-3">trạng thái</th>
                <th className="px-4 py-3">lí do</th>
                <th className="px-4 py-3 w-14 text-right">...</th>
              </tr>
            </thead>
            <tbody>
              {pagedData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-100 hover:bg-blue-50/40"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        👤
                      </span>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {row.name}
                        </div>
                        <div className="text-xs text-slate-500">{row.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {row.laptop}
                  </td>
                  <td className="px-4 py-3">{row.borrowDate}</td>
                  <td className="px-4 py-3">{row.returnDate}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{row.reason}</td>
                  <td className="px-4 py-3 text-right text-slate-500">•••</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-blue-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Hiển thị {pagedData.length} trong {HISTORY_DATA.length} mục
          </p>
          <div className="flex items-center gap-1 text-sm">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:text-slate-300 disabled:border-slate-200 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`px-3 py-1 rounded-lg border ${page === num ? "border-blue-700 bg-blue-700 text-white" : "border-blue-200 text-blue-600 hover:bg-blue-50"}`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:text-slate-300 disabled:border-slate-200 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
