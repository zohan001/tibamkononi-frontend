export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: 'medicine' | 'funding' | 'inspection' | 'alert' | 'general';
  severity: 'info' | 'warning' | 'critical';
  pinned: boolean;
  author: string;
  authorRole: string;
  targetedHospitals: TargetedHospital[];
  attachments?: Attachment[];
  createdAt: string;
}

export interface TargetedHospital {
  name: string;
  allocation?: string;
}

export interface Attachment {
  name: string;
  url: string;
  size: string;
}

export interface WatchlistItem {
  hospitalName: string;
  hospitalSlug: string;
  score: number;
  severity: 'critical' | 'warning' | 'normal';
  summary: string;
}

export interface FundingAllocation {
  hospitalName: string;
  amount: number;
  percentage: number;
}
