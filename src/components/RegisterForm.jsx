import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../redux/actions/auth";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [phoneNumber, setphoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    // Tampilkan toast jika password dan confirm password tidak sama
    if (password !== confirmPass) {
      toast({
        variant: "destructive",
        title: "Password Tidak Cocok",
        description: "Password dan konfirmasi password harus sama.",
      });
      return; // Hentikan proses jika password tidak cocok
    }

    dispatch(
      register(
        navigate,
        name,
        email,
        password,
        image,
        phoneNumber,
        setIsLoading
      )
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="font-bold text-xl md:text-2xl">
          Daftar Akun
        </CardTitle>
        <CardDescription className="text-sm md:text-base">
          Harap Isi Data Diri Dengan Benar!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nama
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukan Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 text-sm md:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukan Email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 text-sm md:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password{" "}
                <span className="text-xs text-gray-500">
                  (Minimal 6 Karakter)
                </span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 text-sm md:text-base"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPass" className="text-sm font-medium">
                Konfirmasi Password
              </Label>
              <Input
                id="confirmPass"
                type="password"
                placeholder="********"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full p-2 text-sm md:text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image" className="text-sm font-medium">
                Foto Profil
              </Label>
              <div className="flex flex-col items-center space-y-2">
                {imagePreview && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="relative w-full">
                  <Input
                    id="image"
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 text-sm md:text-base cursor-pointer"
                    accept="image/*"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                    <Upload className="w-5 h-5 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium">
                Nomor Telepon
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Masukan Nomor telepon Anda"
                value={phoneNumber}
                onChange={(e) => setphoneNumber(e.target.value)}
                className="w-full p-2 text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 w-full">
            <Button
              className="w-full sm:w-auto px-4 py-2 text-sm md:text-base flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Daftar"
              )}
            </Button>
            <Link
              to="/login"
              className="w-full sm:w-auto text-center font-sans text-color-primary hover:text-hover-primary font-medium text-sm md:text-base"
            >
              Sudah punya akun? Masuk di sini
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
