import { useState } from "react";
import { useAuth } from "../../context/useAuth"
import Form from "../../components/ui/Form/Form";
import { Col } from "react-bootstrap";
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
      newErrors.password = "Passwords dosen't match";
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
        <Col md={12} className="mb-20">
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
        </Col>
        <Col md={6}>
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
        </Col>
        <Col md={6}>
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
        </Col>
        <Col md={6}>
            <Input
                label='Confirm Password'
                type='password'
                placeHolder='Password@123'
                id='cpassword'
                name='cpassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </Col>
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
