import React from "react";

function PersonalDetailPreview({ resumeInfo = {} }) {
    const themeColor = resumeInfo.themeColor || "#2563eb"; // fallback color

    return (
        <div className="w-full">
            {/* Name */}
            <h2
                className="font-bold text-xl text-center"
                style={{ color: themeColor }}
            >
                {resumeInfo.firstName || ""} {resumeInfo.lastName || ""}
            </h2>

            {/* Job Title */}
            <h2 className="text-center text-sm font-medium text-gray-700">
                {resumeInfo.jobTitle || ""}
            </h2>

            {/* Address */}
            <h2
                className="text-center font-normal text-xs mt-1"
                style={{ color: themeColor }}
            >
                {resumeInfo.address || ""}
            </h2>

            {/* Contact Info */}
            <div className="flex justify-between mt-2">
                <h2 className="font-normal text-xs" style={{ color: themeColor }}>
                    {resumeInfo.phone || ""}
                </h2>

                <h2 className="font-normal text-xs" style={{ color: themeColor }}>
                    {resumeInfo.email || ""}
                </h2>
            </div>

            {/* Divider */}
            <hr
                className="border-[1.5px] my-2"
                style={{ borderColor: themeColor }}
            />
        </div>
    );
}

export default PersonalDetailPreview;
