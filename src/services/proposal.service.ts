import { http } from "@/lib/api-client";
import { ApiResponse } from "@/types";
import type { ProposalData } from "@/types/proposal.types";

export const proposalService = {
  getById(id: string): Promise<ApiResponse<ProposalData>> {
    return http.get<ApiResponse<ProposalData>>(`/proposals/${id}`);
  },
};
