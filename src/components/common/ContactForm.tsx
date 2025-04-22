import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ContactForm.scss';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
}

const errorMessages = [
  "Oops! Your message tried to reach our server but got lost in the digital void. Our carrier pigeons are still in training!",
  "Oops! It seems our backend is on vacation. It left a note saying 'Gone fishing, back soon!'",
  "Oops! Your message was so good, our server got stage fright. Performance anxiety is real, even for computers!",
  "Oops! Your message not delivered. Our server is currently binge-watching Netflix and ignoring all responsibilities.",
  "Oops! Your message tried to find our backend but ended up in the Bermuda Triangle of code instead.",
  "Oops! Our developer is still building the mailroom. Your message is floating in digital limbo like an astronaut in space.",
  "Oops! Message delivery failed. Our hamster powering the server wheel needed a snack break.",
  "Oops! Your message was so brilliant, our server crashed from excitement. We're still sweeping up the digital confetti.",
  "Oops! Our backend took a sick day. It caught a nasty virus! (Sorry for the programmer humor)",
  "Oops! Your message was intercepted by digital gremlins. They're demanding cookies in exchange for delivery service.",
  "Houston, we have a problem! Your message is floating somewhere in cyberspace. Our digital astronauts are trying to retrieve it!"
];

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const getRandomErrorMessage = () => {
    const index = Math.floor(Math.random() * errorMessages.length);
    return errorMessages[index];
  };
  
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setIsError(false);
    
    try {
      // Simulate sending data to server with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate backend error (since there's no backend yet)
      // This ensures we always show the error message for this demo
      throw new Error("Backend not available");
      
      // Below code will run when you have a real backend
      // Call callback function if provided
      if (onSubmit) {
        // onSubmit(formData);
      }
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Show success message
      setIsSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage(getRandomErrorMessage());
      setIsError(true);
      
      // Hide error message after 10 seconds
      setTimeout(() => {
        setIsError(false);
      }, 10000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for changed field
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Animation for form submission results
  useEffect(() => {
    // Handle success animation
    if (isSuccess && formRef.current && successRef.current) {
      // Animate success message appearance
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      
      // Change form border color to green to indicate success
      gsap.fromTo(
        formRef.current,
        { borderColor: 'rgba(255, 255, 255, 0.1)' },
        { 
          borderColor: 'rgba(0, 200, 100, 0.5)', 
          duration: 0.5,
          onComplete: () => {
            // Return form to initial state
            gsap.to(formRef.current, {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              delay: 2,
              duration: 1
            });
          }
        }
      );
    }
    
    // Handle error animation
    if (isError && formRef.current && errorRef.current) {
      // Animate error message appearance
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      
      // Change form border color to red to indicate error
      gsap.fromTo(
        formRef.current,
        { borderColor: 'rgba(255, 255, 255, 0.1)' },
        { 
          borderColor: 'rgba(255, 70, 70, 0.5)', 
          duration: 0.5,
          onComplete: () => {
            // Return form to initial state
            gsap.to(formRef.current, {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              delay: 2,
              duration: 1
            });
          }
        }
      );
    }
  }, [isSuccess, isError]);

  return (
    <div className="contact-form-container">
      <h2 className="contact-title">Send a Message</h2>
      
      {isSuccess && (
        <div className="success-message" ref={successRef}>
          <div className="success-icon">✓</div>
          <p>Thank you! Your message has been sent successfully.</p>
        </div>
      )}
      
      {isError && (
        <div className="error-message-container" ref={errorRef}>
          <div className="error-icon">!</div>
          <p>{errorMessage}</p>
        </div>
      )}
      
      <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            disabled={isSubmitting}
            placeholder="Your name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            disabled={isSubmitting}
            placeholder="your.email@example.com"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={errors.message ? 'error' : ''}
            disabled={isSubmitting}
            placeholder="Write your message here..."
          ></textarea>
          {errors.message && <div className="error-message">{errors.message}</div>}
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading-spinner"></span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;