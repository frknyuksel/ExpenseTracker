// src/pages/api/signup.js
import { users } from "../../data/users"; // Veritabanı benzeri bir yer
import bcrypt from "bcryptjs"; // Şifre güvenliği için bcrypt kullanacağız

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { firstName, lastName, email, password } = req.body;

        // E-posta adresinin boş olup olmadığını kontrol et
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ message: "Tüm alanları doldurduğunuzdan emin olun." });
        }

        // Kullanıcı zaten varsa kontrol et
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ message: "Bu e-posta ile daha önce kayıt olunmuş." });
        }

        // Şifreyi hash'le
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            // Yeni kullanıcıyı oluştur
            const newUser = {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            };

            users.push(newUser); // Gerçek veritabanı kullanıyorsanız, burada kullanıcıyı veritabanına kaydedin

            return res.status(201).json({ message: "Kayıt başarılı." });
        } catch (err) {
            console.error("Şifre hashleme hatası:", err);
            return res.status(500).json({ message: "Sunucu hatası, lütfen tekrar deneyin." });
        }
    } else {
        return res.status(405).json({ message: "Yalnızca POST metodu desteklenir" });
    }
}
