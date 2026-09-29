import React, { useState, useRef, useEffect } from 'react';
import { toPng, toBlob } from 'html-to-image';
import {
  Download,
  Copy,
  Check,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Share2,
  Sparkles,
  Sliders,
  FileText,
  RefreshCw,
  ExternalLink,
  Info,
} from 'lucide-react';
import HMBriefingMockup, { HMBriefingData } from './components/HMBriefingMockup';

const PRESETS: Record<string, HMBriefingData> = {
  'austin-data-eng': {
    headerTitle: 'Talent IQ Market Intelligence Briefing',
    roleTitle: 'Senior Data Engineer',
    location: 'Austin, TX',
    addressableTalent: 'Addressable Talent: 2,202',
    addressableTalentCount: 2202,
    scarcityScore: 'Scarcity Score: 18/100 (Extremely Scarce)',
    scarcityValue: 18,
    estTTF: 'Est. TTF: 75 Days',
    estTTFDays: 75,
    strategicRecommendation:
      'Pivot Simulation: Shifting to Hybrid expands talent pool by 35% and reduces Est. TTF to 50 Days.',
    preparedFor: 'VP Engineering & Technical Recruiting Leadership',
    dateStr: 'Executive Briefing · Q4 Talent Pipeline',
    reportId: 'TIQ-2026-ATX-DATAENG-09',
    companyLogo: 'TIQ',
    addressableTrend: {
      direction: 'down',
      changePercent: 4.2,
      label: 'YoY Talent Supply',
      isPositive: false,
    },
    scarcityTrend: {
      direction: 'down',
      changePercent: 6.5,
      label: 'QoQ Liquidity',
      isPositive: false,
    },
    estTTFTrend: {
      direction: 'up',
      changePercent: 11.8,
      label: 'QoQ Cycle Drag',
      isPositive: false,
    },
  },
  'sf-ml-eng': {
    headerTitle: 'Talent IQ Market Intelligence Briefing',
    roleTitle: 'Staff Machine Learning Engineer',
    location: 'San Francisco, CA',
    addressableTalent: 'Addressable Talent: 1,480',
    addressableTalentCount: 1480,
    scarcityScore: 'Scarcity Score: 12/100 (Extremely Scarce)',
    scarcityValue: 12,
    estTTF: 'Est. TTF: 92 Days',
    estTTFDays: 92,
    strategicRecommendation:
      'Pivot Simulation: Shifting to Hybrid expands talent pool by 48% and reduces Est. TTF to 58 Days.',
    preparedFor: 'AI Research Director & Head of People',
    dateStr: 'Executive Briefing · Q4 Talent Pipeline',
    reportId: 'TIQ-2026-SFO-MLENG-03',
    companyLogo: 'NEO',
    addressableTrend: {
      direction: 'up',
      changePercent: 2.1,
      label: 'YoY Inflow to SF',
      isPositive: true,
    },
    scarcityTrend: {
      direction: 'down',
      changePercent: 9.4,
      label: 'AI Talent Deficit',
      isPositive: false,
    },
    estTTFTrend: {
      direction: 'up',
      changePercent: 18.5,
      label: 'Comp War Delay',
      isPositive: false,
    },
  },
  'nyc-product-dir': {
    headerTitle: 'Talent IQ Market Intelligence Briefing',
    roleTitle: 'Director of Product Management',
    location: 'New York, NY',
    addressableTalent: 'Addressable Talent: 3,120',
    addressableTalentCount: 3120,
    scarcityScore: 'Scarcity Score: 26/100 (High Scarcity)',
    scarcityValue: 26,
    estTTF: 'Est. TTF: 68 Days',
    estTTFDays: 68,
    strategicRecommendation:
      'Pivot Simulation: Shifting to Hybrid expands talent pool by 40% and reduces Est. TTF to 42 Days.',
    preparedFor: 'Chief Product Officer & Executive Talent Partner',
    dateStr: 'Executive Briefing · Q4 Talent Pipeline',
    reportId: 'TIQ-2026-NYC-PROD-14',
    companyLogo: 'FIN',
    addressableTrend: {
      direction: 'up',
      changePercent: 5.3,
      label: 'Fintech Outflow Gain',
      isPositive: true,
    },
    scarcityTrend: {
      direction: 'up',
      changePercent: 3.8,
      label: 'Active Applicant Parity',
      isPositive: true,
    },
    estTTFTrend: {
      direction: 'down',
      changePercent: 7.2,
      label: 'Executive Search Velocity',
      isPositive: true,
    },
  },
};

