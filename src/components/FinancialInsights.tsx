
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartBar, ChartPie } from "lucide-react";

export const FinancialInsights = () => {
  const insights = [
    {
      title: "Spending Alert",
      description: "You've spent 15% more on food this month compared to last month.",
      type: "warning",
      icon: ChartBar,
      action: "Review food expenses"
    },
    {
      title: "Savings Goal",
      description: "You're on track to reach your savings goal 2 months early!",
      type: "success",
      icon: ChartPie,
      action: "Keep it up"
    },
    {
      title: "Budget Tip",
      description: "Consider setting up automatic transfers to boost your emergency fund.",
      type: "info",
      icon: ChartBar,
      action: "Set up auto-save"
    }
  ];

  const getInsightStyle = (type: string) => {
    switch (type) {
      case "warning":
        return {
          badge: "bg-yellow-100 text-yellow-800",
          border: "border-l-yellow-500"
        };
      case "success":
        return {
          badge: "bg-green-100 text-green-800",
          border: "border-l-green-500"
        };
      case "info":
        return {
          badge: "bg-blue-100 text-blue-800",
          border: "border-l-blue-500"
        };
      default:
        return {
          badge: "bg-gray-100 text-gray-800",
          border: "border-l-gray-500"
        };
    }
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <CardTitle>Financial Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight, index) => {
          const style = getInsightStyle(insight.type);
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-l-4 bg-card/50 ${style.border} transition-all duration-200 hover:shadow-sm`}
            >
              <div className="flex items-start gap-3">
                <insight.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                    <Badge variant="secondary" className={style.badge}>
                      {insight.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                  <button className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                    {insight.action} →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Quick Stats */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
          <h4 className="font-medium text-sm mb-3">Quick Stats</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average daily spending</span>
              <span className="font-medium">$94.91</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Most expensive category</span>
              <span className="font-medium">Housing</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days until payday</span>
              <span className="font-medium">12 days</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
