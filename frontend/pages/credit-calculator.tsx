import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import Layout from '@/components/layout';
import Link from 'next/link';

const options = [
  { type: 'onetime', name: 'One-Time Pack', credits: 3, price: 4.99 },
  { type: 'medium', name: 'Extra Credits (Medium)', credits: 10, price: 9.99 },
  { type: 'large', name: 'Extra Credits (Large)', credits: 25, price: 19.99 }
];

export default function CreditCalculatorPage() {
  const [selections, setSelections] = useState<Record<string, number>>(
    Object.fromEntries(options.map(opt => [opt.type, 0]))
  );

  const totals = {
    credits: options.reduce((sum, opt) => sum + (opt.credits * selections[opt.type]), 0),
    price: options.reduce((sum, opt) => sum + (opt.price * selections[opt.type]), 0)
  };

  return (
    <Layout>
      <div className="min-h-max bg-background py-10 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground text-center mb-12">
            <Calculator className="inline-block w-10 h-10 text-secondary mr-4" />
            Credit Calculator
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {options.map(({ type, name, credits, price }) => (
              <div key={type} className="bg-background backdrop-blur-sm border border-primary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">{name}</h2>
                  <span className="text-foreground">${price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelections(prev => ({
                        ...prev,
                        [type]: Math.max(0, prev[type] - 1)
                      }))}
                      className="w-8 h-8 flex items-center justify-center bg-primary text-background rounded-lg"
                    >-</button>
                    <span className="text-lg font-medium text-foreground w-8 text-center">
                      {selections[type]}
                    </span>
                    <button
                      onClick={() => setSelections(prev => ({
                        ...prev,
                        [type]: prev[type] + 1
                      }))}
                      className="w-8 h-8 flex items-center justify-center bg-primary text-background rounded-lg"
                    >+</button>
                  </div>
                  <span className="text-foreground">
                    Credits: {credits * selections[type]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-foreground mb-4">
              Total: {totals.credits} credits (${totals.price.toFixed(2)})
            </div>
            <div className="flex justify-center gap-4">
              <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors">
                Purchase Credits
              </button>
              <Link
                className="bg-primary text-background px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
                href="/pricing"
              >
                View Plans
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
