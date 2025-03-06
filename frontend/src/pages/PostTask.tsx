import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postTaskType } from "@/lib/types";
import { rewardOptions } from "@/lib/utils";
import { useApp } from "@/stores/useApp";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function PostTask() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<postTaskType>({
    title: "",
    description: "",
    skills: [],
    reward: "",
  });
  const [newSkill, setNewSkill] = useState("");

  const { postTask } = useApp();

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handlePostTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await postTask(formData);
    setIsLoading(false)
  }
  return (
    <div className="px-10 py-10 w-full flex justify-center">
      <div className="w-1/2">


        <form className="border rounded-md px-6 py-6 flex flex-col gap-5 w-full" onSubmit={handlePostTask}>
          <h1 className="text-2xl font-bold mb-2 text-center">Post a New Task</h1>
          <div className="grid w-full items-center gap-2">
            <Label>Title</Label>
            <Input
              className="h-12 text-lg"
              placeholder="E.g., Build a landing page for my website"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label>Description</Label>
            <Textarea
              className="h-24 text-lg"
              placeholder="Briefly describe what needs to be done..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid w-full items-center gap-2">
            <Label>Skills Required</Label>
            <div className="flex items-center gap-2">
              <Input
                className="h-12 text-lg"
                placeholder="E.g., React, Tailwind, Node.js"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button
                type="button"
                onClick={() => {
                  if (newSkill.trim()) {
                    setFormData({
                      ...formData,
                      skills: [...formData.skills, newSkill.trim()],
                    });
                    setNewSkill("");
                  }
                }}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.map((skill, index) => (
                <Badge key={index} className="cursor-pointer" onClick={() => removeSkill(skill)}>
                  {skill} ✕
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid w-full items-center gap-2">
            <Label>Reward </Label>
            <div className="grid grid-cols-3 gap-4">
              {rewardOptions.map((reward, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-md cursor-pointer text-center ${formData.reward === reward.value ? 'border-[#18cb96]' : 'border-secondary'}`}
                  onClick={() => setFormData({ ...formData, reward: reward.value })}
                >
                  <p className="text-md font-medium">{reward.label}</p>
                  <p className="text-xs font-light">{reward.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Button
            disabled={isLoading}
            className="text-sm px-4 py-2  w-50 mt-5"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Posting...
              </>
            ) : (
              "Post Task"
            )}
          </Button>

        </form>
      </div>
    </div>
  );
}

export default PostTask;