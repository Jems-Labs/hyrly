import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/stores/useApp";
import WorkExperience from "@/components/WorkExperience";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AddWorkExperience from "@/components/AddWorkExperience";
import { Link } from "react-router-dom";

function Profile() {
  const { user, updateProfile } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    skills: [] as string[],
  });

  useEffect(() => {
    if (user) {
      setSkills(user.skills || []);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        skills: user.skills || [],
      });
    }
  }, [user]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, skills }));
  }, [skills]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    await updateProfile(formData);
    setIsLoading(false);
  };

  return (
    <div>
      {user ? (
        <div className="p-6">
          <div className="border rounded-t-lg px-4 py-4 flex justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 cursor-pointer">
                <AvatarFallback className="text-lg">
                  {user?.firstName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleUpdate} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" /> Updating...
                  </>
                ) : (
                  "Update"
                )}
              </Button>
              <Button variant="outline">
                <Link to={`/user/${user?.id}`}>See public view</Link>
              </Button>
            </div>
          </div>

          <div className="border px-4 py-4">
            <h1 className="text-xl font-semibold">Skills</h1>
            <div className="flex gap-2 mt-3">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button onClick={addSkill}>Add</Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ✕
                </Badge>
              ))}
            </div>
          </div>

          <div className="border px-4 py-4 rounded-b-lg">
            <div className="flex justify-between">
              <h1 className="text-xl font-semibold">Work Experience</h1>
              <AddWorkExperience />
            </div>
            {user?.workExperience?.map((experience) => {
              return <WorkExperience experience={experience} />;
            })}
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="border rounded-t-lg px-4 py-4 flex justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="flex flex-col gap-4 w-full">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            </div>
          </div>
          <div className="border px-4 py-4 mt-4">
            <Skeleton className="h-6 w-32" />
            <div className="flex gap-2 mt-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-20" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
