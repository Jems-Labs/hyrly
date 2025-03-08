import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { taskType } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { CalendarDays, Trophy, Link as LinkIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { rewardOptions } from "@/lib/utils";
import { toast } from "sonner";

function Task({ task }: { task: taskType }) {
    const [showFullDescription, setShowFullDescription] = useState(false)

    const rewardLabel =
        rewardOptions.find((reward) => reward.value === task.reward)?.label ||
        "No reward";

    const toggleDescription = () => setShowFullDescription((prev) => !prev);
    const truncatedDescription = task.description.length > 100 ? `${task.description.slice(0, 100)}...` : task.description;

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/task/${task.id}`);
            toast.success("Copied Link")
        } catch (error) {
            toast.error("Failed to copy link")
        }
    };

    return (
        <Card className="w-full max-w-xl mt-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="w-4 h-4" />
                        <span>Posted {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}</span>
                    </div>
                    <Badge className={task.status === "open" ? "bg-[#18cb96]" : "bg-red-500"}>
                        {task.status}
                    </Badge>
                </div>
                <Link to={`/task/${task.id}`} className="hover:underline">
                    <CardTitle className="text-xl font-semibold mt-2">{task.title}</CardTitle>
                </Link>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                    {showFullDescription ? task.description : truncatedDescription}
                </p>
                {task.description.length > 100 && (
                    <button
                        onClick={toggleDescription}
                        className="text-blue-500 text-sm underline cursor-pointer"
                    >
                        {showFullDescription ? "Show Less" : "Show More"}
                    </button>
                )}

                <div className="flex flex-wrap gap-2">
                    {task.skills.map((skill, index) => (
                        <Badge key={index}>{skill}</Badge>
                    ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400">Reward: </span> <span>{rewardLabel}</span>
                    </div>
                    <div className="relative cursor-pointer" onClick={handleCopyLink}>
                        <LinkIcon className="hover:text-blue-500 transition-colors duration-200" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default Task;
