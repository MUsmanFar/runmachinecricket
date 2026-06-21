import { ArrowLeft, Clock, ShieldCheck, Milestone } from "lucide-react";
import { LegalPageData } from "../types";

interface LegalPageLayoutProps {
  page: LegalPageData;
  onBack: () => void;
}

export default function LegalPageLayout({ page, onBack }: LegalPageLayoutProps) {
  
  // A clean helper to break paragraphs into beautiful spacing
  const formattedContent = page.content.split("\n\n").map((para, index) => {
    if (para.startsWith("###")) {
      return (
        <h3 key={index} className="text-sm sm:text-base font-black text-brand-black uppercase tracking-widest font-sans mt-8 mb-4 border-b border-gray-100 pb-2">
          {para.replace("###", "").trim()}
        </h3>
      );
    }
    return (
      <p key={index} className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans mb-5">
        {para}
      </p>
    );
  });

  return (
    <div className="bg-white py-12 md:py-20 border-b border-gray-50 animate-fade-in">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-black tracking-widest text-gray-400 hover:text-brand-red uppercase transition-all mb-10 cursor-pointer"
          id="legal-back-button"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home Base</span>
        </button>

        {/* Legal Paper Heading */}
        <div className="space-y-4 border-b pb-8 mb-10">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-brand-red font-black uppercase bg-brand-red/10 px-3 py-1.5 rounded-xl inline-block border border-brand-red/10 animate-pulse">
            <ShieldCheck className="h-4 w-4 inline mr-1" />
            <span>Workshop Policy Charter</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">
            {page.title}
          </h1>

          <div className="flex items-center space-x-4 text-[10px] text-gray-400 font-mono uppercase tracking-wider">
            <span className="flex items-center space-x-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Restoration Year: 2026</span>
            </span>
            {page.lastUpdated && (
              <>
                <span>•</span>
                <span>Last Revised: {page.lastUpdated}</span>
              </>
            )}
          </div>
        </div>

        {/* Prose Body */}
        <div className="max-w-none">
          {formattedContent}
        </div>

        {/* Trust Seal Banner */}
        <div className="mt-16 p-8 border rounded-3xl bg-brand-gray flex items-start space-x-4">
          <Milestone className="h-6 w-6 text-brand-red shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-black text-brand-black uppercase tracking-tight">Corporate Legal Conformity</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans mt-1">
              Run Machine Cricket operates in compliance with United Kingdom consumer guarantees, electronic communication charters, and GDPR security standards.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
