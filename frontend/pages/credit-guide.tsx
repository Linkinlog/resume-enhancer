import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Zap, Clock, Calendar } from 'lucide-react';
import Layout from '@/components/layout';
import Link from 'next/link';

export default function CreditGuidePage() {
  return (
    <Layout>
      <div className="min-h-max bg-background py-10 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground text-center mb-12">Understanding Credits</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background backdrop-blur-sm border border-primary rounded-xl p-6">
              <CreditCard className="w-8 h-8 text-secondary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-3">Credit Types</h2>
              <ul className="space-y-2 text-foreground">
                <li>One-Time Pack: 3 credits for quick tasks</li>
                <li>Monthly Plans: 10-15 credits for regular users</li>
                <li>Annual Plans: 95-unlimited credits for power users</li>
              </ul>
            </div>

            <div className="bg-background backdrop-blur-sm border border-primary rounded-xl p-6">
              <Clock className="w-8 h-8 text-secondary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-3">Credit Validity</h2>
              <ul className="space-y-2 text-foreground">
                <li>Monthly credits reset each billing cycle</li>
                <li>One-time pack credits never expire</li>
                <li>Annual credits available throughout the year</li>
              </ul>
            </div>

            <div className="bg-background backdrop-blur-sm border border-primary rounded-xl p-6">
              <Calendar className="w-8 h-8 text-secondary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-3">Extra Credits</h2>
              <ul className="space-y-2 text-foreground">
                <li>Medium Pack: 10 credits for $9.99</li>
                <li>Large Pack: 25 credits for $19.99</li>
                <li>Stack with any subscription plan</li>
              </ul>
            </div>

            <div className="bg-background backdrop-blur-sm border border-primary rounded-xl p-6">
              <Zap className="w-8 h-8 text-secondary mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-3">Usage Tips</h2>
              <ul className="space-y-2 text-foreground">
                <li>Credits deducted per optimization</li>
                <li>Unlimited plan includes fair-use policy</li>
                <li>Monitor usage in account dashboard</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              className="bg-secondary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-colors"
              href="/pricing"
            >
              View Pricing Plans
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
