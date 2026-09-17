import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPinned, ShieldCheck, Star } from "lucide-react";
import { farmers } from "../../data/mockData";

const mapBounds = {
  minLatitude: 10.3,
  maxLatitude: 14.7,
  minLongitude: 102.3,
  maxLongitude: 107.7,
};

const getMarkerPosition = (latitude: number, longitude: number) => ({
  left: `${((longitude - mapBounds.minLongitude) / (mapBounds.maxLongitude - mapBounds.minLongitude)) * 100}%`,
  top: `${100 - ((latitude - mapBounds.minLatitude) / (mapBounds.maxLatitude - mapBounds.minLatitude)) * 100}%`,
});

const FarmersMap: React.FC = () => {
  const [selectedFarmerId, setSelectedFarmerId] = useState(farmers[0]?.id ?? "");
  const selectedFarmer = farmers.find((farmer) => farmer.id === selectedFarmerId);

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <p className="text-sm text-leaf-700 font-semibold mb-1">បណ្តាញអ្នកផ្គត់ផ្គង់</p>
          <h1 className="font-display text-2xl">ផែនទីកសិករ</h1>
          <p className="text-ink/60 mt-1">ស្វែងរកកសិករទាំងអស់តាមទីតាំង និងស្វែងយល់ពីផលិតផលរបស់ពួកគេ។</p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-2 bg-white border border-soil-100 rounded-buyer px-3 py-2 text-sm text-ink/60">
          <MapPinned size={16} className="text-leaf-700" /> {farmers.length} កសិករ
        </span>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
        <div className="relative min-h-[480px] overflow-hidden rounded-buyer border border-soil-200 bg-[#dce9d5] shadow-soft">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(32deg, transparent 48%, #9db995 49%, transparent 51%), linear-gradient(118deg, transparent 48%, #9db995 49%, transparent 51%)", backgroundSize: "135px 115px" }} />
          <div className="absolute left-[18%] top-[14%] h-[72%] w-[58%] rounded-[48%_42%_50%_38%] border-2 border-white/80 bg-[#c7ddbd]/70 rotate-6" />
          <div className="absolute left-4 top-4 rounded-buyer bg-white/85 px-3 py-2 text-xs text-ink/60 backdrop-blur-sm">កម្ពុជា · ទីតាំងកសិដ្ឋាន</div>

          {farmers.map((farmer) => {
            const position = getMarkerPosition(farmer.latitude, farmer.longitude);
            const isSelected = farmer.id === selectedFarmerId;
            return (
              <button
                key={farmer.id}
                type="button"
                onClick={() => setSelectedFarmerId(farmer.id)}
                className={`absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110 ${isSelected ? "z-10 scale-110" : "z-[1]"}`}
                style={position}
                aria-label={`បង្ហាញទីតាំង ${farmer.name}`}
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-full border-4 border-white text-sm font-semibold text-white shadow-lifted ${isSelected ? "bg-clay-500" : "bg-leaf-700"}`}>
                  {farmer.avatarInitials}
                </span>
                <span className="mx-auto block h-3 w-3 -mt-1 rotate-45 bg-inherit" />
              </button>
            );
          })}

          <div className="absolute bottom-4 left-4 rounded-buyer bg-white/90 px-3 py-2 text-xs text-ink/60 shadow-soft">
            ចុចលើសញ្ញាសម្គាល់ ដើម្បីមើលកសិករ
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold">កសិករទាំងអស់</h2>
          {farmers.map((farmer) => (
            <button
              key={farmer.id}
              type="button"
              onClick={() => setSelectedFarmerId(farmer.id)}
              className={`w-full text-left bg-white border rounded-buyer p-4 transition-colors ${selectedFarmerId === farmer.id ? "border-leaf-600 ring-1 ring-leaf-600" : "border-soil-100 hover:border-leaf-300"}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-leaf-700 text-white flex items-center justify-center text-sm font-semibold">{farmer.avatarInitials}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold truncate">{farmer.name}</span>
                  <span className="block text-sm text-ink/50">{farmer.farmName} · {farmer.location}</span>
                </span>
                {farmer.isVerified && <ShieldCheck size={17} className="text-leaf-600" />}
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm text-ink/60">
                <Star size={14} className="fill-harvest-400 text-harvest-400" /> {farmer.rating} · {farmer.completedOrders} ការបញ្ជាទិញ
              </div>
            </button>
          ))}

          {selectedFarmer && (
            <Link to={`/buyer/marketplace/farmer/${selectedFarmer.id}`} className="inline-flex items-center justify-center w-full bg-leaf-700 hover:bg-leaf-800 text-white font-semibold py-3 rounded-buyer transition-colors">
              មើលប្រវត្តិ {selectedFarmer.name}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmersMap;
