
import { DashboardOverview } from "@/components/DashboardOverview";
import { ExpenseChart } from "@/components/ExpenseChart";
import { BudgetProgress } from "@/components/BudgetProgress";
import { RecentTransactions } from "@/components/RecentTransactions";
import { FinancialInsights } from "@/components/FinancialInsights";
import { GoalsSection } from "@/components/GoalsSection";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { QuickAddMoney } from "@/components/QuickAddMoney";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Financial Dashboard</h1>
              <p className="text-sm text-muted-foreground">Track your finances with ease</p>
            </div>
            <div className="flex items-center gap-4">
              <AddTransactionDialog />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Add Money */}
        <QuickAddMoney />

        {/* Overview Cards */}
        <DashboardOverview />

        {/* Charts and Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart />
          <BudgetProgress />
        </div>

        {/* Goals Section */}
        <GoalsSection />

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
