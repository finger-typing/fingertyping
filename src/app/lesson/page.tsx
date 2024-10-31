"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  Sun,
  Moon,
  RefreshCcw,
  Undo2,
  Search,
  X,
} from "lucide-react";

const lessonOptions = {
  "Letters(a-z)": "abcdefghijklmnopqrstuvwxyz",
  "Home-Row": "asdfghjkl;;lkjhgfdsa",
  "Home-Row Capital": "ASDFGHJKL::LKJHGFDSA",
  "Upper-Row": "qwertyuioppoiuytrewq",
  "Upper-Row Capital": "QWERTYUIOPPOIUYTREWQ",
  "Lower-Row": "zxcvbnm,.//.,mnbvcxz",
  "Lower-Row Capital": "ZXCVBNM<>??><MNBVCXZ",
  Numbers: "12345678900987654321",
  "Symbols practice": "!@#$%^&*()_+-=[]{}|;:,.<>?",
  "Random Practice":
    "3Gwj+{X@[u4@A5|Yp0hIq;8Pr6&m<HCK)^DWlt)ZrM2_.79sk]*!ezJVT1SNnyLx#}FBoQbdOi%cvEfR-?,",
  "Left Hand practice": "qwertasdfgzxcvbbvcxzgfdsatrewq",
  "Right Hand practice": "yuiophjkl;nm,.//.,mn;lkjhpoiuy",
  "Capital Letters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "All characters":
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?",
};

type LessonOption = keyof typeof lessonOptions;

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

