-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 22, 2023 at 05:48 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buku-online`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(31, 1, 2, 1, '2023-05-21 08:44:25', '2023-05-22 06:59:10');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Pengembangan Diri', NULL, '2023-05-22 05:39:22'),
(3, 'Komputer dan Teknologi', NULL, '2023-05-22 05:39:01'),
(7, 'Novel', '2023-05-22 05:38:02', '2023-05-22 05:38:02'),
(8, 'Kamus', '2023-05-22 05:38:15', '2023-05-22 05:38:15'),
(9, 'Komik', '2023-05-22 05:38:30', '2023-05-22 05:38:30');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(3, '2023_05_09_181036_create_categories_table', 1),
(4, '2023_05_09_182747_create_products_table', 1),
(5, '2023_05_09_183641_create_cart_table', 1),
(6, '2023_05_09_183939_create_orders_table', 1),
(7, '2023_05_15_132115_create_order_products', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` bigint(255) NOT NULL,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','processing','completed','declined','on delivery','arrived') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `address`, `phone_number`, `post_code`, `total`, `payment_method`, `status`, `user_id`, `created_at`, `updated_at`) VALUES
(2, 'anime', 'karawang', '08080808', '41561', 1650000, 'transfer', 'completed', 1, '2023-05-18 05:29:11', '2023-05-18 05:29:11'),
(3, 'kato', 'anime', '08515666', '31411', 300000, 'transfer', 'completed', 1, '2023-05-18 06:37:58', '2023-05-21 07:11:40'),
(4, 'M. NAUFAL FAQIH', 'Perumahan Karaba Indah Blok QQ No. 21, Desa Wadas, Kec. Teluk Jambe Timur, Karawang 41361', '+6285156024790', '41631', 220000, 'transfer', 'declined', 1, '2023-05-20 21:30:01', '2023-05-21 06:23:27'),
(5, 'IF_M. Naufal Faqih', 'Perumahan Karaba Indah Blok QQ No. 21', '+6285156024790', '41631', 100000, 'transfer', 'declined', 1, '2023-05-21 07:16:57', '2023-05-22 03:42:28'),
(6, 'kato', '6088 Powhatan Trl', '081584055645', '23086', 110000, 'cash', 'declined', 1, '2023-05-21 07:24:05', '2023-05-22 03:31:23'),
(7, 'kato', '6088 Powhatan Trl', '081584055645', '23086', 110000, 'cash', 'completed', 1, '2023-05-21 07:26:07', '2023-05-22 06:55:38');

-- --------------------------------------------------------

--
-- Table structure for table `order_products`
--

