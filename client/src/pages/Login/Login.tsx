import { useState } from "react";
import { useAuth } from "../../context/useAuth"
import Form from "../../components/ui/Form/Form";
import { Col } from "react-bootstrap";
import Input from "../../components/ui/Input/Input";
import PrimaryButton from "../../components/ui/PrimaryButton/PrimaryButton";

const Login = () => {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {username?: string; password?: string;} = {};

    if (!username) {
        newErrors.username = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        setErrors({});
        loginUser(username, password);
    }
  };

  return (
    <div className="auth-container">
      <Form onSubmit={handleSubmit}>
        <h2 className="auth-title">Login</h2>
        <Col md={6} className="mb-20">
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
        <div className="auth-btn">
            <PrimaryButton variant='white' text='Login' type='submit' />
        </div>
        <div className='auth-sup'>
          Don't have an account? <a href='/signup'>Signup</a>
        </div>
      </Form>
    </div>
  );
};

export default Login;
