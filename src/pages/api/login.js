import { users } from "../../data/users";  // Veritabanı yerine kullanılıyor
import bcrypt from "bcryptjs";  // Şifre kontrolü için bcrypt kullanıyoruz

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı." });
    }

    // Şifreyi kontrol et
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Şifre yanlış." });
    }

    // Giriş başarılı
    return res.status(200).json({ message: "Giriş başarılı", user });
  } else {
    return res.status(405).json({ message: "Yalnızca POST metodu desteklenir" });
  }
}
