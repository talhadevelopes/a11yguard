import { useMembersQuery } from "../../queries/useMemberQueries";
import { useCreateMemberMutation, useUpdateMemberMutation, useDeleteMemberMutation } from "../../mutations/useMemberMutations";

export const useMemberQueries = () => {
  const membersQuery = useMembersQuery();
  const createMemberMutation = useCreateMemberMutation();
  const updateMemberMutation = useUpdateMemberMutation();
  const deleteMemberMutation = useDeleteMemberMutation();

  return {
    // Queries
    members: membersQuery.data || [],
    isLoading: membersQuery.isLoading,
    error: membersQuery.error?.message || "",

    // Mutations
    createMember: createMemberMutation.mutate,
    updateMember: updateMemberMutation.mutate,
    deleteMember: deleteMemberMutation.mutate,

    // Loading states
    isCreating: createMemberMutation.isPending,
    isUpdating: updateMemberMutation.isPending,
    isDeleting: deleteMemberMutation.isPending,
  };
};
