import { writable, derived, get, type Readable } from 'svelte/store';

export interface Language {
	id: string;
	label: string;
	nativeLabel: string;
	flag: string; // ISO 3166-1 alpha-2 country code for flag
}
const allLanguages: Language[] = [
	{ id: 'ab', label: 'Abkhaz', nativeLabel: 'Аҧсуа', flag: 'ge' },
	{ id: 'ace', label: 'Acehnese', nativeLabel: 'Bahsa Acèh', flag: 'id' },
	{ id: 'af', label: 'Afrikaans', nativeLabel: 'Afrikaans', flag: 'za' },
	{ id: 'ak', label: 'Akan', nativeLabel: 'Akan', flag: 'gh' },
	{ id: 'sq', label: 'Albanian', nativeLabel: 'Shqip', flag: 'al' },
	{ id: 'am', label: 'Amharic', nativeLabel: 'አማርኛ', flag: 'et' },
	{ id: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: 'sa' },
	{ id: 'an', label: 'Aragonese', nativeLabel: 'Aragonés', flag: 'es' },
	{ id: 'hy', label: 'Armenian', nativeLabel: 'Հայերեն', flag: 'am' },
	{ id: 'rup', label: 'Aromanian', nativeLabel: 'Armãneashti', flag: 'ro' },
	{ id: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া', flag: 'in' },
	{ id: 'ast', label: 'Asturian', nativeLabel: 'Asturianu', flag: 'es' },
	{ id: 'awa', label: 'Awadhi', nativeLabel: 'अवधी', flag: 'in' },
	{ id: 'ay', label: 'Aymara', nativeLabel: 'Aymar aru', flag: 'bo' },
	{ id: 'az', label: 'Azerbaijani', nativeLabel: 'Azərbaycanca', flag: 'az' },
	{ id: 'ban', label: 'Balinese', nativeLabel: 'Basa Bali', flag: 'id' },
	{ id: 'bm', label: 'Bambara', nativeLabel: 'Bamanankan', flag: 'ml' },
	{ id: 'bjn', label: 'Banjar', nativeLabel: 'Bahasa Banjar', flag: 'id' },
	{ id: 'ba', label: 'Bashkir', nativeLabel: 'Башҡортса', flag: 'ru' },
	{ id: 'eu', label: 'Basque', nativeLabel: 'Euskara', flag: 'es' },
	{ id: 'bar', label: 'Bavarian', nativeLabel: 'Boarisch', flag: 'de' },
	{ id: 'be', label: 'Belarusian', nativeLabel: 'Беларуская', flag: 'by' },
	{ id: 'bem', label: 'Bemba', nativeLabel: 'Ichibemba', flag: 'zm' },
	{ id: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', flag: 'bd' },
	{ id: 'ber', label: 'Berber', nativeLabel: 'Tamaziɣt', flag: 'ma' },
	{ id: 'bho', label: 'Bhojpuri', nativeLabel: 'भोजपुरी', flag: 'in' },
	{ id: 'bik', label: 'Bikol', nativeLabel: 'Bikol', flag: 'ph' },
	{ id: 'bi', label: 'Bislama', nativeLabel: 'Bislama', flag: 'vu' },
	{ id: 'bs', label: 'Bosnian', nativeLabel: 'Bosanski', flag: 'ba' },
	{ id: 'br', label: 'Breton', nativeLabel: 'Brezhoneg', flag: 'fr' },
	{ id: 'bug', label: 'Buginese', nativeLabel: 'ᨅᨔ ᨕᨘᨁᨗ', flag: 'id' },
	{ id: 'bg', label: 'Bulgarian', nativeLabel: 'Български', flag: 'bg' },
	{ id: 'my', label: 'Burmese', nativeLabel: 'မြန်မာ', flag: 'mm' },
	{ id: 'yue', label: 'Cantonese', nativeLabel: '粵語', flag: 'hk' },
	{ id: 'kea', label: 'Cape Verdean Creole', nativeLabel: 'Kabuverdianu', flag: 'cv' },
	{ id: 'ca', label: 'Catalan', nativeLabel: 'Català', flag: 'ad' },
	{ id: 'ceb', label: 'Cebuano', nativeLabel: 'Cebuano', flag: 'ph' },
	{ id: 'ch', label: 'Chamorro', nativeLabel: 'Chamoru', flag: 'gu' },
	{ id: 'ce', label: 'Chechen', nativeLabel: 'Нохчийн мотт', flag: 'ru' },
	{ id: 'hne', label: 'Chhattisgarhi', nativeLabel: 'छत्तीसगढ़ी', flag: 'in' },
	{ id: 'ny', label: 'Chichewa', nativeLabel: 'Chichewa', flag: 'mw' },
	{ id: 'zh', label: 'Chinese', nativeLabel: '中文', flag: 'cn' },
	{ id: 'ctg', label: 'Chittagonian', nativeLabel: 'চাঁটগাঁইয়া', flag: 'bd' },
	{ id: 'cv', label: 'Chuvash', nativeLabel: 'Чӑвашла', flag: 'ru' },
	{ id: 'zdj', label: 'Comorian', nativeLabel: 'Shikomori', flag: 'km' },
	{ id: 'rar', label: 'Cook Islands Maori', nativeLabel: 'Māori Kūki ʻĀirani', flag: 'ck' },
	{ id: 'co', label: 'Corsican', nativeLabel: 'Corsu', flag: 'fr' },
	{ id: 'kw', label: 'Cornish', nativeLabel: 'Kernewek', flag: 'gb' },
	{ id: 'hr', label: 'Croatian', nativeLabel: 'Hrvatski', flag: 'hr' },
	{ id: 'crh', label: 'Crimean Tatar', nativeLabel: 'Qırımtatarca', flag: 'ua' },
	{ id: 'cr', label: 'Cree', nativeLabel: 'ᓀᐦᐃᔭᐍᐏᐣ', flag: 'ca' },
	{ id: 'cs', label: 'Czech', nativeLabel: 'Čeština', flag: 'cz' },
	{ id: 'da', label: 'Danish', nativeLabel: 'Dansk', flag: 'dk' },
	{ id: 'dv', label: 'Dhivehi', nativeLabel: 'ދިވެހި', flag: 'mv' },
	{ id: 'din', label: 'Dinka', nativeLabel: 'Thuɔŋjäŋ', flag: 'ss' },
	{ id: 'doi', label: 'Dogri', nativeLabel: 'डोगरी', flag: 'in' },
	{ id: 'nl', label: 'Dutch', nativeLabel: 'Nederlands', flag: 'nl' },
	{ id: 'dz', label: 'Dzongkha', nativeLabel: 'རྫོང་ཁ', flag: 'bt' },
	{ id: 'cdo', label: 'Eastern Min', nativeLabel: '閩東語', flag: 'cn' },
	{ id: 'eml', label: 'Emilian-Romagnol', nativeLabel: 'Emiliàn-Rumagnòl', flag: 'it' },
	{ id: 'en', label: 'English', nativeLabel: 'English', flag: 'gb' },
	{ id: 'eo', label: 'Esperanto', nativeLabel: 'Esperanto', flag: 'eu' },
	{ id: 'et', label: 'Estonian', nativeLabel: 'Eesti', flag: 'ee' },
	{ id: 'ee', label: 'Ewe', nativeLabel: 'Eʋegbe', flag: 'gh' },
	{ id: 'fo', label: 'Faroese', nativeLabel: 'Føroyskt', flag: 'fo' },
	{ id: 'fj', label: 'Fijian', nativeLabel: 'Vosa Vakaviti', flag: 'fj' },
	{ id: 'tl', label: 'Filipino', nativeLabel: 'Filipino', flag: 'ph' },
	{ id: 'fi', label: 'Finnish', nativeLabel: 'Suomi', flag: 'fi' },
	{ id: 'fon', label: 'Fon', nativeLabel: 'Fon gbè', flag: 'bj' },
	{ id: 'fr', label: 'French', nativeLabel: 'Français', flag: 'fr' },
	{ id: 'fur', label: 'Friulian', nativeLabel: 'Furlan', flag: 'it' },
	{ id: 'ff', label: 'Fulah', nativeLabel: 'Fulfulde', flag: 'sn' },
	{ id: 'gag', label: 'Gagauz', nativeLabel: 'Gagauz dili', flag: 'md' },
	{ id: 'gl', label: 'Galician', nativeLabel: 'Galego', flag: 'es' },
	{ id: 'gan', label: 'Gan', nativeLabel: '贛語', flag: 'cn' },
	{ id: 'ka', label: 'Georgian', nativeLabel: 'ქართული', flag: 'ge' },
	{ id: 'de', label: 'German', nativeLabel: 'Deutsch', flag: 'de' },
	{ id: 'gil', label: 'Gilbertese', nativeLabel: 'Taetae ni Kiribati', flag: 'ki' },
	{ id: 'el', label: 'Greek', nativeLabel: 'Ελληνικά', flag: 'gr' },
	{ id: 'kl', label: 'Greenlandic', nativeLabel: 'Kalaallisut', flag: 'gl' },
	{ id: 'gn', label: 'Guaraní', nativeLabel: "Avañe'ẽ", flag: 'py' },
	{ id: 'gcf', label: 'Guadeloupean Creole', nativeLabel: 'Kréyòl gwadloupéyen', flag: 'gp' },
	{ id: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', flag: 'in' },
	{ id: 'ht', label: 'Haitian Creole', nativeLabel: 'Kreyòl Ayisyen', flag: 'ht' },
	{ id: 'hak', label: 'Hakka', nativeLabel: '客家話', flag: 'cn' },
	{ id: 'ha', label: 'Hausa', nativeLabel: 'Hausa', flag: 'ng' },
	{ id: 'haw', label: 'Hawaiian', nativeLabel: 'ʻŌlelo Hawaiʻi', flag: 'us' },
	{ id: 'he', label: 'Hebrew', nativeLabel: 'עברית', flag: 'il' },
	{ id: 'hil', label: 'Hiligaynon', nativeLabel: 'Hiligaynon', flag: 'ph' },
	{ id: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: 'in' },
	{ id: 'ho', label: 'Hiri Motu', nativeLabel: 'Hiri Motu', flag: 'pg' },
	{ id: 'hmn', label: 'Hmong', nativeLabel: 'Hmoob', flag: 'la' },
	{ id: 'hu', label: 'Hungarian', nativeLabel: 'Magyar', flag: 'hu' },
	{ id: 'iba', label: 'Iban', nativeLabel: 'Jaku Iban', flag: 'my' },
	{ id: 'is', label: 'Icelandic', nativeLabel: 'Íslenska', flag: 'is' },
	{ id: 'io', label: 'Ido', nativeLabel: 'Ido', flag: 'eu' },
	{ id: 'ig', label: 'Igbo', nativeLabel: 'Igbo', flag: 'ng' },
	{ id: 'ilo', label: 'Ilocano', nativeLabel: 'Ilokano', flag: 'ph' },
	{ id: 'id', label: 'Indonesian', nativeLabel: 'Bahasa Indonesia', flag: 'id' },
	{ id: 'ia', label: 'Interlingua', nativeLabel: 'Interlingua', flag: 'eu' },
	{ id: 'isv', label: 'Interslavic', nativeLabel: 'Medjužlověnsky', flag: 'eu' },
	{ id: 'iu', label: 'Inuktitut', nativeLabel: 'ᐃᓄᒃᑎᑐᑦ', flag: 'ca' },
	{ id: 'ga', label: 'Irish', nativeLabel: 'Gaeilge', flag: 'ie' },
	{ id: 'it', label: 'Italian', nativeLabel: 'Italiano', flag: 'it' },
	{ id: 'jam', label: 'Jamaican Patois', nativeLabel: 'Patwa', flag: 'jm' },
	{ id: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: 'jp' },
	{ id: 'jv', label: 'Javanese', nativeLabel: 'Basa Jawa', flag: 'id' },
	{ id: 'cjy', label: 'Jin Chinese', nativeLabel: '晉語', flag: 'cn' },
	{ id: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', flag: 'in' },
	{ id: 'ks', label: 'Kashmiri', nativeLabel: 'كٲشُر', flag: 'in' },
	{ id: 'kk', label: 'Kazakh', nativeLabel: 'Қазақша', flag: 'kz' },
	{ id: 'kaa', label: 'Karakalpak', nativeLabel: 'Qaraqalpaqsha', flag: 'uz' },
	{ id: 'krl', label: 'Karelian', nativeLabel: 'Karjala', flag: 'ru' },
	{ id: 'csb', label: 'Kashubian', nativeLabel: 'Kaszëbsczi', flag: 'pl' },
	{ id: 'kha', label: 'Khasi', nativeLabel: 'Ka Ktien Khasi', flag: 'in' },
	{ id: 'km', label: 'Khmer', nativeLabel: 'ខ្មែរ', flag: 'kh' },
	{ id: 'quc', label: "K'iche'", nativeLabel: "K'iche'", flag: 'gt' },
	{ id: 'ki', label: 'Kikuyu', nativeLabel: 'Gĩkũyũ', flag: 'ke' },
	{ id: 'rw', label: 'Kinyarwanda', nativeLabel: 'Ikinyarwanda', flag: 'rw' },
	{ id: 'rn', label: 'Kirundi', nativeLabel: 'Ikirundi', flag: 'bi' },
	{ id: 'kg', label: 'Kongo', nativeLabel: 'Kikongo', flag: 'cd' },
	{ id: 'kok', label: 'Konkani', nativeLabel: 'कोंकणी', flag: 'in' },
	{ id: 'ko', label: 'Korean', nativeLabel: '한국어', flag: 'kr' },
	{ id: 'kri', label: 'Krio', nativeLabel: 'Krio', flag: 'sl' },
	{ id: 'ku', label: 'Kurdish', nativeLabel: 'Kurdî', flag: 'iq' },
	{ id: 'ky', label: 'Kyrgyz', nativeLabel: 'Кыргызча', flag: 'kg' },
	{ id: 'lo', label: 'Lao', nativeLabel: 'ລາວ', flag: 'la' },
	{ id: 'lld', label: 'Ladin', nativeLabel: 'Ladin', flag: 'it' },
	{ id: 'lad', label: 'Ladino', nativeLabel: 'Djudeo-espanyol', flag: 'il' },
	{ id: 'la', label: 'Latin', nativeLabel: 'Latina', flag: 'va' },
	{ id: 'ltg', label: 'Latgalian', nativeLabel: 'Latgalīšu volūda', flag: 'lv' },
	{ id: 'lv', label: 'Latvian', nativeLabel: 'Latviešu', flag: 'lv' },
	{ id: 'lij', label: 'Ligurian', nativeLabel: 'Lìgure', flag: 'it' },
	{ id: 'li', label: 'Limburgish', nativeLabel: 'Lèmburgs', flag: 'nl' },
	{ id: 'ln', label: 'Lingala', nativeLabel: 'Lingála', flag: 'cd' },
	{ id: 'lt', label: 'Lithuanian', nativeLabel: 'Lietuvių', flag: 'lt' },
	{ id: 'lmo', label: 'Lombard', nativeLabel: 'Lumbaart', flag: 'it' },
	{ id: 'nds', label: 'Low German', nativeLabel: 'Plattdüütsch', flag: 'de' },
	{ id: 'dsb', label: 'Lower Sorbian', nativeLabel: 'Dolnoserbski', flag: 'de' },
	{ id: 'lg', label: 'Luganda', nativeLabel: 'Luganda', flag: 'ug' },
	{ id: 'luo', label: 'Luo', nativeLabel: 'Dholuo', flag: 'ke' },
	{ id: 'lb', label: 'Luxembourgish', nativeLabel: 'Lëtzebuergesch', flag: 'lu' },
	{ id: 'mk', label: 'Macedonian', nativeLabel: 'Македонски', flag: 'mk' },
	{ id: 'mad', label: 'Madurese', nativeLabel: 'Basa Madhura', flag: 'id' },
	{ id: 'mag', label: 'Magahi', nativeLabel: 'मगही', flag: 'in' },
	{ id: 'mai', label: 'Maithili', nativeLabel: 'मैथिली', flag: 'in' },
	{ id: 'mg', label: 'Malagasy', nativeLabel: 'Malagasy', flag: 'mg' },
	{ id: 'ms', label: 'Malay', nativeLabel: 'Bahasa Melayu', flag: 'my' },
	{ id: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം', flag: 'in' },
	{ id: 'mt', label: 'Maltese', nativeLabel: 'Malti', flag: 'mt' },
	{ id: 'gv', label: 'Manx', nativeLabel: 'Gaelg', flag: 'im' },
	{ id: 'arn', label: 'Mapudungun', nativeLabel: 'Mapudungun', flag: 'cl' },
	{ id: 'mfe', label: 'Mauritian Creole', nativeLabel: 'Kreol Morisien', flag: 'mu' },
	{ id: 'mi', label: 'Maori', nativeLabel: 'Māori', flag: 'nz' },
	{ id: 'mr', label: 'Marathi', nativeLabel: 'मराठी', flag: 'in' },
	{ id: 'mwr', label: 'Marwari', nativeLabel: 'मारवाड़ी', flag: 'in' },
	{ id: 'mh', label: 'Marshallese', nativeLabel: 'Kajin M̧ajeļ', flag: 'mh' },
	{ id: 'nan', label: 'Min Nan', nativeLabel: '閩南語', flag: 'tw' },
	{ id: 'min', label: 'Minangkabau', nativeLabel: 'Baso Minang', flag: 'id' },
	{ id: 'mwl', label: 'Mirandese', nativeLabel: 'Mirandés', flag: 'pt' },
	{ id: 'lus', label: 'Mizo', nativeLabel: 'Mizo ṭawng', flag: 'in' },
	{ id: 'mn', label: 'Mongolian', nativeLabel: 'Монгол', flag: 'mn' },
	{ id: 'mos', label: 'Mooré', nativeLabel: 'Mooré', flag: 'bf' },
	{ id: 'nah', label: 'Nahuatl', nativeLabel: 'Nāhuatl', flag: 'mx' },
	{ id: 'nap', label: 'Neapolitan', nativeLabel: 'Napulitano', flag: 'it' },
	{ id: 'na', label: 'Nauruan', nativeLabel: 'Dorerin Naoero', flag: 'nr' },
	{ id: 'nv', label: 'Navajo', nativeLabel: 'Diné bizaad', flag: 'us' },
	{ id: 'ne', label: 'Nepali', nativeLabel: 'नेपाली', flag: 'np' },
	{ id: 'pcm', label: 'Nigerian Pidgin', nativeLabel: 'Naijá', flag: 'ng' },
	{ id: 'niu', label: 'Niuean', nativeLabel: 'Vagahau Niue', flag: 'nu' },
	{ id: 'frr', label: 'North Frisian', nativeLabel: 'Frasch', flag: 'de' },
	{ id: 'nd', label: 'Northern Ndebele', nativeLabel: 'isiNdebele', flag: 'zw' },
	{ id: 'se', label: 'Northern Sami', nativeLabel: 'Davvisámegiella', flag: 'no' },
	{ id: 'nso', label: 'Northern Sotho', nativeLabel: 'Sesotho sa Leboa', flag: 'za' },
	{ id: 'no', label: 'Norwegian', nativeLabel: 'Norsk', flag: 'no' },
	{ id: 'nn', label: 'Norwegian Nynorsk', nativeLabel: 'Nynorsk', flag: 'no' },
	{ id: 'oc', label: 'Occitan', nativeLabel: 'Occitan', flag: 'fr' },
	{ id: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ', flag: 'in' },
	{ id: 'om', label: 'Oromo', nativeLabel: 'Afaan Oromoo', flag: 'et' },
	{ id: 'os', label: 'Ossetian', nativeLabel: 'Ирон æвзаг', flag: 'ge' },
	{ id: 'ps', label: 'Pashto', nativeLabel: 'پښتو', flag: 'af' },
	{ id: 'fa', label: 'Persian', nativeLabel: 'فارسی', flag: 'ir' },
	{ id: 'pcd', label: 'Picard', nativeLabel: 'Picard', flag: 'fr' },
	{ id: 'pl', label: 'Polish', nativeLabel: 'Polski', flag: 'pl' },
	{ id: 'pt', label: 'Portuguese', nativeLabel: 'Português', flag: 'pt' },
	{ id: 'pau', label: 'Palauan', nativeLabel: 'Tekoi ra Belau', flag: 'pw' },
	{ id: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ', flag: 'in' },
	{ id: 'pag', label: 'Pangasinan', nativeLabel: 'Pangasinan', flag: 'ph' },
	{ id: 'pam', label: 'Kapampangan', nativeLabel: 'Kapampangan', flag: 'ph' },
	{ id: 'pap', label: 'Papiamento', nativeLabel: 'Papiamentu', flag: 'aw' },
	{ id: 'pms', label: 'Piedmontese', nativeLabel: 'Piemontèis', flag: 'it' },
	{ id: 'pdt', label: 'Plautdietsch', nativeLabel: 'Plautdietsch', flag: 'de' },
	{ id: 'qu', label: 'Quechua', nativeLabel: 'Runa Simi', flag: 'pe' },
	{ id: 'ro', label: 'Romanian', nativeLabel: 'Română', flag: 'ro' },
	{ id: 'rm', label: 'Romansh', nativeLabel: 'Rumantsch', flag: 'ch' },
	{ id: 'rcf', label: 'Réunion Creole', nativeLabel: 'Kréol Rénioné', flag: 're' },
	{ id: 'ru', label: 'Russian', nativeLabel: 'Русский', flag: 'ru' },
	{ id: 'rue', label: 'Rusyn', nativeLabel: 'Русиньскый', flag: 'ua' },
	{ id: 'sm', label: 'Samoan', nativeLabel: 'Gagana Sāmoa', flag: 'ws' },
	{ id: 'sah', label: 'Sakha', nativeLabel: 'Сахалыы', flag: 'ru' },
	{ id: 'sg', label: 'Sango', nativeLabel: 'Sängö', flag: 'cf' },
	{ id: 'sa', label: 'Sanskrit', nativeLabel: 'संस्कृतम्', flag: 'in' },
	{ id: 'sat', label: 'Santali', nativeLabel: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: 'in' },
	{ id: 'skr', label: 'Saraiki', nativeLabel: 'سرائیکی', flag: 'pk' },
	{ id: 'sc', label: 'Sardinian', nativeLabel: 'Sardu', flag: 'it' },
	{ id: 'stq', label: 'Saterland Frisian', nativeLabel: 'Seeltersk', flag: 'de' },
	{ id: 'sco', label: 'Scots', nativeLabel: 'Scots', flag: 'gb' },
	{ id: 'gd', label: 'Scottish Gaelic', nativeLabel: 'Gàidhlig', flag: 'gb' },
	{ id: 'sr', label: 'Serbian', nativeLabel: 'Српски', flag: 'rs' },
	{ id: 'st', label: 'Sesotho', nativeLabel: 'Sesotho', flag: 'ls' },
	{ id: 'crs', label: 'Seychellois Creole', nativeLabel: 'Seselwa', flag: 'sc' },
	{ id: 'sn', label: 'Shona', nativeLabel: 'ChiShona', flag: 'zw' },
	{ id: 'scn', label: 'Sicilian', nativeLabel: 'Sicilianu', flag: 'it' },
	{ id: 'szl', label: 'Silesian', nativeLabel: 'Ślōnsko godka', flag: 'pl' },
	{ id: 'sd', label: 'Sindhi', nativeLabel: 'سنڌي', flag: 'pk' },
	{ id: 'si', label: 'Sinhala', nativeLabel: 'සිංහල', flag: 'lk' },
	{ id: 'sk', label: 'Slovak', nativeLabel: 'Slovenčina', flag: 'sk' },
	{ id: 'sl', label: 'Slovenian', nativeLabel: 'Slovenščina', flag: 'si' },
	{ id: 'so', label: 'Somali', nativeLabel: 'Soomaali', flag: 'so' },
	{ id: 'es', label: 'Spanish', nativeLabel: 'Español', flag: 'es' },
	{ id: 'srn', label: 'Sranan Tongo', nativeLabel: 'Sranantongo', flag: 'sr' },
	{ id: 'su', label: 'Sundanese', nativeLabel: 'Basa Sunda', flag: 'id' },
	{ id: 'sw', label: 'Swahili', nativeLabel: 'Kiswahili', flag: 'tz' },
	{ id: 'ss', label: 'Swati', nativeLabel: 'siSwati', flag: 'sz' },
	{ id: 'sv', label: 'Swedish', nativeLabel: 'Svenska', flag: 'se' },
	{ id: 'gsw', label: 'Swiss German', nativeLabel: 'Schwiizerdütsch', flag: 'ch' },
	{ id: 'syl', label: 'Sylheti', nativeLabel: 'ꠍꠤꠟꠐꠤ', flag: 'bd' },
	{ id: 'ty', label: 'Tahitian', nativeLabel: 'Reo Tahiti', flag: 'pf' },
	{ id: 'tg', label: 'Tajik', nativeLabel: 'Тоҷикӣ', flag: 'tj' },
	{ id: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: 'in' },
	{ id: 'tt', label: 'Tatar', nativeLabel: 'Татарча', flag: 'ru' },
	{ id: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: 'in' },
	{ id: 'tet', label: 'Tetum', nativeLabel: 'Tetun', flag: 'tl' },
	{ id: 'th', label: 'Thai', nativeLabel: 'ไทย', flag: 'th' },
	{ id: 'bo', label: 'Tibetan', nativeLabel: 'བོད་སྐད', flag: 'cn' },
	{ id: 'ti', label: 'Tigrinya', nativeLabel: 'ትግርኛ', flag: 'er' },
	{ id: 'tpi', label: 'Tok Pisin', nativeLabel: 'Tok Pisin', flag: 'pg' },
	{ id: 'to', label: 'Tongan', nativeLabel: 'Lea Faka-Tonga', flag: 'to' },
	{ id: 'lua', label: 'Tshiluba', nativeLabel: 'Tshiluba', flag: 'cd' },
	{ id: 'ts', label: 'Tsonga', nativeLabel: 'Xitsonga', flag: 'za' },
	{ id: 'tn', label: 'Tswana', nativeLabel: 'Setswana', flag: 'bw' },
	{ id: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', flag: 'tr' },
	{ id: 'tk', label: 'Turkmen', nativeLabel: 'Türkmençe', flag: 'tm' },
	{ id: 'tvl', label: 'Tuvaluan', nativeLabel: 'Te Ggana Tuuvalu', flag: 'tv' },
	{ id: 'uk', label: 'Ukrainian', nativeLabel: 'Українська', flag: 'ua' },
	{ id: 'umb', label: 'Umbundu', nativeLabel: 'Umbundu', flag: 'ao' },
	{ id: 'hsb', label: 'Upper Sorbian', nativeLabel: 'Hornjoserbsce', flag: 'de' },
	{ id: 'ur', label: 'Urdu', nativeLabel: 'اردو', flag: 'pk' },
	{ id: 'uz', label: 'Uzbek', nativeLabel: 'Oʻzbekcha', flag: 'uz' },
	{ id: 'ug', label: 'Uyghur', nativeLabel: 'ئۇيغۇرچە', flag: 'cn' },
	{ id: 've', label: 'Venda', nativeLabel: 'Tshivenda', flag: 'za' },
	{ id: 'vec', label: 'Venetian', nativeLabel: 'Vèneto', flag: 'it' },
	{ id: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt', flag: 'vn' },
	{ id: 'vro', label: 'Võro', nativeLabel: 'Võro', flag: 'ee' },
	{ id: 'wa', label: 'Walloon', nativeLabel: 'Walon', flag: 'be' },
	{ id: 'wae', label: 'Walser German', nativeLabel: 'Walserdiitsch', flag: 'ch' },
	{ id: 'war', label: 'Waray', nativeLabel: 'Winaray', flag: 'ph' },
	{ id: 'guc', label: 'Wayuu', nativeLabel: 'Wayuunaiki', flag: 'co' },
	{ id: 'cy', label: 'Welsh', nativeLabel: 'Cymraeg', flag: 'gb' },
	{ id: 'fy', label: 'Western Frisian', nativeLabel: 'Frysk', flag: 'nl' },
	{ id: 'wo', label: 'Wolof', nativeLabel: 'Wolof', flag: 'sn' },
	{ id: 'wuu', label: 'Wu', nativeLabel: '吳語', flag: 'cn' },
	{ id: 'xh', label: 'Xhosa', nativeLabel: 'isiXhosa', flag: 'za' },
	{ id: 'hsn', label: 'Xiang', nativeLabel: '湘語', flag: 'cn' },
	{ id: 'yi', label: 'Yiddish', nativeLabel: 'ייִדיש', flag: 'il' },
	{ id: 'yo', label: 'Yoruba', nativeLabel: 'Yorùbá', flag: 'ng' },
	{ id: 'yua', label: 'Yucatec Maya', nativeLabel: "Màaya T'àan", flag: 'mx' },
	{ id: 'dje', label: 'Zarma', nativeLabel: 'Zarmaciine', flag: 'ne' },
	{ id: 'zu', label: 'Zulu', nativeLabel: 'isiZulu', flag: 'za' },
];
// Only languages with a translation file in static/langs are offered to the user.
const ENABLED_LANGUAGES = ['cs', 'en'];
export const languages: Language[] = allLanguages.filter((l: Language): boolean => ENABLED_LANGUAGES.includes(l.id));
const STORAGE_KEY = 'language';
const DEFAULT_LANGUAGE = 'en';
// Translations are fetched at runtime from /langs/<id>.json and memoized here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const langCache: Record<string, any> = {};
// Tracks in-flight requests so concurrent calls share one promise.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const langPromises: Record<string, Promise<any>> = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadLanguage(id: string): Promise<any> {
	if (langCache[id]) return langCache[id];
	const inflight = langPromises[id];
	if (inflight) return inflight;
	const promise = (async () => {
		try {
			const res = await fetch(`/langs/${id}.json`);
			if (!res.ok) throw new Error(`Failed to fetch /langs/${id}.json: ${res.status}`);
			const data = await res.json();
			langCache[id] = data;
			return data;
		} catch (err) {
			console.error(`[i18n] Could not load language "${id}", falling back to ${DEFAULT_LANGUAGE}`, err);
			return langCache[DEFAULT_LANGUAGE];
		} finally {
			delete langPromises[id];
		}
	})();
	langPromises[id] = promise;
	return promise;
}

// Pick the initial language synchronously so SSR/CSR first paint uses the right one.
function pickInitialLanguage(): string {
	if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
	try {
		const saved = window.localStorage.getItem(STORAGE_KEY);
		if (saved && languages.some(l => l.id === saved)) return saved;
	} catch {
		// localStorage may be unavailable (private mode, etc.) - fall through.
	}
	const nav = window.navigator?.language?.toLowerCase() ?? '';
	const code = nav.split('-')[0];
	if (languages.some(l => l.id === code)) return code;
	return DEFAULT_LANGUAGE;
}

export const currentLanguage = writable<string>(pickInitialLanguage());

// Translations start empty and are populated by initLanguages() / setLanguage().
// Until then, t() returns empty strings: '{key}' placeholders are long unbreakable
// tokens that would widen the page behind the splash screen (horizontal overflow
// on mobile). The splash covers this phase visually.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const translations = writable<any>({});

// Helper function to get nested value from object by path
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string): string | undefined {
	const result = path.split('.').reduce((current, key) => current?.[key], obj);
	return typeof result === 'string' ? result : undefined;
}

// Reactive translation function - use as $t('common.back') or $t('key', { name: 'foo' }) in components.
// Returns the translation value, or '{key}' fallback if missing, or '' before the first language loads.
// When vars are provided, replaces {placeholder} tokens with values.
export const t: Readable<(key: string, vars?: Record<string, string>) => string> = derived(translations, $translations => {
	const loaded = Object.keys($translations).length > 0;
	return (key: string, vars?: Record<string, string>): string => {
		if (!loaded) return '';
		const text = getNestedValue($translations, key) ?? getNestedValue(langCache[DEFAULT_LANGUAGE], key) ?? `{${key}}`;
		return vars ? text.replace(/\{(\w+)\}/g, (match, k) => vars[k] ?? match) : text;
	};
});

// Function for translations outside components - use as tt('common.back') or tt('key', { name: 'foo' })
export function tt(key: string, vars?: Record<string, string>): string {
	const current = get(translations);
	if (Object.keys(current).length === 0) return '';
	const text = getNestedValue(current, key) ?? getNestedValue(langCache[DEFAULT_LANGUAGE], key) ?? `{${key}}`;
	return vars ? text.replace(/\{(\w+)\}/g, (match, k) => vars[k] ?? match) : text;
}

export function setLanguage(languageID: string): Promise<void> {
	if (!languages.some(l => l.id === languageID)) return Promise.resolve();
	currentLanguage.set(languageID);
	if (typeof window !== 'undefined') {
		try {
			window.localStorage.setItem(STORAGE_KEY, languageID);
		} catch {
			// Ignore storage failures (private mode, quota, etc.)
		}
		// Update <html lang="..."> for accessibility / SEO.
		document.documentElement.lang = languageID;
	}
	// If already cached (e.g. English), apply synchronously; otherwise fetch.
	const cached = langCache[languageID];
	if (cached) {
		translations.set(cached);
		return Promise.resolve();
	}
	return loadLanguage(languageID).then(data => {
		// Only apply if the user did not switch to another language while we were loading.
		if (get(currentLanguage) === languageID) translations.set(data);
	});
}

export function getLanguage(id: string): Language | undefined {
	return languages.find(l => l.id === id);
}

// Get flag URL for a language
export function getFlagURL(langID: string): string {
	const lang = getLanguage(langID);
	const flagCode = lang?.flag ?? langID;
	return `/flags/${flagCode}.svg`;
}

// Bootstrap on the client: fetch the default language (used as fallback) and the
// currently selected language in parallel, then commit translations.
export async function initLanguages(): Promise<void> {
	if (typeof window === 'undefined') return;
	const target = get(currentLanguage);
	const tasks: Promise<unknown>[] = [loadLanguage(DEFAULT_LANGUAGE)];
	if (target !== DEFAULT_LANGUAGE) tasks.push(loadLanguage(target));
	await Promise.all(tasks);
	const data = langCache[target] ?? langCache[DEFAULT_LANGUAGE];
	translations.set(data);
	document.documentElement.lang = target;
}

// Global open state for the language picker dialog.
export const languageDialogOpen = writable<boolean>(false);

export function openLanguageDialog(): void {
	languageDialogOpen.set(true);
}

export function closeLanguageDialog(): void {
	languageDialogOpen.set(false);
}
