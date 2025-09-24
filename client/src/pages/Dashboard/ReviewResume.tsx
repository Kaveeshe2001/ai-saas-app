import { useState } from "react"
import { toast } from "react-toastify";
import ReactMarkdown from 'react-markdown';
import { reviewResumeAPI } from "../../services/ResumeServices";
import { RiFileList2Line, RiSparkling2Fill } from "@remixicon/react";

const ReviewResume = () => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast.error("Please upload a PDF file only");
        return;
      }
      setResumeFile(file);
      setFeedback(null); // Clear previous feedback on new upload
    }
  };

  const handleSubmit = async () => {
    if (!resumeFile) {
      toast.error("Please choose a file to upload");
      return;
    }

    setIsLoading(true);
    setFeedback(null);

    try {
      const result = await reviewResumeAPI(resumeFile);
      if (result) {
        setFeedback(result.feedbackText);
        toast.success("Resume review completed!");
      }
    } catch (error) {
      toast.error("Failed to review resume. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="font-semibold">Analyzing your resume...</p>
        </div>
      );
    }

    if (feedback) {
      return (
        <div className="porse max-w-none">
          <ReactMarkdown>{feedback}</ReactMarkdown>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <RiFileList2Line size={64} className="text-gray-300 mb-4" />
        <p>Upload a resume and click "Review Resume" to get started</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left side configuration panel */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-6 text-green-600">
            <RiSparkling2Fill size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Resume Review</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="resumeUpload" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <RiFileList2Line size={48} className="mx-auto text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="resumeUpload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>Choose File</span>
                      <input id="resumeUpload" name="resumeUpload" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">{resumeFile ? resumeFile.name : "No file chosen"}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">Supports PDF resume only.</p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !resumeFile}
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-green-300 flex items-center justify-center gap-2 transition-colors"
            >
              Review Resume
            </button>
          </div>
        </div>

        {/* Right side display area */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-6 text-gray-600">
            <RiFileList2Line size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
          </div>
          <div className="h-[30rem] overflow-y-auto">
            {renderResult()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewResume;
