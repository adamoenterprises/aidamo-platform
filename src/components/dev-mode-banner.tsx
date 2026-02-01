export function DevModeBanner() {
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-100 border-b border-amber-200">
      <div className="max-w-5xl mx-auto px-6 py-2">
        <p className="text-xs text-amber-800 text-center">
          Preview mode — Supabase not configured. Auth and payments disabled.
        </p>
      </div>
    </div>
  )
}
