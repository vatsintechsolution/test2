'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const RemoteContainer = styled.div`
  position: relative;
  width: 300px;
  height: 500px;
  margin: 0 auto;
`;

const ButtonOverlay = styled.button<{ top: string; left: string; size?: string }>`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  width: ${props => props.size || '30px'};
  height: ${props => props.size || '30px'};
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  user-select: none;
`;

interface RemoteControlProps {
  onPowerClick?: () => void;
  onLightClick?: () => void;
  onSpeedClick?: (speed: number) => void;
  onTimerClick?: () => void;
  onModeClick?: () => void;
  onOscillateClick?: () => void;
}

export const RemoteControl: React.FC<RemoteControlProps> = ({
  onPowerClick,
  onLightClick,
  onSpeedClick,
  // onTimerClick,
  // onModeClick,
  // onOscillateClick,
}) => {
  const buttonClasses = "bg-white/10  hover:bg-white/20 active:bg-white/30 transition-all duration-200";

  return (
    <RemoteContainer>
      <StyledImage
        src="/remote-design.png"
        alt="Fan Remote Control"
        width={300}
        height={500}
        priority
      />
      
      {/* Power Button */}
      <ButtonOverlay
        className={buttonClasses}
        top="12%"
        left="39%"
        size="25px"
        onClick={onPowerClick}
        aria-label="Power"
      />

      {/* Light Button */}
      <ButtonOverlay
        className={buttonClasses}
        top="12%"
        left="55%"
        size="25px"
        onClick={onLightClick}
        aria-label="Light"
      />

      {/* Speed Dial Buttons - Center Circle */}
      <ButtonOverlay
        className={buttonClasses}
        top="22%"
        left="45.5%"
        size="30px"
        onClick={() => onSpeedClick?.(1)}
        aria-label="Speed Center"
      />

      {/* Speed Buttons */}
      <ButtonOverlay
        className={buttonClasses}
        top="17%"
        left="47%"
        size="25px"
        onClick={() => onSpeedClick?.(1)}
        aria-label="Speed 1"
      />
      <ButtonOverlay
        className={buttonClasses}
        top="20%"
        left="54%"
        size="25px"
        onClick={() => onSpeedClick?.(2)}
        aria-label="Speed 2"
      />
      <ButtonOverlay
        className={buttonClasses}
        top="25%"
        left="54%"
        size="25px"
        onClick={() => onSpeedClick?.(3)}
        aria-label="Speed 3"
      />
      <ButtonOverlay
        className={buttonClasses}
      top="28%"
        left="47%"
        size="25px"
        onClick={() => onSpeedClick?.(4)}
        aria-label="Speed 4"
      />
      <ButtonOverlay
        className={buttonClasses}
        top="25%"
        left="39%"
        size="25px"
        onClick={() => onSpeedClick?.(5)}
        aria-label="Speed 5"
      />
      <ButtonOverlay
        className={buttonClasses}
        top="20%"
        left="38%"
        size="25px"
        onClick={() => onSpeedClick?.(6)}
        aria-label="Speed 6"
      />

      {/* <ButtonOverlay
        className={buttonClasses}
        top="72%"
        left="15%"
        size="25px"
        onClick={onTimerClick}
        aria-label="Timer"
      />

      <ButtonOverlay
        className={buttonClasses}
        top="72%"
        left="65%"
        size="25px"
        onClick={onModeClick}
        aria-label="Mode"
      />


      <ButtonOverlay
        className={buttonClasses}
        top="82%"
        left="40%"
        size="25px"
        onClick={onOscillateClick}
        aria-label="Oscillate"
      /> */}
    </RemoteContainer>
  );
}; 