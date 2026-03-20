import { useState, useMemo } from "react";

// ─── Mock data ────────────────────────────────────────────────────────────────
const MOCK_DATA = Array.from({ length: 108 }, (_, i) => ({
  id: i + 1,
  name: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C", "Phạm Thị D", "Hoàng Văn E"][
    i % 5
  ],
  mssv: `SV${String(2000 + (i % 50)).padStart(6, "0")}`,
  email: [
    "a.nguyen@gmail.com",
    "b.tran@gmail.com",
    "c.le@gmail.com",
    "d.pham@gmail.com",
    "e.hoang@gmail.com",
  ][i % 5],
  product: [
    "Laptop Dell XPS",
    "iPad Pro M2",
    "Máy chiếu Epson",
    "Camera Sony A7",
    "Bàn phím Keychron",
  ][i % 5],
  productCode: `D${1200 + (i % 20)}`,
  brand: ["Dell", "Apple", "Epson", "Sony", "Keychron"][i % 5],
  category: [
    "Laptop - Cao cấp",
    "Tablet",
    "Thiết bị trình chiếu",
    "Camera",
    "Phụ kiện",
  ][i % 5],
  borrowDate: `${String((i % 28) + 1).padStart(2, "0")}/03/2026`,
  returnDate: `${String((i % 28) + 8).padStart(2, "0")}/03/2026`,
  reason: [
    "Cần laptop phục vụ thuyết trình",
    "Học online cuối kỳ",
    "Làm đồ án nhóm",
    "Quay video dự án",
    "Lập trình tại thư viện",
  ][i % 5],
  ticketCode: String(i + 1).padStart(6, "0"),
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

// ─── Nút động theo trạng thái ─────────────────────────────────────────────────
function ActionButtons({ row, onAction }) {
  const { status, id } = row;

  if (status === "Chờ duyệt")
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onAction("accept", id)}
          className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors whitespace-nowrap"
        >
          Chấp nhận
        </button>
        <button
          onClick={() => onAction("reject", id)}
          className="px-3 py-1 text-xs font-medium text-white bg-red-400 hover:bg-red-500 rounded-md transition-colors whitespace-nowrap"
        >
          Từ chối
        </button>
      </div>
    );

  if (status === "Đang mượn")
    return (
      <button
        onClick={() => onAction("returned", id)}
        className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors whitespace-nowrap"
      >
        Xác nhận đã trả
      </button>
    );

  if (status === "Quá hạn")
    return (
      <button
        onClick={() => onAction("notReturned", id)}
        className="px-3 py-1 text-xs font-medium text-white bg-red-400 hover:bg-red-500 rounded-md transition-colors whitespace-nowrap"
      >
        Xác nhận chưa trả
      </button>
    );

  // Đã trả — không có nút
  return <span className="text-xs text-gray-300">—</span>;
}

// ─── Popup chi tiết ───────────────────────────────────────────────────────────
function DetailPopup({ row, onClose, onAction }) {
  if (!row) return null;

  const initials = row.name
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-medium text-gray-800">
            Thông tin mượn thiết bị
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5 max-h-[65vh] overflow-y-auto">
          {/* Thông tin người mượn */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-3">
              Thông tin người mượn
            </p>
            <div className="flex gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-base flex-shrink-0">
                {initials}
              </div>
              <div className="flex flex-col gap-1.5 text-sm flex-1">
                {[
                  ["Mã SV", row.mssv],
                  ["Người mượn", row.name],
                  ["Email", row.email],
                  ["Tên hàng", row.brand],
                  ["Danh mục", row.category],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-gray-400 w-24 flex-shrink-0">
                      {label}
                    </span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}
                <div className="flex gap-2 items-center">
                  <span className="text-gray-400 w-24 flex-shrink-0">
                    Trạng thái
                  </span>
                  <Badge status={row.status} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Thông tin phiếu mượn */}
          <div>
            <p className="text-sm font-medium text-gray-800 mb-3">
              Thông tin phiếu mượn
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              {[
                ["Mã phiếu mượn", row.ticketCode],
                ["Ngày mượn", row.borrowDate],
                ["Ngày trả", row.returnDate],
                ["Lý do", row.reason],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2">
                  <span className="text-gray-400 w-32 flex-shrink-0">
                    {label}
                  </span>
                  <span className="text-gray-800">{value}</span>
                </div>
              ))}
              <div className="flex gap-2 items-center">
                <span className="text-gray-400 w-32 flex-shrink-0">
                  Trạng thái
                </span>
                <Badge status={row.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
          {row.status === "Chờ duyệt" && (
            <>
              <button
                onClick={() => {
                  onAction("accept", row.id);
                  onClose();
                }}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Chấp nhận
              </button>
              <button
                onClick={() => {
                  onAction("reject", row.id);
                  onClose();
                }}
                className="px-5 py-2 text-sm font-medium text-white bg-red-400 hover:bg-red-500 rounded-lg transition-colors"
              >
                Từ chối
              </button>
            </>
          )}
          {row.status === "Đang mượn" && (
            <button
              onClick={() => {
                onAction("returned", row.id);
                onClose();
              }}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Xác nhận đã trả
            </button>
          )}
          {row.status === "Quá hạn" && (
            <button
              onClick={() => {
                onAction("notReturned", row.id);
                onClose();
              }}
              className="px-5 py-2 text-sm font-medium text-white bg-red-400 hover:bg-red-500 rounded-lg transition-colors"
            >
              Xác nhận chưa trả
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Requests() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null); // row đang mở popup
  const [data, setData] = useState(MOCK_DATA);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.mssv.toLowerCase().includes(q) ||
        r.product.toLowerCase().includes(q) ||
        r.productCode.toLowerCase().includes(q),
    );
  }, [search, data]);
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

  // TODO: thay bằng API call thật rồi refetch
  function handleAction(type, id) {
    setData((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (type === "accept") return { ...r, status: "Đang mượn" };
        if (type === "reject") return { ...r, status: "Đã trả" };
        if (type === "returned") return { ...r, status: "Đã trả" };
        if (type === "notReturned") return { ...r, status: "Quá hạn" };
        return r;
      }),
    );
  }

  return (
    <>
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
                          <ActionButtons row={r} onAction={handleAction} />
                          <button
                            onClick={() => setSelected(r)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                            title="Xem chi tiết"
                          >
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

      {/* Popup */}
      <DetailPopup
        row={selected}
        onClose={() => setSelected(null)}
        onAction={handleAction}
      />
    </>
  );
}
