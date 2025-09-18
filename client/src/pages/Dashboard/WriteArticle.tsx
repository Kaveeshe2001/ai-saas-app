import { useState } from "react";
import { toast } from "react-toastify";
import { articleGenerateAPI } from "../../services/ArticleServices";
import { RiBardLine, RiFileEditLine } from "@remixicon/react";
import Input from "../../components/ui/Input/Input";

const articleLengths = ["Short (500-800 word)", "Medium (800-1200 word)", "Long (1200+ word)"];

const WriteArticle = () => {
  const [topic, setTopic] = useState('');
  const [selectedLength, setSelectedLength] = useState(articleLengths[0]);
  const [generatedArticle, setGeneratedArticle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    topic?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {topic?: string;} = {};

    if (!topic) {
        newErrors.topic = "Please enter an article topic.";
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        setErrors({});
    }

    setIsLoading(true);
    setGeneratedArticle(null);

    try {
      const result = await articleGenerateAPI(topic, selectedLength);
      setGeneratedArticle(result.content);
      toast.success("Article generated successfully!");
    } catch (error) {
      toast.error("Failed to generate article. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left side configuration panel */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[var(--primary-color)]"><RiBardLine /></span>
            <h2 className="text-2xl font-bold text-gray-800">Article Configuration</h2>
          </div>

          <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Input
                  label='Article Topic'
                  type='text'
                  id='topic'
                  name='topic'
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  error={errors.topic}
                />
              </div>

              <div className="mb-8">
                <label className="block text-[15px] font-semibold text-[var(--title-color)] mb-2">
                  Article Length
                </label>
                <div className="flex flex-wrap gap-3">
                  {articleLengths.map((length) => (
                    <button
                      key={length}
                      type="button"
                      onClick={() => setSelectedLength(length)}
                      className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                          selectedLength === length
                              ? 'bg-gray-200 text-gary-700 border border-[var(--primary-color)]'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[var(--primary-color)] text-white font-bold py-3 px-4 rounded-md hover:bg-green-800 cursor-pointer disabled:bg-green-300 flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                 ) : (
                  "Generate article"
                )}
              </button>
          </form>
        </div>

        {/* Right side display area */}
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[var(--primary-color)]"><RiFileEditLine /></span>
            <h2 className="text-2xl font-bold text-gray-800">Generated Article</h2>
          </div>
          <div className="prose max-w-none h-96 overflow-y-auto">
            {generatedArticle ? (
              <div dangerouslySetInnerHTML={{ __html: generatedArticle.replace(/\n/g, '<br />') }} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <p>Enter a topic and click "Generate article" to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
