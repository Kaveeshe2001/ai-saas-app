import SecondaryButton from "../Buttons/SecondaryButton/SecondaryButton";

interface SubscriptionCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    isActive: boolean;
    isPremiumCard: boolean;
    isLoggedIn: boolean;
    onButtonClick: () => void;
}

const SubscriptionCard = ({
    title,
    price,
    description,
    features,
    isActive,
    onButtonClick
}: SubscriptionCardProps) => {
  return (
    <div className={`relative flex flex-col justify-between border-2 rounded-lg shadow-lg transition-transform hover:scale-105 ${isActive ? 'border-green-500' : 'border-gray-300'}`}>
       <div className="flex flex-col gap-2 p-5 bg-amber-50">
            {isActive && (
                <div className="absolute top-0 right-4 -mt-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Active
                </div>
            )}

            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-3xl font-semibold">{price} <span className="text-xl text-gray-800">/month</span></p>
            <p className="text-gray-500 mb-2">{description}</p>
        </div>

        <ul className="space-y-3 mb-8 p-5">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        <div className="text-center mb-2">
            {!isActive && (
                <SecondaryButton variant="nonActive" text="Subscribe" type="submit" onClick={onButtonClick} />
            )}
        </div>
    </div>
  );
};

export default SubscriptionCard;
