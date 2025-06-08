
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Wallet, CreditCard, Target } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { useGoals } from "@/hooks/useGoals";
import { useMemo } from "react";

export const DashboardOverview = () => {
  const { data: transactions = [] } = useTransactions();
  const { data: goals = [] } = useGoals();

  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = transactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + Number(t.amount) : sum - Number(t.amount);
    }, 0);

    const totalGoalsTarget = goals.reduce((sum, g) => sum + Number(g.target_amount), 0);
    const totalGoalsCurrent = goals.reduce((sum, g) => sum + Number(g.current_amount), 0);
    const goalsProgress = totalGoalsTarget > 0 ? (totalGoalsCurrent / totalGoalsTarget) * 100 : 0;

    return {
      balance,
      monthlyIncome: totalIncome,
      monthlyExpenses: totalExpenses,
      goalsProgress,
    };
  }, [transactions, goals]);

  const overviewData = [
    {
      title: "Total Balance",
      value: `$${stats.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: stats.balance >= 0 ? "Positive" : "Negative",
      changeType: stats.balance >= 0 ? "positive" : "negative",
      icon: Wallet,
      description: "Available balance"
    },
    {
      title: "Monthly Income",
      value: `$${stats.monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: "+100%",
      changeType: "positive",
      icon: DollarSign,
      description: "This month's earnings"
    },
    {
      title: "Monthly Expenses",
      value: `$${stats.monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: "Tracked",
      changeType: "neutral",
      icon: CreditCard,
      description: "This month's spending"
    },
    {
      title: "Goals Progress",
      value: `${stats.goalsProgress.toFixed(1)}%`,
      change: `${goals.length} active`,
      changeType: "neutral",
      icon: Target,
      description: "Overall progress"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewData.map((item, index) => (
        <Card key={index} className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs font-medium ${
                  item.changeType === "positive"
                    ? "text-green-600 dark:text-green-400"
                    : item.changeType === "negative"
                    ? "text-red-600 dark:text-red-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {item.change}
              </span>
              <span className="text-xs text-muted-foreground">{item.description}</span>
            </div>
          </CardContent>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/50 to-primary opacity-50"></div>
        </Card>
      ))}
    </div>
  );
};
