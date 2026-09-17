import React from "react";
import { Bell } from "lucide-react";
import { useAppData } from "../../lib/store";

const FarmerNotifications: React.FC = () => {
  const { notifications, markNotificationRead } = useAppData();
  const mine = notifications.filter((n) => n.audience === "farmer");

  return (
    <div>
      <h1 className="font-display text-2xl mb-5">ការជូនដំណឹង</h1>
      <div className="space-y-2">
        {mine.map((n) => (
          <button
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`w-full text-left flex gap-3 p-4 rounded-farmer border ${
              n.read ? "bg-white border-soil-100" : "bg-leaf-50 border-leaf-100"
            }`}
          >
            <span className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${n.read ? "bg-soil-50 text-ink/40" : "bg-leaf-700 text-white"}`}>
              <Bell size={16} />
            </span>
            <div className="min-w-0">
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-ink/60">{n.message}</p>
              <p className="text-xs text-ink/40 mt-1">{n.time}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FarmerNotifications;
