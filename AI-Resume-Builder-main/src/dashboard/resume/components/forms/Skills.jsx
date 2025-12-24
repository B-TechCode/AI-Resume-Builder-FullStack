import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const emptySkill = {
    name: "",
    rating: 0,
};

function Skills() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();

    const [skillsList, setSkillsList] = useState([emptySkill]);
    const [loading, setLoading] = useState(false);

    //  Initialize safely
    useEffect(() => {
        if (resumeInfo?.skills?.length > 0) {
            setSkillsList(resumeInfo.skills);
        } else {
            setSkillsList([emptySkill]);
        }
    }, [resumeInfo]);

    //  Handle input / rating change
    const handleChange = (index, field, value) => {
        const updated = [...skillsList];
        updated[index][field] = value;
        setSkillsList(updated);
    };

    // Sync with context
    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            skills: skillsList,
        }));
    }, [skillsList]);

    // Add / Remove
    const addNewSkill = () => {
        setSkillsList([...skillsList, emptySkill]);
    };

    const removeSkill = () => {
        skillsList.length > 1 &&
        setSkillsList((list) => list.slice(0, -1));
    };

    // Save
    const onSave = async () => {
        setLoading(true);
        try {
            const data = {
                data: {
                    skills: skillsList,
                },
            };

            await GlobalApi.UpdateResumeDetail(resumeId, data);
            toast.success("Skills updated successfully!");
        } catch (err) {
            toast.error("Failed to save skills");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Skills</h2>
            <p>Add your top professional key skills</p>

            {skillsList.map((item, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center mb-3 border rounded-lg p-3"
                >
                    <div className="w-[60%]">
                        <label className="text-xs">Skill Name</label>
                        <Input
                            value={item.name}
                            onChange={(e) =>
                                handleChange(index, "name", e.target.value)
                            }
                        />
                    </div>

                    <Rating
                        style={{ maxWidth: 120 }}
                        value={item.rating}
                        onChange={(v) => handleChange(index, "rating", v)}
                    />
                </div>
            ))}

            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={addNewSkill}>
                        + Add More Skill
                    </Button>
                    <Button variant="outline" onClick={removeSkill}>
                        - Remove
                    </Button>
                </div>

                <Button onClick={onSave} disabled={loading}>
                    {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                </Button>
            </div>
        </div>
    );
}

export default Skills;
