import FormWizard from './components/FormWizard';
import './index.css';
import logo from './image (1).png';

function App() {
    return (
        <div className="App">
            <img src={logo} alt="MTC Logo" className="top-logo" />
            <FormWizard />
            <footer className="site-footer">Microsoft Tech Community</footer>
        </div>
    )
}
export default App;
