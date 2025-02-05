import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Lock, User } from 'lucide-react';
import Layout from '@/components/layout';

type AuthMode = 'login' | 'signup' | 'reset';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication logic will go here
    console.log(authMode, { email, password, name });
  };

  return (
    <Layout>
      <div className="min-h-max py-10 bg-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-background backdrop-blur-sm border border-primary rounded-xl p-8 shadow-lg">
            <h2 className="text-center text-3xl font-bold text-foreground mb-8">
              {authMode === 'login' ? 'Welcome Back' :
                authMode === 'signup' ? 'Create Your Account' :
                  'Reset Your Password'}
            </h2>

            <div className="space-y-4 mb-6">
              <button className="text-background w-full flex items-center justify-center gap-2 py-3 bg-white border border-primary rounded-lg hover:opacity-90 transition-opacity">
                <Github className="w-5 h-5" />
                Continue with GitHub
              </button>
              <button className="text-background w-full flex items-center justify-center gap-2 py-3 bg-white border border-primary rounded-lg hover:opacity-90 transition-opacity">
                <Mail className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-background text-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-background" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 bg-white border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-background" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-background" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={authMode === 'signup' ? 'new-password' : 'current-password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Password"
                  />
                </div>
              </div>

              {authMode === 'login' && (
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setAuthMode('reset')}
                    className="text-sm text-primary hover:text-primary"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {authMode === 'login' ? 'Sign In' :
                    authMode === 'signup' ? 'Create Account' :
                      'Reset Password'}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              {authMode === 'login' && (
                <p className="text-sm text-foreground">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setAuthMode('signup')}
                    className="text-primary hover:text-primary"
                  >
                    Sign up
                  </button>
                </p>
              )}
              {authMode === 'signup' && (
                <p className="text-sm text-foreground">
                  Already have an account?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-primary hover:text-primary"
                  >
                    Sign in
                  </button>
                </p>
              )}
              {authMode === 'reset' && (
                <p className="text-sm text-foreground">
                  Remember your password?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="text-primary hover:text-primary"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
