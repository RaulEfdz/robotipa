import React from 'react';
import Turnstile from '@marsidev/react-turnstile';

interface ContactTurnstileProps {
  onVerify: (token: string) => void;
  onError?: (error: any) => void;
}

export default function ContactTurnstile({ onVerify, onError }: ContactTurnstileProps) {
  return (
    <div className="flex justify-center items-center">
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || ''}
        onVerify={onVerify}
        onError={onError}
        options={{
          theme: 'dark',
          callback: (token) => {
            console.log('Turnstile verified:', token);
            onVerify(token);
          },
          error: (error) => {
            console.error('Turnstile error:', error);
            onError?.(error);
          },
        }}
      />
    </div>
  );
}
