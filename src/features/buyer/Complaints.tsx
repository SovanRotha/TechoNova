import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppData } from "../../lib/store";
import { PrimaryButton } from "../../components/StepWizard";
import type { Complaint } from "../../types";

const problemTypes = [
  "Quality does not match",
  "Quantity is incorrect",
  "Product is damaged",
  "Product is spoiled",
  "Wrong product",
  "Late delivery",
  "Other",
];

const resolutions = ["Refund", "Partial refund", "Compensation", "Replacement", "Investigation"];

const statusStyles: Record<Complaint["status"], string> = {
  Submitted: "bg-leaf-100 text-leaf-700",
  "Under Review": "bg-harvest-100 text-harvest-600",
  "Evidence Requested": "bg-harvest-100 text-harvest-600",
  Approved: "bg-leaf-700 text-white",
  Rejected: "bg-clay-400/15 text-clay-500",
  Resolved: "bg-soil-100 text-soil-600",
};

const NewComplaintForm: React.FC<{ orderId: string }> = ({ orderId }) => {
  const navigate = useNavigate();
  const { orders, addComplaint } = useAppData();
  const order = orders.find((o) => o.id === orderId);
  const [problemType, setProblemType] = useState(problemTypes[0]);
  const [description, setDescription] = useState("");
  const [resolution, setResolution] = useState(resolutions[0]);

  const submit = () => {
    const complaint: Complaint = {
      id: `comp-${Date.now()}`,
      orderId,
      problemType,
      description,
      expectedResolution: resolution,
      status: "Submitted",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    addComplaint(complaint);
    navigate("/buyer/complaints");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="font-display text-2xl mb-1">រាយការណ៍លើបញ្ហាគុណភាព</h1>
      <p className="text-ink/50 mb-6">{order?.id} · {order?.productName}</p>

      <label className="block mb-4">
        <span className="text-sm text-ink/60">ប្រភេទបញ្ហា</span>
        <select
          value={problemType}
          onChange={(e) => setProblemType(e.target.value)}
          className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
        >
          {problemTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-sm text-ink/60">ការពិពណ៌នា</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="ពិពណ៌នាអំពីអ្វីដែលបានកើតឡើង..."
          className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
        />
      </label>

      <button className="w-full border-2 border-dashed border-soil-200 rounded-buyer py-6 text-sm text-ink/50 mb-4">
        + បន្ថែមរូបភាព / ភស្តុតាង
      </button>

      <label className="block mb-6">
        <span className="text-sm text-ink/60">ការដោះស្រាយដែលរំពឹងទុក</span>
        <select
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          className="w-full mt-2 px-4 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600"
        >
          {resolutions.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>

      <PrimaryButton fullWidth disabled={!description} onClick={submit}>
        បញ្ជូនការរាយការណ៍
      </PrimaryButton>
    </div>
  );
};

const ComplaintsList: React.FC = () => {
  const { complaints } = useAppData();
  return (
    <div>
      <h1 className="font-display text-2xl mb-5">ការឈូសបី</h1>
      {complaints.length === 0 ? (
        <p className="text-center text-ink/50 py-16">មិនមានការរាយការណ៍ណាមួយ។</p>
      ) : (
        <div className="space-y-3">
          {complaints.map((c) => (
            <div key={c.id} className="bg-white border border-soil-100 rounded-buyer p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-ink/50">{c.orderId}</p>
                  <h3 className="font-medium mt-0.5">{c.problemType}</h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <p className="text-sm text-ink/60 mt-2">{c.description}</p>
              <p className="text-xs text-ink/40 mt-2">Requested: {c.expectedResolution}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Complaints: React.FC = () => {
  const { orderId } = useParams();
  if (orderId) return <NewComplaintForm orderId={orderId} />;
  return <ComplaintsList />;
};

export default Complaints;
