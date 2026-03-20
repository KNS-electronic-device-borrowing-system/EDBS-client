import { useState, useMemo } from "react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_DATA = Array.from({ length: 108 }, (_, i) => ({
  id: i + 1,
  name: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", "Hoàng Văn E"][
    i % 5
  ],
  mssv: `SV${String(2000 + (i % 50)).padStart(6, "0")}`,
  product: [
    "Laptop Dell XPS",
    "iPad Pro M2",
    "Máy chiếu Epson",
    "Camera Sony A7",
    "Bàn phím Keychron",
  ][i % 5],
  productCode: `D${1200 + (i % 20)}`,
  borrowDate: `${String((i % 28) + 1).padStart(2, "0")}/03/2026`,
  returnDate: `${String((i % 28) + 8).padStart(2, "0")}/03/2026`,
  status: ["Chờ duyệt", "Đang mượn", "Quá hạn", "Đã trả"][i % 4],
}));

const STATUS_STYLE = {
  "Chờ duyệt": { bg: "#FAEEDA", color: "#633806" },
  "Đang mượn": { bg: "#E6F1FB", color: "#0C447C" },
  "Quá hạn": { bg: "#FCEBEB", color: "#791F1F" },
  "Đã trả": { bg: "#EAF3DE", color: "#27500A" },
};

const PAGE_SIZE = 10;

// ─── Components ───────────────────────────────────────────────────────────────
function Badge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE["Chờ duyệt"];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
      style={{ background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}

function Pagination({ current, total, onChange }) {
  const pages = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }

  const btnBase =
    "min-w-[32px] h-8 px-2 rounded-md text-sm flex items-center justify-center transition-colors";

  return (
    <div className="flex items-center justify-center gap-1 pt-4">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className={`${btnBase} border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed gap-1`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Previous
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dot-${i}`} className="px-1 text-gray-400 text-sm">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`${btnBase} font-medium ${
              p === current
                ? "bg-blue-500 text-white border border-blue-500"
                : "border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className={`${btnBase} border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed gap-1`}
      >
        Next
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

export default function Requests() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_DATA.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.mssv.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        r.productCode.toLowerCase().includes(q),
    );
  }, [search]); 
  // search này có thể dùng lại được chung, mốt xong project thì để vào trong utils cho tiện.

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const rows = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleAccept(id) {
    alert(`Chấp nhận yêu cầu #${id}`);
  }

  function handleReject(id) {
    alert(`Từ chối yêu cầu #${id}`);
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={handleSearch}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 w-64"
          />
        </div>

        <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
          Thêm
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    Thông tin người mượn
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                  </div>
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Tên SP
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Ngày mượn
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Ngày trả
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Trạng thái
                </th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    Không tìm thấy kết quả nào
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.mssv}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-800">{r.product}</p>
                      <p className="text-xs text-gray-400">{r.productCode}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {r.borrowDate}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {r.returnDate}
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={r.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAccept(r.id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                        >
                          Chấp nhận
                        </button>
                        <button
                          onClick={() => handleReject(r.id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-red-400 hover:bg-red-500 rounded-md transition-colors"
                        >
                          Từ chối
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <circle cx="5" cy="12" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="19" cy="12" r="2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 pb-4">
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
