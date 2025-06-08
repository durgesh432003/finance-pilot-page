
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useGoals = () => {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useAddGoal = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goal: {
      title: string;
      target_amount: number;
      target_date?: string;
      description?: string;
    }) => {
      const { data, error } = await supabase
        .from('goals')
        .insert([goal])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      toast({
        title: "Success",
        description: "Goal added successfully",
      });
    },
  });
};
