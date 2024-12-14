"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

const WebApp = dynamic(() => import('@twa-dev/sdk'), { ssr: false });

const PaymentButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getInvoiceLink = async () => {
    try {
      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invoice link');
      }

      const data = await response.json();
      return data.invoiceLink;
    } catch (error) {
      setError('Failed to generate payment link. Please try again.');
      console.error('Error fetching invoice link:', error);
      return null;
    }
  };

  const openInvoice = async () => {
    setError(null); // Clear previous errors
    setLoading(true);
    const invoiceLink = await getInvoiceLink();
    setLoading(false);

    if (!invoiceLink) return;

    WebApp.openInvoice(invoiceLink, (status) => {
      if (status === 'paid') {
        alert('Payment successful!');
        // Update your application state here
      } else {
        alert('Payment failed or canceled.');
      }
    });
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        onClick={openInvoice}
        disabled={loading}
        aria-busy={loading}
        aria-label={loading ? 'Processing payment' : 'Pay with Stars'}
      >
        {loading ? 'Processing...' : 'Pay with Stars'}
      </button>
    </div>
  );
};

export default PaymentButton;
