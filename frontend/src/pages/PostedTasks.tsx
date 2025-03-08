import { useState } from "react";
import { taskType } from "@/lib/types";
import { useApp } from "@/stores/useApp";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink, Trash, Trophy } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { rewardOptions } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";

const PostedTask = ({ task }: { task: taskType }) => {
    const { updateTaskStatus, deleteTask, user } = useApp();

    const [showFullDescription, setShowFullDescription] = useState(false);
    const [status, setStatus] = useState(task?.status);
    const rewardLabel =
        rewardOptions.find((reward) => reward.value === task.reward)?.label ||
        "No reward";
    const queryClient = useQueryClient()
    const toggleDescription = () => setShowFullDescription(!showFullDescription);
    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === status) return;
        await updateTaskStatus(newStatus, task?.id)
        setStatus(newStatus)

    }

    const handleDeleteTask = async () => {
        if (task?.id) {
            await deleteTask(task.id);
            queryClient.invalidateQueries({ queryKey: ["posted-tasks", user?.id] })
        }
    }

    return (
        <Card className="w-full cursor-pointer">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="w-4 h-4" />
                        <span>
                            Posted{" "}
                            {formatDistanceToNow(new Date(task.createdAt), {
                                addSuffix: true,
                            })}
                        </span>
                    </div>
                    <div className="w-50">

                        <Select value={status} onValueChange={handleStatusChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>

                        </Select>
                    </div>
                </div>
                <Link to={`/task/${task?.id}`} className="hover:underline">
                    <CardTitle className="text-xl font-semibold">
                        {task.title}
                    </CardTitle>
                </Link>
            </CardHeader>

            <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed m-0">
                    {showFullDescription
                        ? task.description
                        : `${task.description.slice(0, 200)}...`}
                </p>
                {task.description.length > 50 && (
                    <Button variant="link" className="p-0 text-blue-500 underline" onClick={toggleDescription}>
                        {showFullDescription ? "Show Less" : "Show More"}
                    </Button>
                )}

                <div className="flex flex-wrap gap-2">
                    {task.skills.map((skill, index) => (
                        <Badge key={index}>{skill}</Badge>
                    ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400">Reward: </span>{" "}
                        <span>{rewardLabel}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link to={`/task/${task?.id}/submissions`}>
                   
                    <Button>
                        <ExternalLink /> View Submissions
                    </Button>
                    </Link>
                    <Button variant={"outline"} className="text-red-500" onClick={handleDeleteTask}>
                        <Trash />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

function PostedTasks() {
    const { user, fetchPostedTasks } = useApp();
    const { data } = useQuery({
        queryKey: ["posted-tasks", user?.id],
        queryFn: async () => await fetchPostedTasks(),
        staleTime: 120000,
    });

    const tasks = data ?? [];

    return (
        <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold">Your Posted Tasks</h2>

            {tasks?.length > 0 ? (
                <div className="space-y-4">
                    {tasks?.map((task: taskType) => (
                        <PostedTask task={task} key={task.id} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm">
                    You haven't posted any tasks yet.
                </p>
            )}
        </div>
    );
}

export default PostedTasks;
