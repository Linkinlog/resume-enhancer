import React, { useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import Layout from '@/components/layout';

type PlanTier = {
  name: string;
  price: number | string;
  credits: number | string;
  billingCycle: 'month' | 'year';
  isMostPopular?: boolean;
  features: string[];
  cta: string;
};

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: PlanTier[] = [
    {
      name: 'Free Starter',
      price: 0,
      credits: 7,
      billingCycle: 'month',
      features: [
        'Basic Resume Optimization',
        'AI Job Description Matching',
        'Community Support'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Pro Monthly',
      price: 9.99,
      credits: 10,
      billingCycle: 'month',
      features: [
        'Everything in Free Starter',
        'Advanced Resume Optimization',
        'Multiple Job Matches',
      ],
      cta: 'Go Pro'
    },
    {
      name: 'Power Monthly',
      price: 14.99,
      credits: 15,
      billingCycle: 'month',
      isMostPopular: true,
      features: [
        'All Pro Monthly Features',
        'Premium Resume Polishing',
        'Unlimited Job Descriptions',
        'Priority Support',
        'Credit Rollover'
      ],
      cta: 'Unlock Potential'
    },
    {
      name: 'Annual Standard',
      price: 99.99,
      credits: 95,
      billingCycle: 'year',
      features: [
        'Everything in Pro Monthly',
        'Significant Credit Savings',
        'Exclusive Content'
      ],
      cta: 'Save Annually'
    },
    {
      name: 'Annual Premium',
      price: 149.99,
      credits: 210,
      billingCycle: 'year',
      features: [
        'All Power Monthly Features',
        'Massive Credit Bonus',
        'Dedicated Success Manager',
        'Custom Career Insights'
      ],
      cta: 'Accelerate Career'
    },
    {
      name: 'Unlimited',
      price: 199.99,
      credits: 'Unlimited',
      billingCycle: 'year',
      features: [
        'Comprehensive Career Support',
        'Unlimited Credit Usage',
        'Priority Feature Requests'
      ],
      cta: 'Total Access'
    }
  ];

  const filteredPlans = plans.filter(plan =>
    billingCycle === 'monthly'
      ? plan.billingCycle === 'month'
      : plan.billingCycle === 'year'
  );

  return (
    <Layout>
      <div className="min-h-max bg-background py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Flexible Pricing for Your Career Journey
            </h1>
            <p className="text-foreground max-w-2xl mx-auto">
              Unlock your potential with credits that adapt to your career advancement needs.
            </p>

            <div className="flex justify-center mt-8">
              <div className="bg-primary rounded-full p-1 flex items-center">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`
                  px-6 py-2 rounded-full transition-colors
                  ${billingCycle === 'monthly'
                      ? 'bg-secondary text-white'
                      : 'text-foreground hover:bg-primary hover:opacity-90'
                    }
                `}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`
                  px-6 py-2 rounded-full transition-colors
                  ${billingCycle === 'yearly'
                      ? 'bg-secondary text-white'
                      : 'text-foreground hover:bg-primary hover:opacity-90'
                    }
                `}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div
                key={plan.name}
                className={`
                bg-background backdrop-blur-sm
                border border-primary
                rounded-xl p-6
                transition-all duration-300
                ${plan.isMostPopular
                    ? 'ring-2 ring-secondary scale-105'
                    : ''
                  }
                relative
              `}
              >
                {plan.isMostPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    {plan.name}
                  </h2>
                  <div className="flex justify-center items-baseline mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      ${plan.price}
                    </span>
                    <span className="ml-2 text-foreground">
                      {plan.billingCycle === 'month' ? '/mo' : '/year'}
                    </span>
                  </div>
                  <div className="mb-6 text-foreground">
                    {typeof plan.credits === 'number'
                      ? `${plan.credits} Career Credits`
                      : 'Unlimited Career Credits'}
                  </div>
                  <button className={`
                            w-full py-3 rounded-lg transition-colors bg-secondary
                            duration-300
                            ${plan.isMostPopular ? 'text-white hover:opacity-90' : 'text-white hover:opacity-80'}
                            mb-6`}
                  >
                    {plan.cta}
                  </button>
                </div>
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-secondary" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-11 text-center">
            <div className="rounded-xl p-6 max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Credit Flexibility
              </h3>
              <p className="text-foreground mb-4">
                Credits are dynamically allocated based on optimization complexity.
                Advanced resume tailoring or deep job matching may require more credits.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  className="bg-primary text-background px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                  href="/credit-guide"
                >

                  Credit Guide
                </Link>
                <Link
                  className="bg-primary text-background px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
                  href="/credit-calculator"
                >
                  Credit Calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;
