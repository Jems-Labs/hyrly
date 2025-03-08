import Task from "@/components/Task";
import { Input } from "@/components/ui/input";
import { taskType } from "@/lib/types";
import { useApp } from "@/stores/useApp";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";


function FindTask() {
    const { fetchOpenTasks } = useApp();
    const { data, isLoading } = useQuery({
        queryKey: ["open-tasks"],
        queryFn: async () => {
            const res = await fetchOpenTasks();
            return res;
        },
        staleTime: 12000
    });


    return (
        <div className="px-10 py-8 space-y-6">

            <div className="flex flex-col space-y-4">
                <h1 className="text-3xl font-semibold">Find your next task opportunity</h1>
                <div className="flex items-center gap-2 border px-3 py-2 w-full max-w-md rounded-md shadow-sm">
                    <Search size={20} className="text-gray-500" />
                    <Input placeholder="Search for tasks" className="border-none outline-none" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((task: taskType, index: number) => (
                    <>
                        <Task key={index} task={task} />

                    </>
                ))}
            </div>
        </div>
    );
}

export default FindTask;
