import React from "react";
import { ScanEye, ShieldCheck, ShieldQuestion } from "lucide-react";

const QualityVerification: React.FC = () => {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl mb-2">ផ្ទៀងផ្ទាត់គុណភាព</h1>
      <p className="text-ink/60 mb-8">
        រាល់ផលិតផលនៅលើ TechNova មានស្ថានភាពផ្ទៀងផ្ទាត់ ដូច្នេះអ្នកអាចដឹងពីកម្រិតជឿជាក់នៃអ្វីដែលអ្នកឃើញមុនពេលធ្វើការបញ្ជាទិញ។
      </p>

      <div className="space-y-4">
        <div className="bg-white border border-soil-100 rounded-buyer p-5 flex gap-4">
          <ShieldQuestion size={22} className="text-ink/40 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-medium">មិនទាន់ផ្ទៀងផ្ទាត់</h2>
            <p className="text-sm text-ink/60 mt-1">
              កសិករបានបញ្ជីផលិតផលជាមួយរូបភាព និងព័ត៌មានលម្អិត ប៉ុន្តែមិនទាន់ត្រូវបានពិនិត្យដោយ AI ឬអ្នកត្រួតពិនិត្យមនុស្សនៅឡើយទេ។
            </p>
          </div>
        </div>

        <div className="bg-white border border-soil-100 rounded-buyer p-5 flex gap-4">
          <ScanEye size={22} className="text-soil-600 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-medium">បានពិនិត្យដោយ AI</h2>
            <p className="text-sm text-ink/60 mt-1">
              AI ពិនិត្យរូបភាពដែលបានបង្ហោះសម្រាប់បញ្ហាដែលអាចមើលឃើញដូចជា ការខូច, ការប្រើពណ៌មិនសម, ការបាក់បែក, ឬស្នាមផ្សិត, និងប៉ាន់ស្មានកម្រិត។ នេះគឺជាការវាយតម្លៃដែលមើលឃើញដំបូងប៉ុណ្ណោះ មិនមែនជាការធានាគុណភាពទេ។
            </p>
          </div>
        </div>

        <div className="bg-white border border-soil-100 rounded-buyer p-5 flex gap-4">
          <ShieldCheck size={22} className="text-leaf-700 shrink-0 mt-0.5" />
          <div>
            <h2 className="font-medium">បានផ្ទៀងផ្ទាត់ដោយអ្នកត្រួតពិនិត្យ</h2>
            <p className="text-sm text-ink/60 mt-1">
              អ្នកត្រួតពិនិត្យក្នុងតំបន់ ឬដៃគូដែលទំនុកចិត្តបានពិនិត្យស្ថានភាព, បរិមាណ, ភាពថ្មី, និងព័ត៌មានការធ្វើកសិដ្ឋានរបស់ផលិតផល ហើយចាត់តម្លៃកម្រិតផ្លូវការ។
            </p>
          </div>
        </div>
      </div>

      <div className="bg-leaf-50 border border-leaf-100 rounded-buyer p-5 mt-8">
        <h2 className="font-medium mb-1">ត្រូវការសុពលភាពបន្ថែមសម្រាប់ការបញ្ជាទិញធំ?</h2>
        <p className="text-sm text-ink/60 mb-3">
          អ្នកអាចស្នើសុំអ្នកត្រួតពិនិត្យក្នុងតំបន់ ដើម្បីពិនិត្យផលិតផលមុនពេលដឹកជញ្ជូន តាមរយៈទំព័រផលិតផលណាមួយ។
        </p>
        <button className="text-sm font-semibold text-leaf-700">ស្វែងយល់ពីរបៀបស្នើសុំការត្រួតពិនិត្យ →</button>
      </div>
    </div>
  );
};

export default QualityVerification;
