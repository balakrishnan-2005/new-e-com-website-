
import React, { useState } from 'react';
import { X, Mail, Lock, User, Loader2, Sparkles, AlertCircle, Info, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { setMockUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<{ message: string; type: 'error' | 'info' | 'success' } | null>(null);

  if (!isOpen) return null;

  const handleDemoLogin = () => {
    setLoading(true);
    setError({ message: 'Accessing Artisan Dashboard...', type: 'info' });
    
    setTimeout(() => {
      setMockUser('artisan@sweetmoments.com');
      setDemoSuccess(true);
      setTimeout(() => {
        onClose();
        setLoading(false);
        setDemoSuccess(false);
      }, 1000);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let authResult;
      if (isLogin) {
        authResult = await supabase.auth.signInWithPassword({ email, password });
      } else {
        authResult = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
      }

      if (authResult.error) {
        // Handle specific rate limit or credential errors by suggesting demo mode
        if (authResult.error.message.includes('rate limit') || authResult.error.message.includes('Invalid login')) {
          throw authResult.error;
        }
        throw authResult.error;
      }
      
      setDemoSuccess(true);
      setTimeout(() => {
        onClose();
        setLoading(false);
      }, 1000);

    } catch (err: any) {
      console.error('Auth Error:', err.message);
      
      if (err.message.includes('rate limit')) {
        setError({ 
          message: 'Supabase email limit reached. Please use "Demo Artisan Access" to continue.', 
          type: 'error' 
        });
      } else if (err.message.includes('Invalid login')) {
        setError({ 
          message: 'Invalid credentials. Try the Demo Access below!', 
          type: 'error' 
        });
      } else {
        setError({ message: err.message || 'An error occurred during authentication.', type: 'error' });
      }
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white rounded-[32px] overflow-hidden shadow-2xl animate-slide-up">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#E91E63] to-[#C2185B] flex items-center justify-center relative">
          <Sparkles className="text-white/20 absolute top-4 left-4" size={48} />
          <div className="text-center">
            <h2 className="text-white text-3xl font-heading font-bold">
              {demoSuccess ? 'Success!' : (isLogin ? 'Welcome Back' : 'Join the Club')}
            </h2>
            <div className="flex items-center justify-center space-x-1.5 mt-1">
              <ShieldCheck size={12} className="text-white/60" />
              <p className="text-white/70 text-[10px] uppercase tracking-widest font-bold">Secure Access</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          {demoSuccess ? (
            <div className="py-10 flex flex-col items-center justify-center text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
                <CheckCircle2 size={40} />
              </div>
              <p className="text-gray-800 font-bold text-lg mb-2">You're in!</p>
              <p className="text-gray-500 italic text-sm">"Sweetness is meant to be shared."</p>
            </div>
          ) : (
            <>
              {error && (
                <div className={`mb-6 p-4 rounded-xl flex items-start space-x-3 border animate-fade-in ${
                  error.type === 'error' 
                    ? 'bg-red-50 border-red-100 text-red-600' 
                    : 'bg-[#E91E63]/5 border-[#E91E63]/10 text-[#E91E63]'
                }`}>
                  {error.type === 'error' ? <AlertCircle size={18} className="mt-0.5" /> : <Info size={18} className="mt-0.5" />}
                  <span className="text-sm font-medium leading-tight">{error.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text"
                      placeholder="Full Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all"
                    />
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-[#E91E63]/20 focus:outline-none transition-all"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#E91E63] text-white rounded-xl font-bold shadow-lg hover:bg-[#C2185B] transition-all flex items-center justify-center disabled:opacity-70 active:scale-95"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="animate-spin" size={20} />
                      <span>Verifying...</span>
                    </div>
                  ) : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="relative flex items-center my-6">
                <div className="flex-grow border-t border-gray-100"></div>
                <span className="flex-shrink mx-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">or bypass with</span>
                <div className="flex-grow border-t border-gray-100"></div>
              </div>

              <button 
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold shadow-md hover:bg-black transition-all flex items-center justify-center space-x-2 active:scale-95"
              >
                <Zap size={18} className="text-yellow-400 fill-current" />
                <span>Demo Artisan Access</span>
              </button>

              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  {isLogin ? "New to SweetMoments?" : "Already have an account?"}{' '}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[#E91E63] font-bold hover:underline"
                  >
                    {isLogin ? 'Create Account' : 'Sign In'}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
