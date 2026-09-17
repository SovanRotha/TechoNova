import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Scale, ShieldCheck } from "lucide-react";

const disputeSteps = [
  "ជូនដំណឹងក្នុងរយៈពេល ២៤ ម៉ោង បន្ទាប់ពីទទួលទំនិញ និងភ្ជាប់រូបថត/ភស្តុតាង។",
  "ក្រុមការងារពិនិត្យកិច្ចព្រមព្រៀង បរិមាណ គុណភាព និងភស្តុតាងពីភាគីទាំងពីរ។",
  "ភាគីទាំងពីរអាចផ្តល់ការបំភ្លឺ ឬស្នើដំណោះស្រាយ ដូចជា បំពេញបរិមាណ ប្តូរទំនិញ បញ្ចុះតម្លៃ ឬសងប្រាក់។",
  "ក្រុមការងារចេញសេចក្តីសម្រេច និងកត់ត្រាលទ្ធផល ដើម្បីការពារប្រតិបត្តិការបន្ទាប់។",
];

const TermsPage: React.FC = () => (
  <div className="min-h-screen bg-canvas px-6 py-10">
    <main className="max-w-3xl mx-auto">
      <Link to="/register" className="inline-flex items-center gap-2 text-sm text-leaf-700 mb-8">
        <ArrowLeft size={16} /> ត្រឡប់ទៅចុះឈ្មោះ
      </Link>
      <div className="bg-white border border-soil-100 rounded-buyer shadow-soft p-6 md:p-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-11 h-11 rounded-buyer bg-leaf-100 text-leaf-700 flex items-center justify-center">
            <FileText size={22} />
          </span>
          <div>
            <p className="text-sm text-leaf-700 font-semibold">AgriLink</p>
            <h1 className="font-display text-3xl">លក្ខខណ្ឌ និងដំណើរការដោះស្រាយវិវាទ</h1>
          </div>
        </div>
        <p className="text-ink/60 mb-8">សូមអាន និងយល់ព្រមមុនប្រើប្រាស់វេទិកា។ លក្ខខណ្ឌទាំងនេះអនុវត្តចំពោះកសិករ និងអ្នកទិញ។</p>

        <section className="space-y-4 mb-8">
          <h2 className="flex items-center gap-2 font-semibold text-xl"><ShieldCheck size={20} className="text-leaf-700" /> កាតព្វកិច្ចរបស់ភាគី</h2>
          <ul className="list-disc pl-5 space-y-2 text-ink/70">
            <li>បញ្ជាក់ផលិតផល បរិមាណ កាលបរិច្ឆេទប្រមូលផល ទីតាំង និងលក្ខខណ្ឌគុណភាពឲ្យត្រឹមត្រូវ។</li>
            <li>កសិករត្រូវរៀបចំ និងដឹកជញ្ជូនតាមកិច្ចព្រមព្រៀង។ អ្នកទិញត្រូវទទួលទំនិញ និងបង់ប្រាក់តាមពេលកំណត់។</li>
            <li>ការលុបចោលការបញ្ជាទិញត្រូវជូនដំណឹងឲ្យបានឆាប់ និងអាចមានការពិនិត្យប្រវត្តិគណនី ប្រសិនបើលុបចោលញឹកញាប់។</li>
          </ul>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="flex items-center gap-2 font-semibold text-xl"><Scale size={20} className="text-clay-600" /> ករណីដែលអាចបង្កើតវិវាទ</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            {[
              "បរិមាណទទួលបានមិនគ្រប់តាមការព្រមព្រៀង",
              "គុណភាពមិនត្រូវនឹងលក្ខខណ្ឌដែលបានកំណត់",
              "ការដឹកជញ្ជូនយឺតជាងកាលកំណត់",
              "អ្នកទិញមិនបង់ប្រាក់តាមកិច្ចព្រមព្រៀង",
              "កសិករលុបចោលការបញ្ជាទិញ",
            ].map((item) => <div key={item} className="border border-soil-100 rounded-buyer px-4 py-3 text-ink/70">{item}</div>)}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-semibold text-xl">ដំណើរការដោះស្រាយវិវាទ</h2>
          <ol className="space-y-3">
            {disputeSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-ink/70">
                <span className="shrink-0 w-7 h-7 rounded-full bg-leaf-100 text-leaf-800 flex items-center justify-center font-semibold">{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  </div>
);

export default TermsPage;
