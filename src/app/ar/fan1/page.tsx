'use client';

import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Script from 'next/script';

const GlobalStyle = createGlobalStyle`
  body, html {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
  }
`;

const SplashContainer = styled.div`
  background-color: rgb(31, 32, 33);
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  &.hidden {
    display: none;
  }
`;

const SplashBox = styled.div`
  width: 304px;
  max-width: 90%;
  background: rgba(31, 32, 33, 0.78);
  border-radius: 8px;
  padding: 50px 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 700;
  padding: 0;
  margin: 0;
  color: white;
`;

const Highlight = styled.span`
  color: #6ae5e0;
`;

const LaunchButton = styled.button`
  background: linear-gradient(94deg, #6be5ad 0%, #53afe4 100.05%);
  border-radius: 8px;
  border: none;
  padding: 11px 23px;
  font-size: 20px;
  margin-top: 30px;
  line-height: 24px;
  height: 48px;
  color: black;

  &:disabled {
    background: none;
    width: 48px;
    visibility: hidden;
    padding: 0px;

    &:before {
      content: ' ';
      visibility: visible;
      display: block;
      width: 48px;
      height: 48px;
      margin: 0px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 5px solid #fff;
      border-color: #fff transparent #fff transparent;
      animation: loading-animation 1.2s linear infinite;
    }
  }

  @keyframes loading-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SplashPage: React.FC = () => {
  const [isLaunched, setIsLaunched] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Script 
        src="/ar_data/fan2/index.e3e405.js" 
        type="module" 
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
      <GlobalStyle />
      <SplashContainer className={isLaunched ? 'hidden' : ''}>
        <SplashBox>
          <Title>
            An <Highlight>immersive</Highlight> web experience
          </Title>
          <LaunchButton 
            disabled={isLoading}
            onClick={() => setIsLaunched(true)}
          >
            Launch
          </LaunchButton>
        </SplashBox>
      </SplashContainer>
    </>
  );
};

export default SplashPage; 