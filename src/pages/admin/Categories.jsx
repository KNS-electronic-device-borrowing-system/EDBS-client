import { useState, useMemo } from "react";

const INITIAL_DATA = Array.from({ length: 108 }, (_, i) => ({
  id: i + 1,
  code: `C${1200 + (i % 20)}`,
  name: [
    "Laptop",
    "Tablet",
    "Trình chiếu",
    "Camera",
    "Phụ kiện",
    "Màn hình",
    "Loa",
    "Microphone",
  ][i % 8],
  description: [
    "Máy tính xách tay",
    "Máy tính bảng",
    "Thiết bị chiếu hình",
    "Máy quay & chụp",
    "Phụ kiện văn phòng",
    "Màn hình máy tính",
    "Thiết bị âm thanh",
    "Thiết bị thu âm",
  ][i % 8],
  createdAt: "30/11/2023 15:34",
  updatedAt: "30/11/2023 15:34",
  createdBy: `SE${190000 + (i % 10)}`,
  updatedBy: `SE${190000 + (i % 10)}`,
}));

const PAGE_SIZE = 10;
const EMPTY_FORM = { code: "", name: "", description: "" };

// ─── Pagination ───────────────────────────────────────────────────────────────
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
    )
      pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }
  const btn =
    "min-w-[32px] h-8 px-2 rounded-md text-sm flex items-center justify-center transition-colors";
  return (
    <div className="flex items-center justify-center gap-1 pt-4">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className={`${btn} border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed gap-1`}
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
          <span key={`d${i}`} className="px-1 text-gray-400 text-sm">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`${btn} font-medium ${p === current ? "bg-blue-500 text-white border border-blue-500" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className={`${btn} border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed gap-1`}
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

// ─── Modal Thêm / Chỉnh sửa ──────────────────────────────────────────────────
function CategoryModal({ mode, initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }
  function handleSave() {
    if (!form.code.trim() || !form.name.trim()) return;
    onSave(form);
    onClose();
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-medium text-gray-800">
            {mode === "add" ? "Thêm danh mục" : "Chỉnh sửa danh mục"}
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
        <div className="px-6 py-5 flex flex-col gap-4">
          {[
            { label: "Mã danh mục", field: "code", placeholder: "VD: C1215" },
            { label: "Tên danh mục", field: "name", placeholder: "VD: Laptop" },
          ].map(({ label, field, placeholder }) => (
            <div key={field}>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                {label}
              </label>
              <input
                type="text"
                value={form[field]}
                onChange={(e) => set(field, e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Mô tả
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="VD: Máy tính xách tay"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
            />
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            {mode === "add" ? "Thêm" : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Confirm Delete ───────────────────────────────────────────────────────────
function ConfirmDelete({ row, onClose, onConfirm }) {
  if (!row) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5">
          <p className="text-base font-medium text-gray-800 mb-2">
            Xác nhận xóa
          </p>
          <p className="text-sm text-gray-500">
            Bạn có chắc muốn xóa danh mục{" "}
            <span className="font-medium text-gray-800">{row.name}</span> (
            {row.code})?
          </p>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              onConfirm(row.id);
              onClose();
            }}
            className="px-5 py-2 text-sm font-medium text-white bg-red-400 hover:bg-red-500 rounded-lg transition-colors"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Detail Popup ─────────────────────────────────────────────────────────────
function DetailPopup({ row, onClose, onEdit }) {
  if (!row) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-medium text-gray-800">
            Thông tin danh mục
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
        <div className="px-6 py-5 flex flex-col gap-2 text-sm">
          {[
            ["Mã danh mục", row.code],
            ["Tên danh mục", row.name],
            ["Mô tả", row.description],
            ["Ngày tạo", row.createdAt],
            ["Ngày cập nhật", row.updatedAt],
            ["Người tạo", row.createdBy],
            ["Người cập nhật", row.updatedBy],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-2 py-1">
              <span className="text-gray-400 w-32 flex-shrink-0">{label}</span>
              <span className="text-gray-800">{value}</span>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={() => {
              onEdit(row);
              onClose();
            }}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Chỉnh sửa
          </button>
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
export default function Categories() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(INITIAL_DATA);
  const [editRow, setEditRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [detailRow, setDetailRow] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(
      (r) =>
        r.code.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q),
    );
  }, [search, data]);

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

  // TODO: thay bằng API call thật
  function handleAdd(form) {
    const newId = Math.max(...data.map((d) => d.id)) + 1;
    setData((prev) => [
      {
        ...form,
        id: newId,
        createdAt: new Date().toLocaleString("vi-VN"),
        updatedAt: new Date().toLocaleString("vi-VN"),
        createdBy: "SE190000",
        updatedBy: "SE190000",
      },
      ...prev,
    ]);
  }
  function handleEdit(form) {
    setData((prev) =>
      prev.map((r) =>
        r.id === editRow.id
          ? { ...r, ...form, updatedAt: new Date().toLocaleString("vi-VN") }
          : r,
      ),
    );
  }
  function handleDelete(id) {
    setData((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <>
      <div className="flex flex-col gap-5">
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
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
          >
            Thêm
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      CategoryID
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
                    CategoryName
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                    Description
                  </th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
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
                      <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                        {r.code}
                      </td>
                      <td className="px-4 py-3 text-gray-800">{r.name}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {r.description}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditRow(r)}
                            className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors whitespace-nowrap"
                          >
                            Chỉnh sửa
                          </button>
                          <button
                            onClick={() => setDeleteRow(r)}
                            className="px-3 py-1 text-xs font-medium text-white bg-red-400 hover:bg-red-500 rounded-md transition-colors"
                          >
                            Xóa
                          </button>
                          <button
                            onClick={() => setDetailRow(r)}
                            className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
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
          <div className="px-4 pb-4">
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={setPage}
            />
          </div>
        </div>
      </div>

      {showAdd && (
        <CategoryModal
          mode="add"
          onClose={() => setShowAdd(false)}
          onSave={handleAdd}
        />
      )}
      {editRow && (
        <CategoryModal
          mode="edit"
          initial={editRow}
          onClose={() => setEditRow(null)}
          onSave={handleEdit}
        />
      )}
      <ConfirmDelete
        row={deleteRow}
        onClose={() => setDeleteRow(null)}
        onConfirm={handleDelete}
      />
      <DetailPopup
        row={detailRow}
        onClose={() => setDetailRow(null)}
        onEdit={(r) => setEditRow(r)}
      />
    </>
  );
}
