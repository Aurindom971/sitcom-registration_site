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
    MONICA: { image: 'https://api.time.com/wp-content/uploads/2014/04/478221211.jpg', dialogue: "Whether you’re doing this on your own or teaming up with someone amazing, the important thing is—you’re ready to start" },
    LEONARD: { image: 'https://wallpaper.dog/large/20671917.jpg', dialogue: "Academic data must be precise. Approximation is intellectually unacceptable.", objectPosition: 'center 20%' },
};

const STEPS_CONFIG = [
    {
        id: 'participation',
        title: 'Participation Mode',
        fields: ['participationMode', 'teamName'],
        bgImage: 'https://www.setdecorators.org/sites/setdecorators/images/images/pandrlesliewide.JPG',
        characters: [{ ...CHARACTERS.MONICA, position: 'center' }]
    },
    {
        id: 'personal',
        title: 'Personal Info',
        fields: ['name', 'age'],
        bgImage: 'https://south.tours/wp-content/uploads/2021/12/central-perk.jpg',
        characters: [CHARACTERS.JOEY, CHARACTERS.CHANDLER],
        repeat: true
    },
    {
        id: 'contact',
        title: 'Contact Details',
        fields: ['email', 'phone'],
        bgImage: 'https://66.media.tumblr.com/95ebeef4e73dbad62ac4b2fe1ace81d5/tumblr_oujgviEjS41wped72o5_1280.jpg',
        characters: [CHARACTERS.KRAMER, CHARACTERS.ELAINE],
        repeat: true
    },
    {
        id: 'academic',
        title: 'Academic Info',
        fields: ['batch', 'enrollmentNo', 'degree', 'course'],
        bgImage: 'https://www.slashgear.com/wp-content/uploads/2020/04/community_light_library.jpg',
        characters: [CHARACTERS.SHELDON, CHARACTERS.LEONARD],
        repeat: true
    },
    {
        id: 'institute',
        title: 'Institute Details',
        fields: ['instituteName', 'instituteName2'],
        bgImage: 'https://i.pinimg.com/originals/82/20/a5/8220a5ece8ccc1dbdbe4e9bcc0b88e7b.jpg',
        characters: [CHARACTERS.DWIGHT]
    },
    {
        id: 'submission',
        title: 'Review & Submit',
        fields: [],
        bgImage: 'https://wallpapercave.com/wp/wp2892514.jpg',
        characters: [CHARACTERS.ROSS]
    },
    {
        id: 'finish',
        title: 'All Done!',
        fields: [],
        bgImage: 'https://easydecor101.com/wp-content/uploads/2020/12/modern-family-living-room-fresh-decorate-your-home-in-modern-family-style-phil-and-claire-of-modern-family-living-room.jpg',
        characters: [CHARACTERS.RACHEL]
    }
];

const INITIAL_PARTICIPANT = {
    name: '', age: '',
    email: '', phone: '',
    batch: '', enrollmentNo: '', degree: '', course: '',
    instituteName: ''
};

