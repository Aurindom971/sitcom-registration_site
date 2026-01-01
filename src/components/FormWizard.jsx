import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WindowFrame from './WindowFrame';
import CharacterOverlay from './CharacterOverlay';

// Placeholder Assets
// In a real scenario, these would be the generated assets
const CHARACTERS = {
    JOEY: { image: 'https://miro.medium.com/v2/resize:fit:1200/1*YQ95OhGOmr9KDKo4BZ8LqA.jpeg', dialogue: "Every great story starts with the basics. Name, details—this is chapter one." },
    CHANDLER: { image: 'https://i.pinimg.com/originals/ab/72/01/ab720195218502ed93b29e0083a3a044.jpg', dialogue: "Just the essentials here. Trust me, you’ve totally got this." },
    KRAMER: { image: 'https://i.pinimg.com/originals/88/37/35/88373542bb7a2bb0d4662728d5b7e697.jpg', dialogue: "Email and phone number! So we can keep you in the loop—cool, cool, cool." },
    ELAINE: { image: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/08/Seinfeld-Elaine-The-Susie.jpg?q=50&fit=crop&w=825&dpr=1.5', dialogue: "Make sure it’s correct. Miss one digit and—boom—total chaos." },
    SHELDON: { image: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2019/04/community-abed-flies.jpg', dialogue: "This is the academic arc of your character. Continuity matters." },
    DWIGHT: { image: 'https://www.nbc.com/sites/nbcblog/files/2022/07/the-office-how-to-watch.jpg', dialogue: "Tell us about your institute. Big place. Very impressive. Much learning." },

    ROSS: { image: 'https://images.alphacoders.com/122/thumb-1920-1227197.jpg', dialogue: "Form completed successfully. A rare and beautiful moment." },
    RACHEL: { image: 'https://wallpapercave.com/wp/wp10121611.jpg', dialogue: "You made it! let’s call this a win." },
};

const STEPS = [
    {
        id: 'personal',
        title: 'Personal Info',
        fields: ['name', 'age'],
        bgImage: 'https://south.tours/wp-content/uploads/2021/12/central-perk.jpg',
        characters: [
            { ...CHARACTERS.JOEY, position: 'center', compact: true },
            { ...CHARACTERS.CHANDLER, position: 'center', compact: true }
        ]
    },
    {
        id: 'contact',
        title: 'Contact Details',
        fields: ['email', 'phone'],
        bgImage: 'https://66.media.tumblr.com/95ebeef4e73dbad62ac4b2fe1ace81d5/tumblr_oujgviEjS41wped72o5_1280.jpg',
        characters: [
            { ...CHARACTERS.KRAMER, position: 'center', delay: 0.2, compact: true },
            { ...CHARACTERS.ELAINE, position: 'center', delay: 0.4, compact: true }
        ]
    },
    {
        id: 'academic',
        title: 'Academic Info',
        fields: ['batch', 'enrollmentNo', 'degree', 'course'],
        bgImage: 'https://www.slashgear.com/wp-content/uploads/2020/04/community_light_library.jpg',
        characters: [
            { ...CHARACTERS.SHELDON, position: 'center' }
        ]
    },
    {
        id: 'institute',
        title: 'Institute Details',
        fields: ['instituteName'],
        bgImage: 'https://i.pinimg.com/originals/82/20/a5/8220a5ece8ccc1dbdbe4e9bcc0b88e7b.jpg',
        characters: [
            { ...CHARACTERS.DWIGHT, position: 'center' }
        ]
    },
    {
        id: 'submission',
        title: 'Review & Submit',
        fields: [],
        bgImage: 'https://wallpapercave.com/wp/wp2892514.jpg',
        characters: [
            { ...CHARACTERS.ROSS, position: 'center' }
        ]
    },
    {
        id: 'finish',
        title: 'All Done!',
        fields: [],
        bgImage: 'https://easydecor101.com/wp-content/uploads/2020/12/modern-family-living-room-fresh-decorate-your-home-in-modern-family-style-phil-and-claire-of-modern-family-living-room.jpg',
        characters: [
            { ...CHARACTERS.RACHEL, position: 'large-center' }
        ]
    }
];

const FormWizard = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '', age: '',
        email: '', phone: '',
        batch: '', enrollmentNo: '', degree: '', course: '',
        instituteName: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [errors, setErrors] = useState({});

    const stepConfig = STEPS[currentStep];

    // Effect to update page background
    useEffect(() => {
        if (stepConfig.bgImage) {
            document.body.style.backgroundImage = `url(${stepConfig.bgImage})`;
        } else {
            document.body.style.backgroundImage = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        }

        // Cleanup function (optional, but good practice)
        return () => {
            // No-op or reset if needed
        };
    }, [currentStep, stepConfig.bgImage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep = () => {
        const newErrors = {};
        const { age, email, phone } = formData;

        if (stepConfig.id === 'personal') {
            if (!formData.name.trim()) newErrors.name = 'Name is required';
            const ageNum = parseInt(age);
            if (!age || isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
                newErrors.age = 'Age must be between 10 and 100';
            }
        }

        if (stepConfig.id === 'contact') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = 'Please enter a valid email address';
            }
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                newErrors.phone = 'Phone number must be exactly 10 digits';
            }
        }

        // Add validations for other steps if necessary
        if (stepConfig.id === 'academic') {
            if (!formData.batch) newErrors.batch = 'Batch is required';
            if (!formData.enrollmentNo.trim()) newErrors.enrollmentNo = 'Enrollment number is required';
            if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
            if (!formData.course.trim()) newErrors.course = 'Course is required';
        }

        if (stepConfig.id === 'institute') {
            if (!formData.instituteName.trim()) newErrors.instituteName = 'Institute name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async () => {
        if (!validateStep()) return;

        if (currentStep < STEPS.length - 1) {
            if (currentStep === STEPS.length - 2) {
                // Submitting before finish step
                setIsSubmitting(true);
                try {
                    // Use fetch since axios might not be installed correctly
                    const payload = {
                        personal: { name: formData.name, age: formData.age },
                        contact: { email: formData.email, phone: formData.phone },
                        academic: { batch: formData.batch, enrollmentNo: formData.enrollmentNo, degree: formData.degree, course: formData.course },
                        institute: { instituteName: formData.instituteName }
                    };

                    // Dynamically point to the server. If on the same network, localhost becomes the server's IP.
                    const serverUrl = `http://${window.location.hostname}:5000/api/register`;
                    const response = await fetch(serverUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (!response.ok) throw new Error('Failed to submit');

                    setCurrentStep(prev => prev + 1);
                } catch (err) {
                    console.error(err);
                    setSubmitError('Failed to save data. Please try again.');
                } finally {
                    setIsSubmitting(false);
                }
            } else {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <WindowFrame title={stepConfig.title}>
            {/* Form Content */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="form-content"
                style={{
                    position: 'relative',
                    zIndex: 30,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '400px'
                }}
            >
                {/* Characters - Moved Inside Form Flow */}
                <div style={{ marginBottom: '10px' }}>
                    <AnimatePresence mode='wait'>
                        {stepConfig.characters.map((char, index) => (
                            <CharacterOverlay
                                key={`${currentStep}-${char.name}-${index}`}
                                character={char}
                                position={char.position}
                                delay={char.delay || 0}
                                compact={char.compact}
                            />
                        ))}
                    </AnimatePresence>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '200px' }}>

                    {/* Step 1: Personal */}
                    {stepConfig.id === 'personal' && (
                        <>
                            <InputGroup label="Full Name" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
                            <InputGroup label="Age" name="age" type="number" value={formData.age} onChange={handleInputChange} error={errors.age} />
                        </>
                    )}

                    {/* Step 2: Contact */}
                    {stepConfig.id === 'contact' && (
                        <>
                            <InputGroup label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
                            <InputGroup label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} error={errors.phone} />
                        </>
                    )}

                    {/* Step 3: Academic */}
                    {stepConfig.id === 'academic' && (
                        <>
                            <div className="input-group">
                                <label>Batch</label>
                                <select name="batch" value={formData.batch} onChange={handleInputChange} className="custom-input" style={{ borderColor: errors.batch ? '#ff4d4d' : '#e0e0e0' }}>
                                    <option value="">Select Batch</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                </select>
                                {errors.batch && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '-4px', marginLeft: '4px' }}>{errors.batch}</span>}
                            </div>
                            <InputGroup label="Enrollment No" name="enrollmentNo" value={formData.enrollmentNo} onChange={handleInputChange} error={errors.enrollmentNo} />
                            <InputGroup label="Degree" name="degree" value={formData.degree} onChange={handleInputChange} error={errors.degree} />
                            <InputGroup label="Course" name="course" value={formData.course} onChange={handleInputChange} error={errors.course} />
                        </>
                    )}

                    {/* Step 4: Institute */}
                    {stepConfig.id === 'institute' && (
                        <>
                            <InputGroup label="Institute Name" name="instituteName" value={formData.instituteName} onChange={handleInputChange} error={errors.instituteName} />
                        </>
                    )}

                    {/* Step 5: Submission */}
                    {stepConfig.id === 'submission' && (
                        <div style={{
                            padding: '20px 30px',
                            background: '#fff',
                            border: '2px solid #ddd',
                            borderRadius: '16px',
                            boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.05)',
                            width: 'calc(100% + 60px)', // Stretching wider
                            margin: '0 -30px', // Pushing into the 50px padding of WindowFrame
                            boxSizing: 'border-box'
                        }}>
                            <h4 style={{ marginBottom: '20px', color: '#0055ea', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>Review Your Details</h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.85rem' }}>Name</strong> {formData.name}</div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.85rem' }}>Age</strong> {formData.age}</div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.85rem' }}>Email</strong> {formData.email}</div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.85rem' }}>Phone</strong> {formData.phone}</div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.85rem' }}>Batch</strong> {formData.batch}</div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.85rem' }}>Course</strong> {formData.course}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}><strong style={{ color: '#666', fontSize: '0.85rem' }}>Institute</strong> {formData.instituteName}</div>
                            </div>
                            {submitError && <div style={{ background: '#ffebeb', border: '1px solid #ffcccc', padding: '10px', marginTop: '15px', color: '#d00000', borderRadius: '3px', fontSize: '0.9rem' }}>{submitError}</div>}
                        </div>
                    )}

                    {/* Step 5: Finish */}
                    {stepConfig.id === 'finish' && (
                        <div style={{ textAlign: 'center', marginTop: '40px' }}>
                            <h3 style={{ fontSize: '1.3rem', color: '#28a745', marginBottom: '10px' }}>Registration Successful!</h3>
                            <p style={{ color: '#666' }}>Thank you for letting us know who you are.</p>
                        </div>
                    )}

                </div>

                {/* Navigation */}
                <div className="button-group" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 'auto',
                    paddingTop: '15px'
                }}>
                    {currentStep > 0 && currentStep < STEPS.length - 1 && (
                        <button onClick={handleBack} className="btn-secondary">Back</button>
                    )}
                    {currentStep === 0 && <div></div>} {/* Spacer */}

                    {currentStep < STEPS.length - 2 && (
                        <button onClick={handleNext} className="btn-primary">Next</button>
                    )}

                    {currentStep === STEPS.length - 2 && (
                        <button onClick={handleNext} className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Finish'}
                        </button>
                    )}

                </div>
            </motion.div>
        </WindowFrame>
    );
};

const InputGroup = ({ label, name, type = "text", value, onChange, error }) => (
    <div className="input-group">
        <label>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="custom-input"
            placeholder={`Enter your ${label.toLowerCase()}`}
            style={{ borderColor: error ? '#ff4d4d' : '#e0e0e0' }}
        />
        {error && <span style={{ color: '#ff4d4d', fontSize: '0.75rem', marginTop: '-4px', marginLeft: '4px' }}>{error}</span>}
    </div>
);

export default FormWizard;