CREATE TABLE `order_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quantity` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`id`, `order_id`, `product_id`, `created_at`, `updated_at`, `quantity`) VALUES
(2, 2, 3, '2023-05-18 05:29:11', '2023-05-18 05:29:11', 5),
(3, 2, 2, '2023-05-18 05:29:11', '2023-05-18 05:29:11', 8),
(4, 2, 4, '2023-05-18 05:29:11', '2023-05-18 05:29:11', 4),
(5, 2, 5, '2023-05-18 05:29:11', '2023-05-18 05:29:11', 5),
(6, 3, 2, '2023-05-18 06:37:58', '2023-05-18 06:37:58', 2),
(7, 3, 4, '2023-05-18 06:37:58', '2023-05-18 06:37:58', 1),
(8, 3, 5, '2023-05-18 06:37:58', '2023-05-18 06:37:58', 1),
(9, 4, 2, '2023-05-20 21:30:01', '2023-05-20 21:30:01', 2),
(10, 5, 6, '2023-05-21 07:16:57', '2023-05-21 07:16:57', 1),
(11, 6, 2, '2023-05-21 07:24:05', '2023-05-21 07:24:05', 1),
(12, 7, 2, '2023-05-21 07:26:07', '2023-05-21 07:26:07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'default.jpg',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `publisher` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_page` int(255) NOT NULL,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `image`, `description`, `publisher`, `author`, `total_page`, `language`, `status`, `category_id`, `created_at`, `updated_at`) VALUES
(2, 'Si Anak Kuat', 65000, 10, '1684761959.jpg', 'Si Anak Kuat merupakan fiksi sastra jenis novel karya Tere Liye. Membahas mengenai seorang anak bernama Amelia, kisah anak yang memiliki mimpi-mimpi hebat untuk kampung tercintanya. Dalam seri ini Tere liye memberikan kesan dan pengalaman yang berbeda di setiap bukunya. Dari puluhan buku Tere Liye, serial buku ini adalah mahkotanya.Novel si anak kuat menceritakan tidak hanya berisi konflik tentang keluarga saja tetapi juga konflik di dalam hal sosial. Tidak seperti halnya novel lainnya dalam hal pemilihan genre ,novel si anak kuat ini berbeda, jika biasanya genre yang digunakan itu adalah genre Romance atau genre yang berisi kisah cinta sepasang kekasih , namun kali ini penulis menggunakan genre novel inspiratif,sama halnya dengan novel serial anak nusantara lainnya.', 'REPUBLIK PENERBIT', 'Tere Liye', 393, 'Indonesia', 'active', 7, '2023-05-16 09:26:14', '2023-05-22 06:25:59'),
(3, 'Si Anak Cahaya', 83000, 5, '1684762042.jpg', 'Si Anak Cahaya Karya Tere Liye adalah fiksi sastra jenis novel yang sempat populer pada masanya. Kisah ini tentang gadis kecil yang bernama Nurmas yang hidup di kampung pedalaman. Hidup di masa awal kemerdekaan dimana semua serba terbatas, bahkan sekolah pun tidak menggunakan seragam dan tidak beralas kaki. Meskipun kehidupan di kampung sana tidaklah mudah, Nur tetap menjalani hidupnya dengan ceria. Nur kelas 5 SD saat cerita ini dimulai, dia pergi ke kota kabupaten seorang diri untung menemui dokter dan meminta obat bapaknya yang sakit sakitan, dengan hanya menaiki gerobak kerbau dan sampai di kota setelah melewati jarak 15 pal. Ketika musim paceklik tiba, persediaan bahan makanan di rumahpun sudaH_Habis, Nur di minta mamaknya untuk menjual ikan di pasar, hasil berjualan itu harus dibelikannya bahan dapur namun Nur malah menghilangkan uang tersebut. Untuk memenuhi kebutuhan sehari hari bapaknya harus rela menjadi kuli di pasar yang hanya buat satu hari dalam seminggu itu. Untung bapaknya hanya menjadi kuli selama sehari. Nur memikirkan cara membantu orang tuanya, dia memulai usaha menjual gorengan dan kopi di stasiun kereta dekat kampung mereka. Dulu, bapak Nur pernah ikut kelompok komunis, namun setelah terjadi peristiwa tragis bapak Nur akhirnya taubat dan menikah dengan mamak. Peristiwa itu membuat seseorang menyimpan dendam dan pembalasan dendam itu akhirnya terjadi saat Nur kelas 6 sd. Dari peristiwa peristiwa itulah Nur disebut sebut sebagai si anak cahaya.', 'REPUBLIK PENERBIT', 'Esa Joemadi', 417, 'Indonesia', 'active', 7, '2023-05-16 09:26:14', '2023-05-22 06:45:52'),
(4, 'Si Anak Pemberani', 85000, 5, '1684762833.jpg', 'Aku, Eliana si anak pemberani, anak sulung Bapak dan Mamak yang akan menjadi pembela kebenaran dan keadilan. Berdiri paling gagah, paling depan.� Buku ini tentang Eliana, si anak pemberani yang membela tanah, sungai, hutan, dan lembah kampungnya. Saat kerakusan dunia datang, Eliana bersama teman karibnya bahu-membahu melakukan perlawanan\". Kutipan dari buku berjudul Si Anak Pemberani adalah salah satu fiksi sastra jenis novel Karya Tere Liye. Tere Liye sendiri merupakan nama pena penulis novel Indonesia. Tere Liye lahir di Lahat, Indonesia, 21 Mei 1979 dengan nama Darwis. Beberapa karya Tere Liye yang diangkat ke layar lebar yaitu Hafalan Shalat Delisa dan Moga Bunda Disayang Allah. Meski berhasil dalam dunia literasi Indonesia, kegiatan menulis hanya sekedar hobi karena sehari-hari ia masih bekerja di kantor sebagai seorang akuntan, ia merupakan anak dari seorang petani biasa yang tumbuh dewasa di pedalaman Sumatera. Kehidupan masa kecil yang dilalui Tere Liye penuh dengan kesederhanaan yang membuatnya tetap sederhana hingga kini. Sosok Tere Liye terlihat tidak banyak gaya dan tetap rendaH_Hati dalam menjalani kehidupannya. Si Anak Pemberani mengisahkan seorang gadis kecil pemberani yang berambut sedikit ikal. Ketika anak-anak yang seumuran dengannya sibuk bermain, Eliana sebaliknya. Dia sibuk memikirkan bagaimana cara menyelamatkan hutan, air, dan lahan di desanya yang terancam rusak karena kehadiran orang-orang kota tak bertanggung jawab. Eliana bersama tiga temannya yang disebut �empat buntal� bahu-membahu menghentikan orang-orang pemilik HPH dan menghentikan para penggali pasir liar di dekat sungai di desanya. Betapa beraninya Eliana yang waktu itu masih duduk di bangku SD kelas 6, sudah melawan orang-orang berduit dari kota yang mengeksploitasi tanah, air, dan hutan di kampungnya. Tekad Eliana dan tiga temannya semakin membara untuk memperjuangkan nasib tanah, air, udara, dan hutan. Melihat warga dan para penangkap ikan yang pulang bermuka murung akibat sedikitnya tangkapan ikan karena air yang berubah warna menjadi keruh dari hasil penggalian pasir. Eliana akhirnya menyusun rencana untuk menghentikan tambang pasir. Apakah ia akan berhasil? Penasaran kan? Yuk, ikuti kisah Eliana hingga akhir.', 'Woogwan Jo', 'REPUBLIK PENERBIT', 420, 'Indonesia', 'active', 7, '2023-05-16 09:26:14', '2023-05-22 06:40:33'),
(5, 'Kamus Lengkap Bahasa Korea', 123000, 4, '1684763098.jpg', 'Seiring dengan perkembangan pendidikan, dunia Industri, dan komunikasi global yang cukup pesat dan hampir tanpa batas, menuntut semua orang harus bisa berkomunikasi dengan menggunakan berbagai bahasa yang ada di Dunia. Salah satunya adalah kemampuan berbahasa Korea. Guna memenuhi kebutuhan tersebut, maka Kamus Lengkap Bahasa Korea disusun untuk semua orang baik pelajar, mahasiswa, para profesional. para ahli bahasa, dan khalayak umum. Kamus Bahasa Korea ini sangat lengkap, sehingga kayak dan direkomendasikan bagi semua orang Karena dalam Kamus Lengkap Bahasa Korea ini memuat kosa kata bahasa Korea, memberikan deﬁnisi serta arti yang jelas dan mudah dimengerti. Bahasa Korea (???/???) adalah bahasa yang paling luas digunakan di Korea, dan merupakan bahasa resmi Korea Selatan dan Korea Utara. Bahasa ini juga dituturkan secara luas di Yanbian, Tiongkok timur laut. Secara keseluruhan, terdapat sekitar 78 juta penutur bahasa Korea di seluruh dunia termasuk kelompok-kelompok besar di Rusia, Amerika Serikat, Kanada dan Jepang. Klasifikasi resmi bahasa Korea masih belum disetujui secara universal, tetapi dianggap oleh banyak orang sebagai bahasa isolat.[1][2][3][4][5][6] Beberapa ahli bahasa memasukkannya ke dalam kelompok bahasa Altaik. Bahasa Korea juga banyak mirip dengan bahasa Jepang yang status kekerabatannya juga kurang jelas. Sistem penulisan bahasa Korea yang asli � disebut Hangul � merupakan sistem yang silabis dan fonetik. Aksara-aksara Sino-Korea (Hanja) juga digunakan untuk menulis bahasa Korea. Walaupun kata-kata yang paling umum digunakan merupakan Hangul, lebih dari 70% kosakata bahasa Korea terdiri dari kata-kata yang dibentuk dari Hanja atau diambil dari bahasa Mandarin.', 'Thema Publishing', 'Thema Publishing', 666, 'Indonesia', 'active', 8, '2023-05-16 09:26:14', '2023-05-22 06:44:58'),
(6, 'Kamus Praktis Korea', 67000, 10, '1684763685.jpg', 'Bahasa Korea merupakan bahasa resmi yang digunakan, baik oleh negara Korea Selatan ataupun Korea Utara. Saat ini, bahasa Korea banyak digandrungi oleh semua orang, khususnya para anak muda. Hal itu dikarenakan adanya berbagai K-Drama maupun K-POP yang semakin mendunia. Banyak anak muda misalnya berlomba-lomba mempelajari dan menguasai bahasa Korea ini hanya untuk bisa berkomunikasi dengan idola kesukaan mereka. Selain itu, tidak memungkiri juga jika ada sebagian orang lainnya yang mempelajari bahasa Korea ini untuk kepentingan lain seperti bekerja atau belajar di negara ginseng tersebut. Hallyu atau Korean Wave telah menggema hingga ke Indonesia. Banyak masyarakat Indonesia tersihir akan pesona Korea. Baik budaya tradisional maupun kontemporer Korea begitu diminati di Indonesia. Salah satunya adalah meningkatnya minat masyarakat Indonesia untuk mempelajari bahasa Korea. Kamus Bahasa Korea ini disusun untuk membantu masyarakat Indonesia yang ingin mempelajari bahasa Korea. Berisi kosakata yang sering digunakan dalam kehidupan sehari hari. Kamus ini juga disusun secara ringkas agar pembaca dapat mempelajari dan memahami bahasa Korea secara lebih mudah dan praktis. Mengapa kamus ini harus Anda miliki? Dengan memiliki kamus ini, Anda dapat mencari arti kata dengan cepat dan mudah, serta melihat bagaimana kata itu dieja dan diucapkan. Ini sangat berguna bagi kalian untuk membaca kata-kata dengan jelas dan akurat sehingga terjalin komunikasi yang baik. Kamus ini dapat membantu Anda untuk memahami nuansa kata dan bagaimana kata itu dapat digunakan dalam konteks yang berbeda. Secara keseluruhan, kamus adalah alat yang berharga bagi siapa saja yang ingin meningkatkan kemampuan kosakata dan bahasa mereka. Terlepas dari apakah Anda pelajar, penulis, atau hanya seseorang yang menyukai kata-kata, kamus dapat membantu Anda untuk lebih memahami bahasa Korea dan memperluas pengetahuan Anda tentang kata-kata dan artinya.', 'Anak Hebat Indonesia', 'Esa Joemadi', 318, 'Indonesia', 'active', 8, '2023-05-20 22:04:40', '2023-05-22 06:54:45'),
(7, 'SAGARAS', 75000, 15, '1684761668.jpg', 'menceritakan kisah keluarga Ali. Perasaan seperti sedih, senang, takut, bahkan tertawa karena kelucuan para tokoh, akan dengan mudah dirasakan sembari mengikuti petualangan Ali, Raib, dan Seli yang dipenuhi rintangan. Sinopsis Buku Pertanyaan-pertanyaan seperti �kemana orang tua Ali?�, �Apa orang tua Ali masiH_Hidup?�, atau �dari Klan manakah Ali berasal?� akan terjawab di buku ini. Di buku ke-13 serial BUMI, akhirnya, siapa orang tua Ali dijawab di buku ini. Ali, bertahun-tahun, berusaha memecahkan misteri itu. Kali ini, Ali melupakan sekolah. Sudah 3 hari ia tidak hadir di sekolah, membolos. Raib dan Seli tentu tidak akan membiarkan Ali sendirian memecahkan misteri tersebut, seperti layaknya sahabat sejati.', 'PENERBIT SABAK GRIP', 'Esa Joemadi', 384, 'Indonesia', 'active', 7, '2023-05-22 06:21:08', '2023-05-22 06:57:00'),
(8, 'Si Anak Pintar', 70000, 10, '1684761760.jpg', '�Kitalah yang paling tahu seperti apa kita, sepanjang kita jujur terhadap diri sendiri. Sepanjang kita terbuka dengan pendapat orang lain, mau mendengarkan masukan dan punya sedikit selera humor, menertawakan diri sendiri. Dengan itu semua kita bisa memperbaiki perangai.� kutipan dari buku berjudul Si Anak Pintar adalah salah satu fiksi sastra jenis novel Karya Tere Liye. Tere Liye sendiri merupakan nama pena penulis novel Indonesia. Tere Liye lahir di Lahat, Indonesia, 21 Mei 1979 dengan nama Darwis. Beberapa karya Tere Liye yang diangkat ke layar lebar yaitu Hafalan Shalat Delisa dan Moga Bunda Disayang Allah. Meski berhasil dalam dunia literasi Indonesia, kegiatan menulis hanya sekedar hobi karena sehari-hari ia masih bekerja di kantor sebagai seorang akuntan, ia merupakan anak dari seorang petani biasa yang tumbuh dewasa di pedalaman Sumatera. Kehidupan masa kecil yang dilalui Tere Liye penuh dengan kesederhanaan yang membuatnya tetap sederhana hingga kini. Sosok Tere Liye terlihat tidak banyak gaya dan tetap rendah hati dalam menjalani kehidupannya.', 'REPUBLIK PENERBIT', 'Dr. Imam Heryanto, S.Si., M.M,', 345, 'Indonesia', 'active', 7, '2023-05-22 06:22:40', '2023-05-22 06:22:40'),
(9, 'Kamus Linguistik', 55000, 10, '1684764066.jpg', 'Perkembangan linguistik pada dua dasawarsa terakhir ini sangat pesat sehingga sulit diikuti oleh para peminat, baik yang baru mulai belajar maupun para sarjana yang sudah lama berkecimpung dalam bidang ini. Para peminat sering dibingungkan oleh istilah-istilah seperti semantik generatif, sintagma, teaori kasus, diglosia, dwiwasana, silih, wicara, wacana, dan puluhan lainnya. Sebagai upaya untuk mengatasi hal itu kamus ini disusun guna mengisi kekosongan akan buku referensi linguistik dalam bahasa Indonesia dan sekaligus guna membuat kodifikasi atas konsepkonsep yang sudah lazim dalam linguistik. Kamus ini memuat lebih dari 3.000 istilah linguistik, lengkap dengan deskripsi dan contoh, biodata para tokoh linguistik, indeks istilah asing, nama bahasa-bahasa dunia, daftar lambang dan tanda, serta bagan dan diagram yang penting dalam linguistik. Istilah yang dimuat adalah istilah yang lazim dalam linguistik internasional maupun yang sudah menjadi bagian dari tradisi penyelidikan bahasa di Indonesia. Itu sebabnya kamus ini bersifat internasional dan sekaligus berciri nasional. Edisi keempat ini merupakan pemutakhiran atas edisi ketiga yang terbit 15 tahun yang lalu. Penyusun kamus ini adalah guru besar teori linguistik pada program doktor Fakultas Ilmu Pengetahuan Budaya Universitas Indonesia. Ia adalah perintis kajian sejarah Bahasa Indonesia, penggagas Kamus Besar Bahasa Indonesia dan pelbagai kegiatan kebahasaan.', 'Gramedia Pustaka utama', 'M. Amieni', 348, 'Indonesia', 'active', 8, '2023-05-22 07:01:06', '2023-05-22 07:01:06'),
(10, 'Kamus Pocket Bahasa Inggris (2021)', 45000, 10, '1684764166.jpg', 'Banyak banget informasi dan media yang bisa membantu kita untuk memperdalam kemampuan bahasa Inggris, apalagi kalau kamu masih pemula. Namun, kamu bisa loh untuk belajar bahasa Inggris otodidak. Untuk bisa mahir berbahasa Inggris, kita memerlukan satu media penunjang yang menyediakan daftar kosakata bahasa Inggris yang dilengkapi dengan makna dari kosakata tersebut. Media itu sering kita kenal dengan istilah \"kamus\". Dengan kamus, akan menunjang kemahiran kita dalam mempelajari bahasa Inggris. Buat kamu yang masih pemula dan ingin belajar bahasa Inggris otodidak, Kamus Pocket Bahasa Inggris (2021) untuk Pelajar, Mahasiswa, & Umum ini merancang kesatuan wawasan kamus bahasa Inggris secara rinci dan terstruktur. Selain merangkap ruang lingkup kosakata, kamus ini juga memberikan cara pelafalan yang mempermudah cara baca, wawasan mengenai regular verbs, aneka ragam tenses, dan penjabaran tata bahasa sehingga kamus ini sangat cocok digunakan untuk para pelajar, mahasiswa, dan umum. Dengan rajin membaca kamus bahasa Inggris. Kamu pun akan lebih cepat dalam belajar bahasa Inggris secara otodidak untuk menambah vocabulary (kosakata). Apalagi kamus yang satu ini dikemas dalam bentuk Pocket Dictionary yang bisa kamu baca di mana saja setiap harinya. Dapatkan Kamus Pocket Bahasa Inggris (2021) untuk Pelajar, Mahasiswa, & Umum ini di toko buku Gramedia terdekat di kotamu atau melalui Gramedia.com.', 'Buku Kita Pt', 'M. Amieni', 376, 'Indonesia', 'active', 8, '2023-05-22 07:02:46', '2023-05-22 07:02:46'),
(11, 'Kamus Sakti Inggris-Indonesia', 150000, 10, '1684764423.jpg', 'Kebutuhan bahasa Inggris saat ini hampir menjadi prioritas bagi beberapa orang. Guna meningkatkan kualitas diri, mempelajari bahasa Inggris menjadi hal yang wajib dilakukan. Utamanya bagi para profesional yang ingin mengembangkan bisnisnya hingga ke luar negeri dan juga para pelajar yang hendak mencari ilmu ke negara maju. Maka dari itu, tak heran jika mulai dari balita, anak-anak sudah mulai dikenalkan dengan bahasa ini. Kebutuhan yang semakin tinggi itu nyatanya juga dibarengi dengan fasilitas belajar bahasa Inggris yang semakin banyak. Kalian bisa belajar dari mana saja, baik melalui buku maupun internet. Saat ini ada banyak sekali kamus yang bisa kalian pakai untuk belajar bahasa Inggris. Namun barangkali tak semua kamus itu cocok untuk para pemula, atau untuk kalian yang sudah menguasai bahasa Inggris dan ingin mengembangkannya. Buku ini disusun oleh tim pusat kajian bahasa Inggris yang beranggotakan Avivah Nur Anggraeni, Tasniatun Khoeriah, Krisdayanti Purba, dan Merah Aldin Buyung Bangsawan, kamus sakti superlengkap ini diperkaya oleh: Lebih dari 24.000 entri. Dilengkapi dengan contoh penggunaan entri tersebut di dalam kalimat untuk mempermudah memahami arti dan maksud dari tiap-tiap entri. Dilengkapi dengan istilah-istilah dalam bidang ilmu tertentu, cara pengucapan, tekanan, konjugasi kata kerja dan idiom. Dapat digunakan oleh siswa SMP, SMA, mahasiswa dan umum.', 'Anak Hebat Indonesia Pt', 'M. Amieni', 826, 'Indonesia', 'active', 8, '2023-05-22 07:07:03', '2023-05-22 07:07:03'),
(12, 'Teasing Master, Takagi 7', 30000, 10, '1684764531.jpg', 'Teasing Master Takagi 7, adalah sebuah seri manga karya S?ichir? Yamamoto. Seri ini menampilkan kehidupan sehari-hari Takagi, yang suka menggoda teman sekelasnya, Nishikata, dan upaya gagal Nishikata untuk membalasnya. Adaptasi seri televisi anime oleh Shin-Ei Animation ditayangkan mulai 8 Januari hingga 26 Maret 2018. Sebuah OVA dirilis pada 12 Juli 2018. Adaptasi manga bahasa Inggris dirilis pada 24 Juli 2018 dengan judul Teasing Master Takagi-san. Musim kedua ditayangkan mulai 7 Juli hingga 22 September 2019. Musim ketiga ditayangkan mulai 8 Januari hingga 26 Maret 2022, dan film layar lebar yang akan tayang perdana pada 10 Juni 2022.', 'Elex Media Komputindo', 'Bintang Wahyu', 160, 'Indonesia', 'active', 9, '2023-05-22 07:08:51', '2023-05-22 07:08:51'),
(13, 'AKASHA: The Journey of Elaina 03', 48000, 10, '1684764599.jpg', 'Dalam pengembaraannya kali ini, Elaina tersandera di rumah aneh. Dia tak bisa keluar, dan makin lama makin kehilangan kesadarannya! Siapakah yang bisa menolongnya sekarang? 3 Fakta menarik dari AKASHA : The Journey of Elaina 03 : 1. Menurut sang penulis yaitu Jougi Shiraishi, Elaina memiliki sifat karakter yang realistis. Dia memahami bahwa kekuatan sihir yang dimilikinya tidak bisa menyelesaikan suatu masalah apapun. Di dunia Elaina, sihir mungkin bisa memperbaiki sesuatu dan menyelesaikan masalah dengan mudah, tapi itu bisa diselesaikan jika masalah tersebut telah terjadi. 2. Ternyata inspirasi sang penulis untuk membuat cerita drama memberikan pengaruh besar saat menulis Majo no Tabitabi berasal dari film dan drama barat. Drama barat yang ditonton Jougi Shiraishi adalah CSI, The Mentalist dan Sherlock (dibintangi Benedict Cumberbatch). 3. Selain dari film dan drama barat, Jougi Shiraishi memiliki banyak material inspirasi dari berbagai format dan genre untuk membuat cerita Majo no Tabitabi. Salah satunya adalah dari majalah National Geographic untuk inspirasi ekologi hewan dan tumbuhan untuk inspirasi pembuatan bagaimana dunia dan lokasi yang ada di cerita.', 'm&c!', 'Bintang Wahyu', 148, 'Indonesia', 'active', 9, '2023-05-22 07:09:59', '2023-05-22 07:09:59'),
(14, 'The Irregular at Magic High School 04', 50000, 15, '1684764653.jpg', 'The Irregular at Magic High School adalah serial web Jepang oleh Tsutomu Sat?. Itu diterbitkan pada Syosetu, novel web internet, antara Oktober 2008 dan Maret 2011. Sat? mencapai kesepakatan dengan Dengeki Bunko dan mulai merilis karyanya dalam format novel ringan mulai Juli 2011. Pada tahun 2013, setiap cerita busur menerima adaptasi manga dengan berbagai seniman dan penerbit manga. Pada tahun yang sama, sebuah anime adaptasi oleh Madhouse diumumkan dan disiarkan antara April dan September 2014. The Irregular at Magic High School telah di lokalisasi ke bahasa Inggris oleh dua perusahaan: Novel ringan dan salah satu adaptasi manga dilisensikan oleh Yen Press sementara Aniplex of America berlisensi serial anime. Seri anime ditayangkan pada empat jaringan, dan kemudian dibuat tersedia di Netflix. Sebuah film anime yang menampilkan cerita asli oleh Sat? ditayangkan perdana di Jepang pada 17 Juni 2017, sementara musim kedua berlangsung setelah serial anime oleh 8-Bit dijadwalkan akan tayang perdana pada tahun 2020.', 'm&c!', 'Bintang Wahyu', 160, 'Indonesia', 'active', 9, '2023-05-22 07:10:53', '2023-05-22 07:10:53'),
(15, 'Saga dari Samudra', 84000, 20, '1684764816.jpg', 'Hidup Nyai Ageng Pinatih berubah saat dia menemukan bayi kecil di tengah laut yang dengan magis menghentikan kapal dagangnya. Bayi ini ia beri nama Jaka Samudra. Kelak, bocah ini tak cuma mengubaH_Hidup ibu angkatnya, lebih dari itu, juga dunia yang disentuhnya. Sementara, Jaka Samudra sendiri selalu mempertanyakan tentang asal-usulnya. Lewat novel�Saga dari Samudra, Ratih Kumala akan mengajak Kisanak mengunjungi tanah Jawa pada abad ke-15. Saat hidup lebih sederhana, rasa takut lebih nyata, keberanian punya harga, dan Sang Pencipta punya banyak rencana.', 'Gramedia Pustaka Utama', 'Okta Hadi Nurcahyono', 202, 'Indonesia', 'active', 9, '2023-05-22 07:13:36', '2023-05-22 07:13:36'),
(16, 'Juliet of The Boarding School 16', 35000, 15, '1684764981.jpg', 'Di tengah-tengah study tour, ayah Persia, Turkish datang ke penginapan Inuzuka. Tujuan Turkish adalah untuk memberi tahu bahwa Persia akan keluar dari Perguruan. Untuk menolong Persia yang dibawa pulang secara paksa, Inuzuka menuju ke rumah Persia! Ketetapan hati mereka bedua diuji di hadapan tembok rintangan yang paling tinggi! Kisah cinta rahasia memasuki babak akhir!!', 'm&c!', 'Dr. Agus Zaenul Fitri, M.Pd.', 192, 'Indonesia', 'active', 9, '2023-05-22 07:16:21', '2023-05-22 07:16:21'),
(17, 'Logika Pemrograman Java', 95000, 65, '1684765125.jpg', 'Buku Logika Pemrograman Java ini merupakan salah satu seri dasar pemrograman komputer yang dirancang sebagai bahan penuntun dalam memprogram komputer menggunakan bahasa pemrograman Java.Java adalah bahasa pemrograman yang berorientasi pada objek, bebas platform, dan dikembangkan oleh sun micro system. Java dapat digunakan pada hampir semua bentuk pengembangan software karena memiliki bahasa yang powerful. Beberapa penggunaan Java pada software di antaranya yaitu pembuatan game, aplikasi desktop. aplikasi web, aplikasi jaringan, serta aplikasi enterprise.Java merupakan bahasa pemrograman yang digunakan secara luas untuk pengkodean aplikasi web. Bahasa ini telah menjadi pilihan populer di antara developer selama lebih dari dua dekade, dengan jutaan aplikasi Java yang digunakan saat ini. Dilihat dari penggunaannya, sebagai bahasa pemrograman umum kamu bisa memanfaatkan Java untuk membuat berbagai bentuk aplikasi. Hal itu berlaku mulai dari aplikasi berbasis desktop, website, mobile, hingga aplikasi embedded device seperti perangkat pintar atau mikroprosesor.Java menjadi salah satu bahasa pemrograman terpopuler bukan karena tanpa alasan, bahasa pemrograman ini memiliki beberapa kelebihan seperti misalnya bisa berjalan di sistem operasi yang berbeda-beda. Penggunaan Java menjadi keuntungan bagi programmer karena Java memiliki banyak keunggulan seperti berorientasi pada objek, multiplatform, berbasis GUI, dan dapat digunakan pada aplikasi jaringan terdistribusi.', 'Elex Media Komputindo', 'Abdul Kadir', 592, 'Indonesia', 'active', 3, '2023-05-22 07:18:45', '2023-05-22 07:18:45'),
(18, 'Ilmu Hacking', 108000, 25, '1684765337.jpg', 'ILMU HACKING merupakan ilmu yang mengajarkan berbagai cara yang biasanya digunakan hacker untuk memasuki sistem orang lain, mendapatkan password, melakukan penyadapan, dan lainnya. Tujuan buku ini ditulis bukan mengajari menjadi hacker ilegal dan tidak bertanggung jawab, akan tetapi agar Anda bisa bertahan dari serangan hacker dan agar tidak menjadi korban hacking. Dengan mempelajari buku ini, Anda akan mengerti berbagai teknik hacking yang biasanya digunakan. Tunggu apa lagi, praktikkan sekarang juga.', 'Elex Media Komputindo', 'Dedik Kurniawan', 416, 'Indonesia', 'active', 3, '2023-05-22 07:22:17', '2023-05-22 07:22:17'),
(19, 'Praktis Membuat Website Sendiri dengan Wordpress', 98000, 25, '1684765406.jpg', 'Wordpress menjadi platform CMS yang paling populer dalam pembuatan website. Seiring dengan perkembangannya, Wordpress juga mengalami perubahan sehingga diperlukan panduan terbaru dalam pembuatan website menggunakan Wordpress. Jika Anda dapat memaksimalkan tools terbaru yang ada di dalam Wordpress, maka tidak hanya website biasa saja yang dapat Anda ciptakan, tetapi juga sebuah website canggih dan menarik sesuai yang Anda idamkan. Banyak ragam website yang dapat dibuat menggunakan Wordpress di antaranya website personal, website company profile, website komunitas, dan website khusus toko online. Kelengkapan themes, plugins, dan mudahnya pengaturan di dalam Wordpress menjadikan layanan ini mudah untuk dikembangkan sesuai jenis website yang akan dibuat.', 'Elex Media Komputindo', 'Jefferly Helianthusonfri', 202, 'Indonesia', 'active', 3, '2023-05-22 07:23:26', '2023-05-22 07:23:26'),
(20, 'Konsep Sistem Operasi Menggunakan Shell Programming Berbasis Linux', 210000, 15, '1684765466.jpg', 'Konsep Sistem Operasi Menggunakan Shell Programming Berbasis Linux Skrip Shell adalah bagian penting dari sistem operasi modern, seperti UNIX, Linux, Windows, dan sejenisnya. Bahasa scripting atau sintaksisnya mungkin berbeda dari 05 ke OS; tetapi prinsip-prinsip dasar tetap sama. Buku ini adalah ringkasan dari apa yang telah kami pelajari selama bertahun-tahun dalam penulisan Linux Shell baik dalam mprigajar sistem operasi, pengembangan proyek, dan pelatihan. Dalam buku ini, belajar tentang dasar-dasar pembuatan skrip Shell hingga otomatisasi yang rumit dan khusus. Pada akhir buku ini, dapat dengan percaya diri menggunakan skrip Shell sendiri untuk masalah dunia nyata di luar sana. Semoga buku ini bisa menjadi salah satu rujukan buku teks untuk para mahasiswa Teknik Informatika, Ilmu Komputer, Sistem Komputer dan para mahasiswa teknik lainnya yang mencari literatur sistem operasi.', 'Indomedia Pustaka', 'Henni Endah Wahanani', 1120, 'Indonesia', 'active', 3, '2023-05-22 07:24:26', '2023-05-22 07:24:26'),
(21, 'Pemrograman Database dengan Python dan MySQL', 90000, 15, '1684765522.jpg', 'Python adalah bahasa pemrograman yang paling populer di dunia saat ini, sedangkan MySQL adalah platform database paling banyak digunakan di seluruh dunia. Apa jadinya jika keduanya digabung untuk membuat aplikasi database? Buku ini mengajarkan kepada para pembaca bagaimana membuat aplikasi menggunakan Python yang didukung oleh database MySQL. Anda akan belajar dari nol tentang bagaimana menyiapkan berbagai perangkat lunak hingga membuat database baru. Selanjutnya, pembahasan akan dimulai dari pembuatan tabel, memasukkan, meng-update, dan menghapus data, hingga menampilkan isi tabel ke dalam jendela browser. Jika Anda tertarik mengembangkan aplikasi dengan menggunakan Python dan MySQL, maka Anda wajib membaca buku ini. Apabila Anda adalah developer website yang ingin membuat situs interaktif, maka buku ini merupakan investasi pengetahuan jangka panjang.', 'Elex Media Komputindo', 'Jubilee Enterprise', 178, 'Indonesia', 'active', 3, '2023-05-22 07:25:22', '2023-05-22 07:25:22'),
(22, 'Tidak Perlu Crazy Untuk Jadi Rich', 93000, 15, '1684765630.jpg', 'Apakah Anda tahu anak muda Indonesia yang mendadak kaya dan dijuluki crazy rich, tetapi akhirnya tersandung masalaH_Hukum? Banyak orang yang berusaha gila-gilaan untuk bisa kaya. Sayangnya, usaha itu malah membawa mereka ke penjara, sakit-sakitan, atau bahkan jadi benar-benar gila. Buku ini menunjukkan cara menggunakan bagian terdalam pikiran Anda saat tidur untuk memperoleh apa pun keinginan Anda dalam kehidupan ini: uang, pengaruh, cinta, kehormatan, dan martabat.', 'qantara', 'BEN SWEETLAND', 268, 'Indonesia', 'active', 1, '2023-05-22 07:27:10', '2023-05-22 07:27:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','user') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Kato', 'myanimelist@mail.com', '$2y$10$/ccbUQmmwPNVSMkPtK1jJOOl7Fc.Bhfs3RyJhQkORUCS7kkacF6iq', 'user', '2023-05-16 01:02:23', '2023-05-17 02:06:49'),
(2, 'anime', 'anime@mail.com', '$2y$10$/ccbUQmmwPNVSMkPtK1jJOOl7Fc.Bhfs3RyJhQkORUCS7kkacF6iq', 'admin', '2023-05-16 01:03:33', '2023-05-16 01:03:33'),
(4, 'kato', 'kato@mail.com', '$2y$10$bw49I.oN1Xbu1dwJ1YU6vevgUCHtGwdxPfPHilpppijSanbcM2t9O', 'user', '2023-05-21 03:30:26', '2023-05-21 03:30:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_user_id_foreign` (`user_id`),
  ADD KEY `cart_product_id_foreign` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_products_order_id_foreign` (`order_id`),
  ADD KEY `order_products_product_id_foreign` (`product_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `cart_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
