
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const useTransactions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('transactions-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['transactions'] });
          queryClient.invalidateQueries({ queryKey: ['budgets'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAddTransaction = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: {
      amount: number;
      description: string;
      category: string;
      type: 'income' | 'expense';
      date?: string;
    }) => {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      toast({
        title: "Success",
        description: "Transaction added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add transaction",
        variant: "destructive",
      });
      console.error('Transaction error:', error);
    },
  });
};
