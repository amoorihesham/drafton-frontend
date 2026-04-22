import { handleError } from "@/lib/errors/handling";
import { proposalService } from "@/services/proposal.service";
import { ApiResponse } from "@/types";

import { ProposalData } from "@/types/proposal.types";

export const getProposalById = async (id: string): Promise<ApiResponse<ProposalData>> => {
  try {
    const response = await proposalService.getById(id);
    return response;
  } catch (error) {
    return handleError(error);
  }
};
