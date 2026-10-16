import React, { useState } from 'react';

interface AuthScreenProps {
  onLoginSuccess: (email: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      showMessage('Fill all fields ❌', 'error');
      return;
    }

    const storedUserStr = localStorage.getItem('user');
    let user = storedUserStr ? JSON.parse(storedUserStr) : null;

    // If no user exists yet, allow demo account or inform user to create one
    if (!user) {
      if (cleanEmail === 'user@example.com' && cleanPass === 'password123') {
        user = { email: cleanEmail, password: cleanPass };
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        showMessage('No account found. Please create one ✅', 'error');
        return;
      }
    }

    if (user.email === cleanEmail && user.password === cleanPass) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('loggedInEmail', cleanEmail);
      showMessage('Login successful! Redirecting... 🔐', 'success');
      setTimeout(() => {
        onLoginSuccess(cleanEmail);
      }, 700);
    } else {
      showMessage('Invalid login ❌', 'error');
    }
  };

  const handleSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      showMessage('Fill all fields ❌', 'error');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      showMessage('Invalid email format ❌', 'error');
      return;
    }

    const user = { email: cleanEmail, password: cleanPass };
    localStorage.setItem('user', JSON.stringify(user));
    showMessage('Account created ✅ Now login', 'success');
  };

  const fillDemo = () => {
    setEmail('user@example.com');
    setPassword('password123');
    const demoUser = { email: 'user@example.com', password: 'password123' };
    localStorage.setItem('user', JSON.stringify(demoUser));
    showMessage('Demo credentials filled! Click Login.', 'success');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="glass p-8 rounded-2xl w-full max-w-sm shadow-2xl border border-white/10">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🔐</div>
          <h2 className="text-xl font-bold tracking-wide text-white">
            SMORK'S PAYDOM
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Sign in to access your wallet & payments
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-yellow-400"
            />
          </div>

          {message && (
            <div
              className={`text-center py-2 px-3 rounded-lg text-xs font-semibold ${
                message.type === 'success'
                  ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                  : 'bg-red-500/15 text-red-400 border border-red-500/30'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold p-2.5 rounded-xl transition duration-200 cursor-pointer text-sm shadow-md"
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleSignup}
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold p-2.5 rounded-xl transition duration-200 cursor-pointer text-sm"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-white/10 text-center">
          <button
            onClick={fillDemo}
            className="text-xs text-yellow-400/90 hover:text-yellow-300 underline font-medium cursor-pointer"
          >
            Quick Fill Demo Account (user@example.com)
          </button>
        </div>
      </div>
    </div>
  );
};
