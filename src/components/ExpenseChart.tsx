
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useTransactions } from "@/hooks/useTransactions";
import { useMemo } from "react";

export const ExpenseChart = () => {
  const { data: transactions = [], isLoading } = useTransactions();

  const expenseData = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = transactions.filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' && 
             date.getMonth() === currentMonth && 
             date.getFullYear() === currentYear;
    });

    const categoryTotals = monthlyExpenses.reduce((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + Number(transaction.amount);
      return acc;
    }, {} as Record<string, number>);

    const colors = [
      "#8884d8", "#82ca9d", "#ffc658", "#ff7300", 
      "#0088fe", "#8dd1e1", "#ff6b6b", "#4ecdc4",
      "#45b7d1", "#96ceb4", "#ffeaa7", "#dda0dd"
    ];

    return Object.entries(categoryTotals)
      .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length]
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading chart...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Expense Breakdown
          <span className="text-sm font-normal text-muted-foreground">This Month</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expenseData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No expense data for this month
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: entry.color }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
