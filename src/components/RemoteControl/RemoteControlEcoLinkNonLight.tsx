'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// Regular div container with inline styles as fallback
const RemoteContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: 'relative',
      width: '300px',
      height: '500px',
      margin: '0 auto',
      zIndex: 1000, // Lower than the mobile menu overlay
    }}
  >
    {children}
  </div>
);

// Button with inline styles as fallback
interface ButtonProps {
  top: string;
  left: string;
  size?: string;
  onClick?: () => void;
  'aria-label': string;
  children?: React.ReactNode;
}

const ButtonOverlay = ({ top, left, size = '30px', onClick, 'aria-label': ariaLabel, children }: ButtonProps) => (
  <div
    style={{
      position: 'absolute',
      top: top,
      left: left,
    }}
  >
    <button
      style={{
        width: size,
        height: size,
        border: '0px solid rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: 1001, // Lower than the mobile menu overlay
        transition: 'all 0.2s ease',
      }}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      }}
    />
    {children}
  </div>
);

// Custom tooltip component
interface TooltipProps {
  text: string;
  position: 'left' | 'right';
}

const Tooltip = ({ text, position }: TooltipProps) => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      [position]: position === 'right' ? '-180px' : '-180px',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      zIndex: 1002,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      minWidth: '120px',
    }}
  >
    {/* Arrow for the tooltip */}
    <div
      style={{
        position: 'absolute',
        width: '10px',
        height: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        transform: 'rotate(45deg)',
        top: 'calc(50% - 5px)',
        [position === 'right' ? 'left' : 'right']: '-5px',
      }}
    />
    {text}
  </div>
);

interface RemoteControlProps {
  onPowerClick?: () => void;
  onPowerOffClick?: () => void;
  onSpeedUpClick?: () => void;
  onSpeedDownClick?: () => void;
  onSpeedClick?: (speed: number) => void;
  onClockwiseClick?: () => void;
  onAntiClockwiseClick?: () => void;
}

export const RemoteControl: React.FC<RemoteControlProps> = ({
  onPowerClick,
  onPowerOffClick,
  onSpeedUpClick,
  onSpeedDownClick,
  onSpeedClick,
  onAntiClockwiseClick,
}) => {
  const [isClockwise, setIsClockwise] = useState(true);

  const handleDirectionToggle = () => {
    // Toggle the direction state
    setIsClockwise(prev => !prev);
    // Call the handler which will handle the direction change in the parent
    onAntiClockwiseClick?.();
  };

  return (
    <RemoteContainer>
      <Image
        src="/ecolink-non-light-remote.png"
        alt="Fan Remote Control"
        width={300}
        height={500}
        priority
        style={{
          width: '100%',
          height: 'auto',
          userSelect: 'none',
          zIndex: 1,
        }}
      />
      
      {/* Power On Button */}
      <ButtonOverlay
        top="10%"
        left="39%"
        size="20px"
        onClick={onPowerClick}
        aria-label="Power On"
      />   
      
      {/* Power Off Button with Tooltip */}
      <ButtonOverlay
        top="10%"
        left="55%"
        size="20px"
        onClick={onPowerOffClick}
        aria-label="Power Off"
      >
        <Tooltip text=" Turn Power on/off" position="right"  />
      </ButtonOverlay> 

      {/* Speed Up Button */}
      <ButtonOverlay
        top="34%"
        left="39%"
        size="20px"
        onClick={onSpeedUpClick}
        aria-label="Speed Up"
      >
        {/* <Tooltip text="Increase speed" position="left" /> */}
      </ButtonOverlay>

      {/* Speed Down Button */}
      <ButtonOverlay
        top="34%"
        left="55%"
        size="20px"
        onClick={onSpeedDownClick}
        aria-label="Speed Down"
      >
        <Tooltip text="Control the speed" position="right" />
      </ButtonOverlay>

      {/* Speed Dial Buttons - Center Circle */}
      <ButtonOverlay
        top="23.5%"
        left="45.5%"
        size="30px"
        onClick={() => onSpeedClick?.(6)}
        aria-label="Speed Center"
      />

      {/* Speed Buttons */}
      <ButtonOverlay
        top="28%"
        left="42%"
        size="20px"
        onClick={() => onSpeedClick?.(1)}
        aria-label="Speed 1"
      />
      <ButtonOverlay
        top="23%"
        left="40%"
        size="20px"
        onClick={() => onSpeedClick?.(2)}
        aria-label="Speed 2"
      />
      <ButtonOverlay
        top="20%"
        left="47.5%"
        size="20px"
        onClick={() => onSpeedClick?.(3)}
        aria-label="Speed 3"
      />
      {/* Speed 4 Button with Tooltip */}
      <ButtonOverlay
        top="23%"
        left="54%"
        size="20px"
        onClick={() => onSpeedClick?.(4)}
        aria-label="Speed 4"
      >
        <Tooltip text="Control the speed" position="right" />
      </ButtonOverlay>
      <ButtonOverlay
        top="28%"
        left="52%"
        size="20px"
        onClick={() => onSpeedClick?.(5)}
        aria-label="Speed 5"
      />

      {/* Direction Toggle Button */}
      <ButtonOverlay
        top="15.5%"
        left="47%"
        size="20px"
        onClick={handleDirectionToggle}
        aria-label={isClockwise ? "Clockwise" : "Anti-clockwise"}
      />
    </RemoteContainer>
  );
}; 