export default function TypingPractice() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedWords, setTypedWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(true);
  const [time, setTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>("English");
  const [currentLesson, setCurrentLesson] =
    useState<LessonOption>("Letters(a-z)");
  const [wpm, setWpm] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const correctAudioRef = useRef<HTMLAudioElement>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const LanguageSelector = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const filteredLanguages = Object.keys(languageLetters).filter((lang) =>
      lang.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const handleLanguageSelect = (language: string) => {
      setCurrentLanguage(language as Language);
      setIsLanguageDropdownOpen(false);
      setSearchQuery("");
    };
  
    // Focus the search input whenever the dropdown opens
    useEffect(() => {
      if (isLanguageDropdownOpen && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isLanguageDropdownOpen]);
    
  
    return (
      <div className="mb-6 relative">
        {/* Toggle button to open dropdown */}
        <div
          className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 
                     hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer 
                     transition-colors duration-200 flex justify-between items-center"
          onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              {currentLanguage[0]}
            </div>
            <span className="text-lg font-medium text-gray-800 dark:text-white">
              {currentLanguage}
            </span>
          </div>
          <div
            className={`transform transition-transform duration-200 ${
              isLanguageDropdownOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </div>
        </div>
  
        {/* Language dropdown list */}
        {isLanguageDropdownOpen && (
          <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-10">
            <div className="p-3 border-b">
              <div className="relative">
                {/* Search input with ref */}
                <input
                  type="text"
                  ref={searchInputRef} // Use ref here
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search language..."
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 
                           text-gray-800 dark:text-white border-none focus:ring-2 
                           focus:ring-green-500 transition-colors duration-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                {searchQuery && (
                  <button
                    title="search_button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery("");
                    }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
                  </button>
                )}
              </div>
            </div>
  
            {/* Filtered language options */}
            <div className="max-h-28 overflow-y-auto">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => handleLanguageSelect(lang)}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-100 
                             dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      {lang[0]}
                    </div>
                    <span className="text-gray-800 dark:text-white">{lang}</span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                  No languages found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  
 
  

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isGameActive) {
      timerRef.current = setInterval(
        () => setTime((prevTime) => prevTime + 1),
        1000
      );
    }
    return () => clearInterval(timerRef.current!);
  }, [isGameActive]);

  useEffect(
    () => setWpm(time > 0 ? Math.round((score / time) * 60) : 0),
    [score, time]
  );

  useEffect(() => {
    resetGame();
  }, [currentLanguage, currentLesson]);

  // Updated dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const getCurrentLetters = () => {
    if (currentLanguage === "English") {
      return lessonOptions[currentLesson].split("");
    }
    return languageLetters[currentLanguage];
  };

  const playSound = (isCorrect: boolean) => {
    if (!isSoundEnabled) return;
    const audioRef = isCorrect ? correctAudioRef : incorrectAudioRef;
    audioRef.current
      ?.play()
      .catch((error) => console.error("Error playing sound:", error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const currentWord = getCurrentLetters()[currentWordIndex];

    if (!isGameActive) setIsGameActive(true);

    if (value === currentWord) {
      // Case-sensitive comparison
      setScore((prevScore) => prevScore + 1);
      setTypedWords((prev) => [...prev, currentWord]);
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % getCurrentLetters().length
      );
      setInput("");
      setIsCorrect(true);
      playSound(true);
    } else {
      const newIsCorrect = value === currentWord.slice(0, value.length); // Case-sensitive comparison
      setIsCorrect(newIsCorrect);
      setInput(value);
      if (!newIsCorrect) {
        playSound(false);
      }
    }
  };

  const resetGame = () => {
    setCurrentWordIndex(0);
    setTypedWords([]);
    setInput("");
    setScore(0);
    setTime(0);
    setIsGameActive(false);
    setWpm(0);
    inputRef.current?.focus();
  };

  const formatTime = (seconds: number) =>
    `${Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar for desktop */}
        <div className="hidden md:block md:w-64 bg-gray-100 dark:bg-gray-800 p-4">
          {/* Sidebar Title */}
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Lessons
          </h2>

          {/* Scrollable Content Wrapper */}
          <div className="max-h-[80vh] overflow-y-auto">
            {Object.keys(lessonOptions).map((option) => (
              <button
                key={option}
                onClick={() => setCurrentLesson(option as LessonOption)}
                className={`w-full text-left py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition duration-200 ease-in-out mb-2 text-gray-800 dark:text-white ${
                  currentLanguage !== "English"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={currentLanguage !== "English"}
              >
                {option}
              </button>
            ))}
          </div>

          <h2 className="text-sm font-bold mt-2 text-center text-gray-800 dark:text-white">
            Finger Typing
          </h2>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <button
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={isSoundEnabled ? "Disable sound" : "Enable sound"}
              >
                {isSoundEnabled ? (
                  <Volume2 className="w-6 h-6 text-gray-800 dark:text-white" />
                ) : (
                  <VolumeX className="w-6 h-6 text-gray-800 dark:text-white" />
                )}
              </button>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Finger Typing
              </h1>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="w-6 h-6 text-gray-800 dark:text-white" />
                ) : (
                  <Moon className="w-6 h-6 text-gray-800 dark:text-white" />
                )}
              </button>
            </div>

            {/* Mobile Lesson Selector */}
            <div className="md:hidden mb-4">
              <select
                title="mobile_lesson"
                value={currentLesson}
                onChange={(e) =>
                  setCurrentLesson(e.target.value as LessonOption)
                }
                className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={currentLanguage !== "English"}
              >
                {Object.keys(lessonOptions).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-center mb-6">
              <div
                className={`text-8xl md:text-9xl font-bold mb-4 ${
                  isCorrect ? "text-green-500" : "text-red-500"
                }`}
              >
                {getCurrentLetters()[currentWordIndex]}
              </div>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className={`w-full text-xl md:text-3xl p-2 md:p-4 border-2 rounded text-center focus:outline-none ${
                    isCorrect ? "border-green-500" : "border-red-500"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-white`}
                  placeholder="Type here..."
                />
                <div className="mt-2 text-gray-500 dark:text-gray-400 text-lg overflow-x-auto whitespace-nowrap p-2">
                  {typedWords.join(" ")}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2 md:grid-cols-4">
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded shadow">
                <h3 className="font-bold mb-2 text-gray-600 dark:text-gray-300">
                  LPM
                </h3>
                <p className="text-2xl md:text-3xl text-gray-800 dark:text-white">
                  {wpm}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded shadow">
                <h3 className="font-bold mb-2 text-gray-600 dark:text-gray-300">
                  Time
                </h3>
                <p className="text-2xl md:text-3xl text-gray-800 dark:text-white">
                  {formatTime(time)}s
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded shadow">
                <h3 className="font-bold mb-2 text-gray-600 dark:text-gray-300">
                  Score
                </h3>
                <p className="text-2xl md:text-3xl text-gray-800 dark:text-white">
                  {score}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded shadow">
                <h3 className="font-bold mb-2 text-gray-600 dark:text-gray-300">
                  Lesson
                </h3>
                <p className="text-sm md:text-lg text-gray-800 dark:text-white">
                  {currentLesson}
                </p>
              </div>
            </div>

            {/* language section */}

            <LanguageSelector />

            {/* Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <button
                onClick={resetGame}
                className="bg-green-500 text-white px-6 py-1 rounded hover:bg-green-600 transition duration-200 ease-in-out flex items-center justify-center"
              >
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
              </button>
              <Link
                href="/"
                className="bg-green-500 text-white px-6 py-1 rounded hover:bg-green-600 transition duration-200 ease-in-out flex items-center justify-center"
              >
                <Undo2 className="mr-2 h-4 w-4" /> Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <audio ref={correctAudioRef} src="/correct.mp3" />
      <audio ref={incorrectAudioRef} src="/incorrect.mp3" />
    </div>
  );
}
