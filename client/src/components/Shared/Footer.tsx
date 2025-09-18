import { useState } from "react"
import { assets } from "../../assets/assets";
import SecondaryButton from "../ui/Buttons/SecondaryButton/SecondaryButton";

const inputClasses = "block w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500";
const errorInputClasses = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{email?: string;}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; } = {};

    if (!email) {
        newErrors.email = 'Email is required';
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        setErrors({});
        setEmail('');
    }
  };

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
            <div className="md:max-w-96">
                <img className="h-9" src={assets.logo} alt="logo" />
                <p className="mt-6 text-sm">
                    Experience the power of AI with TasklyAi. <br/>
                    Transform your content creation with our suite of premium AI tools. Write 
                    articles, generate images, and enhance your workflow.
                </p>
            </div>
            <div className="flex-1 flex items-start md:justify-end gap-20">
                <div>
                    <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:text-gray-800 transition-colors">Home</a></li>
                        <li><a href="#" className="hover:text-gray-800 transition-colors">About us</a></li>
                        <li><a href="#" className="hover:text-gray-800 transition-colors">Contact us</a></li>
                        <li><a href="#" className="hover:text-gray-800 transition-colors">Privacy policy</a></li>
                    </ul>
                </div>
                <div className="w-full sm:max-w-sm">
                    <h2 className="font-semibold text-gray-800 mb-5">Subscribe to our newsletter</h2>
                    <div className="text-sm space-y-2">
                        <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-center items-center gap-2 pt-4">
                                <input
                                    type='email'
                                    placeholder='Enter your Email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    className={`${inputClasses} ${errors.email ? errorInputClasses : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                                <SecondaryButton variant="active" text="Subscribe" type="submit" />
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
            Copyright 2025 © Tescobit. All Right Reserved.
        </p>
    </footer>
  )
}

export default Footer
