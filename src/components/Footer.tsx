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

        {/* Copyright */}
        <div class="pt-6 border-t border-gray-800 text-center">
          <p class="text-sm text-gray-400">
            © {new Date().getFullYear()} L'Espace Faucon. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
