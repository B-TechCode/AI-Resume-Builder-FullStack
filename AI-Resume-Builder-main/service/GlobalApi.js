import axios from "axios";

//  Base URL from .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

//  Axios client WITHOUT API token
const axiosClient = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

//  Create new resume
const CreateNewResume = (data) =>
    axiosClient.post("/user-resumes", { data });

//  Get resumes by user email
const GetUserResumes = (userEmail) =>
    axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`);

//  Update resume
const UpdateResumeDetail = (id, data) =>
    axiosClient.put(`/user-resumes/${id}`, { data });

// Get resume by ID
const GetResumeById = (id) =>
    axiosClient.get(`/user-resumes/${id}?populate=*`);

//  Delete resume
const DeleteResumeById = (id) =>
    axiosClient.delete(`/user-resumes/${id}`);

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById,
};
