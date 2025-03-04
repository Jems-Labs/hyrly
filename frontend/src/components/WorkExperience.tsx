import { ExperienceType } from "@/lib/types";
import { useApp } from "@/stores/useApp";
import { Loader2, Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "./ui/textarea";

import { months, years } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

interface ExperienceProps {
    experience: ExperienceType;
}

function WorkExperience({ experience }: ExperienceProps) {
    const { user, updateExperience, deleteExperience } = useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        company: experience.company,
        title: experience.title,
        fromMonth: experience.fromMonth,
        fromYear: experience.fromYear,
        toMonth: experience.toMonth,
        toYear: experience.toYear,
        isCurrentlyWorking: experience.isCurrentlyWorking,
        description: experience.description,
    });

    const handleChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await updateExperience(formData, experience.id);
        setIsLoading(false)
    }
    const handleDelete = async () => {
        await deleteExperience(experience.id);
    };
    return (
        <div className="space-y-6">
            <div key={experience.id} className="border px-5 py-4 rounded-md mt-2">
                <div className="text-lg font-semibold flex items-center justify-between">
                    {experience.title} | {experience.company}
                    <div className="flex items-center gap-2">
                        {experience?.userId === user?.id ? (
                            <>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive">
                                            <Trash />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Work Experience</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Are you sure you want to delete this work experience? This action cannot be undone.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleDelete}>
                                                Confirm Delete
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant={"outline"}>
                                            <Pencil />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Update Work Experience</DialogTitle>
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
                                                    onChange={(e) => handleChange("company", e.target.value)}
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
                                                    onChange={(e) => handleChange("title", e.target.value)}
                                                    placeholder="e.g., Software Engineer"
                                                />
                                            </div>
                                            <div>
                                                <Label className="mb-2">From</Label>
                                                <div className="flex gap-2">
                                                    <Select
                                                        value={formData.fromMonth}
                                                        onValueChange={(value) => handleChange("fromMonth", value)}
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
                                                        value={formData.fromYear}
                                                        onValueChange={(value) => handleChange("fromYear", value)}
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

                                            {!formData.isCurrentlyWorking && (
                                                <div>
                                                    <Label className="mb-2">To</Label>
                                                    <div className="flex gap-2">
                                                        <Select
                                                            value={formData.toMonth}
                                                            onValueChange={(value) => handleChange("toMonth", value)}
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
                                                            value={formData.toYear}
                                                            onValueChange={(value) => handleChange("toYear", value)}
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

                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="isCurrentlyWorking"
                                                    checked={formData.isCurrentlyWorking}
                                                    onCheckedChange={() => handleChange("isCurrentlyWorking", !formData.isCurrentlyWorking)}
                                                />
                                                <label htmlFor="isCurrentlyWorking" className="text-sm font-medium">
                                                    I currently work here
                                                </label>
                                            </div>

                                            <div>
                                                <Label htmlFor="description" className="mb-2">
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    value={formData.description}
                                                    onChange={(e) => handleChange("description", e.target.value)}
                                                    placeholder="Enter description"
                                                />
                                            </div>
                                            <Button onClick={handleSubmit} disabled={isLoading}>
                                                {isLoading ? (
                                                    <>
                                                        {" "}
                                                        <Loader2 className="animate-spin" />
                                                        Updating...
                                                    </>
                                                ) : (
                                                    "Update Changes"
                                                )}
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </>
                        ) : null}
                    </div>
                </div>
                <p className="text-sm text-gray-400">
                    {formData.fromMonth} {formData.fromYear} - {formData.isCurrentlyWorking ? "Present" : `${formData.toMonth} ${formData.toYear}`}
                </p>
                <p className="mt-2">{formData.description}</p>
            </div>
        </div>
    );
}

export default WorkExperience;
