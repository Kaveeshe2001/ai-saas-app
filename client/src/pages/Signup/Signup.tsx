import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/Input/Input";
import PrimaryButton from "../../components/ui/Buttons/PrimaryButton/PrimaryButton";

const Signup = () => {
  const { registerUser } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!username) {
        newErrors.username = 'Username is required';
    }
    if (!email) {
        newErrors.email = 'Email is required';
    }
    if (!password) {
        newErrors.password = 'Password is required';
    }
    if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is Required';
    }
    if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match"; // Fixed to apply error to the correct field
    }
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        setErrors({});
        registerUser(email, username, password);
    }
  };

  return (
    <div className="auth-container">
      <Form onSubmit={handleSubmit}>
        <h2 className="auth-title">Sign Up</h2>

        {/* This parent div creates the responsive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 w-full">
          
          {/* This div spans 2 columns on medium screens to match md={12} */}
          <div className="md:col-span-2">
            <Input
              label='Username'
              type='text'
              placeHolder='Kaveesha'
              id='username'
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
            />
          </div>

          <div>
            <Input
              label='Email'
              type='email'
              placeHolder='example@gmail.com'
              id='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
          </div>
          
          <div>
            <Input
              label='Password'
              type='password'
              placeHolder='Password@123'
              id='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
            />
          </div>
          
          <div>
            <Input
              label='Confirm Password'
              type='password'
              placeHolder='Password@123'
              id='cpassword'
              name='cpassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
            />
          </div>
        </div>

        <div className="auth-btn">
            <PrimaryButton variant="white" text="Sign Up" type="submit" />
        </div>
        <div className="auth-sup">
            Already have an account? <a href="/login">Login</a>
        </div>
      </Form>
    </div>
  );
};

export default Signup;