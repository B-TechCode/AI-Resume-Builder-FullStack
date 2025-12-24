import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

const emptyEducation = {
    universityName: "",
    degree: "",
    major: "",
    startDate: "",
    endDate: "",
    description: "",
};

function Education() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [educationList, setEducationList] = useState([]);
    const { resumeId } = useParams();
    const [loading, setLoading] = useState(false);

    // Initialize safely
    useEffect(() => {
        if (resumeInfo?.education?.length > 0) {
            setEducationList(resumeInfo.education);
        } else {
            setEducationList([emptyEducation]);
        }
    }, [resumeInfo]);

    // Input change
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const updated = [...educationList];
        updated[index][name] = value;
        setEducationList(updated);
    };

    // Sync with context
    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            education: educationList,
        }));
    }, [educationList]);

    // Add / Remove
    const addNewEducation = () => {
        setEducationList([...educationList, emptyEducation]);
    };

    const removeEducation = () => {
        educationList.length > 1 &&
        setEducationList((list) => list.slice(0, -1));
    };

    //  Save to backend
    const onSave = async () => {
        setLoading(true);
        try {
            const data = {
                data: {
                    education: educationList,
                },
            };

            await GlobalApi.UpdateResumeDetail(resumeId, data);
            toast.success("Education updated successfully");
        } catch (err) {
            toast.error("Failed to save education");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
            <h2 className="font-bold text-lg">Education</h2>
            <p>Add your educational details</p>

            {educationList.map((item, index) => (
                <div
                    key={index}
                    className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg"
                >
                    <div className="col-span-2">
                        <label>University Name</label>
                        <Input
                            name="universityName"
                            value={item.universityName}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>

                    <div>
                        <label>Degree</label>
                        <Input
                            name="degree"
                            value={item.degree}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>

                    <div>
                        <label>Major</label>
                        <Input
                            name="major"
                            value={item.major}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>

                    <div>
                        <label>Start Date</label>
                        <Input
                            type="date"
                            name="startDate"
                            value={item.startDate}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>

                    <div>
                        <label>End Date</label>
                        <Input
                            type="date"
                            name="endDate"
                            value={item.endDate}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>

                    <div className="col-span-2">
                        <label>Description</label>
                        <Textarea
                            name="description"
                            value={item.description}
                            onChange={(e) => handleChange(index, e)}
                        />
                    </div>
                </div>
            ))}

            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button variant="outline" onClick={addNewEducation}>
                        + Add More Education
                    </Button>
                    <Button variant="outline" onClick={removeEducation}>
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

export default Education;