const FormWizard = () => {
    const [formData, setFormData] = useState({
        participationMode: 'solo',
        teamName: '',
        participants: [{ ...INITIAL_PARTICIPANT }, { ...INITIAL_PARTICIPANT }],
        instituteName: '',
        instituteName2: ''
    });
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [reviewIndex, setReviewIndex] = useState(0); // 0 or 1 for sliding review
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [errors, setErrors] = useState({});

    // Dynamic Steps Generator
    const getDynamicSteps = () => {
        const steps = [];
        STEPS_CONFIG.forEach(step => {
            if (step.repeat && formData.participationMode === 'duo') {
                steps.push({ ...step, pIndex: 0 });
                steps.push({ ...step, pIndex: 1 });
            } else if (step.id === 'participation' || step.id === 'institute' || step.id === 'submission' || step.id === 'finish') {
                steps.push({ ...step, pIndex: 0 });
            } else {
                // Solo mode for repeatable steps
                steps.push({ ...step, pIndex: 0 });
            }
        });
        return steps;
    };

    const dynamicSteps = getDynamicSteps();
    const stepConfig = dynamicSteps[currentStepIndex] || dynamicSteps[0];
    const pIndex = stepConfig.pIndex || 0;
    // Effect to update page background
    useEffect(() => {
        if (stepConfig && stepConfig.bgImage) {
            document.body.style.backgroundImage = `url(${stepConfig.bgImage})`;
        } else {
            document.body.style.backgroundImage = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        }
    }, [currentStepIndex, stepConfig?.bgImage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'participationMode') {
            // Reset form when switching between Solo and Duo
            setFormData({
                participationMode: value,
                teamName: '',
                participants: [{ ...INITIAL_PARTICIPANT }, { ...INITIAL_PARTICIPANT }],
                instituteName: '',
                instituteName2: ''
            });
            // Reset step index to participation mode selection (Step 0)
            setCurrentStepIndex(0);
        } else if (name === 'teamName' || name === 'instituteName2' || name === 'instituteName') {
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => {
                const newParticipants = [...prev.participants];
                newParticipants[pIndex] = { ...newParticipants[pIndex], [name]: value };
                return { ...prev, participants: newParticipants };
            });
        }
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateStep = () => {
        const newErrors = {};
        const p = formData.participants[pIndex];

        if (stepConfig.id === 'participation') {
            if (formData.participationMode === 'duo' && !formData.teamName.trim()) {
                newErrors.teamName = 'Team name is required for Duo participation';
            }
        }

        if (stepConfig.id === 'personal') {
            if (!p.name.trim()) newErrors.name = 'Name is required';
            const ageNum = parseInt(p.age);
            if (!p.age || isNaN(ageNum) || ageNum < 10 || ageNum > 100) {
                newErrors.age = 'Age must be between 10 and 100';
            }
        }

        if (stepConfig.id === 'contact') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(p.email)) newErrors.email = 'Valid email required';
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(p.phone)) newErrors.phone = '10 digits required';
        }

        if (stepConfig.id === 'academic') {
            if (!p.batch) newErrors.batch = 'Batch is required';
            if (!p.enrollmentNo.trim()) newErrors.enrollmentNo = 'Enrollment number is required';
            if (!p.degree.trim()) newErrors.degree = 'Degree is required';
            if (!p.course.trim()) newErrors.course = 'Course is required';
        }

        if (stepConfig.id === 'institute') {
            if (!formData.instituteName.trim()) newErrors.instituteName = 'Institute name is required';
            if (formData.participationMode === 'duo' && !formData.instituteName2.trim()) {
                newErrors.instituteName2 = 'Participant 2 institute name is required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = async () => {
        if (!validateStep()) return;

        if (currentStepIndex < dynamicSteps.length - 1) {
            if (currentStepIndex === dynamicSteps.length - 2) {
                setIsSubmitting(true);
                try {
                    const payload = { ...formData };
                    const serverUrl = `http://${window.location.hostname}:5000/api/register`;
                    const response = await fetch(serverUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (!response.ok) throw new Error('Failed to submit');
                    setCurrentStepIndex(prev => prev + 1);
                } catch (err) {
                    setSubmitError(`Failed to save data: ${err.message}`);
                } finally {
                    setIsSubmitting(false);
                }
            } else {
                setCurrentStepIndex(prev => prev + 1);
            }
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    return (
        <WindowFrame
            title={stepConfig.title}
            padding={['academic', 'submission'].includes(stepConfig.id) ? '15px 60px 60px' : '60px'}
        >
            {/* Form Content */}
            <motion.div
                key={currentStepIndex}
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
                    minHeight: '250px' // Reduced from 400px
                }}
            >
                {/* Characters - Moved Inside Form Flow */}
                <div style={{ marginBottom: '10px' }}>
                    <AnimatePresence mode='wait'>
                        {stepConfig.characters && stepConfig.characters.map((char, index) => {
                            // If repeat is true, show only the character for the current pIndex
                            if (stepConfig.repeat && index !== pIndex && stepConfig.characters.length > 1) return null;
                            return (
                                <CharacterOverlay
                                    key={`${currentStepIndex}-${char.name}-${index}`}
                                    character={char}
                                    position="center"
                                    delay={0}
                                    compact={true}
                                />
                            );
                        })}
                    </AnimatePresence>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '150px' }}>

                    {/* Participant Indicator for Duo Mode */}
                    {formData.participationMode === 'duo' && stepConfig.repeat && (
                        <div style={{
                            fontSize: '1rem', // Moderate from 1.2rem
                            fontWeight: 'bold',
                            color: '#0055ea',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '-10px'
                        }}>
                            Participant {pIndex + 1}
                        </div>
                    )}

                    {/* Step 0: Participation */}
                    {stepConfig.id === 'participation' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange({ target: { name: 'participationMode', value: 'solo' } })}
                                    style={{
                                        flex: 1,
                                        padding: '18px', // Moderate from 24px
                                        borderRadius: '12px',
                                        border: '2px solid',
                                        borderColor: formData.participationMode === 'solo' ? '#0055ea' : '#eee',
                                        backgroundColor: formData.participationMode === 'solo' ? '#f0f7ff' : '#fff',
                                        color: formData.participationMode === 'solo' ? '#0055ea' : '#666',
                                        fontWeight: 'bold',
                                        fontSize: '1.15rem', // Moderate from 1.4rem
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Solo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleInputChange({ target: { name: 'participationMode', value: 'duo' } })}
                                    style={{
                                        flex: 1,
                                        padding: '18px', // Moderate from 24px
                                        borderRadius: '12px',
                                        border: '2px solid',
                                        borderColor: formData.participationMode === 'duo' ? '#0055ea' : '#eee',
                                        backgroundColor: formData.participationMode === 'duo' ? '#f0f7ff' : '#fff',
                                        color: formData.participationMode === 'duo' ? '#0055ea' : '#666',
                                        fontWeight: 'bold',
                                        fontSize: '1.15rem', // Moderate from 1.4rem
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Duo
                                </button>
                            </div>

                            {formData.participationMode === 'duo' && (
                                <InputGroup
                                    label="Team Name"
                                    name="teamName"
                                    value={formData.teamName}
                                    onChange={handleInputChange}
                                    error={errors.teamName}
                                />
                            )}
                        </div>
                    )}

                    {/* Repeated Steps: Personal, Contact, Academic */}
                    {['personal', 'contact', 'academic'].includes(stepConfig.id) && (
                        <>
                            {stepConfig.id === 'personal' && (
                                <>
                                    <InputGroup label="Full Name" name="name" value={formData.participants[pIndex].name} onChange={handleInputChange} error={errors.name} />
                                    <InputGroup label="Age" name="age" type="number" value={formData.participants[pIndex].age} onChange={handleInputChange} error={errors.age} />
                                </>
                            )}
                            {stepConfig.id === 'contact' && (
                                <>
                                    <InputGroup label="Email Address" name="email" type="email" value={formData.participants[pIndex].email} onChange={handleInputChange} error={errors.email} />
                                    <InputGroup label="Phone Number" name="phone" type="tel" value={formData.participants[pIndex].phone} onChange={handleInputChange} error={errors.phone} />
                                </>
                            )}
                            {stepConfig.id === 'academic' && (
                                <>
                                    <div className="input-group">
                                        <label>Batch</label>
                                        <select name="batch" value={formData.participants[pIndex].batch} onChange={handleInputChange} className="custom-input" style={{ borderColor: errors.batch ? '#ff4d4d' : '#e0e0e0' }}>
                                            <option value="">Select Batch</option>
                                            <option value="2026">2026</option>
                                            <option value="2027">2027</option>
                                            <option value="2028">2028</option>
                                            <option value="2029">2029</option>
                                        </select>
                                        {errors.batch && <span style={{ color: '#ff4d4d', fontSize: '0.75rem' }}>{errors.batch}</span>}
                                    </div>
                                    <InputGroup label="Enrollment No" name="enrollmentNo" value={formData.participants[pIndex].enrollmentNo} onChange={handleInputChange} error={errors.enrollmentNo} />
                                    <InputGroup label="Degree" name="degree" value={formData.participants[pIndex].degree} onChange={handleInputChange} error={errors.degree} />
                                    <InputGroup label="Course" name="course" value={formData.participants[pIndex].course} onChange={handleInputChange} error={errors.course} />
                                </>
                            )}
                        </>
                    )}

                    {/* Step: Institute */}
                    {stepConfig.id === 'institute' && (
                        <>
                            <InputGroup label={formData.participationMode === 'solo' ? "Institute Name" : "Participant 1 Institute Name"} name="instituteName" value={formData.instituteName} onChange={handleInputChange} error={errors.instituteName} />
                            {formData.participationMode === 'duo' && (
                                <InputGroup label="Participant 2 Institute Name" name="instituteName2" value={formData.instituteName2} onChange={handleInputChange} error={errors.instituteName2} />
                            )}
                        </>
                    )}

                    {/* Step: Submission */}
                    {stepConfig.id === 'submission' && (
                        <div style={{
                            padding: '30px 40px', background: '#fff', border: '2px solid #ddd', borderRadius: '16px',
                            boxShadow: 'inset 1px 1px 6px rgba(0,0,0,0.05)', width: 'calc(100% + 80px)', // Moderate from 100px
                            margin: '0 -40px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden'
                        }}>
                            <h4 style={{ marginBottom: '25px', color: '#0055ea', borderBottom: '1px solid #eee', paddingBottom: '15px', fontSize: '1.25rem' }}>
                                Review: {formData.participationMode === 'solo' ? 'Your Details' : `Participant ${reviewIndex + 1}`}
                            </h4>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={reviewIndex}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '1.1rem' }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.9rem' }}>Name</strong> {formData.participants[reviewIndex].name}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.9rem' }}>Age</strong> {formData.participants[reviewIndex].age}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.9rem' }}>Email</strong> {formData.participants[reviewIndex].email}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.9rem' }}>Phone</strong> {formData.participants[reviewIndex].phone}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.9rem' }}>Batch</strong> {formData.participants[reviewIndex].batch}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}><strong style={{ color: '#666', fontSize: '0.9rem' }}>Course</strong> {formData.participants[reviewIndex].course}</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gridColumn: 'span 2' }}>
                                        <strong style={{ color: '#666', fontSize: '0.9rem' }}>Institute</strong>
                                        {reviewIndex === 0 ? formData.instituteName : formData.instituteName2}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {formData.participationMode === 'duo' && (
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                                    <button
                                        onClick={() => setReviewIndex(0)}
                                        disabled={reviewIndex === 0}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '50%',
                                            border: '1px solid #ddd',
                                            background: reviewIndex === 0 ? '#eee' : '#fff',
                                            cursor: 'pointer',
                                            padding: 0
                                        }}
                                    >
                                        &lt;
                                    </button>
                                    <button
                                        onClick={() => setReviewIndex(1)}
                                        disabled={reviewIndex === 1}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '50%',
                                            border: '1px solid #ddd',
                                            background: reviewIndex === 1 ? '#eee' : '#fff',
                                            cursor: 'pointer',
                                            padding: 0
                                        }}
                                    >
                                        &gt;
                                    </button>
                                </div>
                            )}
                            {submitError && <div style={{ background: '#ffebeb', border: '1px solid #ffcccc', padding: '10px', marginTop: '15px', color: '#d00000', borderRadius: '3px', fontSize: '0.9rem' }}>{submitError}</div>}
                        </div>
                    )}

                    {/* Step 5: Finish */}
                    {stepConfig.id === 'finish' && (
                        <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px' }}>
                            <a
                                href="https://chat.whatsapp.com/E19T7bPxctQ1yTQkNBDoUv" // User will paste link here
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whatsapp-btn"
                                style={{
                                    backgroundColor: '#25D366',
                                    color: 'white',
                                    padding: '14px 28px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .011 5.403.008 12.039a11.81 11.81 0 001.532 5.827L0 24l6.305-1.654a11.82 11.82 0 005.738 1.482h.005c6.637 0 12.04-5.404 12.042-12.041a11.85 11.85 0 00-3.677-8.51z" />
                                </svg>
                                Join WhatsApp Group
                            </a>
                            <div>
                                <h3 style={{ fontSize: '1.3rem', color: '#28a745', marginBottom: '10px' }}>Registration Successful!</h3>
                                <p style={{ color: '#666' }}>Thank you for letting us know who you are.</p>
                            </div>
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
                    {currentStepIndex > 0 && currentStepIndex < dynamicSteps.length - 1 && (
                        <button onClick={handleBack} className="btn-secondary">Back</button>
                    )}
                    {currentStepIndex === 0 && <div></div>} {/* Spacer */}

                    {currentStepIndex < dynamicSteps.length - 2 && (
                        <button onClick={handleNext} className="btn-primary">Next</button>
                    )}

                    {currentStepIndex === dynamicSteps.length - 2 && (
                        <button onClick={handleNext} className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Finish'}
                        </button>
                    )}

                </div>
            </motion.div>
        </WindowFrame >
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
