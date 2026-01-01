import { motion } from 'framer-motion';

const CharacterOverlay = ({ character, position, delay = 0, compact = false }) => {
    // position can be 'left' or 'right' or 'center' or 'large-center' or 'bottom'

    const variants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                damping: 20,
                stiffness: 100,
                delay: delay
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.2 }
        }
    };

    const isLeft = position === 'left';
    const isCenter = position === 'center';
    const isLargeCenter = position === 'large-center';
    const isBottom = position === 'bottom';

    let posStyle = {};
    // Removed absolute positioning for centered variants to allow stacking
    if (isCenter || isLargeCenter) {
        posStyle = {
            width: isLargeCenter ? '240px' : '180px',
            margin: '0 auto'
        };
    } else {
        // Fallback or other specific positions (though we are moving to centering all)
        posStyle = {
            width: '160px',
            margin: '0 auto'
        };
    }

    return (
        <motion.div
            className={`character-container ${position}`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
                zIndex: 1,
                ...posStyle,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none',
                marginBottom: isLargeCenter ? '30px' : '20px'
            }}
        >
            <div className="speech-bubble" style={{
                background: 'white',
                padding: compact ? '4px 8px' : '12px 16px', // Even tighter padding
                borderRadius: '15px',
                marginBottom: compact ? '-6px' : '8px', // Negative margin to pull them together
                boxShadow: '1px 1px 10px rgba(0,0,0,0.1)',
                maxWidth: isLargeCenter ? '200px' : '140px',
                fontSize: isLargeCenter ? '1rem' : '0.8rem',
                fontWeight: isLargeCenter ? '600' : 'normal',
                textAlign: 'center',
                position: 'relative',
                order: 0,
                zIndex: 2 // Ensure bubble stays on top of image
            }}>
                {character.dialogue}
                {/* Arrow logic: Always at the bottom pointing down */}
                <div className="bubble-arrow" style={{
                    position: 'absolute',
                    bottom: compact ? '-5px' : '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderLeft: compact ? '5px solid transparent' : '10px solid transparent',
                    borderRight: compact ? '5px solid transparent' : '10px solid transparent',
                    borderTop: compact ? '5px solid white' : '10px solid white'
                }}></div>
            </div>

            <img
                src={character.image}
                alt={character.name}
                style={{
                    width: '100%',
                    height: isLargeCenter ? '180px' : (isCenter ? '140px' : '120px'),
                    objectFit: 'cover',
                    borderRadius: '12px',
                    filter: 'drop-shadow(2px 2px 12px rgba(0,0,0,0.3))',
                    border: '4px solid white'
                }}
            />
        </motion.div>
    );
};

export default CharacterOverlay;
