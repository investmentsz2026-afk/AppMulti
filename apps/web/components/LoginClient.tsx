'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Play, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { loginUser } from '@/app/actions/auth';

export default function LoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Limpia el store local de autenticación al cargar el formulario de login para sincronizar
    useAuthStore.getState().logout();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const res = await loginUser(formData);
      if (res?.error) {
        toast.error(res.error);
      } else {
        if (res?.user) {
          useAuthStore.getState().setAuth(res.user, '');
        }
        toast.success('¡Sesión iniciada con éxito!');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background relative">
      {/* Background for Mobile */}
      <div className="lg:hidden absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600" 
          className="w-full h-full object-cover opacity-20" 
          alt="Background Mobile"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background to-background" />
      </div>

      {/* Left Side - Hero (Hidden on Mobile) */}
      <div className="hidden lg:flex relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover opacity-30" 
            alt="Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Play className="text-white fill-white w-8 h-8" />
            </div>
            <span className="text-4xl font-black tracking-tighter text-white">LiveX</span>
          </div>
          
          <h1 className="text-6xl font-black text-white leading-tight mb-6">
            Donde nacen <br />
            las <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">estrellas</span>, <br />
            en vivo todos los días.
          </h1>

          <div className="flex gap-8 mt-12 pt-12 border-t border-white/10">
            <div>
               <div className="text-2xl font-black text-white">+2.5M</div>
               <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Usuarios activos</div>
            </div>
            <div>
               <div className="text-2xl font-black text-white">15K+</div>
               <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">En vivo ahora</div>
            </div>
            <div>
               <div className="text-2xl font-black text-white">+500K</div>
               <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Batallas diarias</div>
            </div>
          </div>

          <div className="mt-20 text-xs text-zinc-600 font-medium">
            © 2026 LiveX. Todos los derechos reservados.
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 relative z-10 min-h-screen lg:min-h-0 pt-16 lg:pt-6">
        {/* Mobile Header Branding */}
        <div className="lg:hidden absolute top-6 left-6">
            <Link href="/" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>
        </div>
        <div className="lg:hidden flex flex-col items-center gap-3 mb-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-xl">
                <Play className="text-white fill-white w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">LiveX</span>
            </div>
            <div className="text-center mt-2">
               <h2 className="text-3xl font-black text-white mb-1">Iniciar sesión</h2>
               <p className="text-zinc-400 font-medium text-sm">Bienvenido de vuelta a LiveX</p>
            </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="glass-morphism p-8 lg:p-10 rounded-[40px] border border-white/5 shadow-2xl bg-[#0e1129]/80 lg:bg-[#0e1129]/60 backdrop-blur-xl">
            <div className="hidden lg:block mb-10">
              <h2 className="text-3xl font-black text-white mb-2">Iniciar sesión</h2>
              <p className="text-zinc-400 font-medium">Bienvenido de vuelta a LiveX</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-500 uppercase tracking-widest ml-1">Correo electrónico o usuario</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-purple-500 transition-colors">
                    <Mail className="w-full h-full" />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#050816]/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-700"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest">Contraseña</label>
                  <Link href="/recovery" className="text-[10px] font-black text-purple-500 hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-purple-500 transition-colors">
                    <Lock className="w-full h-full" />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#050816]/50 border border-white/5 rounded-2xl py-4 pl-12 pr-12 text-sm outline-none focus:border-purple-500/50 transition-all placeholder:text-zinc-700"
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {loading ? 'Cargando...' : 'Iniciar sesión'} <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-10 relative text-center">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
               <span className="relative bg-[#0e1129] px-4 text-[10px] font-black text-zinc-600 uppercase tracking-widest">o continúa con</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
                 <button className="flex items-center justify-center py-3.5 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 group">
                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                 </button>
                 <button className="flex items-center justify-center py-3.5 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 group">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:scale-110 transition-transform">
                      <path d="M17.05 13.91c-.04-2.62 2.13-3.88 2.22-3.93-1.22-1.78-3.13-2.02-3.83-2.05-1.63-.16-3.19 1.01-4.04 1.01-.84 0-2.12-.99-3.48-.96-1.76.02-3.39 1.02-4.31 2.61-1.87 3.23-.48 8.01 1.34 10.64.89 1.28 1.93 2.7 3.3 2.65 1.32-.05 1.83-.85 3.43-.85 1.58 0 2.05.85 3.45.82 1.42-.02 2.31-1.29 3.19-2.58 1.02-1.5 1.44-2.95 1.46-3.03-.02-.01-2.69-1.03-2.73-4.33zm-2.31-6.19c.73-.89 1.23-2.13 1.09-3.37-1.06.04-2.36.71-3.12 1.61-.67.79-1.27 2.06-1.1 3.28 1.18.09 2.39-.62 3.13-1.52z"/>
                    </svg>
                 </button>
                 <button className="flex items-center justify-center py-3.5 rounded-2xl bg-white/5 border border-white/5 transition-all hover:bg-white/10 group">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                 </button>
            </div>

            <div className="mt-10 text-center text-sm font-medium text-zinc-500">
              ¿No tienes cuenta? <Link href="/register" className="text-purple-500 font-black hover:underline ml-1">Regístrate ahora</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
