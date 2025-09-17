import { Row } from 'react-bootstrap';
import './form.css';

type FormProps = {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <div className='form'>
        <form onSubmit={onSubmit}>
            <Row>{children}</Row>
        </form>
    </div>
  )
}

export default Form
