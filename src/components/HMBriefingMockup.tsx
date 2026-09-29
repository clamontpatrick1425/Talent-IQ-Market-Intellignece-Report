import React, { forwardRef, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Clock,
  AlertTriangle,
  Lightbulb,
  Building2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Compass,
  Briefcase,
  Layers,
  ChevronRight,
  Percent,
} from 'lucide-react';

export interface MetricTrend {
  direction: 'up' | 'down';
  changePercent: number; // e.g. 8.4
  label?: string; // e.g. "vs. prior quarter" or "YoY growth"
  isPositive?: boolean; // semantic positive: green vs red. e.g. TTF down is good, scarcity score dropping is bad
}

export interface HMBriefingData {
  headerTitle?: string;
  roleTitle?: string;
  location?: string;
  addressableTalent?: string;
  addressableTalentCount?: number;
  scarcityScore?: string;
  scarcityValue?: number;
  estTTF?: string;
  estTTFDays?: number;
  strategicRecommendation?: string;
  theme?: 'light' | 'dark';
  preparedFor?: string;
  dateStr?: string;
  reportId?: string;
  companyLogo?: string; // image URL or 1-3 letter initials e.g. "TIQ", "Stripe", or "https://..."
  addressableTrend?: MetricTrend;
  scarcityTrend?: MetricTrend;
  estTTFTrend?: MetricTrend;
}

export interface HMBriefingMockupProps {
  data?: HMBriefingData;
  className?: string;
}

