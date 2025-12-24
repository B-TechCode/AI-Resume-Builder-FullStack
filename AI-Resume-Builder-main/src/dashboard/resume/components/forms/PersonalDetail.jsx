import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function PersonalDetail({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const handleChange = (field, value) => {
        setResumeInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
        enabledNext(true);
    };

    const handleSave = () => {
        toast.success("Personal details saved");
    };

    return (
        <div className="p-6 shadow-md rounded-lg border bg-white">
            <h2 className="font-bold text-lg mb-1">Personal Detail</h2>
            <p className="text-sm text-gray-500 mb-4">
                Get started with the basic information
            </p>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">First Name</label>
                    <Input
                        value={resumeInfo?.firstName || ""}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <Input
                        value={resumeInfo?.lastName || ""}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                </div>
            </div>

            {/* Job Title */}
            <div className="mt-4">
                <label className="text-sm font-medium">Job Title</label>
                <Input
                    value={resumeInfo?.jobTitle || ""}
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                />
            </div>

            {/* Address */}
            <div className="mt-4">
                <label className="text-sm font-medium">Address</label>
                <Input
                    value={resumeInfo?.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                />
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                        value={resumeInfo?.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                        value={resumeInfo?.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end mt-6">
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    );
}

export default PersonalDetail;
