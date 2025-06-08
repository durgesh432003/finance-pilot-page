
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Edit, AlertTriangle } from "lucide-react";
import { useBudgets, useUpdateBudget } from "@/hooks/useBudgets";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const BudgetProgress = () => {
  const { data: budgets = [], isLoading } = useBudgets();
  const updateBudget = useUpdateBudget();
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");

  const handleEdit = (budget: any) => {
    setEditingId(budget.id);
    setEditAmount(budget.budget_amount.toString());
  };

  const handleSave = async (id: string) => {
    const amount = parseFloat(editAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    await updateBudget.mutateAsync({ id, budget_amount: amount });
    setEditingId(null);
    setEditAmount("");
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getBudgetAlert = (percentage: number) => {
    if (percentage >= 100) return "Over budget!";
    if (percentage >= 90) return "Near limit";
    if (percentage >= 75) return "75% used";
    return null;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-2 bg-muted rounded"></div>
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
        <CardTitle className="flex items-center justify-between">
          Budget Progress
          <span className="text-sm font-normal text-muted-foreground">This Month</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {budgets.map((budget) => {
          const percentage = budget.budget_amount > 0 ? (Number(budget.spent_amount) / Number(budget.budget_amount)) * 100 : 0;
          const alert = getBudgetAlert(percentage);
          const isEditing = editingId === budget.id;

          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{budget.category}</span>
                  {alert && (
                    <div className="flex items-center gap-1 text-xs">
                      <AlertTriangle className="h-3 w-3 text-yellow-500" />
                      <span className="text-yellow-600 dark:text-yellow-400">{alert}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">
                    ${Number(budget.spent_amount).toFixed(2)} / 
                    {isEditing ? (
                      <Input
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="inline-block w-20 h-6 mx-1 text-xs"
                        onBlur={() => handleSave(budget.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSave(budget.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        autoFocus
                      />
                    ) : (
                      <span>${Number(budget.budget_amount).toFixed(2)}</span>
                    )}
                  </span>
                  {!isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(budget)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className="h-2"
                />
                <div 
                  className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{percentage.toFixed(1)}% used</span>
                <span>
                  {Number(budget.budget_amount) - Number(budget.spent_amount) >= 0 
                    ? `$${(Number(budget.budget_amount) - Number(budget.spent_amount)).toFixed(2)} remaining`
                    : `$${(Number(budget.spent_amount) - Number(budget.budget_amount)).toFixed(2)} over budget`
                  }
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
