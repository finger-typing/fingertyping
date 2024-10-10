"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  RotateCcw,
  Clock,
  Trophy,
  Settings,
  Home,
} from "lucide-react";

// Define the letters for each language
const languageLetters = {
  English: "abcdefghijklmnopqrstuvwxyz".split(""),
  Bangla: "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধধনপফবভমযরলশষসহড়ঢ়য়ংঃ ঁ".split(""),
  Abkhaz:
    "АаБбВвГгГьДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),

  Amharic: "ሀሁሂሃሄህሆለሉሊላሌልሎመሙሚማሜምሞሠሡሢሣሤሥሦረሩሪራሬርሮ".split(""),
  Aragonese: "abcdefghijklmnopqrstuvwxyzáéíñóúÁÉÍÑÓÚ".split(""),
  Armenian: "ԱաԲբԳգԴդԵեԶզԻիԼլԽխԾծԿկՀհԸը".split(""),
  Assyrian: "ܐܒܓܕܗܘܙܚܛܝܟܠܡܢܣܥܦܨܩܪܫܬ".split(""),
  Azerbaijani:
    "AaBbCcÇçDdEeFfGgĞğHhIiİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvYyZz".split(""),

  Berber:
    "ⴰⴱⴲⴳⴴⴵⴶⴷⴸⴹⴺⴻⴼⴽⵀⵁⵂⵃⵄⵅⵆⵇⵈⵉⵊⵋⵌⵍⵎⵏⵐⵑⵒⵓⵔⵕⵖⵗⵘⵙⵚⵛⵜⵝⵞⵟⵠⵡⵢⵣⵤⵥⵦⵧ⵨⵩⵪⵫⵬⵭⵮ⵯ⵰⵱⵲⵳⵴⵵⵶⵷⵸⵹⵺⵻⵼⵽⵾⵿".split(
      ""
    ),

  Bosnian: "abcdefghijklmnopqrstuvwxyzčćžČĆŽ".split(""),
  Breton: "abcdefghijklmnopqrstuvwxyzñÑ".split(""),
  Bulgarian: "абвгдежзийклмнопрстуфхцчшщъыьэюя".split(""),
  Catalan: "abcdefghijklmnopqrstuvwxyzçÇ".split(""),

  Corsican: "abcdefghijklmnopqrstuvwxyzàèéìòóùÀÈÉÌÒÓÙ".split(""),
  Cree: "ᐁᐃᐄᐅᐆᐊᐋᐍᐏᐑᐓᐕᐖᐘᐚᐛᐤᐦᐧᐨᐩᐪᑊᑋᒼᒽᒾᒿ".split(""),
  Croatian: "abcdefghijklmnopqrstuvwxyzčćđžČĆĐŽ".split(""),
  Danish: "abcdefghijklmnopqrstuvwxyzæøåÆØÅ".split(""),

  Esperanto: "abcdefghijklmnopqrstuvwxyzĉĝĥĵŝŭĈĜĤĴŜŬ".split(""),
  Estonian: "abcdefghijklmnopqrstuvwxyzäöõüšžÄÖÕÜŠŽ".split(""),
  Faroese: "abcdefghijklmnopqrstuvwxyzáéíóúýÁÉÍÓÚÝ".split(""),

  Finnish: "abcdefghijklmnopqrstuvwxyzäöÄÖ".split(""),
  French: "àâçéèêëîïôûùüÿœÀÂÇÉÈÊËÎÏÔÛÙÜŸŒabcdefghijklmnopqrstuvwxyz".split(""),

  Georgian: "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ".split(""),
  German: "äöüßÄÖÜabcdefghijklmnopqrstuvwxyz".split(""),
  Greek: "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ".split(""),
  Hawaiian: "abcdefghijklmnopqrstuvwxyz'".split(""),
  Hebrew: "אבגדהוזחטיכלמנסעפצקרשת".split(""),
  Hindi: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतठधनपफबभमयरलवशषसह".split(""),
  Hungarian:
    "aábcdeéfghiíjklmnoóöőprstuúüűvwxyzAÁBCDEÉFGHIÍJKLMNOÓÖŐPRSTUÚÜŰVWXYZ".split(
      ""
    ),
  Icelandic:
    "aábdðeéfghiíjklmnoóprstuúvxyýþæöAÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ".split(
      ""
    ),

  Irish: "abcdefghijklmnopqrstuvwxyzáéíóúÁÉÍÓÚ".split(""),

  Japanese:
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split(
      ""
    ),
  Javanese: "ꦲꦤꦕꦢꦣꦟꦧꦩꦪꦫꦭꦮꦱꦶꦷꦸꦹꦺꦻꦼꦽꦾ".split(""),
  Kannada: "ಅಆಇಈಉಊಋಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧಧನಪಫಬಭಮಯರಲವಶಷಸಹ಺಻಼ಽಾಿ".split(""),
  Kazakh:
    "АаӘәБбВвГгҒғДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоӨөПпРрСсТтҰұФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),

  Kirmanjki:
    "a b c ç d e ê f g h ɨ i j k l m n o p q r s ş t u û v y z A B C Ç D E Ê F G H Ɨ I J K L M N O P Q R S Ş T U Û V Y Z".split(
      " "
    ),
  Korean: "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".split(""),
  Kurdish: "ئەبپتجچحخدرڕزژسشعغفڤقکگلمنھووەی".split(""),
  Lao: "ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ".split(""),

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

  Malayalam:
    "അആഇഈഉഊഋഎഏഐഒഓകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനഩപഫബഭമയരറലളഴവശഷസഹഺ഻഼ഽാിീുൂൃൄൠൡൢൣ൤".split(
      ""
    ),
  Maltese: "abcdefghijklmnopqrstuvwxyzġħżABCDEFGHIJKLMNOPQRSTUVWXYZĠĦŻ".split(
    ""
  ),

  Maori: "abcdefghijklmnopqrstuvwxyzāēīōūABCDEFGHIJKLMNOPQRSTUVWXYZĀĒĪŌŪ".split(
    ""
  ),
  Marathi: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतठधनपफबभमयरलवशषसह".split(""),
  Mongolian:
    "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоӨөПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),
  Nepali: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतठधनपफबभमयरलवशषसह".split(""),
  Navajo: "abcdefghijklmnopqrstuvwxyz'".split(""),

  Norwegian: "abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split(
    ""
  ),
  Occitan:
    "abcdefghijklmnopqrstuvwxyzàçèéíòóùüABCDEFGHIJKLMNOPQRSTUVWXYZÀÇÈÉÍÒÓÙÜ".split(
      ""
    ),
  Odia: "ଅଆଇଈଉଊଋଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନ଩ପଫବଭମଯର଱ଲଳ଴ଵଶଷସହ଺଻଼ଽ".split(""),

  Pashto:
    "ا ب پ ت ټ ث ج ځ چ ح خ د ډ دھ ذ ر ز س ش ص ض ط ظ ع غ ف ږ ق ك ګ ل م ن ڻ و ه ء ی ې ۍ".split(
      ""
    ),
  Persian:
    "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ك گ ل م ن و ه ی".split(""),
  Polish:
    "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKŁMNŃOÓPQRSŚTUVWXYZŹŻ".split(
      ""
    ),
  Portuguese:
    "abcdefghijklmnopqrstuvwxyzñáâãàçéêíóôõúüABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÂÃÀÇÉÊÍÓÔÕÚÜ".split(
      ""
    ),
  Punjabi: "ਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨ਩ਪਫਬਭਮਯਰ਱ਲਲ਼਴ਵਸ਼਷ਸਹ਺਻਼਽ਾਿ".split(""),

  Romanian:
    "aăâbcdefghiîjklmnopqrsștțuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZĂÂÎȘȚ".split(""),
  Romansh:
    "abcdefghijklmnopqrstuvwxyzàäéèìòABCDEFGHIJKLMNOPQRSTUVWXYZÀÄÉÈÌÒ".split(
      ""
    ),
  Russian: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split(""),
  Sanskrit: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतठधनपफबभमयरलवशषसह".split(""),
  ScotsGaelic:
    "abcdefghijklmnopqrstuvwxyzàèéìòùABCDEFGHIJKLMNOPQRSTUVWXYZÀÈÉÌÒÙ".split(
      ""
    ),
  Serbian:
    "абвгдђежзијклмнопрстћуфхцчџшABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЂЕЖЗИЈКЛМНОПРСТЋУФХЦЧЏШ".split(
      ""
    ),

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

  Spanish:
    "abcdefghijklmnopqrstuvwxyzñáéíóúüABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÉÍÓÚÜ".split(
      ""
    ),

  Swedish: "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split(
    ""
  ),

  Tajik:
    "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),
  Tamil:
    "அஆஇஈஉஊஎஏஐஒஓஔக஖஗஘ஙச஛ஜ஝ஞட஠஡஢ணத஥த஧஧னபமயரலவஶஷஸஹ஺஻஼஽ாிீூ௃௄௠௡௢௣௤௥௦௧௨௩௪௫௬௭௮௯௰௱௲௳௴௵௶௷௸௹௺௻௼௽௾௿".split(
      ""
    ),
  Tatar:
    "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоӨөПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      ""
    ),
  Telugu:
    "అఆఇఈఉఊఋఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధన఩పఫబభమయరఱలళఴవశషసహ఺఻఼ఽాిీుూృౄౠౡౢౣ౤౥౦౧౨౩౪౫౬౭౮౯౰౱౲౳౴౵౶౷౸౹౺౻౼౽౾౿".split(
      ""
    ),
  Thai: "กขคงจฉชซฌญฎฏฐฑฒนบปผฝพฟภมยรลวหออฮ".split(""),
  Tibetan: "ཀཁགངཅཆཇཉཏཐདནཔཕབམཙཚཛཝཞཟའཡརལཤསཧཨ".split(""),
  Tigrinya: "ሀሁሂሃሄህሆለሉሊላሌልሎመሙሚማሜምሞሠሡሢሣሤሥሦረሩሪራሬርሮ".split(""),

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

  Yiddish: "א ב ג ד ה ו ז ח ט י כ ל מ נ ס ע פ צ ק ר ש ת".split(""),
  Yoruba: "abcdefghijklmnopqrstuvwxyzẹéíóọù".split(""),
};
type Language = keyof typeof languageLetters;

