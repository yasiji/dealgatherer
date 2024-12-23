import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface SearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  maxPrice: number;
}

export const SearchFilters = ({
  search,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
}: SearchFiltersProps) => {
  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search">Search Deals</Label>
        <Input
          id="search"
          placeholder="Search by product name or retailer..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Price Range: ${priceRange[0]} - ${priceRange[1]}</Label>
        <Slider
          min={0}
          max={maxPrice}
          step={1}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          className="mt-2"
        />
      </div>
    </Card>
  );
};