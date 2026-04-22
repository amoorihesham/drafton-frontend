import { notFound } from "next/navigation";
import { ProposalViewer } from "./_components/ProposalViewer";
import { proposalService } from "@/services/proposal.service";

export default async function PublicProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await proposalService.getById(id);
  console.log(result);

  if (!result.success) return notFound();

  return <ProposalViewer data={result.data} />;
}
