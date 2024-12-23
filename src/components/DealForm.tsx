import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Deal {
  id: string;
  name: string;
  price: number;
  retailer: string;
  link: string;
}

interface DealFormProps {
  onSubmit: (deal: Omit<Deal, "id">) => void;
  initialDeal?: Deal;
  trigger?: React.ReactNode;
}

export const DealForm = ({ onSubmit, initialDeal, trigger }: DealFormProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: initialDeal?.name || "",
    price: initialDeal?.price || "",
    retailer: initialDeal?.retailer || "",
    link: initialDeal?.link || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.retailer || !formData.link) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      name: formData.name,
      price: Number(formData.price),
      retailer: formData.retailer,
      link: formData.link,
    });
    setOpen(false);
    setFormData({
      name: "",
      price: "",
      retailer: "",
      link: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Deal
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialDeal ? "Edit Deal" : "Add New Deal"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Enter price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="retailer">Retailer</Label>
            <Input
              id="retailer"
              value={formData.retailer}
              onChange={(e) => setFormData({ ...formData, retailer: e.target.value })}
              placeholder="Enter retailer name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Deal Link</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="Enter deal URL"
            />
          </div>
          <Button type="submit" className="w-full">
            {initialDeal ? "Update Deal" : "Add Deal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};