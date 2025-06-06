
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Wallet, CreditCard } from "lucide-react";

export const DashboardOverview = () => {
  const overviewData = [
    {
      title: "Total Balance",
      value: "$12,543.89",
      change: "+2.5%",
      changeType: "positive",
      icon: Wallet,
      description: "Available balance"
    },
    {
      title: "Monthly Income",
      value: "$4,250.00",
      change: "+8.2%",
      changeType: "positive",
      icon: DollarSign,
      description: "This month's earnings"
    },
    {
      title: "Monthly Expenses",
      value: "$2,847.32",
      change: "-3.1%",
      changeType: "negative",
      icon: CreditCard,
      description: "This month's spending"
    },
    {
      title: "Savings Goal",
      value: "$8,500.00",
      change: "68% complete",
      changeType: "neutral",
      icon: DollarSign,
      description: "Target: $12,500"
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
                    ? "text-green-600"
                    : item.changeType === "negative"
                    ? "text-red-600"
                    : "text-blue-600"
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
