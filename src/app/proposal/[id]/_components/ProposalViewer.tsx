'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Download,
  FileSignature,
  CheckCircle2,
  PenLine,
  Calendar,
  RotateCcw,
  X,
  Check,
} from 'lucide-react';
import type { Block, ProposalData } from '@/types/proposal.types';

export type { ProposalData };

// ─── Utilities ────────────────────────────────────────────────────────────────

function InlineText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </>
  );
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ─── Signature Pad Modal ──────────────────────────────────────────────────────

interface SignaturePadProps {
  label: string;
  onConfirm: (dataUrl: string) => void;
  onCancel: () => void;
}

function SignaturePad({ label, onConfirm, onCancel }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [hasStrokes, setHasStrokes] = useState(false);

  // Initialise canvas with DPR-aware scaling for crisp rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
    return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
  };

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent);
    lastPos.current = pos;
    setHasStrokes(true);
  }, []);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !lastPos.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent);
    if (!pos) return;
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  }, []);

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
    lastPos.current = null;
  }, []);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    // Re-init after clearing so stroke styles are preserved
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasStrokes(false);
  };

  const confirm = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onConfirm(canvas.toDataURL('image/png'));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
              Draw your signature
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">{label}</p>
          </div>
          <button
            onClick={onCancel}
            className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Canvas area */}
        <div className="p-5">
          <div className="relative rounded-xl border-2 border-dashed border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800/30 overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-44 touch-none cursor-crosshair block"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            {/* Placeholder */}
            {!hasStrokes && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-sm text-neutral-400 dark:text-neutral-500 select-none">
                  Sign here
                </p>
              </div>
            )}
            {/* Baseline */}
            <div className="absolute bottom-10 left-6 right-6 h-px bg-neutral-300 dark:bg-neutral-600 pointer-events-none" />
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={clear}
              className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={!hasStrokes}
                onClick={confirm}
                className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white border-0 disabled:opacity-40"
              >
                <Check className="w-3.5 h-3.5" />
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Block Renderers ──────────────────────────────────────────────────────────

function HeadingBlock({ block }: { block: Extract<Block, { type: 'heading' }> }) {
  const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3';
  return (
    <Tag
      className={cn(
        block.level === 1 &&
          'text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4',
        block.level === 2 &&
          'text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3',
        block.level === 3 &&
          'text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-2'
      )}
    >
      <InlineText text={block.text} />
    </Tag>
  );
}

function ParagraphBlock({ block }: { block: Extract<Block, { type: 'paragraph' }> }) {
  const paragraphs = block.text.split('\n\n');
  return (
    <div className="space-y-3">
      {paragraphs.map((para, i) => (
        <p
          key={i}
          className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-[0.9375rem]"
        >
          <InlineText text={para} />
        </p>
      ))}
    </div>
  );
}

function QuoteBlock({ block }: { block: Extract<Block, { type: 'quote' }> }) {
  return (
    <blockquote className="border-l-4 border-blue-400 dark:border-blue-600 pl-4 py-2 bg-blue-50/60 dark:bg-blue-950/20 rounded-r-lg">
      <p className="text-sm text-neutral-600 dark:text-neutral-400 italic leading-relaxed">
        <InlineText text={block.text} />
      </p>
      {block.cite && (
        <cite className="block mt-1.5 text-xs text-neutral-500 not-italic font-medium">
          — {block.cite}
        </cite>
      )}
    </blockquote>
  );
}

function ListBlock({ block }: { block: Extract<Block, { type: 'list' }> }) {
  const Tag = block.style === 'number' ? 'ol' : 'ul';
  return (
    <Tag
      className={cn(
        'space-y-2 text-[0.9375rem] text-neutral-700 dark:text-neutral-300 pl-5',
        block.style === 'number' ? 'list-decimal' : 'list-disc'
      )}
    >
      {block.items.map((item, i) => (
        <li key={i} className="leading-relaxed">
          <InlineText text={item} />
        </li>
      ))}
    </Tag>
  );
}

