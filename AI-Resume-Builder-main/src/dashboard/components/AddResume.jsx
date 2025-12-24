import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";

const AddResume = () => {
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const { user } = useUser();

    const handleCreate = async () => {
        if (!title.trim()) {
            toast.error("Please enter a title before creating a resume.");
            return;
        }

        try {
            //  SEND ONLY FIELDS (GlobalApi will wrap with { data })
            const payload = {
                title: title,
                resumeId: crypto.randomUUID(),
                userEmail: user?.primaryEmailAddress?.emailAddress,
                userName: user?.fullName,
            };

            const response = await GlobalApi.CreateNewResume(payload);

            // REAL STRAPI ID
            const newId = response.data.data.id;

            toast.success("Resume created successfully!");
            navigate(`/dashboard/resume/${newId}/edit`);
        } catch (error) {
            console.error("Error creating resume:", error);
            toast.error("Failed to create resume. Please check your backend connection.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Create a New Resume</h2>

            <input
                type="text"
                placeholder="Enter resume title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border px-3 py-2 rounded w-full mb-4"
            />

            <button
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
            >
                Create
            </button>
        </div>
    );
};

export default AddResume;
