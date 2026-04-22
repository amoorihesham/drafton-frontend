export type Block =
  | { type: 'heading'; text: string; level: 1 | 2 | 3 }
  | { type: 'paragraph'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; items: string[]; style: 'bullet' | 'number' }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | {
      type: 'pricing';
      items: { qty: number; name: string; unitPrice: number }[];
      currency: string;
    }
  | { type: 'signature'; label: string; signerRole: string }
  | { type: 'dateField'; label: string };

export interface ProposalSection {
  id: string;
  title: string;
  blocks: Block[];
}

export interface ProposalData {
  id: string;
  title: string;
  status: string;
  prompt?: string;
  content: {
    sections: ProposalSection[];
  };
  model?: string;
  created_at: string;
  updated_at: string;
}
