const FooterComponent = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Section 1: Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Rental Mobil</h2>
          <p className="text-gray-400 text-sm">
            Kami menyediakan mobil terbaik untuk kebutuhan perjalanan Anda.
            Dapatkan pengalaman rental mobil yang aman dan nyaman bersama kami.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tautan Cepat</h2>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>
              <a href="#home" className="hover:text-white transition-colors">
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-white transition-colors"
              >
                Layanan
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Section 3: Contact & Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-4">Kontak Kami</h2>
          <p className="text-gray-400 text-sm">
            Alamat: Bumi Mutiara Blok Jb 8 no 20, Kab Bogor
          </p>
          <p className="text-gray-400 text-sm">Telepon: +62 858-9173-1753</p>
          <p className="text-gray-400 text-sm">
            Email: Armadarentalmobil@gmail.com
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-800 text-center text-gray-400 py-4 mt-8">
        <p className="text-sm">
          &copy; 2024 Rental Mobil. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
