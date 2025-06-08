
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const useBudgets = () => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('budgets-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'budgets'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['budgets'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .order('category');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateBudget = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, budget_amount }: { id: string; budget_amount: number }) => {
      const { data, error } = await supabase
        .from('budgets')
        .update({ budget_amount })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast({
        title: "Success",
        description: "Budget updated successfully",
      });
    },
  });
};