export default function App() {
  const [data, setData] = useState<HMBriefingData>(PRESETS['austin-data-eng']);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [zoomScale, setZoomScale] = useState<number>(0.65);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedImage, setCopiedImage] = useState<boolean>(false);
  const [copiedCaption, setCopiedCaption] = useState<boolean>(false);
  const [showCustomize, setShowCustomize] = useState<boolean>(false);
  const [exportResolution, setExportResolution] = useState<1 | 2>(2); // 2x Retina by default

  const reportContainerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  // Auto-fit zoom on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      if (viewportRef.current) {
        const availableWidth = viewportRef.current.clientWidth - 80;
        const availableHeight = viewportRef.current.clientHeight - 80;
        const scaleX = availableWidth / 1200;
        const scaleY = availableHeight / 1500;
        const fitted = Math.min(scaleX, scaleY, 0.95);
        setZoomScale(Math.max(0.35, fitted));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle PNG Download
  const handleDownloadPng = async () => {
    if (!reportContainerRef.current) return;
    setIsExporting(true);

    try {
      const node = reportContainerRef.current;
      const dataUrl = await toPng(node, {
        pixelRatio: exportResolution,
        quality: 1,
        cacheBust: true,
        backgroundColor: theme === 'dark' ? '#020617' : '#ffffff',
      });

      const link = document.createElement('a');
      const filename = `TalentIQ-Briefing-${data.roleTitle?.replace(/\s+/g, '-')}-${data.location?.replace(/[^a-zA-Z0-9]/g, '')}-1200x1500.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export report image', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!reportContainerRef.current) return;
    setIsExporting(true);

    try {
      const node = reportContainerRef.current;
      const blob = await toBlob(node, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: theme === 'dark' ? '#020617' : '#ffffff',
      });

      if (blob && navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      }
    } catch (err) {
      console.error('Clipboard copy failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  // High-engagement LinkedIn post hook copy
  const handleCopyCaption = () => {
    const caption = `Most hiring managers think their req is stalling because "there aren't enough good senior engineers."

Here's what the data actually says:

We ran a Talent IQ market intelligence simulation for a ${data.roleTitle} in ${data.location}:

📊 Current Baseline (5-Day On-Site):
• Addressable Talent Pool: ${data.addressableTalent?.replace('Addressable Talent: ', '')}
• Scarcity Index: ${data.scarcityScore?.replace('Scarcity Score: ', '')}
• Est. Time-to-Fill: ${data.estTTF?.replace('Est. TTF: ', '')}

💡 The Pivot Simulation:
"${data.strategicRecommendation}"

By moving from strict 5-day on-site to hybrid:
✅ Talent pool expands by +35% (+770 qualified engineers)
✅ Est. Time-to-Fill drops by 25 days (33% faster close)
✅ Saves ~$42k in cost-of-vacancy drag

Before adjusting salary bands or firing your recruiter, look at your workplace friction. The talent exists—they just aren't willing to do 5 days in traffic.

Executive 1-page report attached below ⬇️

#TalentIntelligence #Recruiting #Hiring #TechHiring #WorkplaceStrategy`;

    navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* ========================================================
          LEFT CONTROLS & WORKBENCH PANEL
         ======================================================== */}
      <aside className="w-80 shrink-0 border-r border-slate-800 bg-slate-900/95 flex flex-col justify-between z-20 shadow-xl">
        <div className="p-5 overflow-y-auto">
          {/* Header Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                LINKEDIN POST READY
              </div>
              <h1 className="text-base font-bold text-white tracking-tight">
                Talent IQ Studio
              </h1>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              1200×1500
            </span>
          </div>

          {/* Primary Screenshot / Export Actions */}
          <div className="mt-5 space-y-2.5">
            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-950 transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Generating PNG...' : 'Download PNG (1200×1500)'}
            </button>

            <button
              onClick={handleCopyImage}
              disabled={isExporting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-800 text-slate-200 font-medium text-xs border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
            >
              {copiedImage ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Image to Clipboard</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyCaption}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 font-medium text-xs border border-slate-800 transition-all cursor-pointer"
            >
              {copiedCaption ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Post Caption Copied!</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Copy LinkedIn Post Hook</span>
                </>
              )}
            </button>
          </div>

          {/* Preset Roles */}
          <div className="mt-6">
            <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Role Intelligence Presets
            </label>
            <div className="space-y-1.5">
              {Object.entries(PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => setData(preset)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                    data.roleTitle === preset.roleTitle
                      ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 font-semibold'
                      : 'bg-slate-800/40 hover:bg-slate-800 border border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="truncate">
                    <div>{preset.roleTitle}</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      {preset.location}
                    </div>
                  </div>
                  {data.roleTitle === preset.roleTitle && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Theme & Resolution Settings */}
          <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Report Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium border cursor-pointer ${
                    theme === 'light'
                      ? 'bg-white text-slate-900 border-white font-semibold'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  Whitepaper
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium border cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-800 text-emerald-400 border-emerald-500 font-semibold'
                      : 'bg-slate-800/50 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  Terminal Dark
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Image Quality (Retina Scale)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExportResolution(1)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium border cursor-pointer ${
                    exportResolution === 1
                      ? 'bg-slate-800 text-emerald-400 border-emerald-500'
                      : 'bg-slate-800/40 text-slate-400 border-slate-700'
                  }`}
                >
                  1x (1200×1500)
                </button>
                <button
                  onClick={() => setExportResolution(2)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium border cursor-pointer ${
                    exportResolution === 2
                      ? 'bg-slate-800 text-emerald-400 border-emerald-500'
                      : 'bg-slate-800/40 text-slate-400 border-slate-700'
                  }`}
                >
                  2x (2400×3000)
                </button>
              </div>
            </div>

            {/* Customize Drawer Toggle */}
            <div>
              <button
                onClick={() => setShowCustomize(!showCustomize)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700/80 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  Edit Report Values
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {showCustomize ? 'Hide' : 'Show'}
                </span>
              </button>

              {showCustomize && (
                <div className="mt-3 space-y-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1 flex items-center justify-between">
                      <span>Company Logo / Initials</span>
                      <span className="text-slate-500 font-normal">URL or 1-4 Letters</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Stripe, TIQ, or https://logo.clearbit.com/meta.com"
                      value={data.companyLogo || ''}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, companyLogo: e.target.value }))
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-emerald-500"
                    />
                    <p className="mt-1 text-[10px] text-slate-400 leading-tight">
                      Renders in the top right corner of the briefing report.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                      Role Title
                    </label>
                    <input
                      type="text"
                      value={data.roleTitle}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, roleTitle: e.target.value }))
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={data.location}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, location: e.target.value }))
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-emerald-500"
                    />
                  </div>

                  {/* Metric 1 & Trend */}
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                    <label className="block text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                      Metric 1: Addressable Talent
                    </label>
                    <input
                      type="text"
                      value={data.addressableTalent}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          addressableTalent: e.target.value,
                        }))
                      }
                      className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs focus:outline-emerald-500"
                    />
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-slate-400 font-mono">Trend Direction</span>
                        <select
                          value={data.addressableTrend?.direction || 'down'}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              addressableTrend: {
                                direction: e.target.value as 'up' | 'down',
                                changePercent: prev.addressableTrend?.changePercent ?? 4.2,
                                label: prev.addressableTrend?.label || 'YoY Supply',
                                isPositive: e.target.value === 'up',
                              },
                            }))
                          }
                          className="w-full mt-1 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                        >
                          <option value="up">▲ Up (Growth)</option>
                          <option value="down">▼ Down (Decline)</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-slate-400 font-mono">Change %</span>
                        <input
                          type="number"
                          step="0.1"
                          value={data.addressableTrend?.changePercent ?? 4.2}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              addressableTrend: {
                                direction: prev.addressableTrend?.direction || 'down',
                                changePercent: parseFloat(e.target.value) || 0,
                                label: prev.addressableTrend?.label || 'YoY Supply',
                                isPositive: prev.addressableTrend?.isPositive ?? false,
                              },
                            }))
                          }
                          className="w-full mt-1 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Metric 2 & Trend */}
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                    <label className="block text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                      Metric 2: Scarcity Index
                    </label>
                    <input
                      type="text"
                      value={data.scarcityScore}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          scarcityScore: e.target.value,
                        }))
                      }
                      className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs focus:outline-emerald-500"
                    />
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-slate-400 font-mono">Trend Direction</span>
                        <select
                          value={data.scarcityTrend?.direction || 'down'}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              scarcityTrend: {
                                direction: e.target.value as 'up' | 'down',
                                changePercent: prev.scarcityTrend?.changePercent ?? 6.5,
                                label: prev.scarcityTrend?.label || 'QoQ Liquidity',
                                isPositive: e.target.value === 'up',
                              },
                            }))
                          }
                          className="w-full mt-1 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                        >
                          <option value="up">▲ Up (Looser)</option>
                          <option value="down">▼ Down (Tighter)</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-slate-400 font-mono">Change %</span>
                        <input
                          type="number"
                          step="0.1"
                          value={data.scarcityTrend?.changePercent ?? 6.5}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              scarcityTrend: {
                                direction: prev.scarcityTrend?.direction || 'down',
                                changePercent: parseFloat(e.target.value) || 0,
                                label: prev.scarcityTrend?.label || 'QoQ Liquidity',
                                isPositive: prev.scarcityTrend?.isPositive ?? false,
                              },
                            }))
                          }
                          className="w-full mt-1 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Metric 3 & Trend */}
                  <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
                    <label className="block text-[10px] font-mono uppercase text-emerald-400 font-semibold">
                      Metric 3: Estimated TTF
                    </label>
                    <input
                      type="text"
                      value={data.estTTF}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, estTTF: e.target.value }))
                      }
                      className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs focus:outline-emerald-500"
                    />
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-slate-400 font-mono">Trend Direction</span>
                        <select
                          value={data.estTTFTrend?.direction || 'up'}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              estTTFTrend: {
                                direction: e.target.value as 'up' | 'down',
                                changePercent: prev.estTTFTrend?.changePercent ?? 11.8,
                                label: prev.estTTFTrend?.label || 'Cycle Drag',
                                isPositive: e.target.value === 'down', // down is faster/better
                              },
                            }))
                          }
                          className="w-full mt-1 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                        >
                          <option value="up">▲ Up (+Days slower)</option>
                          <option value="down">▼ Down (-Days faster)</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-slate-400 font-mono">Change %</span>
                        <input
                          type="number"
                          step="0.1"
                          value={data.estTTFTrend?.changePercent ?? 11.8}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              estTTFTrend: {
                                direction: prev.estTTFTrend?.direction || 'up',
                                changePercent: parseFloat(e.target.value) || 0,
                                label: prev.estTTFTrend?.label || 'Cycle Drag',
                                isPositive: prev.estTTFTrend?.isPositive ?? false,
                              },
                            }))
                          }
                          className="w-full mt-1 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                      Strategic Recommendation
                    </label>
                    <textarea
                      rows={3}
                      value={data.strategicRecommendation}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          strategicRecommendation: e.target.value,
                        }))
                      }
                      className="w-full px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white text-xs focus:outline-emerald-500 resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-[11px] text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Optimized for LinkedIn 4:5 vertical feed engagement.</span>
        </div>
      </aside>

      {/* ========================================================
          RIGHT MAIN STAGE: 1200x1500 CANVAS PREVIEW
         ======================================================== */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        {/* Top Floating Viewport Bar */}
        <div className="h-14 px-6 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Container Size: <strong className="text-white">1200 × 1500 px</strong>
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-xs text-slate-400">
              Format: <strong className="text-white">4:5 Aspect Ratio (Portrait)</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomScale((prev) => Math.max(0.3, prev - 0.1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-300 w-14 text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => setZoomScale((prev) => Math.min(1.2, prev + 0.1))}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomScale(1)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 cursor-pointer"
              title="Actual Size 100%"
            >
              100%
            </button>
            <button
              onClick={() => {
                if (viewportRef.current) {
                  const availableWidth = viewportRef.current.clientWidth - 80;
                  const availableHeight = viewportRef.current.clientHeight - 80;
                  const scaleX = availableWidth / 1200;
                  const scaleY = availableHeight / 1500;
                  setZoomScale(Math.min(scaleX, scaleY, 0.95));
                }
              }}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium cursor-pointer"
              title="Fit to Window"
            >
              Fit
            </button>
          </div>
        </div>

        {/* Scrollable Canvas Viewport */}
        <div
          ref={viewportRef}
          className="flex-1 overflow-auto p-10 flex items-center justify-center relative bg-dot-grid"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        >
          {/* Scaled Wrapper */}
          <div
            style={{
              width: `${1200 * zoomScale}px`,
              height: `${1500 * zoomScale}px`,
              position: 'relative',
              transition: 'width 0.15s ease-out, height 0.15s ease-out',
            }}
            className="shadow-2xl rounded-sm"
          >
            <div
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: 'top left',
                width: '1200px',
                height: '1500px',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <HMBriefingMockup
                ref={reportContainerRef}
                data={{
                  ...data,
                  theme,
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
