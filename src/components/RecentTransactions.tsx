
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      description: "Grocery Store",
      amount: -89.32,
      date: "2024-06-05",
      category: "Food",
      type: "debit"
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 2500.00,
      date: "2024-06-01",
      category: "Income",
      type: "credit"
    },
    {
      id: 3,
      description: "Netflix Subscription",
      amount: -15.99,
      date: "2024-06-01",
      category: "Entertainment",
      type: "debit"
    },
    {
      id: 4,
      description: "Gas Station",
      amount: -45.20,
      date: "2024-05-30",
      category: "Transportation",
      type: "debit"
    },
    {
      id: 5,
      description: "Coffee Shop",
      amount: -12.50,
      date: "2024-05-30",
      category: "Food",
      type: "debit"
    },
    {
      id: 6,
      description: "Electric Bill",
      amount: -120.00,
      date: "2024-05-28",
      category: "Utilities",
      type: "debit"
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Food": "bg-green-100 text-green-800",
      "Income": "bg-blue-100 text-blue-800",
      "Entertainment": "bg-purple-100 text-purple-800",
      "Transportation": "bg-yellow-100 text-yellow-800",
      "Utilities": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Transactions
          <span className="text-sm font-normal text-muted-foreground">Last 7 days</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
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
                    transaction.amount > 0 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
