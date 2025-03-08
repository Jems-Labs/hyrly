import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { submissionType } from "@/lib/types";
import { useApp } from "@/stores/useApp";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function getFaviconUrl(url: string) {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=32&domain=${domain}`;
}

function Submission({ submission }: { submission: submissionType }) {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const toggleDescription = () => setShowFullDescription(!showFullDescription);
    const { acceptSubmission, rejectSubmission } = useApp();


    return (
        <Card className="shadow-md p-4 h-auto">
            <CardContent className="flex flex-col gap-4">
                <div className="flex justify-between gap-6">
                    <div className="flex flex-col gap-4">
                        <div className="border p-4 rounded-md">
                            <h2 className="text-lg font-medium mb-2">Demo Links</h2>
                            <div className="flex gap-2 flex-wrap">
                                {submission?.demoLinks.map((link: string, index: number) => {
                                    const formattedLink = link.startsWith("http")
                                        ? link
                                        : `https://${link}`;
                                    return (
                                        <a
                                            key={index}
                                            href={formattedLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-2 w-10 h-10 rounded-md border"
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
                            <Link
                                to={`/user/${submission?.userId}`}
                                className="flex items-center gap-3"
                            >
                                <Avatar className="w-10 h-10">
                                    <AvatarFallback>
                                        {submission?.user?.firstName[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-medium">
                                        {submission?.user?.firstName} {submission?.user?.lastName}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {submission?.user?.email}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="w-full">
                        <h2 className="text-lg font-medium mb-2">Description</h2>
                        <p className="text-sm leading-relaxed m-0">
                            {showFullDescription
                                ? submission?.description
                                : `${submission?.description.slice(0, 200)}...`}
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

                <div className="flex flex-col gap-3 mt-4">
                    {submission?.status === "pending" && (
                        <div className="flex gap-2 justify-between">
                            {" "}
                            <Button variant="destructive" className="w-1/2" onClick={() => rejectSubmission(submission?.id)}>
                                Reject
                            </Button>
                            <Button variant="default" className="w-1/2" onClick={() => acceptSubmission(submission?.id)}>
                                Accept
                            </Button>
                        </div>
                    )}
                    {submission?.status === "rejected" && <Button variant="destructive" className="w-full" disabled>
                        Rejected
                    </Button>}
                    {submission?.status === "accepted" && <Button className="w-full" disabled>
                        Accepted
                    </Button>}

                    <Button variant="outline" className="w-full">
                        <MessageSquare /> Add a feedback
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default Submission;
