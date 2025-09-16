import './form.css';

type FormProps = {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<FormProps> = ({ children, onSubmit }) => {
  return (
    <div className='form'>
        <form onSubmit={onSubmit}>
            <div className='flex flex-wrap -mx-3'>
                {children}
            </div>
        </form>
    </div>
  )
}

export default Form
