import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getFaviconUrl } from "@/lib/utils";
import { useApp } from "@/stores/useApp";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MySubmissions() {
  const { fetchMySubmissions } = useApp();
  const { data } = useQuery({
    queryKey: ["my-submissions"],
    queryFn: async () => (await fetchMySubmissions()),
    staleTime: 12000,
  });

  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  return (
    <div className="px-10 py-5">
      <h1 className="text-3xl font-semibold mb-4">My Submissions</h1>
      {data?.length === 0 ? (
        <p className="text-gray-500 text-sm">No submissions found</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {data?.map((submission) => (
            <Card key={submission.id} className="p-0 border shadow-sm">
              <CardContent className="px-5 py-5 w-full">
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <Link
                      className="text-xl font-semibold underline"
                      to={`/task/${submission.task.id}`}
                    >
                      {submission.task.title || "No task title"}
                    </Link>

                    <div className="flex gap-2 mt-2">
                      {submission.demoLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.startsWith("http") ? link : `https://${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 border rounded-lg"
                        >
                          <img
                            src={getFaviconUrl(link)}
                            alt="Favicon"
                            className="w-6 h-6 rounded-full"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="border p-4 rounded-md w-1/2">
                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                    <p className="text-sm leading-relaxed m-0">
                      {showFullDescription
                        ? submission?.description
                        : submission?.description.slice(0, 200)}
                    </p>
                    {submission?.description.length > 50 && (
                      <Button
                        variant="link"
                        className="p-0 text-blue-500 underline"
                        onClick={toggleDescription}
                      >
                        {showFullDescription ? "Show Less" : "Show More"}
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Button
                    variant={
                      submission?.status === "rejected"
                        ? "destructive"
                        : submission?.status === "accepted"
                        ? "default"
                        : "outline"
                    }
                    disabled
                  >
                    {submission?.status === "rejected"
                      ? "Rejected"
                      : submission?.status === "accepted"
                      ? "Accepted"
                      : "Pending"}
                  </Button>
                </div>
                <Accordion type="single" collapsible className="mt-4 w-auto border px-5 rounded-md">
                  <AccordionItem value="feedback">
                    <AccordionTrigger>View Feedback</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              submission?.rating && i < submission.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm mt-2">{submission.feedback}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySubmissions;
