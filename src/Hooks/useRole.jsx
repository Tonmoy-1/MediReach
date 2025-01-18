import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const { data: role, isloading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
      return data.role;
    },
  });
  return [role, isloading];
};

export default useRole;
