import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <section className="w-full max-w-sm bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-2xl font-bold text-slate-800 text-center">Iniciar sesion</h1>
        <p className="text-sm text-slate-500 text-center mt-1">Accede con tu cuenta</p>

        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Matricula
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="matricula@utcancun.com"
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              Contrasena
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              required
            />
          </div>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg p-2.5 transition-colors"
          >
            Entrar
          </Link>
        </form>
      </section>
    </main>
  )
}
