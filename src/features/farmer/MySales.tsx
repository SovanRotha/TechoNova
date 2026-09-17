import React from "react";
import { useAppData, currentFarmer } from "../../lib/store";

const MySales: React.FC = () => {
  const { orders } = useAppData();
  const mine = orders.filter((o) => o.farmerId === currentFarmer.id);
  const completed = mine.filter((o) => o.status === "Completed");
  const totalSales = completed.reduce((sum, o) => sum + o.totalAmount, 0);
  const today = new Date().toISOString().slice(0, 10);
  const todaySales = completed
    .filter((o) => o.deliveryDate === today)
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthSales = completed
    .filter((o) => o.deliveryDate.startsWith(thisMonth))
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const pending = mine
    .filter((o) => o.status !== "Completed" && o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div>
      <h1 className="font-display text-2xl mb-5">ការលក់របស់ខ្ញុំ</h1>
      <div className="bg-leaf-800 text-white rounded-farmer p-6 mb-4">
        <p className="text-white/70 text-sm">ការលក់សរុប</p>
        <p className="font-display text-4xl mt-1">${totalSales.toFixed(2)}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Stat label="ការលក់ថ្ងៃនេះ" value={`$${todaySales.toFixed(2)}`} />
        <Stat label="ខែនេះ" value={`$${monthSales.toFixed(2)}`} />
        <Stat label="ការបញ្ជាទិញដែលបានបញ្ចប់" value={String(completed.length)} />
        <Stat label="ការទូរទាត់ដែលមិនទាន់រួច" value={`$${pending.toFixed(2)}`} />
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white border border-soil-100 rounded-farmer p-5">
    <p className="text-ink/50 text-sm">{label}</p>
    <p className="font-display text-2xl mt-1">{value}</p>
  </div>
);

export default MySales;
