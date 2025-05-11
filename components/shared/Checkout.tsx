'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { checkoutCredits } from '@/lib/actions /transaction.action';
import { Button } from '../ui/button';

type CheckoutProps = {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
};

const Checkout = ({ plan, amount, credits, buyerId }: CheckoutProps) => {
  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      toast('Order placed!', {
        description: 'You will receive an email confirmation',
        duration: 5000,
      });
    }

    if (query.get('canceled')) {
      toast('Order Cancelled!', {
        description: 'Continue to shop around and checkout when you\'re ready',
        duration: 5000,
      });
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onCheckout();
      }}
    
    >
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-600 bg-cover"
          onClick={()=>{
             onCheckout();
          }}
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
