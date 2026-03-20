import { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  DoughnutController,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

Chart.register(
  ArcElement,
  DoughnutController,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
);

// ─── Mock data ────────────────────────────────────────────────────────────────
const assetData = {
  labels: ["Available", "Hahaa", "Borrowed", "Inactive"],
  values: [30, 15, 3, 4],
  colors: ["#378ADD", "#185FA5", "#B4B2A9", "#dac257"],
};
 
const requestData = {
  labels: ["Pending", "Borrowing", "Overdue", "Returned"],
  values: [33, 25, 28, 24],
  colors: ["#378ADD", "#1D9E75", "#E24B4A", "#B4B2A9"],
};
 
const recentRequests = [
  { user: "nguyen.van.a", asset: "Laptop Dell XPS 13",    date: "18/03/2026", status: "Borrowing" },
  { user: "tran.thi.b",   asset: "Máy chiếu Epson",       date: "15/03/2026", status: "Overdue"   },
  { user: "le.van.c",     asset: "iPad Pro M2",           date: "20/03/2026", status: "Pending"   },
  { user: "pham.thi.d",   asset: "Camera Sony A7",        date: "10/03/2026", status: "Returned"  },
  { user: "hoang.van.e",  asset: "Bàn phím cơ Keychron", date: "19/03/2026", status: "Pending"   },
];
 
const STATUS_STYLE = {
  Borrowing: { bg: "#E6F1FB", color: "#0C447C", label: "Đang mượn" },
  Overdue:   { bg: "#FCEBEB", color: "#791F1F", label: "Quá hạn"   },
  Pending:   { bg: "#FAEEDA", color: "#633806", label: "Chờ duyệt" },
  Returned:  { bg: "#EAF3DE", color: "#27500A", label: "Đã trả"    },
};
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, subColor }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-medium text-gray-900">{value}</p>
      <p className="text-xs mt-1" style={{ color: subColor }}>{sub}</p>
    </div>
  );
}
 
function Badge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.Pending;
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}
 
// ─── Chart hooks ──────────────────────────────────────────────────────────────
function useDonutChart(ref) {
  useEffect(() => {
    const total = assetData.values.reduce((a, b) => a + b, 0);
 
    const centerTextPlugin = {
      id: "centerText",
      afterDraw(chart) {
        const { ctx, chartArea: { left, right, top, bottom } } = chart;
        const cx = (left + right) / 2;
        const cy = (top + bottom) / 2;
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "500 22px system-ui, sans-serif";
        ctx.fillStyle = "#1f2937";
        ctx.fillText(total, cx, cy - 8);
        ctx.font = "400 11px system-ui, sans-serif";
        ctx.fillStyle = "#9ca3af";
        ctx.fillText("tổng", cx, cy + 12);
        ctx.restore();
      },
    };
 
    const chart = new Chart(ref.current, {
      type: "doughnut",
      plugins: [centerTextPlugin],
      data: {
        labels: assetData.labels,
        datasets: [
          {
            data: assetData.values,
            backgroundColor: assetData.colors,
            borderWidth: 3,
            borderColor: "#fff",
            hoverOffset: 4,
          },
        ],
      },
      options: {
        cutout: "68%",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: { label: (c) => ` ${c.label}: ${c.raw}` },
          },
        },
      },
    });
 
    return () => chart.destroy();
  }, [ref]);
}
 
function useBarChart(ref) {
  useEffect(() => {
    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: requestData.labels,
        datasets: [{
          data: requestData.values,
          backgroundColor: requestData.colors,
          borderRadius: 4,
          borderSkipped: false,
          barThickness: 18,
        }],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c) => ` ${c.raw} yêu cầu` } },
        },
        scales: {
          x: {
            grid: { color: "rgba(0,0,0,0.06)" },
            ticks: { font: { size: 11 }, color: "#9ca3af" },
            border: { display: false },
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 12 }, color: "#9ca3af" },
            border: { display: false },
          },
        },
      },
    });
 
    return () => chart.destroy();
  }, [ref]);
}

export default function Dashboard() {
  const donutRef = useRef(null);
  const barRef = useRef(null);

  useDonutChart(donutRef);
  useBarChart(barRef);
  return (
    <div className="flex flex-col gap-5">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Tổng tài sản"
          value="48"
          sub="▲ +3 tháng này"
          subColor="#3B6D11"
        />
        <StatCard
          label="Đang cho mượn"
          value="15"
          sub="31% tổng số"
          subColor="#854F0B"
        />
        <StatCard
          label="Yêu cầu đang xử lý"
          value="33"
          sub="▲ +5 hôm nay"
          subColor="#A32D2D"
        />
        <StatCard
          label="Quá hạn"
          value="28"
          sub="Cần xử lý"
          subColor="#A32D2D"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Donut */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-medium text-gray-500 mb-4">
            Số liệu sản phẩm
          </p>
          <div className="flex items-center gap-6">
            <div
              className="relative"
              style={{ width: 160, height: 160, flexShrink: 0 }}
            >
              <canvas ref={donutRef} />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {assetData.labels.map((label, i) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-x"
                >
                  <div className="flex items-center gap-2 text-gray-500">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: assetData.colors[i] }}
                    />
                    {label}
                  </div>
                  <span className="font-medium text-gray-900">
                    {assetData.values[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs font-medium text-gray-500 mb-4">
            Số lượng request theo trạng thái
          </p>
          <div className="relative" style={{ height: 180 }}>
            <canvas ref={barRef} />
          </div>
        </div>
      </div>

      {/* Recent requests */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-medium text-gray-500 mb-4">
          Yêu cầu mới nhất
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {["Người dùng", "Tài sản", "Ngày mượn", "Trạng thái"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-medium text-gray-400 pb-2 border-b border-gray-100 px-2 first:pl-0"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((r, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 px-2 first:pl-0 text-gray-800">
                    {r.user}
                  </td>
                  <td className="py-2.5 px-2 text-gray-800">{r.asset}</td>
                  <td className="py-2.5 px-2 text-gray-400">{r.date}</td>
                  <td className="py-2.5 px-2">
                    <Badge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
