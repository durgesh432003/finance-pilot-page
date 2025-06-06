
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const BudgetProgress = () => {
  const budgetData = [
    {
      category: "Housing",
      spent: 1200,
      budget: 1300,
      percentage: 92
    },
    {
      category: "Food",
      spent: 450,
      budget: 500,
      percentage: 90
    },
    {
      category: "Transportation",
      spent: 300,
      budget: 400,
      percentage: 75
    },
    {
      category: "Entertainment",
      spent: 200,
      budget: 250,
      percentage: 80
    },
    {
      category: "Shopping",
      spent: 180,
      budget: 300,
      percentage: 60
    }
  ];

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Budget Progress
          <span className="text-sm font-normal text-muted-foreground">This Month</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {budgetData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.category}</span>
              <span className="text-muted-foreground">
                ${item.spent} / ${item.budget}
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={item.percentage} 
                className="h-2"
              />
              <div 
                className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getProgressColor(item.percentage)}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{item.percentage}% used</span>
              <span>${item.budget - item.spent} remaining</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
