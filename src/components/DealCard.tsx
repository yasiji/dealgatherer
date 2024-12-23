import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash2, Edit } from "lucide-react";

interface Deal {
  id: string;
  name: string;
  price: number;
  retailer: string;
  link: string;
}

interface DealCardProps {
  deal: Deal;
  onEdit: (deal: Deal) => void;
  onDelete: (id: string) => void;
}

export const DealCard = ({ deal, onEdit, onDelete }: DealCardProps) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg truncate flex-1">{deal.name}</h3>
        <div className="flex gap-2 ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(deal)}
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(deal.id)}
            className="h-8 w-8 text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{deal.retailer}</span>
          <span className="font-bold text-lg">${deal.price.toFixed(2)}</span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => window.open(deal.link, '_blank')}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Visit Deal
        </Button>
      </div>
    </Card>
  );
};