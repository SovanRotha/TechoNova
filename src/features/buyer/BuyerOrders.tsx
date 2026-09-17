import React from "react";
import { useAppData, currentBuyer } from "../../lib/store";
import { OrderCard } from "../../components/OrderCard";

const BuyerOrders: React.FC = () => {
  const { orders } = useAppData();
  const mine = orders.filter((o) => o.buyerId === currentBuyer.id);

  return (
    <div>
      <h1 className="font-display text-2xl mb-5">ការបញ្ជាទិញរបស់ខ្ញុំ</h1>
      {mine.length === 0 ? (
        <p className="text-center text-ink/50 py-16">មិនទាន់មានការបញ្ជាទិញទេ។</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {mine.map((o) => (
            <OrderCard
              key={o.id}
              order={o}
              basePath="/buyer/orders"
              counterpartLabel="Farmer"
              counterpartName={o.farmerName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerOrders;
