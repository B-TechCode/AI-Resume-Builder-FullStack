import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

const emptyExperience = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummery: "",
};

function Experience() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [experienceList, setExperienceList] = useState([]);
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);

    // Initialize safely
    useEffect(() => {
        if (resumeInfo?.experience?.length > 0) {
            setExperienceList(resumeInfo.experience);
        } else {
            setExperienceList([emptyExperience]);
        }
    }, [resumeInfo]);

    // Input change
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updated = [...experienceList];
        updated[index][name] = value;
        setExperienceList(updated);
    };

    // Rich text change
    const handleRichTextEditor = (value, name, index) => {
        const updated = [...experienceList];
        updated[index][name] = value;
        setExperienceList(updated);
    };

    // Sync to context
    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            experience: experienceList,
        }));
    }, [experienceList]);

    // Add / Remove
    const addNewExperience = () => {
        setExperienceList([...experienceList, emptyExperience]);
    };

    const removeExperience = () => {
        experienceList.length > 1 &&
        setExperienceList((list) => list.slice(0, -1));
    };

    // Save to backend
    const onSave = async () => {
        setLoading(true);
        try {
            const data = {
                data: {
                    experience: experienceList,
                },
            };

            await GlobalApi.UpdateResumeDetail(resumeId, data);
            toast.success("Experience updated successfully");
        } catch (err) {
            toast.error("Failed to save experience");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Professional Experience</h2>
            <p>Add your previous job experience</p>

            {experienceList.map((item, index) => (
                <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                    <div>
                        <label className="text-xs">Position Title</label>
                        <Input name="title" value={item.title} onChange={(e) => handleChange(index, e)} />
                    </div>

                    <div>
                        <label className="text-xs">Company Name</label>
                        <Input name="companyName" value={item.companyName} onChange={(e) => handleChange(index, e)} />
                    </div>

                    <div>
                        <label className="text-xs">City</label>
                        <Input name="city" value={item.city} onChange={(e) => handleChange(index, e)} />
                    </div>

                    <div>
                        <label className="text-xs">State</label>
                        <Input name="state" value={item.state} onChange={(e) => handleChange(index, e)} />
                    </div>

                    <div>
                        <label className="text-xs">Start Date</label>
                        <Input type="date" name="startDate" value={item.startDate} onChange={(e) => handleChange(index, e)} />
                    </div>

                    <div>
                        <label className="text-xs">End Date</label>
                        <Input type="date" name="endDate" value={item.endDate} onChange={(e) => handleChange(index, e)} />
                    </div>

                    <div className="col-span-2">
                        <RichTextEditor
                            value={item.workSummery}
                            onRichTextEditorChange={(value) =>
                                handleRichTextEditor(value, "workSummery", index)
                            }
                        />
                    </div>
                </div>
            ))}

            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={addNewExperience}>+ Add More</Button>
                    <Button variant="outline" onClick={removeExperience}>- Remove</Button>
                </div>

                <Button onClick={onSave} disabled={loading}>
                    {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                </Button>
            </div>
        </div>
    );
}

export default Experience;
