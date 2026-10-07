import { useState } from 'react';
import { Save, Check, Key, Info, ShieldCheck, ExternalLink } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export function SettingsPage() {
  const earnKaroId = useAppStore((s) => s.earnKaroId);
  const setEarnKaroId = useAppStore((s) => s.setEarnKaroId);
  const [input, setInput] = useState(earnKaroId);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEarnKaroId(input);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">Settings</h1>

        {/* EarnKaro ID card */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Key size={20} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">EarnKaro Affiliate ID</h2>
              <p className="text-xs text-slate-400">Used for all outbound buy links</p>
            </div>
          </div>

          <label className="mb-1.5 block text-sm font-medium text-slate-700">Your EarnKaro ID</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your EarnKaro Affiliate/User ID"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none"
          />
          <p className="mt-2 text-xs text-slate-400">
            If left empty, the default ID <code className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600 font-mono">TEST_ID_123</code> will be used.
          </p>

          <button
            onClick={handleSave}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-md transition-all active:scale-[0.98] ${
              saved ? 'bg-emerald-500' : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {saved ? (
              <>
                <Check size={16} />
                Saved successfully
              </>
            ) : (
              <>
                <Save size={16} />
                Save ID
              </>
            )}
          </button>
        </div>

        {/* Info card */}
        <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex gap-3">
            <Info size={20} className="shrink-0 text-blue-500" />
            <div>
              <h3 className="text-sm font-bold text-slate-800">How does this work?</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                DealScout is a discovery bridge — we don't sell anything. When someone clicks a "Buy" button,
                they're redirected to the original store (Amazon, Flipkart, etc.) via an EarnKaro affiliate link.
                Your EarnKaro ID is appended to every outbound link so you earn commission on completed purchases.
              </p>
              <a
                href="https://earnkaro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Learn about EarnKaro <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Privacy card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex gap-3">
            <ShieldCheck size={20} className="shrink-0 text-emerald-500" />
            <div>
              <h3 className="text-sm font-bold text-slate-800">Privacy</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Your EarnKaro ID is stored locally on this device only. It never leaves your browser except as
                part of the affiliate redirect URL when a buy button is clicked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
