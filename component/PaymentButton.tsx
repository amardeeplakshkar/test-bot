import { useState } from 'react';
import WebApp from '@twa-dev/sdk';

const PaymentButton = () => {
  const [loading, setLoading] = useState(false);

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
      console.error('Error fetching invoice link:', error);
      return null;
    }
  };

  const openInvoice = async () => {
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
    <button onClick={openInvoice} disabled={loading}>
      {loading ? 'Processing...' : 'Pay with Stars'}
    </button>
  );
};

export default PaymentButton;
