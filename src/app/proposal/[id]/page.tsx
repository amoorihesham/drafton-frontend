import { Button } from "@/components/ui/button";
import { Download, FileSignature } from "lucide-react";
import Link from "next/link";

export default async function PublicProposalPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  // Mock data for the proposal presentation
  const companyName = "Acme Corp";
  const senderName = "Jane Doe";
  
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex flex-col">
      {/* Top Header Navigation */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold text-lg text-blue-600 dark:text-blue-400">
            Drafton
          </Link>
          <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700 hidden sm:block"></div>
          <div className="text-sm text-neutral-500 hidden sm:block">
            Proposal from {senderName} ({companyName})
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button size="sm" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0">
            <FileSignature className="w-4 h-4" />
            Review & Sign
          </Button>
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1 flex justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl flex flex-col xl:flex-row gap-6">
          
          {/* Document Viewer Mock */}
          <div className="flex-1 bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden min-h-[800px] flex flex-col">
            <div className="bg-neutral-50 dark:bg-neutral-800/50 border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Document Viewer</span>
              <span className="text-xs text-neutral-400 bg-neutral-200 dark:bg-neutral-800 px-2 py-1 rounded">Page 1 of 5</span>
            </div>
            <div className="flex-1 p-8 sm:p-12 relative flex items-center justify-center bg-neutral-100/50 dark:bg-neutral-950/50">
               {/* PDF Rendering Mock */}
               <div className="w-full h-full max-w-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg flex flex-col items-center justify-center text-neutral-400 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm shadow-sm transition-all hover:bg-white dark:hover:bg-neutral-900">
                  <div className="mb-4 bg-white dark:bg-neutral-800 p-4 rounded-full shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-800">
                     <FileSignature className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">PDF Document Presentation</p>
                  <p className="text-sm mt-1">Proposal_{id}_Final.pdf</p>
                  
                  <div className="mt-8 text-xs text-neutral-400">
                    Powered by Drafton AI
                  </div>
               </div>
            </div>
          </div>
          
          {/* Sidebar Info */}
          <div className="w-full xl:w-80 flex flex-col gap-6">
            {/* Sender Info Card */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-800 p-6">
              <h3 className="font-semibold text-lg mb-5 border-b border-neutral-100 dark:border-neutral-800 pb-3">Proposal Details</h3>
              <div className="space-y-5">
                <div>
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Prepared by</div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">{senderName}</div>
                  <div className="text-sm text-neutral-500">{companyName}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Status</div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                    Pending Signature
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">Message</div>
                  <p className="text-sm italic text-neutral-600 dark:text-neutral-400 border-l-2 border-blue-400 dark:border-blue-600 pl-3 leading-relaxed">
                    &quot;Hi there, please review our proposal for the upcoming project scope. I&apos;ve used AI to ensure all your requirements are comprehensively covered. Let me know if you are ready to move forward!&quot;
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Card */}
            <div className="bg-blue-950 text-white rounded-lg shadow-sm p-6 relative overflow-hidden border border-blue-900">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-600 rounded-full blur-3xl opacity-20"></div>
              
              <h3 className="font-semibold text-lg mb-2 relative z-10">Ready to proceed?</h3>
              <p className="text-sm text-blue-200 mb-6 relative z-10">
                Review the document carefully and sign digitally to lock in the agreement.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-lg relative z-10">
                Sign Document
              </Button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
