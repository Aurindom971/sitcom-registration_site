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
            width: isLargeCenter ? '260px' : '200px', // Moderate from 320/240
            margin: '0 auto'
        };
    } else {
        posStyle = {
            width: '180px', // Moderate from 200
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
                marginBottom: isLargeCenter ? '25px' : '15px' // Reduced from 35/25
            }}
        >
            <div className="speech-bubble" style={{
                background: 'white',
                padding: compact ? '4px 12px' : '10px 22px', // Reduced from 6/14 vertical padding
                borderRadius: '16px',
                marginBottom: compact ? '-10px' : '8px', // Reduced from -8/12
                boxShadow: '1px 1px 12px rgba(0,0,0,0.1)',
                maxWidth: isLargeCenter ? '220px' : '160px',
                fontSize: isLargeCenter ? '1.1rem' : '0.95rem',
                fontWeight: isLargeCenter ? '600' : 'normal',
                textAlign: 'center',
                position: 'relative',
                order: 0,
                zIndex: 2
            }}>
                {character.dialogue}
                {/* Arrow logic: Always at the bottom pointing down */}
                <div className="bubble-arrow" style={{
                    position: 'absolute',
                    bottom: compact ? '-6px' : '-9px', // Adjusted for reduced padding
                    left: '50%',
                    transform: 'translateX(-50%)',
                    borderLeft: compact ? '8px solid transparent' : '11px solid transparent',
                    borderRight: compact ? '8px solid transparent' : '11px solid transparent',
                    borderTop: compact ? '8px solid white' : '11px solid white'
                }}></div>
            </div>

            <img
                src={character.image}
                alt={character.name}
                style={{
                    width: '100%',
                    height: isLargeCenter ? '200px' : (isCenter ? '160px' : '140px'),
                    objectFit: 'cover',
                    objectPosition: character.objectPosition || 'center',
                    borderRadius: '14px',
                    filter: 'drop-shadow(2px 2px 12px rgba(0,0,0,0.3))',
                    border: '4px solid white'
                }}
            />
        </motion.div>
    );
};

export default CharacterOverlay;
