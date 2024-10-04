"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";

//language

const languageLetters = {
  English: "abcdefghijklmnopqrstuvwxyz".split(""),
  Bangla: "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ংঃ".split(""),
  Abkhaz:
    "АаБбВвГгГьДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),
  Acoli: "abcdefghijklmnopqrstuvwxyz".split(""),
  Afar: "abcdefghijklmnopqrstuvwxyz".split(""),
  Akan: "abcdefghijklmnopqrstuvwxyz".split(""),
  Amharic: "ሀሁሂሃሄህሆለሉሊላሌልሎመሙሚማሜምሞሠሡሢሣሤሥሦረሩሪራሬርሮ".split(""),
  Aragonese: "abcdefghijklmnopqrstuvwxyzáéíñóúÁÉÍÑÓÚ".split(""),
  Armenian: "ԱաԲբԳգԴդԵեԶզԻիԼլԽխԾծԿկՀհԸը".split(""),
  Assyrian: "ܐܒܓܕܗܘܙܚܛܝܟܠܡܢܣܥܦܨܩܪܫܬ".split(""),
  Azerbaijani:
    "AaBbCcÇçDdEeFfGgĞğHhIiİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvYyZz".split(""),
  Bemba: "abcdefghijklmnopqrstuvwxyz".split(""),
  Berber:
    "ⴰⴱⴲⴳⴴⴵⴶⴷⴸⴹⴺⴻⴼⴽⵀⵁⵂⵃⵄⵅⵆⵇⵈⵉⵊⵋⵌⵍⵎⵏⵐⵑⵒⵓⵔⵕⵖⵗⵘⵙⵚⵛⵜⵝⵞⵟⵠⵡⵢⵣⵤⵥⵦⵧ⵨⵩⵪⵫⵬⵭⵮ⵯ⵰⵱⵲⵳⵴⵵⵶⵷⵸⵹⵺⵻⵼⵽⵾⵿".split(
      ""
    ),
  Bislama: "abcdefghijklmnopqrstuvwxyz".split(""),
  Bosnian: "abcdefghijklmnopqrstuvwxyzčćžČĆŽ".split(""),
  Breton: "abcdefghijklmnopqrstuvwxyzñÑ".split(""),
  Bulgarian: "абвгдежзийклмнопрстуфхцчшщъыьэюя".split(""),
  Catalan: "abcdefghijklmnopqrstuvwxyzçÇ".split(""),
  Chamorro: "abcdefghijklmnopqrstuvwxyz".split(""),
  Chewa: "abcdefghijklmnopqrstuvwxyz".split(""),
  Comorian: "abcdefghijklmnopqrstuvwxyz".split(""),
  Corsican: "abcdefghijklmnopqrstuvwxyzàèéìòóùÀÈÉÌÒÓÙ".split(""),
  Cree: "ᐁᐃᐄᐅᐆᐊᐋᐍᐏᐑᐓᐕᐖᐘᐚᐛᐤᐦᐧᐨᐩᐪᑊᑋᒼᒽᒾᒿ".split(""),
  Croatian: "abcdefghijklmnopqrstuvwxyzčćđžČĆĐŽ".split(""),
  Danish: "abcdefghijklmnopqrstuvwxyzæøåÆØÅ".split(""),
  Dinka: "abcdefghijklmnopqrstuvwxyz".split(""),
  Dutch: "abcdefghijklmnopqrstuvwxyz".split(""),
  Esperanto: "abcdefghijklmnopqrstuvwxyzĉĝĥĵŝŭĈĜĤĴŜŬ".split(""),
  Estonian: "abcdefghijklmnopqrstuvwxyzäöõüšžÄÖÕÜŠŽ".split(""),
  Faroese: "abcdefghijklmnopqrstuvwxyzáéíóúýÁÉÍÓÚÝ".split(""),
  Fijian: "abcdefghijklmnopqrstuvwxyz".split(""),
  Finnish: "abcdefghijklmnopqrstuvwxyzäöÄÖ".split(""),
  French: "àâçéèêëîïôûùüÿœÀÂÇÉÈÊËÎÏÔÛÙÜŸŒabcdefghijklmnopqrstuvwxyz".split(""),
  Ganda: "abcdefghijklmnopqrstuvwxyz".split(""),
  Georgian: "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ".split(""),
  German: "äöüßÄÖÜabcdefghijklmnopqrstuvwxyz".split(""),
  Greek: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ".split(""),
  Hawaiian: "abcdefghijklmnopqrstuvwxyz'".split(""),
  Hebrew: "אבגדהוזחטיכלמנסעפצקרשת".split(""),
  Hindi: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह".split(""),
  Hungarian:
    "aábcdeéfghiíjklmnoóöőprstuúüűvwxyzAÁBCDEÉFGHIÍJKLMNOÓÖŐPRSTUÚÜŰVWXYZ".split(
      ""
    ),
  Icelandic:
    "aábdðeéfghiíjklmnoóprstuúvxyýþæöAÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ".split(
      ""
    ),
  Igbo: "abcdefghijklmnopqrstuvwxyz".split(""),
  Indonesian: "abcdefghijklmnopqrstuvwxyz".split(""),
  Irish: "abcdefghijklmnopqrstuvwxyzáéíóúÁÉÍÓÚ".split(""),
  Italian: "abcdefghijklmnopqrstuvwxyz".split(""),
  Japanese:
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split(
      ""
    ),
  Javanese: "ꦲꦤꦕꦢꦣꦟꦧꦩꦪꦫꦭꦮꦱꦶꦷꦸꦹꦺꦻꦼꦽꦾ".split(""),
  Kannada: "ಅಆಇಈಉಊಋಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧನಪಫಬಭಮಯರಲವಶಷಸಹ".split(""),
  Kazakh:
    "АаӘәБбВвГгҒғДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоӨөПпРрСсТтҰұФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),
  Kinyarwanda: "abcdefghijklmnopqrstuvwxyz".split(""),
  Kirmanjki:
    "a b c ç d e ê f g h ɨ i j k l m n o p q r s ş t u û v y z A B C Ç D E Ê F G H Ɨ I J K L M N O P Q R S Ş T U Û V Y Z".split(
      " "
    ),
  Korean: "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".split(""),
  Kurdish: "ئەبپتجچحخدرڕزژسشعغفڤقکگلمنھووەی".split(""),
  Lao: "ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ".split(""),
  Latin: "abcdefghijklmnopqrstuvwxyz".split(""),
  Latvian:
    "aābcčdeēfgģhiījkķlļmnņoópqrsštuūvzžAĀBCČDEĒFGĢHIĪJKĶLĻMNŅOÓPQRSŠTUŪVZŽ".split(
      ""
    ),
  Lithuanian:
    "aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ".split(
      ""
    ),
  Luxembourgish:
    "abcdefghijklmnopqrstuvwxyzäéëüABCDEFGHIJKLMNOPQRSTUVWXYZÄÉËÜ".split(""),
  Macedonian: "абвгдѓежзијклмнњопрстќуфхцчџш".split(""),
  Malagasy: "abcdefghijklmnopqrstuvwxyz".split(""),
  Malay: "abcdefghijklmnopqrstuvwxyz".split(""),
  Malayalam: "അആഇഈഉഊഋഎഏഐഒഓകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനപഫബഭമയരലവശഷസഹ".split(""),
  Maltese: "abcdefghijklmnopqrstuvwxyzġħżABCDEFGHIJKLMNOPQRSTUVWXYZĠĦŻ".split(
    ""
  ),
  Manx: "abcdefghijklmnopqrstuvwxyz".split(""),
  Maori: "abcdefghijklmnopqrstuvwxyzāēīōūABCDEFGHIJKLMNOPQRSTUVWXYZĀĒĪŌŪ".split(
    ""
  ),
  Marathi: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह".split(""),
  Mongolian:
    "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоӨөПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),
  Nepali: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह".split(""),
  Navajo: "abcdefghijklmnopqrstuvwxyz'".split(""),
  Ndebele: "abcdefghijklmnopqrstuvwxyz".split(""),
  Norwegian: "abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split(
    ""
  ),
  Occitan:
    "abcdefghijklmnopqrstuvwxyzàçèéíòóùüABCDEFGHIJKLMNOPQRSTUVWXYZÀÇÈÉÍÒÓÙÜ".split(
      ""
    ),
  Odia: "ଅଆଇଈଉଊଋଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନପଫବଭମୟରଲଶଷସହ".split(""),
  Oromo: "abcdefghijklmnopqrstuvwxyz".split(""),
  Pashto:
    "ا ب پ ت ټ ث ج ځ چ ح خ د ډ دھ ذ ر ز س ش ص ض ط ظ ع غ ف ږ ق ك ګ ل م ن ڼ و ه ء ی ې ۍ".split(
      ""
    ),
  Persian:
    "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ك گ ل م ن و ه ی".split(""),
  Polish:
    "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKŁMNŃOÓPQRSŚTUVWXYZŹŻ".split(
      ""
    ),
  Portuguese:
    "abcdefghijklmnopqrstuvwxyzáâãàçéêíóôõúüABCDEFGHIJKLMNOPQRSTUVWXYZÁÂÃÀÇÉÊÍÓÔÕÚÜ".split(
      ""
    ),
  Punjabi: "ਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਵਸਹ".split(""),
  Quechua: "abcdefghijklmnopqrstuvwxyz".split(""),
  Romanian:
    "aăâbcdefghiîjklmnopqrsștțuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZĂÂÎȘȚ".split(""),
  Romansh:
    "abcdefghijklmnopqrstuvwxyzàäéèìòABCDEFGHIJKLMNOPQRSTUVWXYZÀÄÉÈÌÒ".split(
      ""
    ),
  Russian: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split(""),
  Samoan: "abcdefghijklmnopqrstuvwxyz'".split(""),
  Sanskrit: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह".split(""),
  ScotsGaelic:
    "abcdefghijklmnopqrstuvwxyzàèéìòùABCDEFGHIJKLMNOPQRSTUVWXYZÀÈÉÌÒÙ".split(
      ""
    ),
  Serbian:
    "абвгдђежзијклмнопрстћуфхцчџшABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЂЕЖЗИЈКЛМНОПРСТЋУФХЦЧЏШ".split(
      ""
    ),
  Sesotho: "abcdefghijklmnopqrstuvwxyz".split(""),
  Shona: "abcdefghijklmnopqrstuvwxyz".split(""),
  Sindhi:
    "ا ب ٻ ت ٹ ٿ ث پ ڀ ج ڄ چ ڃ ح خ د ڊ ڌ ذ ر ز س ش ص ض ط ظ ع غ ف ڦ ق ڪ ک گ ڳ ل م ن ڻ و ه ء ي".split(
      ""
    ),
  Sinhala: "අආඇඈඉඊඋඌඍඑඒඓඔඕඖකඛගඝඞචඡජඣඤටඦඩඪණතථදධනපඵබභමයරලවශෂසහ".split(""),
  Slovak:
    "aáäbcčdďeéfghiíjklľmnňoóôprsštťuúvwxyzžAÁÄBCČDĎEÉFGHIÍJKLĽMNŇOÓÔPRSŠTŤUÚVWXYZŽ".split(
      ""
    ),
  Slovenian: "abcčdefghijklmnoprsštuvzž".split(""),
  Somali: "abcdefghijklmnopqrstuvwxyz".split(""),
  Sotho: "abcdefghijklmnopqrstuvwxyz".split(""),
  Spanish:
    "abcdefghijklmnopqrstuvwxyzñáéíóúüABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÉÍÓÚÜ".split(
      ""
    ),
  Sundanese: "abcdefghijklmnopqrstuvwxyz".split(""),
  Swahili: "abcdefghijklmnopqrstuvwxyz".split(""),
  Swedish: "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split(
    ""
  ),
  Tagalog: "abcdefghijklmnopqrstuvwxyz".split(""),
  Tajik:
    "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),
  Tamil: "அஆஇஈஉஊஎஏஐஒஓஔக஖கஙச஛ஜ஝ஞட஠ட൦൧൨൩൪൫൬൭൮൯".split(""),
  Tatar:
    "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоӨөПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),
  Telugu: "అఆఇఈఉఊఋఎఏఐఒఓఔకఖగఘఙచఛజఝఞటಠడಢణతథదధనపఫబభమయరలవశషసహ".split(""),
  Thai: "กขคงจฉชซฌญฎฏฐฑฒนบปผฝพฟภมยรลวหออฮ".split(""),
  Tibetan: "ཀཁགངཅཆཇཉཏཐདནཔཕབམཙཚཛཝཞཟའཡརལཤསཧཨ".split(""),
  Tigrinya: "ሀሁሂሃሄህሆለሉሊላሌልሎመሙሚማሜምሞሠሡሢሣሤሥሦረሩሪራሬርሮ".split(""),
  TokPisin: "abcdefghijklmnopqrstuvwxyz".split(""),
  Turkish:
    "abcçdefgğhıijklmnoöprsştuüvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZÇĞİÖŞÜ".split(""),
  Turkmen:
    "AÄBБVГDÝEÝŽZÝKLMLMNOÖPÝRСŞTÝUÜWÝABCDEFGHIJKLMNOPQRSTUVWXYZÄÖŞ".split(""),
  Ukrainian: "абвгґдезийклмнопрстуфхцчшщьюя".split(""),
  Urdu: "ا ب پ چ ڈ ڑ ڤ ڧ ت ث ج ح خ دھ ر ز س ش ص ض ط ظ ع غ ف ق ک ل م ن و ه ھ ی".split(
    ""
  ),
  Uzbek: "aаbбcсdдeеfфgгhҳiиjжkкlлmмnнoоpпqқrрsсtтuуfфvвxхyйzз".split(""),
  Vietnamese: "abcdefghijklmnopqrstuvwxyzăâêôơư".split(""),
  Welsh: "abcdefghijklmnopqrstuvwxyzâêîôŵŷ".split(""),
  Wolof: "abcdefghijklmnopqrstuvwxyz".split(""),
  Xhosa: "abcdefghijklmnopqrstuvwxyz".split(""),
  Yiddish: "א ב ג ד ה ו ז ח ט י כ ל מ נ ס ע פ צ ק ר ש ת".split(""),
  Yoruba: "abcdefghijklmnopqrstuvwxyzẹéíóọù".split(""),
  Zulu: "abcdefghijklmnopqrstuvwxyz".split(""),
};

