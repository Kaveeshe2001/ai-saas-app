import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";

interface SubscriptionCardProps {
    title: string;
    price: string;
    features: string[];
    isActive: boolean;
}

const SubscriptionCard = ({
    title,
    price,
    features,
    isActive
}: SubscriptionCardProps) => {
  return (
    <div className={`relative border-2 rounded-lg p-8 shadow-lg transition-transform hover:scale-105 ${isActive ? 'border-green-500' : 'border-gray-300'}`}>
        {isActive && (
            <div className="absolute top-0 right-4 -mt-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Active
            </div>
        )}

        <h3 className="text-3xl font-bold text-center mb-2">{title}</h3>
        <p className="text-4xl font-extrabold text-center mb-6">{price}</p>

        <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        <div className="text-center">
            {!isActive && (
                <SecondaryButton variant="nonActive" text="Subscribe" type="submit" />
            )}
        </div>
    </div>
  );
};

export default SubscriptionCard;
