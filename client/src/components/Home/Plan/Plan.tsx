import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import SubscriptionCard from "../../ui/Card/SubscriptionCard";
import { createCheckoutSessionAPI } from "../../../services/PaymentServices";

const Plan = () => {
  const { isLoggedIn, isPremium } = useAuth();
  const navigate = useNavigate();

  const features = {
    free: ["10 Image Generations/Day", "Basic Article Generation", "Public Gallery Access"],
    premium: ["Unlimited Image Generations", "Advanced Article Generation", "Access to All Image Styles", "Private Image Gallery"]
  };

  const handleFreeSubscribeClick = () => {
    navigate('/signup');
  }

  const handlePremiumSubscribeClick = async () => {
    if (!isLoggedIn) {
      navigate('/signup');
      return;
    }

    //if (!token) return;

    try {
      /*const response = await fetch(api + 'payment/create-checkout-session', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url;
      } else {
        console.error("Failed to create Stripe checkout session");
      }*/

      const data = await createCheckoutSessionAPI();
      if (data && data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Subscription Error:", error);
    }
  }
  return (
    <div className="max-w-2xl mx-auto z-20 my-30">
        <div className="text-center">
            <h2 className="text-slate-700 text-[42px] font-semibold">Choose Your Plan</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
                Start for free and scale up as you grow. Find the
                perfect plan for your content creation needs.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl w-full mx-auto mt-20">
            {/* Free Card */}
            <SubscriptionCard
                title="Free Plan"
                price="$0"
                description="Always free"
                features={features.free}
                isPremiumCard={false}
                isActive={isLoggedIn() && !isPremium}
                isLoggedIn={isLoggedIn()}
                onButtonClick={handleFreeSubscribeClick}
            />

            {/* Premium Card */}
            <SubscriptionCard
                title="Premium Plan"
                price="$10"
                description="Only billed monthly"
                features={features.premium}
                isPremiumCard={true}
                isActive={isLoggedIn() && isPremium}
                isLoggedIn={isLoggedIn()}
                onButtonClick={handlePremiumSubscribeClick}
            />
        </div>
    </div>
  )
}

export default Plan;
