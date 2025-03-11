import { useApp } from "@/stores/useApp";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Crown, Medal } from "lucide-react";
import { Link } from "react-router-dom";

function Leaderboard() {
  const { fetchLeaderboard } = useApp();
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    staleTime: 12000,
  });

  if (isLoading) return <Skeleton className="h-40 w-full" />;

  return (
    <div className=" p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Top Talent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data?.map((user, index) => (
              <Link
                key={user.id}
                to={`/user/${user?.id}`}
                className={`flex items-center justify-between px-4 py-2 border 
                  ${index === 0 ? "border-[#18cb96]" : 
                    index === 1 ? "border-[#18cb96]" : 
                    index === 2 ? "border-[#18cb96]" : ""}`}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{user.firstName[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-medium">{user.firstName} {user.lastName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {index === 0 && <Crown className="w-5 h-5 text-yellow-500" />}
                  {index === 1 && <Medal className="w-5 h-5 text-gray-500" />}
                  {index === 2 && <Medal className="w-5 h-5 text-orange-500" />}
                  <span className="font-semibold text-xl">{user.points} pts</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Leaderboard;
