'use client';

import { FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HospitalApprovalCardProps {
  hospital: {
    name: string;
    slug: string;
    type: string;
    dateApplied: string;
    documents: string[];
  };
  onApprove?: (slug: string) => void;
  onReject?: (slug: string) => void;
}

export function HospitalApprovalCard({ hospital, onApprove, onReject }: HospitalApprovalCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{hospital.name}</CardTitle>
          <Badge variant="secondary">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="font-medium">{hospital.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Applied</p>
            <p className="font-medium">{hospital.dateApplied}</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Documents</p>
          <div className="space-y-1.5">
            {hospital.documents.map((doc) => (
              <div key={doc} className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{doc}</span>
                <CheckCircle className="ml-auto h-4 w-4 text-green-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="default"
            className="flex-1"
            onClick={() => onApprove?.(hospital.slug)}
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => onReject?.(hospital.slug)}
          >
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
