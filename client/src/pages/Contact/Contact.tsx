import { useState } from "react";
import { contactPostAPI } from "../../services/ContactServices";
import { toast } from "react-toastify";
import { RiMailSendLine, RiMapPinLine, RiPhoneLine } from "@remixicon/react";
import Input from "../../components/ui/Input/Input";
import Textarea from "../../components/ui/TextArea/Textarea";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import Form from "../../components/ui/Form/Form";

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
  }>({});

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; subject?: string; } = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!subject.trim()) newErrors.subject = 'Subject is required';

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    
    setErrors({});
    setIsLoading(true);

    try {
        const res = await contactPostAPI(name, email, subject, message);
        if (res) {
            toast.success('Your message has been sent successfully!');

            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        }
    } catch (e: any) {
        toast.error(e.message || "Something went wrong. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
            <h2 className="text-xl font-semibold text-[var(--primary-color)] tracking-wide uppercase">Contact Us</h2>
            <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-4xl">Get in Touch</p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                We'd love to hear from you. Please fill out this form and we will get in touch with you shortly.
            </p>
        </div>

        {/* Main Content Grid */}
        <div className="bg-gray-100 rounded-3xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Left Column Contact Info */}
                <div className="bg-white dark:bg-[var(--primary-color)] p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                <RiPhoneLine className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Phone</h4>
                                <p className="text-gray-100">+94 76 562 23698</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                <RiMailSendLine className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                                <p className="text-gray-100">support@example.com</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                                <RiMapPinLine className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Address</h4>
                                <p className="text-gray-100">Homagama, Sri Lanka</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column Form */}
                <div className="lg:col-span-2">
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <Input
                                type='text'
                                label='Full Name'
                                placeHolder='Kaveesha Waduge'
                                id='name'
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={errors.name}
                            />
                        </div>
                        <div>
                            <Input
                                type='email'
                                label='Email Address'
                                placeHolder='ks@example.com'
                                id='email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <Input
                                type='text'
                                label='Subject'
                                placeHolder='e.g., Feedback on your services'
                                id='subject'
                                name='subject'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                error={errors.subject}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <Textarea
                                label='Message'
                                placeHolder='Write your message here...'
                                name='message'
                                id='message'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <PrimaryButton
                                text={isLoading ? "Sending..." : "Send Message"}
                                type="submit"
                                variant="default"
                            />
                        </div>
                    </Form>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;