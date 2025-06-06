
import { DashboardOverview } from "@/components/DashboardOverview";
import { ExpenseChart } from "@/components/ExpenseChart";
import { BudgetProgress } from "@/components/BudgetProgress";
import { RecentTransactions } from "@/components/RecentTransactions";
import { FinancialInsights } from "@/components/FinancialInsights";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Financial Dashboard</h1>
              <p className="text-sm text-muted-foreground">Track your finances with ease</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last updated</p>
              <p className="text-sm font-medium">2 minutes ago</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Overview Cards */}
        <DashboardOverview />

        {/* Charts and Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart />
          <BudgetProgress />
        </div>

        {/* Transactions and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentTransactions />
          </div>
          <div>
            <FinancialInsights />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
