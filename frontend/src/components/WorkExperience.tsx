import AddWorkExperience from "./AddWorkExperience";
import { ExperienceType } from "@/lib/types";

interface experienceType {
    experiences: ExperienceType[]
}

function WorkExperience({ experiences }: experienceType) {
    return (
        <div className="border px-4 py-4 rounded-b-lg">
            <div className="flex justify-between">
                <h1 className="text-xl font-semibold">Work Experience</h1>
                <AddWorkExperience />
            </div>
            {experiences?.length > 0 ? (
                <div className="space-y-6">
                    {experiences?.map((exp: ExperienceType) => (
                        <div 
                        key={`${exp.company}-${exp.fromYear}-${exp.title}`} 
                        className="border px-5 py-4 rounded-md mt-2"
                    >
                        <h2 className="text-lg font-semibold">{exp.title} | {exp.company}</h2>
                        <p className="text-sm text-gray-400">
                            {exp.fromMonth} {exp.fromYear} - {exp.isCurrentlyWorking ? "Present" : `${exp.toMonth} ${exp.toYear}`}
                        </p>
                        <p className="mt-2">{exp.description}</p>
                    </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-sm">No work experience added yet.</p>
            )}
        </div>
    );
}

export default WorkExperience;
