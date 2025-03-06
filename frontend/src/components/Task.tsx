import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { taskType } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { CalendarDays, Trophy } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
function Task({ task }: { task: taskType }) {
    return (
        <Card className="w-full max-w-xl mx-auto">

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
                <CardTitle className="text-xl font-semibold mt-2">{task.title}</CardTitle>
            </CardHeader>


            <CardContent className="space-y-4">

                <p className="text-sm leading-relaxed">{task.description}</p>

                <div className="flex flex-wrap gap-2">
                    {task.skills.map((skill, index) => (
                        <Badge key={index}>{skill}</Badge>
                    ))}
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4 text-orange-400" />
                        <span className="text-orange-400">Reward: </span> <span>{task.reward}</span>
                    </div>
                </div>

                <Button className="w-full mt-4">Submit Now</Button>
            </CardContent>
        </Card>
    )
}

export default Task