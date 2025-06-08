
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTransactions } from "@/hooks/useTransactions";
import { SearchAndFilter } from "./SearchAndFilter";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const RecentTransactions = () => {
  const { data: transactions = [], isLoading } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ category?: string; type?: string; dateRange?: string }>({});

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    // Date range filter
    if (filters.dateRange) {
      const now = new Date();
      const startDate = new Date();
      
      switch (filters.dateRange) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          startDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter(t => new Date(t.date) >= startDate);
    }

    return filtered.slice(0, 10); // Show latest 10
  }, [transactions, searchTerm, filters]);

  const exportTransactions = () => {
    const csv = [
      ['Date', 'Description', 'Category', 'Type', 'Amount'].join(','),
      ...filteredTransactions.map(t => [
        t.date,
        `"${t.description}"`,
        t.category,
        t.type,
        t.amount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Food": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Income": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Entertainment": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Transportation": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      "Utilities": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Housing": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "Shopping": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      "Healthcare": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="outline" size="sm" onClick={exportTransactions} className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
        <SearchAndFilter
          onSearch={setSearchTerm}
          onFilter={setFilters}
          searchTerm={searchTerm}
          activeFilters={filters}
        />
      </CardHeader>
      <CardContent>
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {transactions.length === 0 ? "No transactions yet. Add your first transaction!" : "No transactions match your filters."}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className={getCategoryColor(transaction.category)}>
                          {transaction.category}
                        </Badge>
                        <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                          {transaction.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(transaction.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span 
                    className={`font-semibold ${
                      transaction.type === 'income' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}${Number(transaction.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
