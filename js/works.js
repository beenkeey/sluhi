/**
 * Галерея «Слухи»
 *
 * КАК ДОБАВИТЬ / ИЗМЕНИТЬ РАБОТУ
 * --------------------------------
 * 1. Положите фото в images/роспись, images/вышивка или images/миниатюры
 *    (или сразу в images/gallery с латинским именем).
 * 2. При необходимости подготовьте jpg через скрипт / вручную и укажите путь в images.
 * 3. Добавьте или правьте объект в массиве WORKS ниже.
 *
 * Поля объекта:
 *   title    — название на карточке
 *   price    — цена, как строка, например "18 000 ₽"
 *   category — "painting" | "embroidery" | "miniature"
 *   cover    — главная фотка карточки (футболка / вещь целиком)
 *   images   — все фото по порядку; первым лучше полный вид, потом детали
 *   alt      — описание для доступности
 *   span     — ширина в сетке: "4"…"8" (ряд ≈ 12)
 *   ratio    — "portrait" | "landscape" | "tall"
 *   fit      — "contain", если нельзя обрезать фото (object-fit: contain)
 *   shift    — true, чтобы чуть опустить карточку
 *
 * Пример новой карточки:
 * {
 *   title: "Новая вещь",
 *   price: "20 000 ₽",
 *   category: "painting",
 *   cover: "images/gallery/my-cover.jpg",
 *   images: ["images/gallery/my-cover.jpg", "images/gallery/my-full.jpg"],
 *   alt: "Описание",
 *   span: "6",
 *   ratio: "portrait",
 * }
 */
const WORKS = [
  {
    title: "Разум танцует с тенями",
    price: "30 000 ₽",
    category: "painting",
    cover: "images/gallery/shadows-full-front.jpg",
    images: [
      "images/gallery/shadows-full-front.jpg",
      "images/gallery/shadows-full-back.jpg",
      "images/gallery/shadows-cover.jpg",
      "images/gallery/shadows-mushrooms.jpg",
      "images/gallery/shadows-wolves.jpg",
    ],
    alt: "Чёрная футболка с росписью глаз, грибов и волков",
    span: "7",
    ratio: "portrait",
    fit: "contain",
  },
  {
    title: "Кракен",
    price: "32 000 ₽",
    category: "painting",
    cover: "images/gallery/octopus-full.jpg",
    images: [
      "images/gallery/octopus-full.jpg",
      "images/gallery/octopus-cover.jpg",
      "images/gallery/octopus-detail.jpg",
    ],
    alt: "Чёрная футболка с росписью щупалец осьминога",
    span: "5",
    ratio: "portrait",
    fit: "contain",
    shift: true,
  },
  {
    title: "Два героя",
    price: "15 000 ₽",
    category: "painting",
    cover: "images/gallery/stitch-full.jpg",
    images: [
      "images/gallery/stitch-full.jpg",
      "images/gallery/stitch-cover.jpg",
    ],
    alt: "Футболка с росписью Стича и Дэдпула",
    span: "5",
    ratio: "portrait",
    fit: "contain",
  },
  {
    title: "Выживальщик",
    price: "5 000 ₽",
    category: "painting",
    cover: "images/gallery/survivor-cover.jpg",
    images: ["images/gallery/survivor-cover.jpg"],
    alt: "Белая футболка с росписью «Выживальщик»",
    span: "7",
    ratio: "landscape",
    shift: true,
  },
  {
    title: "Будущее скрыто",
    price: "10 000 ₽",
    category: "painting",
    cover: "images/gallery/cats-cover.jpg",
    images: ["images/gallery/cats-cover.jpg"],
    alt: "Светлая футболка с росписью котов",
    span: "6",
    ratio: "landscape",
  },
  {
    title: "Царица",
    price: "5 000 ₽",
    category: "painting",
    cover: "images/gallery/tsarina-cover.jpg",
    images: ["images/gallery/tsarina-cover.jpg"],
    alt: "Розовая вещь с росписью «Царица»",
    span: "6",
    ratio: "landscape",
  },

  {
    title: "Дерево до снега",
    price: "15 000 ₽",
    category: "embroidery",
    cover: "images/gallery/tree-cover.jpg",
    images: ["images/gallery/tree-cover.jpg"],
    alt: "Чёрная вещь с вышивкой дерева и текста",
    span: "6",
    ratio: "portrait",
  },
  {
    title: "Не видеть дикаря",
    price: "15 000 ₽",
    category: "embroidery",
    cover: "images/gallery/second-glass-cover.jpg",
    images: ["images/gallery/second-glass-cover.jpg"],
    alt: "Белая футболка с вышитым текстом",
    span: "6",
    ratio: "portrait",
    shift: true,
  },
  {
    title: "Абьюзер",
    price: "25 000 ₽",
    category: "embroidery",
    cover: "images/gallery/abuser-full-b.jpg",
    images: [
      "images/gallery/abuser-full-b.jpg",
      "images/gallery/abuser-full-a.jpg",
      "images/gallery/abuser-cover.jpg",
    ],
    alt: "Сиреневая футболка с вышивкой «абьюзер»",
    span: "5",
    ratio: "portrait",
    fit: "contain",
  },
  {
    title: "Слова из песни",
    price: "10 000 ₽",
    category: "embroidery",
    cover: "images/gallery/happy-cover.jpg",
    images: ["images/gallery/happy-cover.jpg"],
    alt: "Серая футболка с текстом «таким счастливым»",
    span: "7",
    ratio: "landscape",
    fit: "contain",
    shift: true,
  },
  {
    title: "Рэдфлаги",
    price: "1 999 ₽",
    category: "miniature",
    cover: "images/gallery/redflags-cover.jpg",
    images: ["images/gallery/redflags-cover.jpg"],
    alt: "Миниатюра с текстом про гирлянду из рэдфлагов",
    span: "5",
    ratio: "portrait",
  },
  {
    title: "Глаз",
    price: "1 999 ₽",
    category: "miniature",
    cover: "images/gallery/eye-cover.jpg",
    images: ["images/gallery/eye-cover.jpg"],
    alt: "Миниатюра с росписью глаза",
    span: "7",
    ratio: "landscape",
    shift: true,
  },
  {
    title: "Hell-o-ween",
    price: "1 999 ₽",
    category: "miniature",
    cover: "images/gallery/halloween-scene.jpg",
    images: [
      "images/gallery/halloween-scene.jpg",
      "images/gallery/halloween-cover.jpg",
    ],
    alt: "Миниатюра с привидениями Hell-o-ween",
    span: "5",
    ratio: "portrait",
  },
  {
    title: "Скажи ему",
    price: "1 999 ₽",
    category: "miniature",
    cover: "images/gallery/bar-cover.jpg",
    images: ["images/gallery/bar-cover.jpg"],
    alt: "Красная миниатюра с текстом и бокалом",
    span: "7",
    ratio: "portrait",
    shift: true,
  },
];
