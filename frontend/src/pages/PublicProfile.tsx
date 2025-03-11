import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import WorkExperience from "@/components/WorkExperience";
import { useApp } from "@/stores/useApp";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

function PublicProfile() {
  const { id } = useParams();
  const { fetchPublicUser } = useApp();

  const { data } = useQuery({
    queryKey: ["public-user", id],
    queryFn: async () => {
      const userData = await fetchPublicUser(id);
      return userData;
    },
    staleTime: 60000,
  });

  return (
    <div className="px-10 py-5">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="w-32 h-32 text-4xl">
                  {data?.firstName[0]}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-3xl font-bold mt-2 mb-1">
                  {data?.firstName} {data?.lastName}
                </p>
                <p className="text-sm text-gray-300">{data?.email}</p>

                {data?.points !== undefined && (
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-3 py-1 text-sm font-semibold text-white rounded-full shadow-md ${data.points >= 300
                          ? "bg-yellow-500"
                          : data.points >= 100
                            ? "bg-gray-400"
                            : "bg-orange-400"
                        }`}
                    >
                      {data.points.toLocaleString()} Points
                    </span>
                  </div>
                )}

              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      <div className="flex flex-col gap-5 mt-5">
        <div>
          <h1 className="text-xl font-semibold">Work Experience</h1>
          <div className="flex flex-col gap-2">
            {data?.workExperience && data?.workExperience?.length > 0 ? (
              data.workExperience.map((experience) => (
                <WorkExperience key={experience.id} experience={experience} />
              ))
            ) : (
              <p className="text-gray-400 text-sm">No work experience added.</p>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-xl font-semibold">Skills</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {data?.skills && data?.skills?.length > 0 ? (
              data.skills.map((skill, index) => (
                <Badge key={index} className="cursor-pointer">
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No skills added.</p>
            )}
          </div>
        </div>

        {data?.role === "client" && (
          <div>
            <h1 className="text-xl font-semibold">Posted Tasks</h1>
            <div className="flex flex-col gap-3 mt-3">
              {data?.postedTasks?.length > 0 ? (
                data.postedTasks.map((task) => (
                  <Card key={task.id} className="p-3 shadow gap-2">
                    <Link to={`/task/${task.id}`} className="underline">
                      <p className="text-lg font-medium">{task.title}</p>
                    </Link>
                    <p className="text-sm text-gray-400 pt-0">{task.description}</p>
                  </Card>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No tasks posted.</p>
              )}
            </div>
          </div>
        )}



      </div>
    </div>
  );
}

export default PublicProfile;
