
import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SearchAndFilterProps {
  onSearch: (term: string) => void;
  onFilter: (filters: { category?: string; type?: string; dateRange?: string }) => void;
  searchTerm: string;
  activeFilters: { category?: string; type?: string; dateRange?: string };
}

export function SearchAndFilter({ onSearch, onFilter, searchTerm, activeFilters }: SearchAndFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["Housing", "Food", "Transportation", "Entertainment", "Shopping", "Utilities", "Healthcare", "Education", "Other"];
  const dateRanges = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" },
  ];

  const clearFilter = (filterType: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterType as keyof typeof newFilters];
    onFilter(newFilters);
  };

  const clearAllFilters = () => {
    onFilter({});
    onSearch("");
  };

  const activeFilterCount = Object.keys(activeFilters).length + (searchTerm ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border rounded-lg bg-card">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={activeFilters.category || ""}
              onValueChange={(value) => onFilter({ ...activeFilters, category: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <Select
              value={activeFilters.type || ""}
              onValueChange={(value) => onFilter({ ...activeFilters, type: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select
              value={activeFilters.dateRange || ""}
              onValueChange={(value) => onFilter({ ...activeFilters, dateRange: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All time</SelectItem>
                {dateRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {(activeFilterCount > 0) && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => onSearch("")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {Object.entries(activeFilters).map(([key, value]) => (
            <Badge key={key} variant="secondary" className="gap-1">
              {key}: {value}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => clearFilter(key)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