const TypingPractice = () => {
  // State variables for game logic
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English");
  const [showLanguages, setShowLanguages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Focus input on component mount
  useEffect(() => inputRef.current?.focus(), []);

  // Timer logic for the game
  useEffect(() => {
    if (isGameActive) {
      timerRef.current = setInterval(
        () => setTime((prevTime) => prevTime + 1),
        1000
      );
    }
    return () => clearInterval(timerRef.current!);
  }, [isGameActive]);

  // Close language dropdown when clicking outside
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate words per minute
  useEffect(
    () => setWpm(time > 0 ? Math.round((score / time) * 60) : 0),
    [score, time]
  );

  // Handle input change and game logic
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const currentWord =
      languageLetters[currentLanguage][currentWordIndex].toLowerCase();

    if (!isGameActive) setIsGameActive(true);

    if (value.endsWith(currentWord)) {
      setScore((prevScore) => prevScore + 1);
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % languageLetters[currentLanguage].length
      );
      setInput(value + " ");
      setIsCorrect(true);
    } else {
      setIsCorrect(value === currentWord.slice(0, value.length));
      setInput(value);
    }
  };

  // Reset the game state
  const resetGame = () => {
    setCurrentWordIndex(0);
    setInput("");
    setScore(0);
    setTime(0);
    setIsGameActive(false);
    setWpm(0);
    inputRef.current?.focus();
  };

  // Filter languages based on search term
  const filteredLanguages = Object.keys(languageLetters).filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format time for display
  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl p-6">
        <div
          className={`text-center text-9xl sm:text-8xl md:text-9xl font-bold mb-6 transition-all duration-300 ease-in-out ${
            isCorrect ? "text-green-500" : "text-red-600"
          }`}
        >
          {languageLetters[currentLanguage][currentWordIndex].toUpperCase()}
        </div>

        <input
          ref={inputRef}
          type="text"
          name="input_letter"
          value={input}
          onChange={handleInputChange}
          placeholder="Start typing to begin"
          className={`w-full text-xl sm:text-2xl p-3 rounded-lg bg-gray-700 text-center focus:outline-none transition-all duration-300 ease-in-out mb-6 ${
            isCorrect ? "ring-2 ring-green-500" : "ring-2 ring-red-600"
          }`}
        />

        <div className="grid grid-cols-2 gap-4 mb-1">
          <button
            onClick={resetGame}
            className="bg-gray-700 hover:bg-gray-600 text-yellow-400 hover:text-yellow-300 inline-flex items-center justify-center font-semibold transition-colors duration-300 p-2 rounded-lg"
          >
            <RotateCcw size={20} className="mr-2" />
            Reset
          </button>
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-green-400 hover:text-green-300 inline-flex items-center justify-center font-semibold transition-colors duration-300 p-2 rounded-lg"
          >
            <Home size={20} className="mr-2" />
            Home
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
          <StatCard
            icon={<Settings size={20} />}
            label="LPM"
            value={wpm.toString()}
          />

          <StatCard
            icon={<Clock size={20} />}
            label="Time"
            value={formatTime(time)}
          />
          <LanguageDropdown
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            showLanguages={showLanguages}
            setShowLanguages={setShowLanguages}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredLanguages={filteredLanguages}
            resetGame={resetGame}
            dropdownRef={dropdownRef}
          />

          <StatCard
            icon={<Trophy size={20} />}
            label="Score"
            value={score.toString()}
          />
        </div>

        <div className="text-center mt-9 text-sm">
          <h1>www.fingertyping.com</h1>
        </div>
      </div>
    </div>
  );
};

