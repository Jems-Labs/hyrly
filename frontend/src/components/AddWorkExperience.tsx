import React, { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useApp } from "@/stores/useApp";
import { months, years } from "@/lib/utils";



function AddWorkExperience() {
  const { addExperience, fetchUser } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    fromMonth: "",
    fromYear: "",
    isCurrentlyWorking: false,
    toMonth: "",
    toYear: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isCurrentlyWorking: checked,
    }));
  };

  const handleAddExperience = async () => {
    setIsLoading(true);
    await addExperience(formData);
    await fetchUser();
    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border rounded-full cursor-pointer p-2">
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-2xl">Add Experience</DialogTitle>
        </DialogHeader>

        <div className="grid w-full gap-3">
          <div>
            <Label htmlFor="company" className="mb-2">
              Company
            </Label>
            <Input
              type="text"
              id="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Hyrly"
            />
          </div>
          <div>
            <Label htmlFor="title" className="mb-2">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Software Engineer"
            />
          </div>
          <div>
            <Label className="mb-2">From</Label>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, fromMonth: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, fromYear: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isCurrentlyWorking"
              checked={formData.isCurrentlyWorking}
              onCheckedChange={handleCheckboxChange}
            />
            <label htmlFor="isCurrentlyWorking" className="text-sm font-medium">
              I currently work here
            </label>
          </div>

          {!formData.isCurrentlyWorking && (
            <div>
              <Label className="mb-2">To</Label>
              <div className="flex gap-2">
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, toMonth: value })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, toYear: value })
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="description" className="mb-2">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
        </div>
        <Button onClick={handleAddExperience} disabled={isLoading}>
          {isLoading ? (
            <>
              {" "}
              <Loader2 className="animate-spin" />
              Adding...
            </>
          ) : (
            "Add"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default AddWorkExperience;
