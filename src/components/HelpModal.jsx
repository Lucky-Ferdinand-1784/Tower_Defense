import React from 'react';
import { X, Map, Sparkles, CloudSun, Zap, HelpCircle } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-slate-850 px-5 py-3 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold font-arcade text-slate-100">Panduan Pixel Tower Defense</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-300 font-sans leading-relaxed">
          {/* 1. Jalan Berliku */}
          <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 font-bold font-arcade text-emerald-400 text-sm mb-1">
              <Map className="w-4 h-4" />
              <span>1. Strategi Jalan Berliku (Winding Path)</span>
            </div>
            <p>
              Musuh berjalan mengikuti kelokan jalan berbatu dari Portal Ungu menuju Gerbang Kastil. Tempatkan menara di tikungan dalam atau persimpangan agar jangkauan serangan menara mengenai musuh berulang kali saat mereka berbelok!
            </p>
          </div>

          {/* 2. Tingkatan Rank & Skill */}
          <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 font-bold font-arcade text-amber-400 text-sm mb-1">
              <Sparkles className="w-4 h-4" />
              <span>2. Tingkatan Rank & Sistem Skill Terunlock</span>
            </div>
            <p className="mb-2">
              Setiap karakter menara dapat dinaikkan pangkatnya dari <strong>Rank 1 (Novice)</strong> hingga <strong>Rank 5 (Mythic)</strong> menggunakan koin emas:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px]">
              <li><strong>Rank 2 (Veteran)</strong>: Membuka Skill Pasif 1 (misal: Serangan Kritis atau Pembakaran ekstra).</li>
              <li><strong>Rank 3 (Elite)</strong>: Membuka Skill Pasif 2 (misal: Panah Tembus atau Kawah Lahar).</li>
              <li><strong>Rank 4 (Master)</strong>: Membuka <strong>Skill Aktif</strong> tombol khusus ber-cooldown (misal: Badai Panah, Hujan Meteor, atau Gelombang Kutub)!</li>
              <li><strong>Rank 5 (Mythic)</strong>: Kebangkitan penuh dengan Aura bercahaya dan Skill Legendaris pamungkas!</li>
            </ul>
          </div>

          {/* 3. Cuaca Dinamis */}
          <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 font-bold font-arcade text-sky-400 text-sm mb-1">
              <CloudSun className="w-4 h-4" />
              <span>3. Perubahan Cuaca Dinamis</span>
            </div>
            <p className="mb-2">
              Cuaca berganti secara berkala dan mengubah jalannya pertempuran. Manfaatkan sinergi elemen berikut:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="font-bold text-yellow-400 block">☀️ Cerah:</span>
                Jangkauan serang +15%, Bakaran api +25%.
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="font-bold text-sky-400 block">⚡ Hujan Badai:</span>
                Musuh melambat 10%, Menara Petir +35% DMG & rantai +2 target!
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="font-bold text-cyan-300 block">❄️ Badai Salju:</span>
                Semua musuh melambat 25%, Menara Es dapat membekukan seketika!
              </div>
              <div className="bg-slate-900 p-2 rounded border border-slate-800">
                <span className="font-bold text-purple-400 block">🌫️ Kabut Pekat:</span>
                Jangkauan berkurang, namun Crit Rate +35% & Ninja menyerang cepat!
              </div>
            </div>
          </div>

          {/* 4. Mantra Komandan */}
          <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 font-bold font-arcade text-rose-400 text-sm mb-1">
              <Zap className="w-4 h-4" />
              <span>4. Mantra Global Komandan (Tombol 1-4)</span>
            </div>
            <p>
              Gunakan keahlian khususmu saat kondisi genting: [1] Hujan Meteor di area tertentu, [2] Pembekuan Total seluruh musuh, [3] Adrenalin percepatan tembak seluruh menara, dan [4] Sentuhan Midas untuk emas darurat!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-850 px-5 py-3 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="pixel-btn pixel-btn-primary text-xs py-1.5 px-4"
          >
            Mengerti & Mulai Bertempur!
          </button>
        </div>
      </div>
    </div>
  );
}
