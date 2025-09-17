import './secondaryButton.css';

type SecondaryButtonProps = {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    link?: string;
    type?: 'button' | 'submit' | 'reset';
    size?: 'lg';
    variant?: 'active' | 'nonActive';
};

const SecondaryButton = ({
    text,
    onClick,
    link,
    type,
    size,
    variant,
}: SecondaryButtonProps) => {
  return (
    <>
        {link ? (
            <a
              className={`bid-btn ${size === 'lg' && 'lg'} ${
                variant === 'active'
                  ? 'active'
                  : variant === 'nonActive'
                  ? 'nonActive'
                  : ''
              }`}
              href={link}
            >
                {text}
            </a>
        ) : (
            <button
              className={`bid-btn ${size === 'lg' && 'lg'} ${
                variant === 'active'
                  ? 'active'
                  : variant === 'nonActive'
                  ? 'nonActive'
                  : ''
              }`}
              onClick={onClick}
              type={type}
            >
              {text}
            </button>
        )}
    </>
  );
};

export default SecondaryButton;
