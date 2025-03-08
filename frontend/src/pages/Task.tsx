import { useApp } from "@/stores/useApp";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { CalendarDays, Flag, Star, Trophy } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { rewardOptions } from "@/lib/utils";
import { useEffect } from "react";

function Task() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchTask, user } = useApp();
  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      if (!id) return;
      return await fetchTask(id);
    },
    staleTime: 12000,
  });

  const rewardLabel =
    rewardOptions.find((reward) => reward.value === task?.reward)?.label ||
    "No reward";

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="px-16 py-10 flex gap-8">
      <div className="pr-8 w-3/4">
        <Card className="shadow-md">
          <CardHeader className="border-b py-4">
            <CardTitle className="text-2xl font-semibold">
              {isLoading ? <Skeleton className="h-6 w-48" /> : task?.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="w-4 h-4" />
              {isLoading || !task?.createdAt ? (
                <Skeleton className="h-4 w-32" />
              ) : (
                <span>
                  Posted{" "}
                  {formatDistanceToNow(new Date(task?.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <Badge
                className={
                  task?.status === "open" ? "bg-[#18cb96]" : "bg-red-500"
                }
              >
                {task?.status}
              </Badge>
            )}
          </CardHeader>

          <CardContent>
            <div className="border-b py-4">
              {isLoading ? (
                <Skeleton className="h-20 w-full" />
              ) : (
                <p className="leading-relaxed">{task?.description}</p>
              )}
            </div>

            <div className="border-b py-4 flex flex-col gap-2">
              <h1 className="text-lg font-semibold text-foreground">
                Skills and Expertise
              </h1>
              <div className="flex flex-wrap gap-2">
                {isLoading ? (
                  <Skeleton className="h-6 w-32" />
                ) : (
                  task?.skills?.map((skill, index) => (
                    <Badge key={index}>{skill}</Badge>
                  ))
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 py-4 bg-card rounded-lg shadow-md">
              <h1 className="text-lg font-semibold text-foreground">
                Reward on this task
              </h1>
              <ul className="space-y-2 mt-2">
                <li className="flex items-center gap-2 text-primary">
                  <Trophy className="w-5 h-5 text-[#18cb96]" />
                  {isLoading ? (
                    <Skeleton className="h-6 w-20" />
                  ) : (
                    <span className="font-medium">{rewardLabel}</span>
                  )}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-1/4">
        <Card className="border rounded-lg">
          <CardHeader className="border-b pb-5">
            <p className="text-lg font-semibold flex items-center gap-2">
              About the Client
            </p>
          </CardHeader>

          <CardContent className="px-4 flex flex-col gap-2">
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Link
                className="flex items-center gap-2 cursor-pointer"
                to={`/user/${task?.clientId}`}
              >
                <Avatar className="cursor-pointer w-10 h-10">
                  <AvatarFallback>
                    {task?.client?.firstName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {task?.client?.firstName} {task?.client?.lastName}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {task?.client?.email}
                  </span>
                </div>
              </Link>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 justify-center my-5">
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : task?.status === "open" ? (
            <Button
              className="w-full"
              onClick={() => navigate(`/task/${task?.id}/submit`)}
            >
              Submit Now
            </Button>
          ) : (
            <Button variant="destructive">Submissions Closed</Button>
          )}
        </div>

        <div className="text-red-500 flex gap-2 cursor-pointer">
          <Flag /> Flag as inappropriate
        </div>
      </div>
    </div>
  );
}

export default Task;
