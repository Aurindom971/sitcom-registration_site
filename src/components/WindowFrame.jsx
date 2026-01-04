import { motion } from 'framer-motion';

const WindowFrame = ({ children, title, padding = '60px' }) => {
    return (
        <motion.div
            className="window-frame"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                background: '#ffffff',
                borderRadius: '32px', // Slightly smoother corners
                boxShadow: '0 60px 120px rgba(0,0,0,0.8), 0 20px 50px rgba(0,0,0,0.5)', // Ultra-strong shadow
                width: '100%',
                maxWidth: '600px',
                minHeight: '300px',
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255,255,255,1)',
                margin: '40px 0' // More margin for the huge shadow
            }}
        >
            <div className="window-header" style={{
                padding: '15px 20px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                </div>
                <h2 style={{ margin: 0, fontSize: '1.35rem', color: '#333' }}>{title}</h2>
                <div style={{ width: '40px' }}></div> {/* Spacer for centering */}
            </div>

            <div className="window-content" style={{
                padding: padding,
                flex: 1,
                position: 'relative'
            }}>
                {children}
            </div>
        </motion.div>
    );
};

export default WindowFrame;
