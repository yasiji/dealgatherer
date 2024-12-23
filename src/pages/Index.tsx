import { useState, useEffect } from "react";
import { DealCard } from "@/components/DealCard";
import { DealForm } from "@/components/DealForm";
import { SearchFilters } from "@/components/SearchFilters";
import { dealStorage } from "@/utils/dealStorage";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface Deal {
  id: string;
  name: string;
  price: number;
  retailer: string;
  link: string;
}

const Index = () => {
  const { toast } = useToast();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);

  useEffect(() => {
    const loadedDeals = dealStorage.getDeals();
    setDeals(loadedDeals);
    if (loadedDeals.length > 0) {
      const maxPrice = Math.max(...loadedDeals.map((deal) => deal.price));
      setPriceRange([0, maxPrice]);
    }
  }, []);

  const handleAddDeal = (newDeal: Omit<Deal, "id">) => {
    try {
      const deal = dealStorage.saveDeal(newDeal);
      setDeals([...deals, deal]);
      toast({
        title: "Success",
        description: "Deal added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add deal",
        variant: "destructive",
      });
    }
  };

  const handleUpdateDeal = (updatedDeal: Omit<Deal, "id">) => {
    if (!editingDeal) return;
    try {
      const deal = dealStorage.updateDeal(editingDeal.id, updatedDeal);
      setDeals(deals.map((d) => (d.id === editingDeal.id ? deal : d)));
      setEditingDeal(null);
      toast({
        title: "Success",
        description: "Deal updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update deal",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDeal = (id: string) => {
    try {
      dealStorage.deleteDeal(id);
      setDeals(deals.filter((deal) => deal.id !== id));
      toast({
        title: "Success",
        description: "Deal deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete deal",
        variant: "destructive",
      });
    }
  };

  const filteredDeals = deals.filter(
    (deal) =>
      (deal.name.toLowerCase().includes(search.toLowerCase()) ||
        deal.retailer.toLowerCase().includes(search.toLowerCase())) &&
      deal.price >= priceRange[0] &&
      deal.price <= priceRange[1]
  );

  const maxPrice = Math.max(...deals.map((deal) => deal.price), 1000);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">Deals Tracker</h1>
            <DealForm onSubmit={handleAddDeal} />
          </div>

          <SearchFilters
            search={search}
            onSearchChange={setSearch}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            maxPrice={maxPrice}
          />

          {editingDeal && (
            <DealForm
              initialDeal={editingDeal}
              onSubmit={handleUpdateDeal}
              trigger={
                <Button variant="outline" onClick={() => setEditingDeal(null)}>
                  Cancel Edit
                </Button>
              }
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onEdit={setEditingDeal}
                onDelete={handleDeleteDeal}
              />
            ))}
          </div>

          {filteredDeals.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No deals found. Try adjusting your filters or add a new deal.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;