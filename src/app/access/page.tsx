import Script from 'next/script'

export default function AccessPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-sm font-medium tracking-tight">
            AIDAMO
          </a>
        </div>
      </header>

      {/* Content */}
      <div className="pt-20 pb-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Delphi Embed Container */}
          <div id="delphi-container" className="w-full min-h-[800px]" />
        </div>
      </div>

      {/* Delphi Scripts */}
      <Script id="delphi-page-script" strategy="afterInteractive">
        {`
          window.delphi = {...(window.delphi ?? {}) };
          window.delphi.page = {
            config: "b2562f71-9f94-4057-8e8f-c16f4b28e8cc",
            overrides: {
              landingPage: "VOICE",
            },
            container: {
              width: "100%",
              height: "800px",
            },
          };
        `}
      </Script>
      <Script
        id="delphi-page-bootstrap"
        src="https://embed.delphi.ai/loader.js"
        strategy="afterInteractive"
      />
    </main>
  )
}
