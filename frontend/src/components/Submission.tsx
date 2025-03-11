import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { submissionType } from "@/lib/types";
import { getFaviconUrl } from "@/lib/utils";
import { useApp } from "@/stores/useApp";
import { Loader2, MessageSquare, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Submission({ submission }: { submission: submissionType }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [formData, setFormData] = useState({ rating: 0, feedback: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);
  const { acceptSubmission, rejectSubmission, addFeedback } = useApp();

  const handleSubmitFeedback = async () => {
    setIsLoading(true);
    await addFeedback(submission.id, formData);
    setIsLoading(false);
  };

  return (
    <Card className="shadow-md h-auto w-full">
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <div className="border p-4 rounded-md">
              <h2 className="text-lg font-medium mb-2">Demo Links</h2>
              <div className="flex gap-2 flex-wrap">
                {submission?.demoLinks.map((link, index) => {
                  const formattedLink = link.startsWith("http") ? link : `https://${link}`;
                  return (
                    <a
                      key={index}
                      href={formattedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 w-10 h-10 rounded-md border"
                    >
                      <img
                        src={getFaviconUrl(formattedLink)}
                        alt="Favicon"
                        className="w-5 h-5 rounded-full"
                      />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="border p-4 rounded-md">
              <h2 className="text-lg font-medium mb-2">Submitted By</h2>
              <Link to={`/user/${submission?.userId}`} className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {submission?.user?.firstName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{submission?.user?.firstName} {submission?.user?.lastName}</h3>
                  <p className="text-sm text-muted-foreground">{submission?.user?.email}</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-sm leading-relaxed m-0">
              {showFullDescription ? submission?.description : `${submission?.description.slice(0, 200)}...`}
            </p>
            {submission?.description.length > 50 && (
              <Button variant="link" className="p-0 text-blue-500 underline" onClick={toggleDescription}>
                {showFullDescription ? "Show Less" : "Show More"}
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-4">
          {submission?.status === "pending" && (
            <div className="flex gap-2 justify-between">
              <Button variant="destructive" className="w-1/2" onClick={() => rejectSubmission(submission?.id)}>
                Reject
              </Button>
              <Button variant="default" className="w-1/2" onClick={() => acceptSubmission(submission?.id)}>
                Accept
              </Button>
            </div>
          )}
          {submission?.status === "rejected" && (
            <Button variant="destructive" className="w-full" disabled>
              Rejected
            </Button>
          )}
          {submission?.status === "accepted" && (
            <Button className="w-full" disabled>
              Accepted
            </Button>
          )}

          {submission?.rating && submission?.feedback ? (
            <div className="border p-4 rounded-md mt-4">
              <h3 className="text-lg font-medium">Your Feedback</h3>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${submission?.rating && i < submission.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm mt-2">{submission.feedback}</p>
            </div>
          ) : (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <MessageSquare /> Add Feedback
                </Button>
              </DialogTrigger>
              <DialogContent className="p-6">
                <DialogHeader>
                  <DialogTitle>Add Feedback</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer transition ${star <= formData.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                      onClick={() => setFormData({ ...formData, rating: star })}
                    />
                  ))}
                </div>
                <label className="text-sm font-medium mt-3">Description:</label>
                <Textarea value={formData.feedback} onChange={(e) => setFormData({ ...formData, feedback: e.target.value })} placeholder="Write your feedback here..." className="mt-1" />
                <Button className="mt-4 w-full" onClick={handleSubmitFeedback} disabled={isLoading}>
                  {isLoading ? <><Loader2 className="animate-spin mr-2" /> Submitting...</> : "Submit Feedback"}
                </Button>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default Submission;