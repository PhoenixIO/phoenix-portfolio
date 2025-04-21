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

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  
  // Валідація форми
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Будь ласка, введіть ваше ім'я";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Будь ласка, введіть вашу електронну пошту";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Будь ласка, введіть коректну електронну пошту";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Будь ласка, введіть ваше повідомлення";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Обробка відправки форми
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Імітація відправки даних на сервер з затримкою
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Виклик callback функції, якщо вона передана
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Скидання форми
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Показуємо повідомлення про успішну відправку
      setIsSuccess(true);
      
      // Через 5 секунд приховуємо повідомлення про успіх
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        message: "Виникла помилка при відправці. Спробуйте ще раз пізніше."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Обробка зміни полів форми
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаємо помилку для поля, яке змінюється
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Анімація форми при успішній відправці
  useEffect(() => {
    if (isSuccess && formRef.current && successRef.current) {
      // Анімуємо появу повідомлення про успіх
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
      
      // Змінюємо колір форми на зелений для індикації успіху
      gsap.fromTo(
        formRef.current,
        { borderColor: 'rgba(255, 255, 255, 0.1)' },
        { 
          borderColor: 'rgba(0, 200, 100, 0.5)', 
          duration: 0.5,
          onComplete: () => {
            // Повертаємо форму до початкового стану
            gsap.to(formRef.current, {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              delay: 2,
              duration: 1
            });
          }
        }
      );
    }
  }, [isSuccess]);

  return (
    <div className="contact-form-container">
      <h2 className="contact-title">Зв'яжіться зі мною</h2>
      
      {isSuccess && (
        <div className="success-message" ref={successRef}>
          <div className="success-icon">✓</div>
          <p>Дякую! Ваше повідомлення успішно відправлено.</p>
        </div>
      )}
      
      <form className="contact-form" onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <label htmlFor="name">Ім'я</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            disabled={isSubmitting}
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
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Повідомлення</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={errors.message ? 'error' : ''}
            disabled={isSubmitting}
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
            'Надіслати повідомлення'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;