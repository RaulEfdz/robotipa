import React from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

interface ContactTurnstileProps {
  onVerify: (token: string) => void;
  onError?: (error: any) => void;
}

export default function ContactTurnstile({ onVerify, onError }: ContactTurnstileProps) {
  return (
    <div className="flex justify-center items-center">
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || ''}
      />
    </div>
  );
}
