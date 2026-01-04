import { useState } from 'react';
import FormWizard from './components/FormWizard';
import LandingAnimation from './components/LandingAnimation';
import './index.css';
import logo from './image (1).png';

function App() {
    const [showLanding, setShowLanding] = useState(true);

    return (
        <>
            {showLanding ? (
                <LandingAnimation onComplete={() => setShowLanding(false)} />
            ) : (
                <div className="App">
                    <img src={logo} alt="MTC Logo" className="top-logo" />
                    <FormWizard />
                    <footer className="site-footer">Microsoft Tech Community</footer>
                </div>
            )}
        </>
    )
}
export default App;