function TableBlock({ block }: { block: Extract<Block, { type: 'table' }> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
            {block.headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-2.5 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr
              key={i}
              className={cn(
                'border-b border-neutral-100 dark:border-neutral-800 last:border-0',
                i % 2 === 1 && 'bg-neutral-50/50 dark:bg-neutral-800/20'
              )}
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    'px-4 py-3 text-neutral-700 dark:text-neutral-300',
                    j === 0 && 'font-medium text-neutral-800 dark:text-neutral-200'
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PricingBlock({ block }: { block: Extract<Block, { type: 'pricing' }> }) {
  const total = block.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-700">
            <th className="px-4 py-2.5 text-left text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Item
            </th>
            <th className="px-4 py-2.5 text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider w-16">
              Qty
            </th>
            <th className="px-4 py-2.5 text-right text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Unit Price
            </th>
            <th className="px-4 py-2.5 text-right text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {block.items.map((item, i) => (
            <tr key={i} className="border-b border-neutral-100 dark:border-neutral-800">
              <td className="px-4 py-3 font-medium text-neutral-800 dark:text-neutral-200">
                {item.name}
              </td>
              <td className="px-4 py-3 text-center text-neutral-500 dark:text-neutral-400">
                {item.qty}
              </td>
              <td className="px-4 py-3 text-right text-neutral-600 dark:text-neutral-400">
                {formatCurrency(item.unitPrice, block.currency)}
              </td>
              <td className="px-4 py-3 text-right font-medium text-neutral-800 dark:text-neutral-200">
                {formatCurrency(item.qty * item.unitPrice, block.currency)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-neutral-900 dark:bg-neutral-100">
            <td
              colSpan={3}
              className="px-4 py-3 text-right text-sm font-bold text-white dark:text-neutral-900"
            >
              Total
            </td>
            <td className="px-4 py-3 text-right text-sm font-bold text-white dark:text-neutral-900">
              {formatCurrency(total, block.currency)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

function SignatureBlock({
  block,
  signatureDataUrl,
  onSign,
}: {
  block: Extract<Block, { type: 'signature' }>;
  signatureDataUrl: string | null;
  onSign: (dataUrl: string) => void;
}) {
  const [showPad, setShowPad] = useState(false);

  return (
    <>
      <div
        className={cn(
          'rounded-lg border-2 border-dashed p-6 transition-colors',
          signatureDataUrl
            ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20'
            : 'border-neutral-300 dark:border-neutral-600 bg-neutral-50/50 dark:bg-neutral-800/20 hover:border-blue-300 dark:hover:border-blue-600'
        )}
      >
        <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-3">
          {block.label}
        </p>

        {signatureDataUrl ? (
          <div className="flex items-center gap-3">
            {/* Display the canvas drawing */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={signatureDataUrl}
              alt="Signature"
              className="h-14 object-contain dark:invert"
            />
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
          </div>
        ) : (
          <button
            onClick={() => setShowPad(true)}
            className="flex items-center gap-2.5 text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <PenLine className="w-4 h-4" />
            </span>
            Click to sign
          </button>
        )}

        <div className="mt-4 h-px w-48 bg-neutral-300 dark:bg-neutral-600" />
        <p className="text-xs text-neutral-400 mt-1.5 capitalize">
          {block.signerRole} signature
        </p>
      </div>

      {showPad && (
        <SignaturePad
          label={block.label}
          onConfirm={(dataUrl) => {
            onSign(dataUrl);
            setShowPad(false);
          }}
          onCancel={() => setShowPad(false)}
        />
      )}
    </>
  );
}

function DateFieldBlock({
  block,
  value,
  onChange,
}: {
  block: Extract<Block, { type: 'dateField' }>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
        {block.label}
      </label>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export interface ProposalViewerProps {
  data: ProposalData;
}

export function ProposalViewer({ data }: ProposalViewerProps) {
  const [activeSection, setActiveSection] = useState<string>(
    data.content.sections[0]?.id ?? ''
  );
  // signerRole -> dataUrl (null = not signed)
  const [signatures, setSignatures] = useState<Record<string, string>>({});
  const [signDate, setSignDate] = useState('');

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const mainScrollRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = mainScrollRef.current;
    const observers: IntersectionObserver[] = [];
    data.content.sections.forEach((section) => {
      const el = sectionRefs.current[section.id];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(section.id);
        },
        { root, threshold: 0, rootMargin: '0px 0px -70% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [data.content.sections]);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToSignOff = () => {
    const last = data.content.sections.at(-1);
    if (last) scrollToSection(last.id);
  };

  const signatureBlocks = data.content.sections
    .flatMap((s) => s.blocks)
    .filter((b): b is Extract<Block, { type: 'signature' }> => b.type === 'signature');

  const allSigned =
    signatureBlocks.length > 0 && signatureBlocks.every((b) => !!signatures[b.signerRole]);

  function renderBlock(block: Block) {
    switch (block.type) {
      case 'heading':
        return <HeadingBlock block={block} />;
      case 'paragraph':
        return <ParagraphBlock block={block} />;
      case 'quote':
        return <QuoteBlock block={block} />;
      case 'list':
        return <ListBlock block={block} />;
      case 'table':
        return <TableBlock block={block} />;
      case 'pricing':
        return <PricingBlock block={block} />;
      case 'signature':
        return (
          <SignatureBlock
            block={block}
            signatureDataUrl={signatures[block.signerRole] ?? null}
            onSign={(dataUrl) =>
              setSignatures((prev) => ({ ...prev, [block.signerRole]: dataUrl }))
            }
          />
        );
      case 'dateField':
        return <DateFieldBlock block={block} value={signDate} onChange={setSignDate} />;
    }
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-neutral-100 dark:bg-neutral-950">
      {/* ── Header ── */}
      <header className="flex-none bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 h-14 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-blue-600 dark:text-blue-400 text-lg">
            Drafton
          </Link>
          <div className="hidden sm:block h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
          <p className="hidden sm:block text-sm text-neutral-500 dark:text-neutral-400 max-w-xs truncate">
            {data.title}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-1.5">
            <Download className="w-3.5 h-3.5" />
            Download PDF
          </Button>
          <Button
            size="sm"
            onClick={scrollToSignOff}
            className="gap-1.5 bg-blue-600 hover:bg-blue-700 text-white border-0"
          >
            <FileSignature className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Review & Sign</span>
            <span className="sm:hidden">Sign</span>
          </Button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 min-h-0">
        {/* Left TOC — xl only */}
        <aside className="hidden xl:flex flex-col w-52 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-y-auto">
          <div className="p-4 pt-5">
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-3 px-2">
              Contents
            </p>
            <nav className="space-y-0.5">
              {data.content.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    'w-full text-left text-sm px-2.5 py-2 rounded-md transition-colors',
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                  )}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Scrollable main */}
        <main ref={mainScrollRef} className="flex-1 min-w-0 overflow-y-auto">
          <div className="max-w-5xl mx-auto flex flex-col xl:flex-row gap-5 p-4 sm:p-8">
            {/* ── Document paper ── */}
            <div className="flex-1 min-w-0">
              <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                <div className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 px-6 py-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Proposal Document
                  </span>
                  <span className="text-xs text-neutral-400">
                    {formatDate(data.created_at)}
                  </span>
                </div>

                <div className="p-8 sm:p-12">
                  {data.content.sections.map((section, sIdx) => (
                    <section
                      key={section.id}
                      ref={(el) => {
                        sectionRefs.current[section.id] = el;
                      }}
                      className={cn(
                        sIdx > 0 &&
                          'mt-10 pt-10 border-t border-neutral-100 dark:border-neutral-800'
                      )}
                    >
                      <div className="space-y-4">
                        {section.blocks.map((block, bIdx) => (
                          <div key={bIdx}>{renderBlock(block)}</div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right sidebar ── */}
            <aside className="w-full xl:w-72 shrink-0 flex flex-col gap-4 xl:sticky xl:top-8 xl:self-start">
              {/* Proposal details */}
              <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-5">
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-4">
                  Proposal Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-1.5">
                      Status
                    </p>
                    {allSigned ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800/50">
                        <CheckCircle2 className="w-3 h-3" />
                        Signed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Pending Signature
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-1">
                      Sent
                    </p>
                    <p className="text-xs text-neutral-500">{formatDate(data.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Mobile section jump */}
              <div className="xl:hidden bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-4">
                <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mb-2.5">
                  Jump to
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {data.content.sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="text-xs px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="relative overflow-hidden rounded-xl bg-blue-950 border border-blue-900 p-5 text-white">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-600 blur-2xl opacity-20" />
                <h3 className="relative z-10 font-semibold text-base mb-1">
                  {allSigned ? 'Document signed!' : 'Ready to proceed?'}
                </h3>
                <p className="relative z-10 text-xs text-blue-200 mb-4 leading-relaxed">
                  {allSigned
                    ? 'Both parties have signed. Download your copy.'
                    : 'Review the document carefully and sign digitally to lock in the agreement.'}
                </p>
                {allSigned ? (
                  <Button className="relative z-10 w-full bg-green-600 hover:bg-green-500 text-white border-0 gap-1.5">
                    <Download className="w-4 h-4" />
                    Download Signed Copy
                  </Button>
                ) : (
                  <Button
                    onClick={scrollToSignOff}
                    className="relative z-10 w-full bg-blue-600 hover:bg-blue-500 text-white border-0"
                  >
                    Sign Document
                  </Button>
                )}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
