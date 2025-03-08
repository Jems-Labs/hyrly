import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createSubmissionType } from "@/lib/types";
import { useApp } from "@/stores/useApp";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Submit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<createSubmissionType>({
    demoLinks: [],
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newLink, setNewLink] = useState("");
  const { createSubmisson } = useApp();
  const addLink = () => {
    if (newLink.trim()) {
      setFormData((prev) => ({
        ...prev,
        demoLinks: [...prev.demoLinks, newLink.trim()],
      }));
      setNewLink("");
    }
  };

  const removeLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      demoLinks: prev.demoLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await createSubmisson(id, formData);
    setIsLoading(false);
  };
  return (
    <div className="flex justify-center px-10 py-10">
      <form
        className="border rounded-md px-6 py-6 flex flex-col gap-5 w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center">Submit Your Work</h1>

        <div className="grid w-full items-center gap-2">
          <Label>Description</Label>
          <Textarea
            className="h-24 text-lg"
            placeholder="Briefly describe what you have done..."
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label>Links</Label>
          <p className="text-sm text-gray-400">
            Add links to GitHub, website, App Store, etc., or wherever the demo
            can be tested live.
          </p>

          <div className="flex items-center gap-2">
            <Input
              className="h-12 text-lg"
              placeholder="E.g., GitHub, Live Demo URL"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
            />
            <Button type="button" onClick={addLink}>
              Add
            </Button>
          </div>

          <div className="flex flex-col gap-2 mt-3">
            {formData?.demoLinks.map((link, index) => {
              const formattedLink =
                link.startsWith("http://") || link.startsWith("https://")
                  ? link
                  : `https://${link}`;

              return (
                <div key={index} className="flex items-center gap-3">
                  <a
                    href={formattedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline break-all"
                  >
                    {formattedLink}
                  </a>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeLink(index)}
                  >
                    <Trash />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2">
          <Button>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
          <Button variant={"outline"} type="button" onClick={()=>navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Submit;
