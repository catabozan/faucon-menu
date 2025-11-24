export function Footer() {
  return (
    <footer class="bg-gray-950 border-t border-gray-800 mt-12 pb-16">
      <div class="max-w-4xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Address Section */}
          <div>
            <h3 class="text-base font-semibold mb-3 text-gray-100">Adresse</h3>
            <address class="not-italic text-sm text-gray-400 leading-relaxed">
              Rue de l'Hôpital 20<br />
              2000 Neuchâtel<br />
              Suisse
            </address>
          </div>

          {/* Contact Section */}
          <div>
            <h3 class="text-base font-semibold mb-3 text-gray-100">Contact</h3>
            <div class="text-sm text-gray-400 space-y-2">
              <div>
                <a
                  href="tel:+41328462565"
                  class="hover:text-gray-100 transition-colors"
                >
                  +41 32 846 25 65
                </a>
              </div>
              <div>
                <a
                  href="mailto:espace.faucon@gmail.com"
                  class="hover:text-gray-100 transition-colors"
                >
                  espace.faucon@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Hours or additional info */}
          <div>
            <h3 class="text-base font-semibold mb-3 text-gray-100">Horaires</h3>
            <div class="text-sm text-gray-400 leading-relaxed">
              Lun-Ven: 16h-02h<br />
              Sam-Dim: 17h-02h
            </div>
          </div>
        </div>

        {/* Print Menu Link */}
        <div class="pt-6 border-t border-gray-800 text-center">
          <a
            href="/print"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-100 hover:text-white rounded-lg transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Imprimer le Menu
          </a>
        </div>

        {/* Copyright */}
        <div class="pt-6 text-center">
          <p class="text-sm text-gray-400">
            © {new Date().getFullYear()} L'Espace Faucon. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
