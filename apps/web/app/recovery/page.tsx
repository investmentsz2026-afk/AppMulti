import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Shield, CheckCircle } from 'lucide-react';

export default function RecoveryPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-6 left-6">
        <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Login
        </Link>
      </div>

      <div className="w-full max-w-md bg-[#0e1129]/80 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <Shield className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-black text-white mb-2">Recuperar Contraseña</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Si olvidaste tu contraseña, escribe a nuestro equipo de soporte técnico o al administrador para restablecer tus credenciales.
          </p>
        </div>

        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left flex flex-col gap-2">
          <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Contacto Directo Soporte</div>
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-pink-400" /> soporte@livex.com
          </div>
          <div className="text-[10px] text-zinc-500">
            Respuesta promedio en menos de 24 horas.
          </div>
        </div>

        <Link 
          href="/login" 
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-pink-500/20"
        >
          Ir a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
}