// Component to display statistics
const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-gray-700 rounded-lg p-2 flex flex-col items-center justify-center h-20">
    <div className="flex items-center mb-1">
      {icon}
      <span className="ml-1 text-sm font-semibold text-gray-400">{label}</span>
    </div>
    <div className="text-lg font-bold">{value}</div>
  </div>
);

// Dropdown component for language selection
const LanguageDropdown = ({
  currentLanguage,
  setCurrentLanguage,
  showLanguages,
  setShowLanguages,
  searchTerm,
  setSearchTerm,
  filteredLanguages,
  resetGame,
  dropdownRef,
}: {
  currentLanguage: Language;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
  showLanguages: boolean;
  setShowLanguages: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredLanguages: string[];
  resetGame: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}) => (
  <div className="relative h-20" ref={dropdownRef}>
    <button
      onClick={() => setShowLanguages(!showLanguages)}
      className="w-full h-full flex items-center justify-center space-x-1 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300"
    >
      <span className="font-semibold">{currentLanguage}</span>
      <ChevronDown size={20} />
    </button>
    {showLanguages && (
      <div className="absolute left-0 right-0 mt-2 border rounded-lg shadow-lg z-10 bg-gray-700">
        <div className="p-2">
          <div className="relative">
            <input
              type="text"
              name="search_lang"
              placeholder="Search language"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-2 py-2 rounded-md bg-gray-600 text-gray-200 placeholder-gray-400"
            />
            <Search
              size={16}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Updated: Set max-height to 3 languages and allow scrolling */}
        <div className="overflow-y-auto max-h-20">
          {filteredLanguages.map((lang) => (
            <div
              key={lang}
              onClick={() => {
                setCurrentLanguage(lang as Language);
                setShowLanguages(false);
                resetGame();
                setSearchTerm("");
              }}
              className="p-2 cursor-pointer hover:bg-gray-600 transition-all duration-300"
            >
              {lang}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default TypingPractice;
