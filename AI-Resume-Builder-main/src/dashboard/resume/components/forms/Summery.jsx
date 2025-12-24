import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../../service/AIModal";

const prompt =
    "Job Title: {jobTitle}, Depending on job title give me a list of summary for 3 experience levels (Fresher, Mid Level, Senior) in 3-4 lines, return JSON array with fields: experience_level and summary.";

function Summery({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();

    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

    //  Initialize from context
    useEffect(() => {
        if (resumeInfo?.summery) {
            setSummary(resumeInfo.summery);
        }
    }, [resumeInfo]);

    // Sync to context
    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            summery: summary,
        }));
    }, [summary]);

    // Generate summary using AI
    const generateSummaryFromAI = async () => {
        if (!resumeInfo?.jobTitle) {
            toast.error("Please enter Job Title first");
            return;
        }

        setLoading(true);
        try {
            const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);
            const result = await AIChatSession.sendMessage(PROMPT);

            const parsed = JSON.parse(result.response.text());
            setAiGeneratedSummaryList(parsed || []);
        } catch (error) {
            toast.error("Failed to generate summary from AI");
        } finally {
            setLoading(false);
        }
    };

    // Save to backend
    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                data: {
                    summery: summary,
                },
            };

            await GlobalApi.UpdateResumeDetail(resumeId, data);
            toast.success("Summary updated successfully");
            enabledNext(true);
        } catch (error) {
            toast.error("Failed to save summary");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
                <h2 className="font-bold text-lg">Summary</h2>
                <p>Add summary for your job title</p>

                <form className="mt-7" onSubmit={onSave}>
                    <div className="flex justify-between items-end">
                        <label>Add Summary</label>

                        <Button
                            variant="outline"
                            type="button"
                            size="sm"
                            onClick={generateSummaryFromAI}
                            className="border-primary text-primary flex gap-2"
                        >
                            <Brain className="h-4 w-4" /> Generate from AI
                        </Button>
                    </div>

                    <Textarea
                        className="mt-5"
                        required
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />

                    <div className="mt-2 flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
                        </Button>
                    </div>
                </form>
            </div>

            {/* AI Suggestions */}
            {aiGeneratedSummaryList.length > 0 && (
                <div className="my-5">
                    <h2 className="font-bold text-lg">Suggestions</h2>

                    {aiGeneratedSummaryList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSummary(item.summary)}
                            className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                            <h2 className="font-bold my-1 text-primary">
                                Level: {item.experience_level}
                            </h2>
                            <p>{item.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Summery;
