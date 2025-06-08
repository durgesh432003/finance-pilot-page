
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, Target } from "lucide-react";
import { useGoals, useAddGoal } from "@/hooks/useGoals";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function GoalsSection() {
  const { data: goals = [], isLoading } = useGoals();
  const addGoal = useAddGoal();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !targetAmount) return;

    addGoal.mutate({
      title,
      target_amount: parseFloat(targetAmount),
      target_date: targetDate || undefined,
      description: description || undefined,
    });

    // Reset form
    setTitle("");
    setTargetAmount("");
    setTargetDate("");
    setDescription("");
    setOpen(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Financial Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Financial Goals
          </CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    placeholder="Emergency Fund"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount</Label>
                  <Input
                    id="target-amount"
                    type="number"
                    step="0.01"
                    placeholder="10000"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-date">Target Date (Optional)</Label>
                  <Input
                    id="target-date"
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Input
                    id="description"
                    placeholder="Save for 6 months of expenses"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={addGoal.isPending}>
                    {addGoal.isPending ? "Creating..." : "Create Goal"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No goals yet. Create your first financial goal!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {goals.map((goal) => {
              const progress = goal.target_amount > 0 ? (Number(goal.current_amount) / Number(goal.target_amount)) * 100 : 0;
              const remaining = Number(goal.target_amount) - Number(goal.current_amount);
              
              return (
                <div key={goal.id} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{goal.title}</h4>
                      {goal.description && (
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      )}
                    </div>
                    <div className="text-right text-sm">
                      <div className="font-medium">
                        ${Number(goal.current_amount).toFixed(2)} / ${Number(goal.target_amount).toFixed(2)}
                      </div>
                      {goal.target_date && (
                        <div className="text-muted-foreground">
                          Due: {new Date(goal.target_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Progress value={progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{progress.toFixed(1)}% complete</span>
                      <span>${remaining.toFixed(2)} remaining</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
