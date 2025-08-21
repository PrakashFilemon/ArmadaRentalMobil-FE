import React from "react";

const MapComponent = () => {
  return (
    <div className="container mx-auto p-4 sm:p-8 md:p-12 rounded-lg bg-gray-900">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center space-y-8 md:space-y-0 md:space-x-12">
        {/* Contact Information Section */}
        <div className="w-full md:w-1/2 text-white text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Hubungi Kami
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-6">
            Temukan kami di lokasi berikut. Kami siap membantu Anda dengan
            rental mobil yang aman dan terpercaya.
          </p>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Alamat
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Bumi Mutiara Blok Jb 8 no 20, Kab Bogor
              </p>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Telepon
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                +62 858-9173-1753
              </p>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Email
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                Armadarentalmobil@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="w-full md:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d429.032023184181!2d106.97282588513241!3d-6.333607415604405!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6993bcbbf44587%3A0x4fd5d85595155467!2sarmada%20sewa%20mobil!5e0!3m2!1sid!2sid!4v1726212868899!5m2!1sid!2sid"
            width="100%"
            height="300"
            className="rounded-lg shadow-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
