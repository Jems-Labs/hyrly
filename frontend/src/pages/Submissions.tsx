import { Button } from "@/components/ui/button";
import { useApp } from "@/stores/useApp";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Submission from "@/components/Submission";

function Submissions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchAllSubmissions } = useApp();

  const { data } = useQuery({
    queryKey: ["submissions", id],
    queryFn: async () => {
      const data = await fetchAllSubmissions(id);
      return data.submissions;
    },
    staleTime: 12000,
  });

  return (
    <div className="px-10 py-10">
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" /> Go Back
        </Button>
        <h1 className="text-3xl font-semibold mt-4">Submissions for this task</h1>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {data?.map((submission, index) => (
          <Submission key={index} submission={submission} />
        ))}
      </div>
    </div>
  );
}

export default Submissions;
