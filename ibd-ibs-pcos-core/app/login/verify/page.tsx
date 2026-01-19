export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 px-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">✉️</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Sjekk e-posten din</h1>
        <p className="text-slate-600 mb-4">En innloggingslenke har blitt sendt til din e-postadresse.</p>
        <p className="text-sm text-slate-500">Klikk på lenken i e-posten for å fullføre innloggingen.</p>
      </div>
    </div>
  );
}
