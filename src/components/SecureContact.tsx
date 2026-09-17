import React, { useState } from "react";
import { AlertTriangle, Lock, MessageCircle, Send, X } from "lucide-react";

type SecureContactProps = {
  recipientName: string;
  orderId: string;
  roleLabel: string;
};

const topics = ["ការបញ្ជាទិញ", "ការដឹកជញ្ជូន", "បរិមាណ និងគុណភាព", "ការបង់ប្រាក់", "សំណួរផ្សេងទៀត"];

const SecureContact: React.FC<SecureContactProps> = ({ recipientName, orderId, roleLabel }) => {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [reported, setReported] = useState(false);

  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) return;
    const stored = JSON.parse(localStorage.getItem("agrilink-secure-messages") || "[]") as object[];
    stored.push({ orderId, recipientName, topic, message: message.trim(), createdAt: new Date().toISOString() });
    localStorage.setItem("agrilink-secure-messages", JSON.stringify(stored));
    setSent(true);
    setMessage("");
  };

  return (
    <>
      <button type="button" onClick={() => { setOpen(true); setSent(false); }} className="w-full inline-flex items-center justify-center gap-2 border border-leaf-600 text-leaf-700 hover:bg-leaf-50 font-semibold py-3 rounded-buyer transition-colors">
        <MessageCircle size={17} /> ទាក់ទង{roleLabel}ដោយសុវត្ថិភាព
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4" role="dialog" aria-modal="true" aria-labelledby="secure-contact-title">
          <div className="w-full max-w-md bg-white rounded-buyer shadow-lifted p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 id="secure-contact-title" className="font-display text-xl">ផ្ញើសារទៅ {recipientName}</h2>
                <p className="text-xs text-ink/50 mt-1">សារនេះភ្ជាប់ជាមួយការបញ្ជាទិញ {orderId}</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="បិទ" className="text-ink/50 hover:text-ink"><X size={20} /></button>
            </div>

            <div className="flex gap-2 rounded-buyer bg-leaf-50 p-3 text-sm text-leaf-800 mb-4">
              <Lock size={17} className="shrink-0 mt-0.5" />
              <span>ទំនាក់ទំនងតាមវេទិកា។ កុំចែករំលែកលេខសម្ងាត់ លេខអត្តសញ្ញាណប័ណ្ណ ឬព័ត៌មានធនាគារ។</span>
            </div>

            {sent ? (
              <div className="text-center py-5">
                <p className="text-leaf-700 font-semibold mb-1">សារត្រូវបានផ្ញើរួចរាល់</p>
                <p className="text-sm text-ink/60">អ្នកទទួលនឹងឆ្លើយតបតាមប្រព័ន្ធទំនាក់ទំនងរបស់ AgriLink។</p>
                <button type="button" onClick={() => setOpen(false)} className="mt-5 text-sm text-leaf-700 font-semibold">បិទ</button>
              </div>
            ) : (
              <form onSubmit={sendMessage} className="space-y-4">
                <label className="block">
                  <span className="text-sm text-ink/60">ប្រធានបទ</span>
                  <select value={topic} onChange={(event) => setTopic(event.target.value)} className="w-full mt-2 px-3 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600 bg-white">
                    {topics.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-ink/60">សារ</span>
                  <textarea required value={message} onChange={(event) => setMessage(event.target.value)} rows={4} maxLength={500} placeholder="សរសេរសាររបស់អ្នក..." className="w-full mt-2 px-3 py-3 border border-soil-100 rounded-buyer outline-none focus:border-leaf-600 resize-none" />
                  <span className="block text-right text-xs text-ink/40 mt-1">{message.length}/500</span>
                </label>
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-leaf-700 hover:bg-leaf-800 text-white font-semibold py-3 rounded-buyer"><Send size={16} /> ផ្ញើសារដោយសុវត្ថិភាព</button>
              </form>
            )}

            <div className="border-t border-soil-100 mt-5 pt-4">
              <button type="button" onClick={() => { setReported(true); localStorage.setItem("agrilink-report-${orderId}", "true"); }} className="inline-flex items-center gap-2 text-xs text-alert hover:underline">
                <AlertTriangle size={14} /> រាយការណ៍អ្នកប្រើនេះ
              </button>
              {reported && <span className="text-xs text-alert ml-3">បានទទួលការរាយការណ៍</span>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecureContact;