// Define the type for the languages
type Language = keyof typeof languageLetters; // Ensures currentLanguage is always one of the keys

const TypingPractice = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English"); // Type-safe
  const [showLanguages, setShowLanguages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isGameActive) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isGameActive]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguages(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const currentWord =
      languageLetters[currentLanguage][currentWordIndex].toLowerCase();

    setInput(value);

    if (!isGameActive) {
      setIsGameActive(true);
    }

    if (value.endsWith(currentWord)) {
      setScore((prevScore) => prevScore + 1);
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % languageLetters[currentLanguage].length
      );
      setIsCorrect(true);
      setInput((prevInput) => prevInput + " ");
    } else {
      setIsCorrect(value === currentWord.slice(0, value.length));
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const filteredLanguages = Object.keys(languageLetters).filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-gray-200 p-4 sm:p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-3">
          <div
            className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold transition-all duration-300 ease-in-out ${
              isCorrect ? "text-green-500" : "text-red-500"
            } drop-shadow-2xl`}
          >
            {languageLetters[currentLanguage][currentWordIndex].toUpperCase()}
          </div>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className={`w-full text-2xl sm:text-3xl p-3 sm:p-4 border-4 rounded-lg bg-gray-800 bg-opacity-60 text-gray-200 placeholder-gray-400 text-center focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out ${
            isCorrect
              ? "border-green-500 focus:ring-green-500"
              : "border-red-500 focus:ring-red-500"
          }`}
          placeholder="Start typing to begin"
        />

        <div className="mt-6 grid grid-cols-4 gap-1 items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowLanguages(!showLanguages)}
              className="w-full flex items-center justify-between space-x-1 p-2 rounded border bg-gray-700 border-gray-300"
            >
              <span>{currentLanguage}</span>
              <ChevronDown size={18} />
            </button>
            {showLanguages && (
              <div className="absolute top-full left-0 mt-1 border rounded shadow-lg z-10 bg-gray-800 border-gray-700 w-48">
                <div className="p-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search language"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-2 py-1 rounded-md bg-gray-700 text-white"
                    />
                    <Search
                      size={16}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-20">
                  {filteredLanguages.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => {
                        setCurrentLanguage(lang as Language); // Type-casting to ensure proper type usage
                        setShowLanguages(false);
                        setCurrentWordIndex(0);
                        setInput("");
                        setScore(0);
                        setTime(0);
                        setIsGameActive(false);
                        setSearchTerm("");
                      }}
                      className="p-2 cursor-pointer hover:bg-gray-700"
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl font-semibold text-gray-300">
              Score
            </div>
            <div className="text-xl sm:text-2xl text-gray-100">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-xl font-semibold text-gray-300">
              Time
            </div>
            <div className="text-xl sm:text-2xl text-gray-100">
              {formatTime(time)}
            </div>
          </div>
          <div className="text-center">
            <Link
              href="/"
              className="text-blue-500 hover:underline inline-block text-lg sm:text-xl font-semibold"
            >
              ← Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingPractice;
