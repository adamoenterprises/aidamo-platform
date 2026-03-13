export default function AccessPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/">
            <img src="/logo-dark.png" alt="AIDAMO" className="h-6" width="121" height="24" />
          </a>
        </div>
      </header>

      <div className="flex-1 bg-white">
        <iframe
          src="https://delphi.ai/embeddable/config/b2562f71-9f94-4057-8e8f-c16f4b28e8cc"
          allow="camera *; microphone *"
          style={{ border: 'none', width: '100%', height: 'calc(100vh - 57px)', background: 'white' }}
        />
      </div>
    </main>
  )
}
