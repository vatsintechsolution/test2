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

const ButtonOverlay = ({ top, left, size = '30px', onClick, 'aria-label': ariaLabel }: ButtonProps) => (
  <button
    style={{
      position: 'absolute',
      top: top,
      left: left,
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
);

interface RemoteControlProps {
  onPowerClick?: () => void;
  onPowerOffClick?: () => void;
  onLightClick?: () => void;
  onSpeedClick?: (speed: number) => void;
  onClockwiseClick?: () => void;
  onAntiClockwiseClick?: () => void;
}

export const RemoteControl: React.FC<RemoteControlProps> = ({
  onPowerClick,
  onPowerOffClick,
  onLightClick,
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
        src="/remote-ecolink.png"
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
      
      {/* Power Off Button */}
      <ButtonOverlay
        top="10%"
        left="55%"
        size="20px"
        onClick={onPowerOffClick}
        aria-label="Power Off"
      /> 

      {/* Light Button */}
      <ButtonOverlay
        top="34%"
        left="55.5%"
        size="20px"
        onClick={onLightClick}
        aria-label="Light"
      />

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
      <ButtonOverlay
        top="23%"
        left="54%"
        size="20px"
        onClick={() => onSpeedClick?.(4)}
        aria-label="Speed 4"
      />
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