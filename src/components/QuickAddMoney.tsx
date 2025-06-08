
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddTransaction } from "@/hooks/useTransactions";

const quickAmounts = [10, 25, 50, 100, 500];

export function QuickAddMoney() {
  const addTransaction = useAddTransaction();

  const handleQuickAdd = (amount: number) => {
    addTransaction.mutate({
      amount,
      description: `Quick deposit - $${amount}`,
      category: "Income",
      type: "income",
    });
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
        <h3 className="font-semibold text-green-800 dark:text-green-200">Quick Add Money</h3>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {quickAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdd(amount)}
            disabled={addTransaction.isPending}
            className="bg-white dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-950/50 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300"
          >
            ${amount}
          </Button>
        ))}
      </div>
    </div>
  );
}
