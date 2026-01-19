"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn('email', { email, redirect: false });
      setSent(true);
    } catch (error) {
      console.error('Login error:', error);
      alert('Kunne ikke sende innloggingslenke');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">NutriSigna</h1>
          <p className="text-slate-600">Din personlige guide til mage-vennlig kosthold</p>
        </div>

        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">📧</div>
            <h2 className="text-xl font-semibold text-green-900 mb-2">Sjekk e-posten din!</h2>
            <p className="text-green-700 text-sm">Vi har sendt en innloggingslenke til <strong>{email}</strong></p>
            <p className="text-green-600 text-xs mt-3">Klikk på lenken i e-posten for å logge inn.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">E-postadresse</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="din@epost.no"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg transition-colors">
              {loading ? 'Sender...' : 'Send innloggingslenke'}
            </button>

            <p className="text-xs text-slate-500 text-center mt-4">Vi sender deg en sikker innloggingslenke per e-post.<br/>Ingen passord nødvendig!</p>
          </form>
        )}
      </div>
    </div>
  );
}