export const HMBriefingMockup = forwardRef<HTMLDivElement, HMBriefingMockupProps>(
  ({ data, className = '' }, ref) => {
    // Exact requested defaults
    const headerTitle = data?.headerTitle || 'Talent IQ Market Intelligence Briefing';
    const roleTitle = data?.roleTitle || 'Senior Data Engineer';
    const location = data?.location || 'Austin, TX';
    const addressableTalent = data?.addressableTalent || 'Addressable Talent: 2,202';
    const scarcityScore = data?.scarcityScore || 'Scarcity Score: 18/100 (Extremely Scarce)';
    const estTTF = data?.estTTF || 'Est. TTF: 75 Days';
    const strategicRecommendation =
      data?.strategicRecommendation ||
      'Pivot Simulation: Shifting to Hybrid expands talent pool by 35% and reduces Est. TTF to 50 Days.';
    const theme = data?.theme || 'light';
    const preparedFor = data?.preparedFor || 'Engineering Leadership & VP Talent Acquisition';
    const dateStr = data?.dateStr || 'Executive Briefing · Q4 Talent Pipeline';
    const reportId = data?.reportId || 'TIQ-2026-ATX-DATAENG-09';
    const companyLogo = data?.companyLogo?.trim() || '';

    // Trend indicators:
    // 1. Addressable talent: pool contracted by 4.2% YoY due to remote back-to-office migration
    const addressableTrend: MetricTrend = data?.addressableTrend || {
      direction: 'down',
      changePercent: 4.2,
      label: 'YoY Talent Supply',
      isPositive: false, // pool shrinking
    };

    // 2. Scarcity score: down -6.5% QoQ (scarcity worsening)
    const scarcityTrend: MetricTrend = data?.scarcityTrend || {
      direction: 'down',
      changePercent: 6.5,
      label: 'QoQ Liquidity',
      isPositive: false, // liquidity dropped, market tighter
    };

    // 3. Est TTF: lengthened +11.8% QoQ (+8 days from last quarter)
    const estTTFTrend: MetricTrend = data?.estTTFTrend || {
      direction: 'up',
      changePercent: 11.8,
      label: 'QoQ Cycle Drag',
      isPositive: false, // TTF rising is bad for hiring managers
    };

    const isDark = theme === 'dark';

    // Helper to render image or initials logo
    const [logoLoadError, setLogoLoadError] = useState(false);
    const isUrl =
      companyLogo.startsWith('http://') ||
      companyLogo.startsWith('https://') ||
      companyLogo.startsWith('data:image/');

    return (
      <div
        ref={ref}
        id="hm-briefing-report"
        className={`briefing-canvas relative flex flex-col justify-between p-12 transition-colors select-none ${
          isDark
            ? 'bg-slate-950 text-slate-100 border border-slate-800'
            : 'bg-white text-slate-900 border border-slate-200'
        } ${className}`}
        style={{
          boxSizing: 'border-box',
          width: '1200px',
          height: '1500px',
        }}
      >
        {/* Top Decorative Subtle Line & Watermark Background Texture */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-900 via-emerald-600 to-slate-800" />
        
        {/* Subtle grid pattern background */}
        <div
          className={`absolute inset-0 pointer-events-none opacity-[0.03] ${
            isDark ? 'invert' : ''
          }`}
          style={{
            backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* ========================================================
            ZONE 1: HEADER & ROLE TITLE
           ======================================================== */}
        <div className="relative z-10">
          {/* Top Brand Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-200/90 dark:border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-800 flex items-center justify-center text-white shadow-sm ring-1 ring-slate-900/10">
                <Compass className="w-5 h-5 text-emerald-400 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
                    TALENT IQ INTELLIGENCE
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 tracking-wider">
                    EXECUTIVE MEMORANDUM
                  </span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {headerTitle}
                </h1>
              </div>
            </div>

            {/* Top Right Corner: Document Metadata & Optional Personalized Company Logo */}
            <div className="flex items-center gap-4 text-right">
              <div>
                <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                  {dateStr}
                </div>
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                  DOC ID: {reportId}
                </div>
              </div>

              {companyLogo && (
                <div className="pl-4 border-l border-slate-200 dark:border-slate-800 flex items-center">
                  {isUrl && !logoLoadError ? (
                    <img
                      src={companyLogo}
                      alt="Company Logo"
                      onError={() => setLogoLoadError(true)}
                      className="h-10 max-w-[130px] object-contain rounded-md border border-slate-200 dark:border-slate-800 bg-white p-1"
                    />
                  ) : (
                    <div className="h-10 min-w-10 px-3 rounded-lg bg-slate-900 dark:bg-slate-800 border border-slate-700/80 flex items-center justify-center text-white shadow-xs font-mono font-bold text-xs tracking-wider uppercase">
                      {companyLogo.slice(0, 5)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Target Role & Search Parameters */}
          <div className="mt-8 flex items-start justify-between">
            <div className="max-w-3xl">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                Target Search Profile & Market Scope
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-3">
                <span>{roleTitle}</span>
                <span className="text-slate-300 dark:text-slate-700 font-light">|</span>
                <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold text-3xl">
                  <MapPin className="w-6 h-6 inline-block -mt-1 text-emerald-600 dark:text-emerald-400" />
                  {location}
                </span>
              </h2>
              <div className="mt-2.5 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                <span>Search Scope: Austin-Round Rock MSA (50-mile radius)</span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span>Current Mandate: 5-Day On-Site</span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span>Level: Senior IC (5–8 Yrs Exp)</span>
              </div>
            </div>

            {/* Prepared for Box */}
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-right min-w-[240px]">
              <div className="text-[11px] font-mono font-semibold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                Prepared For
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 leading-snug">
                {preparedFor}
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1 flex items-center justify-end gap-1">
                <ShieldCheck className="w-3 h-3" />
                Market Telemetry Verified
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            ZONE 2: 3 KEY METRICS GRID WITH VISUAL TREND INDICATORS
           ======================================================== */}
        <div className="relative z-10 my-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Core Market Liquidity Metrics (Current Baseline)
            </h3>
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
              Confidence Interval: 94.8% · Real-time Market Signals
            </span>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Metric 1: Addressable Talent */}
            <div className="rounded-xl p-6 bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Addressable Talent
                  </div>

                  {/* Trend Indicator 1 */}
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold border ${
                      addressableTrend.isPositive
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                    }`}
                    title={addressableTrend.label}
                  >
                    {addressableTrend.direction === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                    <span>
                      {addressableTrend.direction === 'up' ? '+' : '-'}
                      {addressableTrend.changePercent}%
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono tabular-nums tracking-tight text-slate-950 dark:text-white">
                    2,202
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Engineers
                  </span>
                </div>
                <div className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {addressableTalent}
                </div>
              </div>
              <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Active Seekers: <strong className="text-slate-800 dark:text-slate-200 font-mono">308 (14%)</strong></span>
                <span className="font-mono text-[11px] text-slate-400">
                  {addressableTrend.label || 'YoY Supply'}
                </span>
              </div>
            </div>

            {/* Metric 2: Scarcity Score */}
            <div className="rounded-xl p-6 bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Scarcity Index
                  </div>

                  {/* Trend Indicator 2 */}
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold border ${
                      scarcityTrend.isPositive
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                    }`}
                    title={scarcityTrend.label}
                  >
                    {scarcityTrend.direction === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                    <span>
                      {scarcityTrend.direction === 'up' ? '+' : '-'}
                      {scarcityTrend.changePercent}%
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono tabular-nums tracking-tight text-rose-600 dark:text-rose-400">
                    18<span className="text-2xl text-slate-400 dark:text-slate-600 font-normal">/100</span>
                  </span>
                  <span className="text-xs font-medium text-rose-700 dark:text-rose-300">
                    Extremely Scarce
                  </span>
                </div>

                <div className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {scarcityScore}
                </div>
              </div>

              {/* Scarcity Bar */}
              <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/80">
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-rose-500 h-full" style={{ width: '18%' }} />
                  <div className="bg-amber-400 h-full opacity-30" style={{ width: '32%' }} />
                  <div className="bg-emerald-500 h-full opacity-30" style={{ width: '50%' }} />
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-mono">
                  <span>Extreme (0-25)</span>
                  <span>Moderate (50)</span>
                  <span className="text-rose-600 dark:text-rose-400 font-medium">
                    {scarcityTrend.label || 'Tighter YoY'}
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 3: Est. TTF */}
            <div className="rounded-xl p-6 bg-slate-50/80 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Estimated Time-To-Fill
                  </div>

                  {/* Trend Indicator 3 */}
                  <div
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-bold border ${
                      estTTFTrend.isPositive
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                    }`}
                    title={estTTFTrend.label}
                  >
                    {estTTFTrend.direction === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 stroke-[2.5]" />
                    )}
                    <span>
                      {estTTFTrend.direction === 'up' ? '+' : '-'}
                      {estTTFTrend.changePercent}%
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono tabular-nums tracking-tight text-slate-950 dark:text-white">
                    75
                  </span>
                  <span className="text-xl font-bold text-slate-600 dark:text-slate-400">
                    Days
                  </span>
                </div>

                <div className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {estTTF}
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Austin Median: <strong className="text-slate-800 dark:text-slate-200 font-mono">54 Days</strong></span>
                <span className="text-rose-600 dark:text-rose-400 font-medium font-mono">
                  +11.8% Drag vs Q3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            ZONE 3: HIGHLIGHTED STRATEGIC RECOMMENDATION (GREEN ACCENT)
           ======================================================== */}
        <div className="relative z-10 my-4">
          <div className="rounded-2xl p-7 bg-emerald-500/10 dark:bg-emerald-950/40 border-2 border-emerald-500/80 dark:border-emerald-500 shadow-sm relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
            
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5 shadow-sm">
                  <Lightbulb className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-800 dark:text-emerald-400">
                      STRATEGIC RECOMMENDATION & IMPACT FORECAST
                    </span>
                    <span className="text-emerald-300 dark:text-emerald-800">·</span>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      Policy Simulation Model v2.4
                    </span>
                  </div>

                  {/* Primary Highlighted Callout Text */}
                  <div className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white mt-1.5 leading-snug">
                    {strategicRecommendation}
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold tracking-wide font-mono shadow-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                HIGH ROI ACTION
              </div>
            </div>

            {/* Pivot Simulation Comparative Breakdown */}
            <div className="mt-5 grid grid-cols-4 gap-4 pt-4 border-t border-emerald-500/20">
              <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-3.5 border border-emerald-500/20">
                <div className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Talent Pool Expansion
                </div>
                <div className="mt-1 text-xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400">
                  2,202 → 2,972
                </div>
                <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 mt-0.5">
                  +770 Candidates (+35.0%)
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-3.5 border border-emerald-500/20">
                <div className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Time-To-Fill Acceleration
                </div>
                <div className="mt-1 text-xl font-extrabold font-mono text-emerald-700 dark:text-emerald-400">
                  75d → 50d
                </div>
                <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 mt-0.5">
                  -25 Days Saved (33.3% Faster)
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-3.5 border border-emerald-500/20">
                <div className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Offer Acceptance Velocity
                </div>
                <div className="mt-1 text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  52% → 81%
                </div>
                <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 mt-0.5">
                  +29% Win Rate Improvement
                </div>
              </div>

              <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-3.5 border border-emerald-500/20">
                <div className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 uppercase">
                  Cost of Vacancy Reduction
                </div>
                <div className="mt-1 text-xl font-extrabold font-mono text-slate-900 dark:text-white">
                  ~$42,500
                </div>
                <div className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 mt-0.5">
                  Engineering velocity preserved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            ZONE 4: SUPPORTING INTELLIGENCE (MARKET DYNAMICS & COMPS)
           ======================================================== */}
        <div className="relative z-10 grid grid-cols-12 gap-5 my-2">
          {/* Left Column: Top Competitor Talent Hoards & Critical Skills */}
          <div className="col-span-7 rounded-xl p-5 bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  Austin Employer Talent Concentrations (Senior Data Eng)
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">Share of 2,202 Pool</span>
              </div>

              <div className="space-y-2.5">
                {[
                  { employer: 'Dell Technologies', headCount: 345, share: '15.7%', policy: 'Hybrid (3d/wk)', difficulty: 'Medium' },
                  { employer: 'Tesla Gigafactory Texas', headCount: 290, share: '13.2%', policy: 'On-Site (5d/wk)', difficulty: 'High Sourcing Target' },
                  { employer: 'Apple Austin Campus', headCount: 260, share: '11.8%', policy: 'Hybrid (3d/wk)', difficulty: 'High Comp Lock' },
                  { employer: 'Indeed / Recruit Holdings', headCount: 185, share: '8.4%', policy: 'Remote-First', difficulty: 'Extremely Retentive' },
                  { employer: 'Meta / Oracle / Cloud Co-ops', headCount: 230, share: '10.4%', policy: 'Selective', difficulty: 'Active Outflow' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 text-slate-400 font-mono text-[11px]">{idx + 1}.</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{item.employer}</span>
                      <span className="text-[11px] text-slate-400 font-normal">({item.policy})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {item.headCount} eng ({item.share})
                      </span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {item.difficulty}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Stack Scarcity Heatmap */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Stack Scarcity Multipliers:</span>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-slate-700 dark:text-slate-300">Snowflake (1.2x)</span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-slate-700 dark:text-slate-300">dbt/Airflow (1.5x)</span>
                <span className="text-slate-300 dark:text-slate-600">·</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Iceberg/Spark (2.4x)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Compensation Benchmarking (Austin Metro) */}
          <div className="col-span-5 rounded-xl p-5 bg-slate-50/70 dark:bg-slate-900/70 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  Austin Compensation Calibration (Base)
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">IC5 / Senior</span>
              </div>

              <div className="space-y-2 mt-2">
                {[
                  { percentile: '25th Percentile', amount: '$156,000', note: 'Below market; high drop-off', bar: '25%' },
                  { percentile: '50th Percentile (Median)', amount: '$178,000', note: 'Market parity for hybrid', bar: '50%' },
                  { percentile: '75th Percentile', amount: '$198,000', note: 'Target bracket for top 15%', bar: '75%', highlight: true },
                  { percentile: '90th Percentile', amount: '$225,000', note: 'Strict 5-day on-site premium', bar: '90%' },
                ].map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border transition-colors ${
                      tier.highlight
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-600 dark:text-slate-300">{tier.percentile}</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{tier.amount}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>{tier.note}</span>
                      {tier.highlight && (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold font-mono text-[10px]">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
              <span>On-Site Mandate Premium:</span>
              <strong className="text-slate-700 dark:text-slate-300 font-mono">+12% to +18% Base</strong>
            </div>
          </div>
        </div>

        {/* ========================================================
            ZONE 5: RECOMMENDED HIRING ACTION PLAYBOOK
           ======================================================== */}
        <div className="relative z-10 my-2 rounded-xl p-5 bg-slate-900 text-slate-100 dark:bg-slate-900/90 border border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
                EXECUTIVE ACTION PLAYBOOK
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400">Immediate adjustments to de-risk Q4 hiring</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
              Target Close: 50 Days
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/60">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1.5 font-mono">
                <span>01.</span> Workplace Flexibility
              </div>
              <p className="text-slate-300 leading-relaxed">
                Approve 2-day remote / 3-day in-office hybrid schedule. Instantly captures <strong>+770 passive candidates</strong> outside central Austin Austin-traffic radius.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/60">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1.5 font-mono">
                <span>02.</span> Interview Velocity
              </div>
              <p className="text-slate-300 leading-relaxed">
                Compress interview loop to <strong>10 business days max</strong> (Recruiter Screen → System Design & Take-Home → Hiring Manager Offer).
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/70 border border-slate-700/60">
              <div className="text-emerald-400 font-bold mb-1 flex items-center gap-1.5 font-mono">
                <span>03.</span> Compensation Alignment
              </div>
              <p className="text-slate-300 leading-relaxed">
                Post salary transparently at <strong>$180k–$195k base</strong>. Outbids legacy defense contractors while maintaining 15% margin below Bay Area relocations.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            ZONE 6: FOOTER & METHODOLOGY VERIFICATION
           ======================================================== */}
        <div className="relative z-10 pt-5 border-t border-slate-200/90 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700 dark:text-slate-300">TALENT IQ MARKET ENGINE</span>
            <span>·</span>
            <span>BLS Austin MSA · Aggregated ATS Telemetry · Radford/Levels.fyi Benchmarks</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Confidential & Proprietary</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} Talent IQ</span>
          </div>
        </div>
      </div>
    );
  }
);

HMBriefingMockup.displayName = 'HMBriefingMockup';

export default HMBriefingMockup;
