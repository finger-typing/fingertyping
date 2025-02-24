// types/typing-config.ts
export type LessonOption =
  | "Letters(a-z)"
  | "Home-Row"
  | "Upper-Row"
  | "Lower-Row"
  | "Home-Row Capital"
   | "Upper-Row Capital"
  | "Lower-Row Capital"
  | "Numbers"
  | "Symbols practice"
  | "Random Practice"
  | "Left Hand practice"
  | "Right Hand practice"
  | "Capital Letters"
  | "All characters";

export const LessonOptions: Record<LessonOption, string> = {
  "Letters(a-z)": "abcdefghijklmnopqrstuvwxyz",
  "Home-Row": "asdfghjkl;;lkjhgfdsa",

  "Upper-Row": "qwertyuioppoiuytrewq",

  "Lower-Row": "zxcvbnm,.//.,mnbvcxz",

  "Home-Row Capital": "ASDFGHJKL::LKJHGFDSA",
  "Upper-Row Capital": "QWERTYUIOPPOIUYTREWQ",
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

export const languageLetters = {
  English: "abcdefghijklmnopqrstuvwxyz".split(""),

  Bangla: "অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধধনপফবভমযরলশষসহড়ঢ়য়ংঃ ঁ".split(""),
  Arabic: "ابتثجحخدذرزسشصضطظعغفقكلمنهويءأؤإئآة".split(""),
  Abkhaz:
    "АаБбВвГгГьДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      "",
    ),
  Amharic: "ሀሁሂሃሄህሆለሉሊላሌልሎመሙሚማሜምሞሠሡሢሣሤሥሦረሩሪራሬርሮ".split(""),
  Aragonese: "abcdefghijklmnopqrstuvwxyzáéíñóúÁÉÍÑÓÚ".split(""),
  Armenian: "ԱաԲբԳգԴդԵեԶզԻիԼլԽխԾծԿկՀհԸը".split(""),
  Assyrian: "ܐܒܓܕܗܘܙܚܛܝܟܠܡܢܣܥܦܨܩܪܫܬ".split(""),
  Azerbaijani:
    "AaBbCcÇçDdEeFfGgĞğHhIiİiJjKkLlMmNnOoÖöPpQqRrSsŞşTtUuÜüVvYyZz".split(""),
  Berber:
    "ⴰⴱⴲⴳⴴⴵⴶⴷⴸⴹⴺⴻⴼⴽⵀⵁⵂⵃⵄⵅⵆⵇⵈⵉⵊⵋⵌⵍⵎⵏⵐⵑⵒⵓⵔⵕⵖⵗⵘⵙⵚⵛⵜⵝⵞⵟⵠⵡⵢⵣⵤⵥⵦⵧ⵨⵩⵪⵫⵬⵭⵮ⵯ⵰⵱⵲⵳⵴⵵⵶⵷⵸⵹⵺⵻⵼⵽⵾⵿".split(
      "",
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
      "",
    ),
  Icelandic:
    "aábdðeéfghiíjklmnoóprstuúvxyýþæöAÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ".split(
      "",
    ),

  Irish: "abcdefghijklmnopqrstuvwxyzáéíóúÁÉÍÓÚ".split(""),

  Japanese:
    "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん".split(
      "",
    ),
  Javanese: "ꦲꦤꦕꦢꦣꦟꦧꦩꦪꦫꦭꦮꦱꦶꦷꦸꦹꦺꦻꦼꦽꦾ".split(""),
  Kannada: "ಅಆಇಈಉಊಋಎಏಐಒಓಔಕಖಗಘಙಚಛಜಝಞಟಠಡಢಣತಥದಧಧನಪಫಬಭಮಯರಲವಶಷಸಹ಺಻಼ಽಾಿ".split(""),
  Kazakh:
    "АаӘәБбВвГгҒғДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоӨөПпРрСсТтҰұФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      "",
    ),

  Kirmanjki:
    "a b c ç d e ê f g h ɨ i j k l m n o p q r s ş t u û v y z A B C Ç D E Ê F G H Ɨ I J K L M N O P Q R S Ş T U Û V Y Z".split(
      " ",
    ),
  Korean: "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".split(""),
  Kurdish: "ئەبپتجچحخدرڕزژسشعغفڤقکگلمنھووەی".split(""),
  Lao: "ກຂຄງຈສຊຍດຕຖທນບປຜຝພຟມຢຣລວຫອຮ".split(""),

  Latvian:
    "aābcčdeēfgģhiījkķlļmnņoópqrsštuūvzžAĀBCČDEĒFGĢHIĪJKĶLĻMNŅOÓPQRSŠTUŪVZŽ".split(
      "",
    ),
  Lithuanian:
    "aąbcčdeęėfghiįyjklmnoprsštuųūvzžAĄBCČDEĘĖFGHIĮYJKLMNOPRSŠTUŲŪVZŽ".split(
      "",
    ),
  Luxembourgish:
    "abcdefghijklmnopqrstuvwxyzäéëüABCDEFGHIJKLMNOPQRSTUVWXYZÄÉËÜ".split(""),
  Macedonian: "абвгдѓежзијклмнњопрстќуфхцчџш".split(""),

  Malayalam:
    "അആഇഈഉഊഋഎഏഐഒഓകഖഗഘങചഛജഝഞടഠഡഢണതഥദധനഩപഫബഭമയരറലളഴവശഷസഹഺ഻഼ഽാിീുൂൃൄൠൡൢൣ൤".split(
      "",
    ),
  Maltese: "abcdefghijklmnopqrstuvwxyzġħżABCDEFGHIJKLMNOPQRSTUVWXYZĠĦŻ".split(
    "",
  ),

  Maori: "abcdefghijklmnopqrstuvwxyzāēīōūABCDEFGHIJKLMNOPQRSTUVWXYZĀĒĪŌŪ".split(
    "",
  ),
  Marathi: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतठधनपफबभमयरलवशषसह".split(""),
  Mongolian:
    "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоӨөПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      "",
    ),
  Nepali: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतठधनपफबभमयरलवशषसह".split(""),
  Navajo: "abcdefghijklmnopqrstuvwxyz'".split(""),

  Norwegian: "abcdefghijklmnopqrstuvwxyzæøåABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ".split(
    "",
  ),
  Occitan:
    "abcdefghijklmnopqrstuvwxyzàçèéíòóùüABCDEFGHIJKLMNOPQRSTUVWXYZÀÇÈÉÍÒÓÙÜ".split(
      "",
    ),
  Odia: "ଅଆଇଈଉଊଋଏଐଓଔକଖଗଘଙଚଛଜଝଞଟଠଡଢଣତଥଦଧନ଩ପଫବଭମଯର଱ଲଳ଴ଵଶଷସହ଺଻଼ଽ".split(""),

  Pashto:
    "ا ب پ ت ټ ث ج ځ چ ح خ د ډ دھ ذ ر ز س ش ص ض ط ظ ع غ ف ږ ق ك ګ ل م ن ڻ و ه ء ی ې ۍ".split(
      "",
    ),
  Persian:
    "ا ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ك گ ل م ن و ه ی".split(""),
  Polish:
    "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźżAĄBCĆDEĘFGHIJKŁMNŃOÓPQRSŚTUVWXYZŹŻ".split(
      "",
    ),
  Portuguese:
    "abcdefghijklmnopqrstuvwxyzñáâãàçéêíóôõúüABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÂÃÀÇÉÊÍÓÔÕÚÜ".split(
      "",
    ),
  Punjabi: "ਅਆਇਈਉਊਏਐਓਔਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨ਩ਪਫਬਭਮਯਰ਱ਲਲ਼਴ਵਸ਼਷ਸਹ਺਻਼਽ਾਿ".split(""),

  Romanian:
    "aăâbcdefghiîjklmnopqrsștțuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZĂÂÎȘȚ".split(""),
  Romansh:
    "abcdefghijklmnopqrstuvwxyzàäéèìòABCDEFGHIJKLMNOPQRSTUVWXYZÀÄÉÈÌÒ".split(
      "",
    ),
  Russian: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split(""),
  Sanskrit: "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतठधनपफबभमयरलवशषसह".split(""),
  ScotsGaelic:
    "abcdefghijklmnopqrstuvwxyzàèéìòùABCDEFGHIJKLMNOPQRSTUVWXYZÀÈÉÌÒÙ".split(
      "",
    ),
  Serbian:
    "абвгдђежзијклмнопрстћуфхцчџшABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЂЕЖЗИЈКЛМНОПРСТЋУФХЦЧЏШ".split(
      "",
    ),

  Sindhi:
    "ا ب ٻ ت ٹ ٿ ث پ ڀ ج ڄ چ ڃ ح خ د ڊ ڌ ذ ر ز س ش ص ض ط ظ ع غ ف ڦ ق ڪ ک گ ڳ ل م ن ڻ و ه ء ي".split(
      "",
    ),
  Sinhala: "අආඇඈඉඊඋඌඍඑඒඓඔඕඖකඛගඝඞචඡජඣඤටඦඩඪණතථදධනපඵබභමයරලවශෂසහ".split(""),
  Slovak:
    "aáäbcčdďeéfghiíjklľmnňoóôprsštťuúvwxyzžAÁÄBCČDĎEÉFGHIÍJKLĽMNŇOÓÔPRSŠTŤUÚVWXYZŽ".split(
      "",
    ),
  Slovenian: "abcčdefghijklmnoprsštuvzž".split(""),

  Spanish:
    "abcdefghijklmnopqrstuvwxyzñáéíóúüABCDEFGHIJKLMNOPQRSTUVWXYZÑÁÉÍÓÚÜ".split(
      "",
    ),

  Swedish: "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split(
    "",
  ),

  Tajik:
    "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      "",
    ),
  Tamil:
    "அஆஇஈஉஊஎஏஐஒஓஔக஖஗஘ஙச஛ஜ஝ஞட஠஡஢ணத஥த஧஧னபமயரலவஶஷஸஹ஺஻஼஽ாிீூ௃௄௠௡௢௣௤௥௦௧௨௩௪௫௬௭௮௯௰௱௲௳௴௵௶௷௸௹௺௻௼௽௾௿".split(
      "",
    ),
  Tatar:
    "АаБбВвГгДдЕеЁёЖжЗзИиЙйКкҚқЛлМмНнОоӨөПпРрСсТтУуФфХхЦцЧчШшЪъЫыЬьЭэЮюЯя".split(
      "",
    ),
  Telugu:
    "అఆఇఈఉఊఋఎఏఐఒఓఔకఖగఘఙచఛజఝఞటఠడఢణతథదధన఩పఫబభమయరఱలళఴవశషసహ఺఻఼ఽాిీుూృౄౠౡౢౣ౤౥౦౧౨౩౪౫౬౭౮౯౰౱౲౳౴౵౶౷౸౹౺౻౼౽౾౿".split(
      "",
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
    "",
  ),
  Uzbek: "aаbбcсdдeеfфgгhҳiиjжkкlлmмnнoоpпqқrрsсtтuуfфvвxхyйzз".split(""),
  Vietnamese: "abcdefghijklmnopqrstuvwxyzăâêôơư".split(""),
  Welsh: "abcdefghijklmnopqrstuvwxyzâêîôŵŷ".split(""),

  Yiddish: "א ב ג ד ה ו ז ח ט י כ ל מ נ ס ע פ צ ק ר ש ת".split(""),
  Yoruba: "abcdefghijklmnopqrstuvwxyzẹéíóọù".split(""),
};

export type Language = keyof typeof languageLetters;
