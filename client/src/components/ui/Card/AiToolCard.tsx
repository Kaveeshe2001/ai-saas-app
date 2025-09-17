import { useNavigate, type To } from "react-router-dom"
import { useAuth } from "../../../context/useAuth";
import { AiToolsData } from "../../../assets/assets";

const AiToolCard = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleClick = (path: To) => {
    if (isLoggedIn()) {
        navigate(path);
    } else {
        navigate('/login');
    }
  };

  return (
    <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => (
            <div 
                key={index} 
                className="p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => handleClick(tool.path)} 
            >
                <tool.Icon 
                    className="w-12 h-12 p-3 text-white rounded-xl" 
                    style={{background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`}}
                />
                <h3 className="mt-6 mb-3 text-lg font-semibold">{tool.title}</h3>
                <p className="text-gray-400 text-sm max-w-[95%]">{tool.description}</p>
            </div>
        ))}
    </div>
  );
};

export default AiToolCard;
