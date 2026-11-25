/* RWAFA — boutique (SPA vanilla JS) */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem('rwf_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('rwf_' + k, JSON.stringify(v)); } catch (e) { /* storage off */ } },
};
/* =================== I18N =================== */
const LANGS = ['fr', 'es', 'en', 'ar'];
const LOCALE = { fr: 'fr-FR', es: 'es-ES', en: 'en-GB', ar: 'ar-MA' };
const T = {
fr: {
  nav_home: 'Accueil', nav_shop: 'Collections', nav_about: 'À propos', nav_contact: 'Contact', nav_shipping: 'Livraison & retours',
  cart: 'Panier', menu: 'Menu', lang: 'Langue', anim_on: 'Couper l’animation', anim_off: 'Activer l’animation', close: 'Fermer',
  cta_collection: 'Voir la collection',
  ticker: ['Nouveau drop', 'RIF - MOROCCO', 'Édition limitée', 'Livraison offerte dès 80 €', 'Retours 30 jours'],
  collections: 'Les collections', collection: 'Collection', explore: 'Explorer',
  new_arrivals: 'Nouveautés', see_all: 'Tout voir',
  all: 'Tout', filters: 'Filtres', reset: 'Réinitialiser', size: 'Taille', color: 'Couleur', price: 'Prix', max_price: 'Jusqu’à {x}',
  sort: 'Trier', sort_new: 'Nouveautés', sort_low: 'Prix croissant', sort_high: 'Prix décroissant',
  results: '{n} sweat(s)', no_results: 'Aucun sweat ne correspond. Essaie d’autres filtres.',
  add: 'Ajouter au panier', added: 'Ajouté au panier', choose_size: 'Choisis d’abord une taille',
  desc: 'Description',
  material: 'Matière & entretien',
  size_guide: 'Guide des tailles', sg_note: 'Coupe oversize : prends ta taille habituelle pour un look ample, une taille en dessous pour un tombé classique.',
  chest: 'Poitrine', length: 'Longueur', sleeve_len: 'Manche',
  reviews: 'Avis clients', write_review: 'Laisser un avis', your_name: 'Ton prénom', your_review: 'Ton avis', rating: 'Note', submit: 'Publier',
  review_thanks: 'Merci pour ton avis !', reviews_n: '{n} avis', related: 'Tu aimeras aussi',
  front: 'Face', back: 'Dos', sleeve: 'Manches',
  b_new: 'Nouveau', b_limited: 'Édition limitée', b_last: 'Dernières pièces', left: 'Plus que {n} pièces en stock',
  perk_ship: 'Livraison offerte dès 80 €', perk_ret: 'Retours gratuits sous 30 jours', perk_secure: 'Paiement 100 % sécurisé',
  ship_short: 'France 2–4 jours, Europe 3–7 jours, Maroc 5–10 jours. Retours gratuits sous 30 jours.',
  empty: 'Ton panier est vide. Pas de panique.', subtotal: 'Sous-total', shipping: 'Livraison', free: 'Offerte', discount: 'Réduction', total: 'Total',
  promo: 'Code promo', apply: 'OK', checkout: 'Passer au paiement', continue: 'Continuer mes achats', remove: 'Retirer',
  free_left: 'Plus que {x} pour la livraison offerte', free_ok: 'Livraison offerte débloquée !', code_ok: 'Code appliqué : -10 %', code_bad: 'Code invalide',
  secure: 'Paiement sécurisé', ssl: 'Connexion chiffrée SSL · 3D Secure', card: 'Carte', pay: 'Payer {x}',
  contact_info: 'Coordonnées', delivery: 'Adresse de livraison', payment: 'Paiement',
  email: 'E-mail', fullname: 'Nom complet', address: 'Adresse', city: 'Ville', zip: 'Code postal', country: 'Pays', phone: 'Téléphone',
  card_ph: 'Le champ carte sécurisé (Stripe) s’affichera ici une fois le paiement connecté. Les données bancaires ne transitent jamais par le site.',
  apple_ph: 'Le bouton Apple Pay apparaît sur Safari / iPhone une fois le paiement connecté.',
  paypal_ph: 'Tu seras redirigé vers PayPal pour valider ta commande en toute sécurité.',
  demo: 'Boutique de démonstration : aucun paiement réel n’est effectué.', processing: 'Traitement…', required: 'Champ requis', bad_email: 'E-mail invalide',
  order_ok: 'Commande confirmée !', order_txt: 'Merci {name} ! Ta commande n° {id} est en préparation. Un e-mail de confirmation arrive.', back_shop: 'Retour à la boutique',
  nl_title: 'Rejoins le clan', nl_txt: 'Les drops en avant-première et -10 % sur ta première commande.', nl_btn: 'Je m’inscris',
  nl_ok: 'Bienvenue dans le clan ! Ton code :', nl_ph: 'ton@email.com', nl_pop: 'Cadeau de bienvenue',

  values: [['100 %', 'Dessins originaux'], ['400 g', 'Coton bio & polyester recyclé'], ['0', 'Surstock : petites séries numérotées']],
  contact_title: 'Contact', contact_txt: 'Une question sur une taille, une commande ou une collab ? Écris-nous, on répond sous 24 h.',
  message: 'Message', send: 'Envoyer', sent: 'Message envoyé ! On revient vers toi très vite.',
  ship_title: 'Livraison & retours', ship_h: 'Livraison',
  ship_list: ['France : 2–4 jours ouvrés — 4,90 € (offerte dès 80 €)', 'Europe : 3–7 jours ouvrés — 9,90 €', 'Maroc : 5–10 jours ouvrés — 12,90 €', 'Numéro de suivi envoyé par e-mail dès l’expédition'],
  ret_h: 'Retours', ret_list: ['30 jours pour changer d’avis', 'Échange de taille gratuit', 'Articles non portés, non lavés, étiquettes attachées', 'Remboursement sous 5 jours après réception'],
  faq_h: 'Questions fréquentes',
  faq: [['Les dessins sont-ils originaux ?', 'Oui. Chaque personnage et chaque visuel est créé pour ONI par nos illustrateurs.'], ['Comment taillent les sweats ?', 'Coupe oversize. Le guide des tailles est sur chaque fiche produit.'], ['Livrez-vous au Maroc ?', 'Oui, partout au Maroc en 5 à 10 jours ouvrés.']],
rights: 'Tous droits réservés.', follow: 'Suis-nous', help: 'Aide', shop: 'Boutique',
  not_found: 'Cette page s’est perdue entre deux cases.',
},
en: {
  nav_home: 'Home', nav_shop: 'Collections', nav_about: 'About', nav_contact: 'Contact', nav_shipping: 'Shipping & returns',
  cart: 'Cart', menu: 'Menu', lang: 'Language', anim_on: 'Turn animation off', anim_off: 'Turn animation on', close: 'Close',
  cta_collection: 'Shop the collection',
  ticker: ['New drop', 'RIF - MOROCCO', 'Limited edition', 'Free shipping from €80', '30-day returns'],
  collections: 'The collections', collection: 'Collection', explore: 'Explore',

  new_arrivals: 'New arrivals', see_all: 'See all',
  all: 'All', filters: 'Filters', reset: 'Reset', size: 'Size', color: 'Colour', price: 'Price', max_price: 'Up to {x}',
  sort: 'Sort', sort_new: 'Newest', sort_low: 'Price: low to high', sort_high: 'Price: high to low',
  results: '{n} hoodie(s)', no_results: 'No hoodie matches. Try other filters.',
  add: 'Add to cart', added: 'Added to cart', choose_size: 'Pick a size first',
  desc: 'Description',
  material: 'Material & care',
  size_guide: 'Size guide', sg_note: 'Oversized fit: take your usual size for a loose look, one size down for a classic fit.',
  chest: 'Chest', length: 'Length', sleeve_len: 'Sleeve',
  reviews: 'Customer reviews', write_review: 'Write a review', your_name: 'Your first name', your_review: 'Your review', rating: 'Rating', submit: 'Post',
  review_thanks: 'Thanks for your review!', reviews_n: '{n} reviews', related: 'You may also like',
  front: 'Front', back: 'Back', sleeve: 'Sleeves',
  b_new: 'New', b_limited: 'Limited edition', b_last: 'Last pieces', left: 'Only {n} left in stock',
  perk_ship: 'Free shipping from €80', perk_ret: 'Free returns within 30 days', perk_secure: '100% secure payment',
  ship_short: 'France 2–4 days, Europe 3–7 days, Morocco 5–10 days. Free returns within 30 days.',
  empty: 'Your cart is empty. Don’t panic.', subtotal: 'Subtotal', shipping: 'Shipping', free: 'Free', discount: 'Discount', total: 'Total',
  promo: 'Promo code', apply: 'OK', checkout: 'Checkout', continue: 'Keep shopping', remove: 'Remove',
  free_left: '{x} more for free shipping', free_ok: 'Free shipping unlocked!', code_ok: 'Code applied: -10%', code_bad: 'Invalid code',
  secure: 'Secure payment', ssl: 'SSL encrypted · 3D Secure', card: 'Card', pay: 'Pay {x}',
  contact_info: 'Contact details', delivery: 'Shipping address', payment: 'Payment',
  email: 'Email', fullname: 'Full name', address: 'Address', city: 'City', zip: 'Postcode', country: 'Country', phone: 'Phone',
  card_ph: 'The secure card field (Stripe) will appear here once payments are connected. Card data never passes through the site.',
  apple_ph: 'The Apple Pay button appears on Safari / iPhone once payments are connected.',
  paypal_ph: 'You’ll be redirected to PayPal to confirm your order securely.',
  demo: 'Demo store: no real payment is taken.', processing: 'Processing…', required: 'Required', bad_email: 'Invalid email',
  order_ok: 'Order confirmed!', order_txt: 'Thanks {name}! Your order #{id} is being prepared. A confirmation email is on its way.', back_shop: 'Back to the shop',
  nl_title: 'Join the clan', nl_txt: 'Early access to drops and 10% off your first order.', nl_btn: 'Sign me up',
  nl_ok: 'Welcome to the clan! Your code:', nl_ph: 'you@email.com', nl_pop: 'Welcome gift',

  values: [['100%', 'Original artwork'], ['400 g', 'Organic cotton & recycled polyester'], ['0', 'Overstock: small numbered runs']],
  contact_title: 'Contact', contact_txt: 'A question about sizing, an order or a collab? Write to us — we reply within 24 h.',
  message: 'Message', send: 'Send', sent: 'Message sent! We’ll get back to you soon.',
  ship_title: 'Shipping & returns', ship_h: 'Shipping',
  ship_list: ['France: 2–4 business days — €4.90 (free from €80)', 'Europe: 3–7 business days — €9.90', 'Morocco: 5–10 business days — €12.90', 'Tracking number emailed as soon as it ships'],
  ret_h: 'Returns', ret_list: ['30 days to change your mind', 'Free size exchange', 'Unworn, unwashed items with tags attached', 'Refund within 5 days of receipt'],
  faq_h: 'FAQ',
  faq: [['Are the designs original?', 'Yes. Every character and visual is created for ONI by our illustrators.'], ['How do the hoodies fit?', 'Oversized. The size guide is on every product page.'], ['Do you ship to Morocco?', 'Yes, everywhere in Morocco within 5–10 business days.']],
rights: 'All rights reserved.', follow: 'Follow us', help: 'Help', shop: 'Shop',
  not_found: 'This page got lost between two panels.',
},
es: {
  nav_home: 'Inicio', nav_shop: 'Colecciones', nav_about: 'Nosotros', nav_contact: 'Contacto', nav_shipping: 'Envíos y devoluciones',
  cart: 'Carrito', menu: 'Menú', lang: 'Idioma', anim_on: 'Desactivar animación', anim_off: 'Activar animación', close: 'Cerrar',
  cta_collection: 'Ver la colección',
  ticker: ['Nuevo drop', 'RIF - MOROCCO', 'Edición limitada', 'Envío gratis desde 80 €', 'Devoluciones 30 días'],
  collections: 'Las colecciones', collection: 'Colección', explore: 'Explorar',
  new_arrivals: 'Novedades', see_all: 'Ver todo',
  all: 'Todo', filters: 'Filtros', reset: 'Restablecer', size: 'Talla', color: 'Color', price: 'Precio', max_price: 'Hasta {x}',
  sort: 'Ordenar', sort_new: 'Novedades', sort_low: 'Precio ascendente', sort_high: 'Precio descendente',
  results: '{n} sudadera(s)', no_results: 'Ninguna sudadera coincide. Prueba otros filtros.',
  add: 'Añadir al carrito', added: 'Añadido al carrito', choose_size: 'Elige primero una talla',
  desc: 'Descripción',
  material: 'Material y cuidado',
  size_guide: 'Guía de tallas', sg_note: 'Corte oversize: elige tu talla habitual para un look amplio, una menos para un ajuste clásico.',
  chest: 'Pecho', length: 'Largo', sleeve_len: 'Manga',
  reviews: 'Opiniones', write_review: 'Escribir una opinión', your_name: 'Tu nombre', your_review: 'Tu opinión', rating: 'Nota', submit: 'Publicar',
  review_thanks: '¡Gracias por tu opinión!', reviews_n: '{n} opiniones', related: 'También te gustará',
  front: 'Frente', back: 'Espalda', sleeve: 'Mangas',
  b_new: 'Nuevo', b_limited: 'Edición limitada', b_last: 'Últimas unidades', left: 'Solo quedan {n} en stock',
  perk_ship: 'Envío gratis desde 80 €', perk_ret: 'Devoluciones gratis en 30 días', perk_secure: 'Pago 100 % seguro',
  ship_short: 'Francia 2–4 días, Europa 3–7 días, Marruecos 5–10 días. Devoluciones gratis en 30 días.',
  empty: 'Tu carrito está vacío. Tranquilo.', subtotal: 'Subtotal', shipping: 'Envío', free: 'Gratis', discount: 'Descuento', total: 'Total',
  promo: 'Código promocional', apply: 'OK', checkout: 'Finalizar compra', continue: 'Seguir comprando', remove: 'Quitar',
  free_left: 'Te faltan {x} para el envío gratis', free_ok: '¡Envío gratis desbloqueado!', code_ok: 'Código aplicado: -10 %', code_bad: 'Código no válido',
  secure: 'Pago seguro', ssl: 'Conexión cifrada SSL · 3D Secure', card: 'Tarjeta', pay: 'Pagar {x}',
  contact_info: 'Datos de contacto', delivery: 'Dirección de envío', payment: 'Pago',
  email: 'Email', fullname: 'Nombre completo', address: 'Dirección', city: 'Ciudad', zip: 'Código postal', country: 'País', phone: 'Teléfono',
  card_ph: 'El campo seguro de tarjeta (Stripe) aparecerá aquí cuando se conecte el pago. Los datos bancarios nunca pasan por la web.',
  apple_ph: 'El botón Apple Pay aparece en Safari / iPhone cuando se conecta el pago.',
  paypal_ph: 'Serás redirigido a PayPal para confirmar tu pedido de forma segura.',
  demo: 'Tienda de demostración: no se realiza ningún pago real.', processing: 'Procesando…', required: 'Campo obligatorio', bad_email: 'Email no válido',
  order_ok: '¡Pedido confirmado!', order_txt: '¡Gracias {name}! Tu pedido n.º {id} se está preparando. Te llegará un email de confirmación.', back_shop: 'Volver a la tienda',
  nl_title: 'Únete al clan', nl_txt: 'Los drops en primicia y -10 % en tu primer pedido.', nl_btn: 'Suscribirme',
  nl_ok: '¡Bienvenido al clan! Tu código:', nl_ph: 'tu@email.com', nl_pop: 'Regalo de bienvenida',

  values: [['100 %', 'Dibujos originales'], ['400 g', 'Algodón orgánico y poliéster reciclado'], ['0', 'Excedentes: series pequeñas numeradas']],
  contact_title: 'Contacto', contact_txt: '¿Una duda sobre tallas, un pedido o una colaboración? Escríbenos, respondemos en 24 h.',
  message: 'Mensaje', send: 'Enviar', sent: '¡Mensaje enviado! Te respondemos muy pronto.',
  ship_title: 'Envíos y devoluciones', ship_h: 'Envíos',
  ship_list: ['Francia: 2–4 días laborables — 4,90 € (gratis desde 80 €)', 'Europa: 3–7 días laborables — 9,90 €', 'Marruecos: 5–10 días laborables — 12,90 €', 'Número de seguimiento por email en cuanto se envía'],
  ret_h: 'Devoluciones', ret_list: ['30 días para cambiar de opinión', 'Cambio de talla gratuito', 'Artículos sin usar, sin lavar y con etiquetas', 'Reembolso en 5 días tras la recepción'],
  faq_h: 'Preguntas frecuentes',
  faq: [['¿Los diseños son originales?', 'Sí. Cada personaje y cada visual se crea para ONI por nuestros ilustradores.'], ['¿Cómo tallan las sudaderas?', 'Corte oversize. La guía de tallas está en cada ficha de producto.'], ['¿Enviáis a Marruecos?', 'Sí, a todo Marruecos en 5–10 días laborables.']],
rights: 'Todos los derechos reservados.', follow: 'Síguenos', help: 'Ayuda', shop: 'Tienda',
  not_found: 'Esta página se perdió entre dos viñetas.',
},
ar: {
  nav_home: 'الرئيسية', nav_shop: 'المجموعات', nav_about: 'من نحن', nav_contact: 'اتصل بنا', nav_shipping: 'الشحن والإرجاع',
  cart: 'السلة', menu: 'القائمة', lang: 'اللغة', anim_on: 'إيقاف الحركة', anim_off: 'تشغيل الحركة', close: 'إغلاق',
  cta_collection: 'شاهد المجموعة',
  ticker: ['إصدار جديد', 'RIF - MOROCCO', 'إصدار محدود', 'شحن مجاني ابتداءً من 80 €', 'إرجاع خلال 30 يومًا'],
  collections: 'المجموعات', collection: 'المجموعة', explore: 'استكشف',
  new_arrivals: 'وصل حديثًا', see_all: 'عرض الكل',
  all: 'الكل', filters: 'التصفية', reset: 'إعادة الضبط', size: 'المقاس', color: 'اللون', price: 'السعر', max_price: 'حتى {x}',
  sort: 'ترتيب', sort_new: 'الأحدث', sort_low: 'السعر: من الأقل', sort_high: 'السعر: من الأعلى',
  results: '{n} هودي', no_results: 'لا توجد نتائج. جرّب فلاتر أخرى.',
  add: 'أضف إلى السلة', added: 'تمت الإضافة إلى السلة', choose_size: 'اختر المقاس أولًا',
  desc: 'الوصف',
  material: 'الخامة والعناية',
  size_guide: 'دليل المقاسات', sg_note: 'قصّة واسعة: اختر مقاسك المعتاد لمظهر فضفاض، أو مقاسًا أصغر لمظهر كلاسيكي.',
  chest: 'الصدر', length: 'الطول', sleeve_len: 'الكمّ',
  reviews: 'آراء العملاء', write_review: 'أضف رأيك', your_name: 'اسمك', your_review: 'رأيك', rating: 'التقييم', submit: 'نشر',
  review_thanks: 'شكرًا على رأيك!', reviews_n: '{n} تقييمات', related: 'قد يعجبك أيضًا',
  front: 'الأمام', back: 'الظهر', sleeve: 'الأكمام',
  b_new: 'جديد', b_limited: 'إصدار محدود', b_last: 'آخر القطع', left: 'بقيت {n} قطع فقط',
  perk_ship: 'شحن مجاني ابتداءً من 80 €', perk_ret: 'إرجاع مجاني خلال 30 يومًا', perk_secure: 'دفع آمن 100٪',
  ship_short: 'فرنسا 2–4 أيام، أوروبا 3–7 أيام، المغرب 5–10 أيام. إرجاع مجاني خلال 30 يومًا.',
  empty: 'سلتك فارغة. لا داعي للقلق.', subtotal: 'المجموع الفرعي', shipping: 'الشحن', free: 'مجاني', discount: 'الخصم', total: 'المجموع',
  promo: 'رمز الخصم', apply: 'تطبيق', checkout: 'إتمام الشراء', continue: 'متابعة التسوق', remove: 'حذف',
  free_left: 'أضف {x} للحصول على شحن مجاني', free_ok: 'حصلت على شحن مجاني!', code_ok: 'تم تطبيق الرمز: خصم 10٪', code_bad: 'رمز غير صالح',
  secure: 'دفع آمن', ssl: 'اتصال مشفّر SSL · 3D Secure', card: 'بطاقة', pay: 'ادفع {x}',
  contact_info: 'معلومات الاتصال', delivery: 'عنوان التوصيل', payment: 'الدفع',
  email: 'البريد الإلكتروني', fullname: 'الاسم الكامل', address: 'العنوان', city: 'المدينة', zip: 'الرمز البريدي', country: 'البلد', phone: 'الهاتف',
  card_ph: 'سيظهر هنا حقل البطاقة الآمن (Stripe) بعد ربط الدفع. بيانات البطاقة لا تمر أبدًا عبر الموقع.',
  apple_ph: 'يظهر زر Apple Pay على Safari / iPhone بعد ربط الدفع.',
  paypal_ph: 'سيتم تحويلك إلى PayPal لتأكيد طلبك بأمان.',
  demo: 'متجر تجريبي: لا يتم أي دفع حقيقي.', processing: 'جارٍ المعالجة…', required: 'حقل مطلوب', bad_email: 'بريد إلكتروني غير صالح',
  order_ok: 'تم تأكيد الطلب!', order_txt: 'شكرًا {name}! طلبك رقم {id} قيد التحضير. سيصلك بريد التأكيد قريبًا.', back_shop: 'العودة إلى المتجر',
  nl_title: 'انضم إلى العشيرة', nl_txt: 'الإصدارات الجديدة قبل الجميع وخصم 10٪ على طلبك الأول.', nl_btn: 'اشترك',
  nl_ok: 'مرحبًا بك في العشيرة! رمزك:', nl_ph: 'email@example.com', nl_pop: 'هدية الترحيب',
  values: [['100٪', 'رسومات أصلية'], ['400 غ', 'قطن عضوي وبوليستر معاد تدويره'], ['0', 'فائض: دفعات صغيرة مرقّمة']],
  contact_title: 'اتصل بنا', contact_txt: 'سؤال عن مقاس أو طلب أو تعاون؟ راسلنا، نرد خلال 24 ساعة.',
  message: 'الرسالة', send: 'إرسال', sent: 'تم إرسال رسالتك! سنعود إليك قريبًا.',
  ship_title: 'الشحن والإرجاع', ship_h: 'الشحن',
  ship_list: ['فرنسا: 2–4 أيام عمل — 4.90 € (مجاني ابتداءً من 80 €)', 'أوروبا: 3–7 أيام عمل — 9.90 €', 'المغرب: 5–10 أيام عمل — 12.90 €', 'رقم التتبع يُرسل بالبريد فور الشحن'],
  ret_h: 'الإرجاع', ret_list: ['30 يومًا لتغيير رأيك', 'تبديل المقاس مجانًا', 'قطع غير ملبوسة وغير مغسولة مع البطاقات', 'استرداد المبلغ خلال 5 أيام من الاستلام'],
  faq_h: 'أسئلة شائعة',
  faq: [['هل الرسومات أصلية؟', 'نعم. كل شخصية وكل تصميم يرسمه فنانونا خصيصًا لـ ONI.'], ['كيف هي المقاسات؟', 'قصّة واسعة. دليل المقاسات موجود في صفحة كل منتج.'], ['هل تشحنون إلى المغرب؟', 'نعم، إلى كل المغرب خلال 5–10 أيام عمل.']],
rights: 'جميع الحقوق محفوظة.', follow: 'تابعنا', help: 'مساعدة', shop: 'المتجر',
  not_found: 'ضاعت هذه الصفحة بين مربّعين.',
},
};
let lang = store.get('lang', null);
if (!LANGS.includes(lang)) lang = 'fr';
const t = (k, v) => {
  let s = T[lang][k] ?? T.fr[k] ?? k;
  if (v && typeof s === 'string') for (const key in v) s = s.split('{' + key + '}').join(v[key]);
  return s;
};
const fmt = (n) => new Intl.NumberFormat(LOCALE[lang], { style: 'currency', currency: 'EUR' }).format(n);
/* =================== DATA =================== */
const COLORS = {
  black: { hex: '#18181b', light: false, name: { fr: 'Noir', en: 'Black', es: 'Negro', ar: 'أسود' } },
  offwhite: { hex: '#efe8da', light: true, name: { fr: 'Blanc cassé', en: 'Off-white', es: 'Blanco roto', ar: 'أبيض عاجي' } },
  navy: { hex: '#1b2442', light: false, name: { fr: 'Bleu nuit', en: 'Midnight', es: 'Azul noche', ar: 'كحلي' } },
  red: { hex: '#a8141d', light: false, name: { fr: 'Rouge', en: 'Red', es: 'Rojo', ar: 'أحمر' } },
  sand: { hex: '#cdb894', light: true, name: { fr: 'Sable', en: 'Sand', es: 'Arena', ar: 'رملي' } },
  blue: { hex: '#1c47c9', light: false, name: { fr: 'Bleu électrique', en: 'Electric blue', es: 'Azul eléctrico', ar: 'أزرق كهربائي' } },
};
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const PRODUCTS = [
  { id: 'kage-hoodie', col: 'arc1', name: 'Kage Hoodie', price: 89, colors: ['black'], sizes: SIZES, badges: ['new', 'limited'], date: 10,
    desc: { fr: 'La pièce maîtresse de l’Arc I. Cornes d’oni brodées ton sur ton sur la poitrine, grand kanji 鬼 brodé au dos, soleil rouge discret sur la manche.',
      en: 'The centerpiece of Arc I. Tone-on-tone embroidered oni horns on the chest, a large embroidered 鬼 kanji on the back, a discreet red sun on the sleeve.',
      es: 'La pieza central del Arc I. Cuernos de oni bordados tono sobre tono en el pecho, gran kanji 鬼 bordado en la espalda y un discreto sol rojo en la manga.',
      ar: 'القطعة الأساسية في Arc I. قرنا أوني مطرّزان بلون القماش على الصدر، حرف 鬼 كبير مطرّز على الظهر، وشمس حمراء صغيرة على الكمّ.' } },
  { id: 'oni-mask-hoodie', col: 'arc1', name: 'Oni Mask Hoodie', price: 94, colors: ['black', 'navy'], sizes: SIZES, badges: ['limited'], date: 9,
    desc: { fr: 'Un masque d’oni brodé en rouge et crème au dos, regard doré. Édition numérotée, coupe oversize.',
      en: 'A red and cream oni mask embroidered on the back, with golden eyes. Numbered edition, oversized fit.',
      es: 'Una máscara de oni bordada en rojo y crema en la espalda, con mirada dorada. Edición numerada, corte oversize.',
      ar: 'قناع أوني مطرّز بالأحمر والكريمي على الظهر بعينين ذهبيتين. إصدار مرقّم بقصّة واسعة.' } },
  { id: 'akai-sun-crew', col: 'arc1', name: 'Akai Sun Crewneck', price: 74, colors: ['offwhite', 'black'], sizes: SIZES, badges: ['new'], date: 8,
    desc: { fr: 'Le soleil rouge de l’Arc I sérigraphié au dos, petit logo ONI brodé devant. Le sweat col rond qu’on porte tous les jours.',
      en: 'The red sun of Arc I screen-printed on the back, a small embroidered ONI logo on the front. The crewneck you wear every day.',
      es: 'El sol rojo del Arc I serigrafiado en la espalda y un pequeño logo ONI bordado delante. La sudadera de cuello redondo para cada día.',
      ar: 'الشمس الحمراء من Arc I مطبوعة على الظهر وشعار ONI صغير مطرّز في الأمام. السترة ذات الياقة المستديرة لكل يوم.' } },
  { id: 'yami-zip-hoodie', col: 'arc1', name: 'Yami Zip Hoodie', price: 99, colors: ['black'], sizes: ['S', 'M', 'L'], badges: ['last'], stock: 3, date: 7,
    desc: { fr: 'Hoodie zippé noir profond, zip métal mat, kanji 闇 (ténèbres) brodé sur la capuche. Dernières pièces de l’Arc I.',
      en: 'Deep black zip hoodie, matte metal zip, 闇 (darkness) kanji embroidered on the hood. Last pieces of Arc I.',
      es: 'Hoodie con cremallera negro profundo, cremallera metálica mate y kanji 闇 (oscuridad) bordado en la capucha. Últimas unidades del Arc I.',
      ar: 'هودي بسحّاب أسود عميق، سحّاب معدني مطفأ، وحرف 闇 (الظلام) مطرّز على القبعة. آخر قطع Arc I.' } },
  { id: 'yoru-hoodie', col: 'arc2', name: 'Yoru Hoodie', price: 92, colors: ['navy', 'black'], sizes: SIZES, badges: ['new'], date: 6,
    desc: { fr: 'Arc II — la nuit de Tokyo : skyline brodée au dos, néons rouges, kanji 東京・夜 le long de la manche.',
      en: 'Arc II — Tokyo at night: embroidered skyline on the back, red neon lights, 東京・夜 kanji down the sleeve.',
      es: 'Arc II — la noche de Tokio: skyline bordado en la espalda, neones rojos y kanji 東京・夜 a lo largo de la manga.',
      ar: 'Arc II — ليل طوكيو: أفق المدينة مطرّز على الظهر، أضواء نيون حمراء، وحروف 東京・夜 على طول الكمّ.' } },
  { id: 'torii-crew', col: 'arc2', name: 'Torii Crewneck', price: 76, colors: ['offwhite', 'red'], sizes: SIZES, badges: [], date: 5,
    desc: { fr: 'Le torii rouge au pied des montagnes, nuages dorés. Impression douce au toucher, coton épais.',
      en: 'The red torii at the foot of the mountains, golden clouds. Soft-touch print, heavyweight cotton.',
      es: 'El torii rojo al pie de las montañas, nubes doradas. Estampado suave al tacto, algodón grueso.',
      ar: 'بوابة توري حمراء عند سفح الجبال وغيوم ذهبية. طباعة ناعمة الملمس على قطن سميك.' } },
  { id: 'sakura-hoodie', col: 'arc2', name: 'Sakura Hoodie', price: 89, colors: ['offwhite', 'black'], sizes: ['M', 'L', 'XL'], badges: ['last'], stock: 4, date: 4,
    desc: { fr: 'Pétales de cerisier brodés qui tombent de l’épaule jusqu’au bas du dos. Dernières pièces.',
      en: 'Embroidered cherry blossom petals falling from the shoulder to the lower back. Last pieces.',
      es: 'Pétalos de cerezo bordados que caen desde el hombro hasta la parte baja de la espalda. Últimas unidades.',
      ar: 'بتلات كرز مطرّزة تتساقط من الكتف حتى أسفل الظهر. آخر القطع.' } },
  { id: 'oni-logo-hoodie', col: 'ess', name: 'ONI Logo Hoodie', price: 79, colors: ['black', 'offwhite', 'red'], sizes: SIZES, badges: [], date: 3,
    desc: { fr: 'Les cornes ONI brodées sur la poitrine. Simple, net, en trois couleurs.',
      en: 'The ONI horns embroidered on the chest. Simple, clean, in three colours.',
      es: 'Los cuernos ONI bordados en el pecho. Simple, limpio, en tres colores.',
      ar: 'قرنا ONI مطرّزان على الصدر. بسيط وأنيق بثلاثة ألوان.' } },
  { id: 'oni-logo-crew', col: 'ess', name: 'ONI Logo Crewneck', price: 69, colors: ['black', 'offwhite'], sizes: SIZES, badges: [], date: 2,
    desc: { fr: 'Le col rond essentiel, logo ONI brodé ton sur ton. À porter seul ou sous une veste.',
      en: 'The essential crewneck, tone-on-tone embroidered ONI logo. Wear it alone or under a jacket.',
      es: 'La sudadera de cuello redondo esencial, logo ONI bordado tono sobre tono. Sola o bajo una chaqueta.',
      ar: 'السترة الأساسية بياقة مستديرة وشعار ONI مطرّز بلون القماش. تُلبس وحدها أو تحت سترة.' } },
];
// ---- Trend-led additions (2026 research: oversized & boxy fits, full-zips, acid / garment-dyed washes,
// ---- 3D puff, web graphics, neutral tones such as Pantone 2026 "Cloud Dancer", oatmeal, taupe, smoke grey)
Object.assign(COLORS, {
  cloud: { hex: '#ebe8e1', light: true, name: { fr: 'Blanc nuage', en: 'Cloud white', es: 'Blanco nube', ar: 'أبيض غيمي' } },
  oatmeal: { hex: '#d5c7ae', light: true, name: { fr: 'Avoine', en: 'Oatmeal', es: 'Avena', ar: 'شوفاني' } },
  taupe: { hex: '#857766', light: false, name: { fr: 'Taupe', en: 'Taupe', es: 'Topo', ar: 'رمادي بنّي' } },
  smoke: { hex: '#6b6c70', light: false, name: { fr: 'Gris fumée', en: 'Smoke grey', es: 'Gris humo', ar: 'رمادي دخاني' } },
  washed: { hex: '#3b3b40', light: false, name: { fr: 'Noir délavé', en: 'Washed black', es: 'Negro lavado', ar: 'أسود مغسول' } },
});
const TECH_OF = { 'kage-hoodie': ['embroidery'], 'oni-mask-hoodie': ['embroidery'], 'akai-sun-crew': ['print'], 'yami-zip-hoodie': ['zip', 'embroidery'],
  'yoru-hoodie': ['embroidery'], 'torii-crew': ['print'], 'sakura-hoodie': ['embroidery'], 'oni-logo-hoodie': ['embroidery'], 'oni-logo-crew': ['embroidery'] };
PRODUCTS.forEach((p) => { p.fit = p.fit || 'oversized'; p.tech = p.tech || TECH_OF[p.id] || ['embroidery']; });
PRODUCTS.push(
  { id: 'kage-boxy-zip', col: 'ess', name: 'Kage Boxy Full-Zip', price: 105, colors: ['black', 'smoke', 'oatmeal'], sizes: SIZES, badges: ['new', 'trend'], date: 16, fit: 'boxy', tech: ['zip', 'embroidery'],
    desc: { fr: 'La coupe de la saison : boxy, courte et large. Double zip métal mat, capuche doublée haute, petites cornes ONI brodées au col.',
      en: 'The cut of the season: boxy, cropped and wide. Matte metal two-way zip, tall lined hood, small ONI horns embroidered at the collar.',
      es: 'El corte de la temporada: boxy, corto y ancho. Doble cremallera metálica mate, capucha alta forrada y pequeños cuernos ONI bordados en el cuello.',
      ar: 'قصّة الموسم: بوكسي، قصيرة وعريضة. سحّاب معدني مزدوج مطفأ، قبعة مبطّنة عالية، وقرنا ONI صغيران مطرّزان عند الياقة.' } },
  { id: 'akuma-acid-hoodie', col: 'arc1', name: 'Akuma Acid Wash Hoodie', price: 95, colors: ['washed', 'taupe'], sizes: ['S', 'M', 'L', 'XL'], badges: ['trend', 'limited'], date: 15, fit: 'oversized', tech: ['acid', 'print'],
    desc: { fr: 'Délavage acide fait pièce par pièce : aucun sweat n’est identique. Masque d’akuma à effet craquelé au dos, ourlets bruts.',
      en: 'Acid-washed piece by piece: no two hoodies are alike. Cracked-effect akuma mask on the back, raw hems.',
      es: 'Lavado ácido pieza a pieza: no hay dos sudaderas iguales. Máscara de akuma con efecto craquelado en la espalda y bajos sin rematar.',
      ar: 'غسيل حمضي قطعة بقطعة: لا يوجد هوديان متطابقان. قناع أكوما بتأثير متشقق على الظهر وحواف خام.' } },
  { id: 'kumo-web-hoodie', col: 'arc2', name: 'Kumo Web Hoodie', price: 92, colors: ['black', 'smoke'], sizes: SIZES, badges: ['new', 'trend'], date: 14, fit: 'oversized', tech: ['puff'],
    desc: { fr: 'Une toile d’araignée (蜘蛛, kumo) en impression puff 3D qui couvre tout le sweat, du capuchon aux manches. On la sent sous les doigts.',
      en: 'A spider web (蜘蛛, kumo) in 3D puff print covering the whole hoodie, from hood to sleeves. You can feel it under your fingers.',
      es: 'Una telaraña (蜘蛛, kumo) en estampado puff 3D que cubre toda la sudadera, de la capucha a las mangas. Se nota al tacto.',
      ar: 'شبكة عنكبوت (蜘蛛, كومو) بطباعة بارزة ثلاثية الأبعاد تغطي الهودي كله من القبعة إلى الأكمام. تشعر بها تحت أصابعك.' } },
  { id: 'cloud-essential-hoodie', col: 'ess', name: 'Cloud Essential Hoodie', price: 85, colors: ['cloud', 'oatmeal', 'taupe'], sizes: SIZES, badges: ['trend'], date: 13, fit: 'oversized', tech: ['embroidery'],
    desc: { fr: 'Les tons neutres de 2026 : blanc nuage, avoine et taupe. Logo ONI brodé ton sur ton, molleton 450 g, rien de trop.',
      en: 'The neutral tones of 2026: cloud white, oatmeal and taupe. Tone-on-tone ONI logo, 450 gsm fleece, nothing extra.',
      es: 'Los tonos neutros de 2026: blanco nube, avena y topo. Logo ONI bordado tono sobre tono, felpa de 450 g, nada de más.',
      ar: 'ألوان 2026 المحايدة: أبيض غيمي وشوفاني ورمادي بنّي. شعار ONI مطرّز بلون القماش وقماش 450 غ، بلا مبالغة.' } },
  { id: 'yokai-vintage-hoodie', col: 'arc2', name: 'Yokai Vintage Hoodie', price: 89, colors: ['taupe', 'smoke'], sizes: SIZES, badges: ['trend'], date: 12, fit: 'oversized', tech: ['dyed', 'print'],
    desc: { fr: 'Teint en pièce pour un rendu vintage déjà porté. Une parade de yokai imprimée au dos, façon affiche rétro.',
      en: 'Garment-dyed for a lived-in vintage look. A parade of yokai printed on the back, retro-poster style.',
      es: 'Teñido en prenda para un aspecto vintage ya usado. Un desfile de yokai estampado en la espalda, estilo póster retro.',
      ar: 'مصبوغ بعد الخياطة لمظهر فينتاج كأنه مستعمل. موكب من اليوكاي مطبوع على الظهر بأسلوب الملصقات القديمة.' } },
  { id: 'ronin-puff-hoodie', col: 'arc1', name: 'Ronin 3D Puff Hoodie', price: 92, colors: ['black', 'offwhite'], sizes: SIZES, badges: ['new'], date: 11, fit: 'oversized', tech: ['puff', 'embroidery'],
    desc: { fr: 'Chapeau de paille et katana en relief puff 3D sur la poitrine, silhouette de samouraï errant (ronin) brodée au dos.',
      en: 'A straw hat and katana in raised 3D puff on the chest, a wandering samurai (ronin) silhouette embroidered on the back.',
      es: 'Sombrero de paja y katana en relieve puff 3D en el pecho y la silueta de un samurái errante (ronin) bordada en la espalda.',
      ar: 'قبعة قش وسيف كاتانا بطباعة بارزة على الصدر، وظل ساموراي جوّال (رونين) مطرّز على الظهر.' } },
);
// ---- Product types: hoodies, socks, sneakers (original ONI anime designs — no licensed characters)
const SOCK_SIZES = ['35-38', '39-42', '43-46'];
const SHOE_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46'];
const TYPES = ['hoodie', 'socks', 'shoes'];
const TYPE_SIZES = { hoodie: SIZES, socks: SOCK_SIZES, shoes: SHOE_SIZES };
PRODUCTS.forEach((p) => { p.type = p.type || 'hoodie'; });
PRODUCTS.push(
  { id: 'oni-mask-socks', type: 'socks', col: 'arc1', name: 'Oni Mask Socks', price: 14, colors: ['black'], sizes: SOCK_SIZES, badges: ['new'], date: 24, fit: null, tech: ['knit'],
    desc: { fr: 'Chaussettes mi-mollet en coton peigné, masque d’oni rouge et crème tricoté en jacquard sur le côté, talon et pointe renforcés.',
      en: 'Mid-calf combed-cotton socks with a red and cream oni mask knitted in jacquard on the side, reinforced heel and toe.',
      es: 'Calcetines a media pierna de algodón peinado, máscara de oni roja y crema tejida en jacquard en el lateral, talón y puntera reforzados.',
      ar: 'جوارب حتى منتصف الساق من قطن ممشط، قناع أوني أحمر وكريمي منسوج بالجاكار على الجانب، كعب ومقدمة معززان.' } },
  { id: 'sakura-socks', type: 'socks', col: 'arc2', name: 'Sakura Socks', price: 14, colors: ['offwhite'], sizes: SOCK_SIZES, badges: ['new'], date: 23, fit: null, tech: ['knit'],
    desc: { fr: 'Fond crème et pétales de cerisier roses tricotés en jacquard tout autour de la jambe. Doux, respirant, côtes confort.',
      en: 'Cream base with pink cherry blossom petals knitted in jacquard all around the leg. Soft, breathable, comfort rib.',
      es: 'Fondo crema con pétalos de cerezo rosas tejidos en jacquard alrededor de la pierna. Suaves, transpirables, puño cómodo.',
      ar: 'أرضية كريمية وبتلات كرز وردية منسوجة بالجاكار حول الساق. ناعمة ومسامية ومريحة.' } },
  { id: 'kitsune-socks', type: 'socks', col: 'arc2', name: 'Neon Kitsune Socks', price: 14, colors: ['navy'], sizes: SOCK_SIZES, badges: [], date: 22, fit: null, tech: ['knit'],
    desc: { fr: 'Bleu nuit avec un masque de renard kitsune blanc et des éclairs bleu électrique tricotés, façon néon de Tokyo.',
      en: 'Midnight blue with a white kitsune fox mask and electric-blue lightning knitted in, Tokyo-neon style.',
      es: 'Azul noche con una máscara de zorro kitsune blanca y rayos azul eléctrico tejidos, estilo neón de Tokio.',
      ar: 'كحلي مع قناع ثعلب كيتسوني أبيض وبرق أزرق كهربائي منسوج بأسلوب نيون طوكيو.' } },
  { id: 'oni-socks-pack', type: 'socks', col: 'ess', name: 'ONI Socks — Pack 3 paires', price: 36, colors: ['black'], sizes: SOCK_SIZES, badges: ['trend'], date: 21, fit: null, tech: ['knit'],
    desc: { fr: 'Le pack 3 paires : Oni Mask (noir), Neon Kitsune (bleu nuit) et Sakura (crème). 6 € d’économie par rapport aux paires à l’unité.',
      en: 'The 3-pair pack: Oni Mask (black), Neon Kitsune (midnight) and Sakura (cream). Save €6 versus single pairs.',
      es: 'El pack de 3 pares: Oni Mask (negro), Neon Kitsune (azul noche) y Sakura (crema). Ahorra 6 € frente a los pares sueltos.',
      ar: 'علبة 3 أزواج: Oni Mask (أسود) وNeon Kitsune (كحلي) وSakura (كريمي). توفير 6 € مقارنة بالأزواج المنفردة.' } },
  { id: 'oni-high-tops', type: 'shoes', col: 'arc1', name: 'Oni High-Top Sneakers', price: 119, colors: ['black'], sizes: SHOE_SIZES, badges: ['new', 'limited'], date: 20, fit: null, tech: ['painted', 'canvas'],
    desc: { fr: 'Baskets montantes en toile noire, peintes à la main : masque d’oni rouge aux cornes crème sur le côté, semelle vulcanisée blanche. Chaque paire est unique.',
      en: 'Black canvas high-tops, hand-painted: a red oni mask with cream horns on the side, white vulcanised sole. Every pair is unique.',
      es: 'Zapatillas altas de lona negra pintadas a mano: máscara de oni roja con cuernos crema en el lateral, suela vulcanizada blanca. Cada par es único.',
      ar: 'أحذية عالية من قماش أسود مرسومة يدويًا: قناع أوني أحمر بقرنين كريميين على الجانب ونعل أبيض مُفلكن. كل زوج فريد.' } },
  { id: 'yoru-low-tops', type: 'shoes', col: 'arc2', name: 'Yoru Low-Top Sneakers', price: 99, colors: ['navy'], sizes: SHOE_SIZES, badges: ['new'], date: 19, fit: null, tech: ['print', 'canvas'],
    desc: { fr: 'Baskets basses en toile bleu nuit : skyline de Tokyo et enseignes néon rouges et bleues tout autour, lacets crème.',
      en: 'Midnight-blue canvas low-tops: Tokyo skyline and red and blue neon signs all around, cream laces.',
      es: 'Zapatillas bajas de lona azul noche: skyline de Tokio y neones rojos y azules alrededor, cordones crema.',
      ar: 'أحذية منخفضة من قماش كحلي: أفق طوكيو ولافتات نيون حمراء وزرقاء حولها، وأربطة كريمية.' } },
  { id: 'sakura-high-tops', type: 'shoes', col: 'arc2', name: 'Sakura High-Top Sneakers', price: 109, colors: ['offwhite'], sizes: SHOE_SIZES, badges: [], date: 18, fit: null, tech: ['painted', 'canvas'],
    desc: { fr: 'Baskets montantes en toile crème, branches de cerisier en fleur peintes à la main du talon jusqu’à la pointe.',
      en: 'Cream canvas high-tops, blossoming cherry branches hand-painted from heel to toe.',
      es: 'Zapatillas altas de lona crema con ramas de cerezo en flor pintadas a mano del talón a la puntera.',
      ar: 'أحذية عالية من قماش كريمي مع أغصان كرز مزهرة مرسومة يدويًا من الكعب حتى المقدمة.' } },
  { id: 'kumo-web-sneakers', type: 'shoes', col: 'ess', name: 'Kumo Web Sneakers', price: 95, colors: ['black'], sizes: SHOE_SIZES, badges: ['trend'], date: 17, fit: null, tech: ['print', 'canvas'],
    desc: { fr: 'Le motif toile d’araignée du Kumo Web Hoodie, imprimé en gris clair sur des baskets basses en toile noire. À porter ensemble.',
      en: 'The spider-web motif of the Kumo Web Hoodie, printed in light grey on black canvas low-tops. Made to be worn together.',
      es: 'El motivo de telaraña del Kumo Web Hoodie, estampado en gris claro sobre zapatillas bajas de lona negra. Para llevar juntos.',
      ar: 'نقشة شبكة العنكبوت من Kumo Web Hoodie مطبوعة بالرمادي الفاتح على أحذية منخفضة من قماش أسود. لارتدائهما معًا.' } },
);
// ---- RWAFA catalogue: original designs inspired by Rif Amazigh culture (ⵣ, rugs, mountains, Nador, Al Hoceima). No political flags.
PRODUCTS.length = 0;
TYPES.length = 0; TYPES.push('hoodie', 'tee', 'socks');
TYPE_SIZES.tee = SIZES;
delete TYPE_SIZES.shoes;
COLORS.smoke = { hex: '#3a3a3d', light: false, name: { fr: 'Anthracite', en: 'Charcoal', es: 'Antracita', ar: 'فحمي' } };
COLORS.heather = { hex: '#a7a8aa', light: true, name: { fr: 'Gris chiné', en: 'Heather grey', es: 'Gris jaspeado', ar: 'رمادي مبرقش' } };
COLORS.sky = { hex: '#7fa3c8', light: true, name: { fr: 'Bleu délavé', en: 'Washed blue', es: 'Azul lavado', ar: 'أزرق باهت' } };
const RW = (o) => Object.assign({ type: 'hoodie', sizes: SIZES, badges: [], fit: 'oversized' }, o);
PRODUCTS.push(
  RW({ id: 'yaz-hoodie', col: 'arc1', name: 'Yaz Hoodie', price: 79, colors: ['black'], badges: ['new'], date: 30, tech: ['embroidery', 'puff'],
    desc: { fr: 'Le symbole ⵣ (Yaz) brodé en chenille noire ton sur ton sur la poitrine. Au dos, « ARRIF » en relief puff crème et un petit ⵣ safran. Languette tricolore au poignet.',
      en: 'The ⵣ (Yaz) symbol in tone-on-tone black chenille on the chest. On the back, “ARRIF” in cream puff print and a small saffron ⵣ. Tricolour tab on the cuff.',
      es: 'El símbolo ⵣ (Yaz) bordado en chenilla negra tono sobre tono en el pecho. En la espalda, «ARRIF» en relieve puff crema y un pequeño ⵣ azafrán. Etiqueta tricolor en el puño.',
      ar: 'رمز ⵣ (ياز) مطرّز بالشنيل الأسود على الصدر. على الظهر «ARRIF» بطباعة بارزة كريمية وⵣ صغير بلون الزعفران. شريط ثلاثي الألوان على الكم.' } }),
  RW({ id: 'arrif-hoodie', col: 'arc1', name: 'Arrif Hoodie', price: 79, colors: ['offwhite'], badges: ['new'], date: 29, tech: ['puff', 'print'],
    desc: { fr: '« ARRIF » en grosses lettres noires en relief puff, ⵣ rouge au-dessus. Au dos, les montagnes du Rif au lever du soleil et une frise de losanges amazighs.',
      en: '“ARRIF” in big black puff letters with a red ⵣ above. On the back, the Rif mountains at sunrise and a band of Amazigh diamonds.',
      es: '«ARRIF» en grandes letras negras en relieve puff, con un ⵣ rojo encima. En la espalda, las montañas del Rif al amanecer y una franja de rombos amazigh.',
      ar: '«ARRIF» بحروف سوداء بارزة كبيرة وفوقها ⵣ أحمر. على الظهر جبال الريف عند الشروق وشريط من المعيّنات الأمازيغية.' } }),
  RW({ id: 'tazerbit-hoodie', col: 'arc1', name: 'Tazerbit Hoodie', price: 85, colors: ['sand'], badges: ['trend'], date: 28, tech: ['knit'],
    desc: { fr: 'Tazerbit, c’est le tapis. Une bande en jacquard tricoté reprend les losanges et zigzags des tapis du Rif sur la poitrine et les manches, en rouge, noir et safran.',
      en: 'Tazerbit means rug. A knitted jacquard band takes the diamonds and zigzags of Rif rugs across the chest and sleeves, in red, black and saffron.',
      es: 'Tazerbit significa alfombra. Una franja de jacquard tejido recoge los rombos y zigzags de las alfombras del Rif en el pecho y las mangas, en rojo, negro y azafrán.',
      ar: 'تازربيت تعني الزربية. شريط جاكار منسوج يحمل معيّنات وتعرّجات زرابي الريف على الصدر والأكمام بالأحمر والأسود والزعفراني.' } }),
  RW({ id: 'adrar-hoodie', col: 'arc1', name: 'Adrar Hoodie', price: 82, colors: ['smoke'], badges: [], date: 27, tech: ['embroidery'],
    desc: { fr: 'Adrar, la montagne. Petite crête brodée sur le cœur ; au dos, toute la chaîne du Rif en broderie fine, soleil safran et frise de losanges.',
      en: 'Adrar, the mountain. A small ridge embroidered over the heart; on the back, the whole Rif range in fine embroidery, a saffron sun and a band of diamonds.',
      es: 'Adrar, la montaña. Una pequeña cresta bordada en el pecho; en la espalda, toda la cordillera del Rif en bordado fino, sol azafrán y franja de rombos.',
      ar: 'أدرار تعني الجبل. قمة صغيرة مطرّزة على القلب، وعلى الظهر سلسلة جبال الريف بتطريز دقيق وشمس زعفرانية وشريط من المعيّنات.' } }),
  RW({ id: 'marchica-hoodie', col: 'arc2', name: 'Marchica Hoodie', price: 82, colors: ['navy'], badges: ['new'], date: 26, tech: ['print', 'embroidery'],
    desc: { fr: '« NADOR » brodé sur la poitrine. Au dos, la lagune de Marchica au coucher du soleil, barques et palmiers, façon affiche de voyage rétro.',
      en: '“NADOR” embroidered on the chest. On the back, the Marchica lagoon at sunset with boats and palm trees, in a retro travel-poster style.',
      es: '«NADOR» bordado en el pecho. En la espalda, la laguna de Marchica al atardecer con barcas y palmeras, estilo cartel de viaje retro.',
      ar: '«NADOR» مطرّزة على الصدر. على الظهر بحيرة مارتشيكا عند الغروب مع القوارب والنخيل بأسلوب ملصق سفر قديم.' } }),
  RW({ id: 'alhoceima-hoodie', col: 'arc2', name: 'Al Hoceima Hoodie', price: 85, colors: ['sky'], badges: ['trend'], date: 25, tech: ['dyed', 'print'],
    desc: { fr: 'Teint en pièce pour un bleu délavé. Badge brodé « AL HOCEIMA » devant ; au dos, la baie vue des falaises, l’îlot et les vagues en trait blanc.',
      en: 'Garment-dyed for a washed blue. Embroidered “AL HOCEIMA” badge on the front; on the back, the bay seen from the cliffs, the islet and the waves in white line art.',
      es: 'Teñido en prenda para un azul lavado. Parche bordado «AL HOCEIMA» delante; en la espalda, la bahía vista desde los acantilados, el islote y las olas en trazo blanco.',
      ar: 'مصبوغ بعد الخياطة بلون أزرق باهت. شارة «AL HOCEIMA» مطرّزة في الأمام، وعلى الظهر الخليج من فوق الجرف والجزيرة والأمواج بخط أبيض.' } }),
  RW({ id: 'nador-zip-hoodie', col: 'arc2', name: 'Nador Zip Hoodie', price: 89, colors: ['black'], badges: ['limited'], date: 24, tech: ['zip', 'embroidery'],
    desc: { fr: 'Zip métal noir mat, frise de losanges et triangles amazighs brodée en safran et rouge le long du zip, liseré safran sur la capuche.',
      en: 'Matte black metal zip, a band of Amazigh diamonds and triangles embroidered in saffron and red along the zip, saffron piping on the hood.',
      es: 'Cremallera metálica negra mate, franja de rombos y triángulos amazigh bordada en azafrán y rojo a lo largo de la cremallera, ribete azafrán en la capucha.',
      ar: 'سحّاب معدني أسود مطفأ، وشريط معيّنات ومثلثات أمازيغية مطرّز بالزعفراني والأحمر على طول السحّاب، وحاشية زعفرانية على القبعة.' } }),
  RW({ id: 'yaz-crew', col: 'ess', name: 'Yaz Crewneck', price: 65, colors: ['heather'], badges: [], date: 23, fit: 'boxy', tech: ['embroidery'],
    desc: { fr: 'Le sweat col rond du quotidien : écusson brodé ⵣ rouge dans un losange safran, « RWAFA » en dessous, rayures bleu, vert, jaune aux poignets.',
      en: 'The everyday crewneck: embroidered red ⵣ crest in a saffron diamond, “RWAFA” below, blue, green and yellow stripes on the cuffs.',
      es: 'La sudadera de cuello redondo para cada día: escudo bordado ⵣ rojo en un rombo azafrán, «RWAFA» debajo, rayas azul, verde y amarillo en los puños.',
      ar: 'سترة يومية بياقة مستديرة: شعار ⵣ أحمر مطرّز داخل معيّن زعفراني، وتحته «RWAFA»، وخطوط زرقاء وخضراء وصفراء على الأكمام.' } }),
  RW({ id: 'rwafa-logo-hoodie', col: 'ess', name: 'RWAFA Hoodie', price: 69, colors: ['black'], badges: [], date: 22, tech: ['embroidery'],
    desc: { fr: 'Le logo RWAFA brodé crème sur la poitrine. Simple, net, molleton 450 g.',
      en: 'The RWAFA logo embroidered in cream on the chest. Simple, clean, 450 gsm fleece.',
      es: 'El logo RWAFA bordado en crema en el pecho. Simple, limpio, felpa de 450 g.',
      ar: 'شعار RWAFA مطرّز بالكريمي على الصدر. بسيط وأنيق، قماش 450 غ.' } }),
  RW({ id: 'yaz-tee', type: 'tee', col: 'arc1', name: 'Yaz Tee', price: 35, colors: ['offwhite'], badges: ['new'], date: 21, fit: 'boxy', tech: ['print'],
    desc: { fr: 'T-shirt épais coupe boxy, grand ⵣ rouge sérigraphié sur la poitrine.',
      en: 'Heavy boxy-fit tee with a large red screen-printed ⵣ on the chest.',
      es: 'Camiseta gruesa de corte boxy con un gran ⵣ rojo serigrafiado en el pecho.',
      ar: 'تيشيرت سميك بقصة بوكسي مع ⵣ أحمر كبير مطبوع على الصدر.' } }),
  RW({ id: 'tazerbit-tee', type: 'tee', col: 'arc1', name: 'Tazerbit Tee', price: 35, colors: ['black'], badges: [], date: 20, fit: 'boxy', tech: ['print'],
    desc: { fr: 'T-shirt noir épais, bande de motifs de tapis du Rif sérigraphiée sur la poitrine en safran, rouge et crème.',
      en: 'Heavy black tee with a band of Rif rug patterns screen-printed across the chest in saffron, red and cream.',
      es: 'Camiseta negra gruesa con una franja de motivos de alfombra del Rif serigrafiada en el pecho en azafrán, rojo y crema.',
      ar: 'تيشيرت أسود سميك مع شريط من نقوش زرابي الريف مطبوع على الصدر بالزعفراني والأحمر والكريمي.' } }),
  RW({ id: 'tazerbit-socks', type: 'socks', col: 'arc1', name: 'Tazerbit Socks', price: 16, colors: ['sand'], sizes: SOCK_SIZES, badges: [], date: 19, fit: null, tech: ['knit'],
    desc: { fr: 'Chaussettes mi-mollet, losanges des tapis du Rif tricotés en jacquard, talon et pointe rouges.',
      en: 'Mid-calf socks with Rif rug diamonds knitted in jacquard, red heel and toe.',
      es: 'Calcetines a media pierna con rombos de alfombra del Rif tejidos en jacquard, talón y puntera rojos.',
      ar: 'جوارب حتى منتصف الساق بمعيّنات زرابي الريف منسوجة بالجاكار، وكعب ومقدمة حمراء.' } }),
  RW({ id: 'yaz-socks', type: 'socks', col: 'ess', name: 'Yaz Socks', price: 16, colors: ['black'], sizes: SOCK_SIZES, badges: [], date: 18, fit: null, tech: ['knit'],
    desc: { fr: 'Chaussettes noires, ⵣ rouge tricoté sur le côté et trois fines rayures bleu, vert, jaune au bord-côte.',
      en: 'Black socks with a red ⵣ knitted on the side and three thin blue, green and yellow stripes on the cuff.',
      es: 'Calcetines negros con un ⵣ rojo tejido en el lateral y tres finas rayas azul, verde y amarillo en el puño.',
      ar: 'جوارب سوداء مع ⵣ أحمر منسوج على الجانب وثلاثة خطوط رفيعة زرقاء وخضراء وصفراء على الحافة.' } }),
);
const sizesOf = (p) => TYPE_SIZES[p.type] || SIZES;
const byId = (id) => PRODUCTS.find((p) => p.id === id);
const SIZE_TABLE = [['XS', 104, 66, 60], ['S', 110, 69, 62], ['M', 116, 72, 64], ['L', 122, 75, 66], ['XL', 128, 78, 68], ['XXL', 134, 80, 70]];
const PROMOS = ['RWAFA10', 'BIENVENUE10'];
const SEED_REVIEWS = [
  { n: 'Yassine B.', r: 5, txt: { fr: 'Qualité de fou, le molleton est épais et la sérigraphie nickel après plusieurs lavages.', en: 'Crazy quality — thick fleece and the print still perfect after several washes.', es: 'Calidad brutal, la felpa es gruesa y la serigrafía perfecta tras varios lavados.', ar: 'جودة رهيبة، القماش سميك والطباعة ممتازة بعد عدة غسلات.' } },
  { n: 'Inès M.', r: 5, txt: { fr: 'Coupe oversize parfaite, j’ai pris ma taille habituelle. On m’arrête dans la rue !', en: 'Perfect oversized fit, I took my usual size. People stop me in the street!', es: 'Corte oversize perfecto, cogí mi talla habitual. ¡Me paran por la calle!', ar: 'قصّة واسعة مثالية، أخذت مقاسي المعتاد. الناس يوقفونني في الشارع!' } },
  { n: 'Carlos R.', r: 4, txt: { fr: 'Super design et livraison rapide. Ça taille un peu grand.', en: 'Great design and fast delivery. Runs a little big.', es: 'Diseño genial y envío rápido. Talla un poco grande.', ar: 'تصميم رائع وتوصيل سريع. المقاس كبير قليلًا.' } },
  { n: 'Nour E.', r: 5, txt: { fr: 'Les broderies sont superbes, on sent la qualité dès qu’on le touche.', en: 'The embroidery is gorgeous, you can feel the quality straight away.', es: 'Los bordados son preciosos, se nota la calidad al tocarlo.', ar: 'التطريز رائع، تشعر بالجودة بمجرد لمسه.' } },
  { n: 'Sofia L.', r: 5, txt: { fr: 'Les détails du dessin sont incroyables, on dirait une vraie planche de manga.', en: 'The artwork details are incredible, it looks like a real manga page.', es: 'Los detalles del dibujo son increíbles, parece una página de manga real.', ar: 'تفاصيل الرسم مذهلة، كأنها صفحة مانغا حقيقية.' } },
];

/* =================== STATE =================== */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let cart = store.get('cart', []).filter((l) => byId(l.id));
let promo = store.get('promo', null);
let lastOrder = null;
const PRICE_MIN = Math.min(...PRODUCTS.map((p) => p.price)), PRICE_MAX = Math.max(...PRODUCTS.map((p) => p.price));
const F = { col: '', type: '', size: new Set(), color: new Set(), fit: new Set(), tech: new Set(), max: PRICE_MAX, sort: 'new' };
let PV = {};
const saveCart = () => store.set('cart', cart);
const cartCount = () => cart.reduce((a, l) => a + l.qty, 0);
function totals() {
  const sub = cart.reduce((a, l) => a + byId(l.id).price * l.qty, 0);
  const disc = promo ? Math.round(sub * 10) / 100 : 0;
  const ship = sub === 0 || sub - disc >= 80 ? 0 : 4.9;
  return { sub, disc, ship, total: sub - disc + ship };
}

/* =================== PHOTOS (real images only) =================== */
// Drop files in /images named <product-id>-face.jpg, -dos.jpg, -manche.jpg (+ hero.jpg, collection-<id>.jpg).
// If a file is missing, a clean empty frame is shown instead — never a drawing.
const VIEWS = { front: 'face', back: 'dos', sleeve: 'manche' };
const imgPath = (p, view = 'front') => `images/${p.id}-${VIEWS[view] || view}.jpg`;
function frame(src, alt, cls = '', eager = false) {
  return `<div class="ph ${cls}"><img src="${src}" alt="${esc(alt)}" ${eager ? '' : 'loading="lazy"'} decoding="async" onload="this.parentNode.classList.add('has-img')" onerror="this.remove()"><span class="ph-empty" aria-hidden="true">${ICON_CAM}<small>${esc(src)}</small></span></div>`;
}
const photo = (p, view = 'front', cls = '', eager = false) => frame(imgPath(p, view), `${p.name} — ${t(view)}`, cls, eager);
const ICON_CAM = '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';

/* =================== ICONS =================== */
const ICON = {
  bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.2 1.6 3.6 3.8 3.8v3.1c-1.4 0-2.7-.4-3.8-1.1v6.1c0 3.2-2.6 5.6-5.7 5.6S5 18 5 14.9s2.6-5.6 5.8-5.6c.3 0 .6 0 .9.1v3.2a2.6 2.6 0 0 0-3.6 2.4 2.6 2.6 0 0 0 5.2 0V3h3.2z"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
  ret: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10a8 8 0 1 1 2 7"/><path d="M4 4v6h6"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
};
// TODO: remplace par les vrais comptes de la boutique
const SOCIAL = { ig: 'https://www.instagram.com/', tiktok: 'https://www.tiktok.com/' };
const socials = () => `<div class="socials"><a class="social" href="${SOCIAL.ig}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a><a class="social" href="${SOCIAL.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${ICON.tiktok}</a></div>`;

/* =================== COMPONENTS =================== */
const badges = (p) => p.badges.length ? `<div class="badges">${p.badges.map((b) => `<span class="badge badge-${b}">${t('b_' + b)}</span>`).join('')}</div>` : '';
const stars = (r) => `<span class="stars" aria-label="${r.toFixed(1)} / 5">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= Math.round(r) ? 'on' : ''}">★</i>`).join('')}</span>`;
function card(p) {
  return `<article class="card">
    <a class="card-media" href="#/p/${p.id}" aria-label="${esc(p.name)}">
      ${photo(p, 'front', 'shot shot-front')}${photo(p, 'back', 'shot shot-back')}${badges(p)}
    </a>
    <button class="wish ${isWish(p.id) ? 'on' : ''}" data-act="wish" data-id="${p.id}" aria-pressed="${isWish(p.id)}" aria-label="${isWish(p.id) ? t('wish_rm') : t('wish_add')}">${ICON_HEART}</button>
    <div class="card-body">
      <span class="card-col">${t('col_' + p.col)}</span>
      <a class="card-name" href="#/p/${p.id}">${esc(p.name)}</a>
      <span class="card-meta">${p.fit ? t('fit_' + p.fit) : t('type_' + p.type)} · ${t('tech_' + p.tech[0])}</span>
      <span class="card-price">${fmt(p.price)}</span>
    </div></article>`;
}
function sizeTable(type = 'hoodie') {
  if (type === 'socks') return `<p class="muted-s">${t('sg_socks')}</p><div class="table-wrap"><table class="sizes-t"><thead><tr><th>${t('size')}</th><th>${t('shoe_eu')}</th><th>${t('foot_cm')}</th></tr></thead><tbody>${[['35-38', '35 – 38', '22,5 – 24,5'], ['39-42', '39 – 42', '25 – 27'], ['43-46', '43 – 46', '27,5 – 29,5']].map((r) => `<tr><th>${r[0]}</th><td>${r[1]}</td><td>${r[2]} cm</td></tr>`).join('')}</tbody></table></div>`;
  if (type === 'shoes') return `<p class="muted-s">${t('sg_shoes')}</p><div class="table-wrap"><table class="sizes-t"><thead><tr><th>${t('shoe_eu')}</th><th>${t('foot_cm')}</th></tr></thead><tbody>${SHOE_SIZES.map((s, i) => `<tr><th>${s}</th><td>${(23 + i * 0.67).toFixed(1).replace('.', ',')} cm</td></tr>`).join('')}</tbody></table></div>`;
  return `<p class="muted-s">${t('sg_note')}</p><div class="table-wrap"><table class="sizes-t"><thead><tr><th>${t('size')}</th><th>${t('chest')}</th><th>${t('length')}</th><th>${t('sleeve_len')}</th></tr></thead><tbody>${SIZE_TABLE.map((r) => `<tr><th>${r[0]}</th><td>${r[1]} cm</td><td>${r[2]} cm</td><td>${r[3]} cm</td></tr>`).join('')}</tbody></table></div>`;
}
function newsletterBlock() {
  const sub = store.get('sub', false);
  return `<div class="nl"><div><h3>${t('nl_title')}</h3><p>${t('nl_txt')}</p><p class="countdown">${t('drop_in')} <b class="cd"></b></p></div>${sub
    ? `<p class="nl-code">${t('nl_ok')} <span class="code">ONI10</span></p>`
    : `<form data-form="nl" class="nl-form" novalidate><input type="email" name="email" placeholder="${t('nl_ph')}" aria-label="${t('email')}" required autocomplete="email"><button class="btn btn-yellow">${t('nl_btn')}</button></form>`}</div>`;
}

const XT = {
  announce: { fr: 'Livraison offerte dès 80 € · -10 % sur ta 1re commande', en: 'Free shipping from €80 · 10% off your first order', es: 'Envío gratis desde 80 € · -10 % en tu primer pedido', ar: 'شحن مجاني ابتداءً من 80 € · خصم 10٪ على طلبك الأول' },
};
for (const k in XT) for (const l of LANGS) T[l][k] = XT[k][l];

// ONI brand copy (from the ONI reference design)
const XT2 = {
  announce: { fr: 'Livraison offerte dès 80 € · Retours gratuits sous 30 jours', en: 'Free shipping from €80 · Free returns within 30 days', es: 'Envío gratis desde 80 € · Devoluciones gratis en 30 días', ar: 'شحن مجاني ابتداءً من 80 € · إرجاع مجاني خلال 30 يومًا' },
  nav_coll: { fr: 'Collection', en: 'Collection', es: 'Colección', ar: 'المجموعة' },
  nav_arc2: { fr: 'Arc II', en: 'Arc II', es: 'Arc II', ar: 'Arc II' },
  nav_house: { fr: 'La Maison', en: 'The House', es: 'La Casa', ar: 'الدار' },
  hero_k: { fr: 'Arc I · Collection hiver 2026', en: 'Arc I · Winter 2026 collection', es: 'Arc I · Colección invierno 2026', ar: 'Arc I · مجموعة شتاء 2026' },
  hero_l1: { fr: 'Porte ton', en: 'Wear your', es: 'Viste tu', ar: 'البس' },
  hero_l2: { fr: 'côté sombre.', en: 'dark side.', es: 'lado oscuro.', ar: 'جانبك المظلم.' },
  hero_p: { fr: 'Des sweats et hoodies premium nés de notre amour de l’anime. Coton épais, broderies discrètes, éditions limitées. Pensés pour durer bien après le dernier épisode.', en: 'Premium sweatshirts and hoodies born from our love of anime. Heavy cotton, subtle embroidery, limited editions. Made to last long after the final episode.', es: 'Sudaderas y hoodies premium nacidos de nuestro amor por el anime. Algodón grueso, bordados discretos, ediciones limitadas. Pensados para durar mucho después del último episodio.', ar: 'سترات وهوديز فاخرة وُلدت من حبنا للأنمي. قطن سميك، تطريز أنيق، إصدارات محدودة. مصنوعة لتدوم طويلًا بعد الحلقة الأخيرة.' },
  cta_disc: { fr: 'Découvrir la collection', en: 'Discover the collection', es: 'Descubrir la colección', ar: 'اكتشف المجموعة' },
  cta_next: { fr: 'Prochain drop', en: 'Next drop', es: 'Próximo drop', ar: 'الإصدار القادم' },
  scene_cap: { fr: 'Arc I — Kage', en: 'Arc I — Kage', es: 'Arc I — Kage', ar: 'Arc I — Kage' },
  footer_tag: { fr: 'Sweats premium nés de l’amour de l’anime.', en: 'Premium sweats born from a love of anime.', es: 'Sudaderas premium nacidas del amor por el anime.', ar: 'سترات فاخرة وُلدت من حب الأنمي.' },
};
for (const k in XT2) for (const l of LANGS) T[l][k] = XT2[k][l];

// ONI universe texts (collections = arcs, story, FAQ…)
const XT3 = {
  col_arc1: { fr: 'Arc I — Kage', en: 'Arc I — Kage', es: 'Arc I — Kage', ar: 'Arc I — Kage' },
  col_arc2: { fr: 'Arc II — Yoru', en: 'Arc II — Yoru', es: 'Arc II — Yoru', ar: 'Arc II — Yoru' },
  col_ess: { fr: 'Essentiels', en: 'Essentials', es: 'Esenciales', ar: 'الأساسيات' },
  col_arc1_d: { fr: 'Ombres, démons et soleil rouge. La première saison ONI, brodée ton sur ton.', en: 'Shadows, demons and a red sun. The first ONI season, embroidered tone on tone.', es: 'Sombras, demonios y sol rojo. La primera temporada ONI, bordada tono sobre tono.', ar: 'ظلال وشياطين وشمس حمراء. الموسم الأول من ONI، مطرّز بلون القماش.' },
  col_arc2_d: { fr: 'Tokyo la nuit : néons, torii et pétales de cerisier. Éditions limitées.', en: 'Tokyo at night: neon, torii and cherry blossoms. Limited editions.', es: 'Tokio de noche: neones, torii y flores de cerezo. Ediciones limitadas.', ar: 'طوكيو ليلًا: نيون وبوابات توري وأزهار الكرز. إصدارات محدودة.' },
  col_ess_d: { fr: 'Le logo ONI en noir, crème et rouge. Les pièces de tous les jours.', en: 'The ONI logo in black, cream and red. Everyday pieces.', es: 'El logo ONI en negro, crema y rojo. Prendas para cada día.', ar: 'شعار ONI بالأسود والكريمي والأحمر. قطع لكل يوم.' },
  spot_kicker: { fr: 'Pièce maîtresse', en: 'Signature piece', es: 'Pieza estrella', ar: 'القطعة الأيقونية' },
  spot_txt: { fr: 'Cornes d’oni brodées ton sur ton sur la poitrine, grand kanji 鬼 au dos, coton 450 g. Édition limitée de l’Arc I.', en: 'Tone-on-tone embroidered oni horns on the chest, a large 鬼 kanji on the back, 450 gsm cotton. Arc I limited edition.', es: 'Cuernos de oni bordados tono sobre tono en el pecho, gran kanji 鬼 en la espalda, algodón de 450 g. Edición limitada del Arc I.', ar: 'قرنا أوني مطرّزان على الصدر، حرف 鬼 كبير على الظهر، قطن 450 غ. إصدار محدود من Arc I.' },
  manifesto: { fr: 'Chaque arc est une saison. Chaque pièce, un épisode qu’on porte longtemps.', en: 'Every arc is a season. Every piece, an episode you keep wearing.', es: 'Cada arc es una temporada. Cada prenda, un episodio que llevas mucho tiempo.', ar: 'كل Arc موسم. وكل قطعة حلقة ترتديها طويلًا.' },
  desc_more: { fr: 'Coupe oversize, capuche doublée, poche kangourou, bords-côtes épais.', en: 'Oversized fit, lined hood, kangaroo pocket, heavy ribbed trims.', es: 'Corte oversize, capucha forrada, bolsillo canguro, puños de canalé gruesos.', ar: 'قصّة واسعة، قبعة مبطّنة، جيب كنغر، حواف مضلّعة سميكة.' },
  material_txt: { fr: 'Molleton 450 g/m² — 100 % coton biologique, intérieur gratté ultra-doux. Broderies au fil mat, impressions à l’eau. Lavage à 30 °C sur l’envers, pas de sèche-linge.', en: '450 gsm fleece — 100% organic cotton, ultra-soft brushed inside. Matte-thread embroidery, water-based prints. Wash at 30 °C inside out, no tumble dryer.', es: 'Felpa de 450 g/m² — 100 % algodón orgánico, interior perchado ultrasuave. Bordados con hilo mate, estampados al agua. Lavar a 30 °C del revés, sin secadora.', ar: 'قماش 450 غ/م² — قطن عضوي 100٪ بداخل ناعم جدًا. تطريز بخيط مطفأ وطباعة بأحبار مائية. غسيل على 30° على الوجه المقلوب، بدون مجفف.' },
  about_kicker: { fr: 'La Maison', en: 'The House', es: 'La Casa', ar: 'الدار' },
  about_title: { fr: 'L’histoire ONI', en: 'The ONI story', es: 'La historia ONI', ar: 'حكاية ONI' },
  about_p1: { fr: 'ONI est né d’une passion : les animes qu’on regardait tard le soir, les génériques qu’on connaissait par cœur, les personnages qui nous ont appris à ne jamais lâcher.', en: 'ONI was born from a passion: the anime we watched late at night, the openings we knew by heart, the characters who taught us never to give up.', es: 'ONI nació de una pasión: los animes que veíamos de noche, los openings que nos sabíamos de memoria, los personajes que nos enseñaron a no rendirnos nunca.', ar: 'وُلدت ONI من شغف: الأنمي الذي كنا نشاهده ليلًا، والمقدمات التي حفظناها، والشخصيات التي علّمتنا ألّا نستسلم أبدًا.' },
  p2: null,
  about_p2: { fr: 'Pas de licence, pas de copie : chaque visuel est dessiné pour la maison. On les brode ton sur ton sur un coton épais, en petites séries, pour des pièces qui se portent avec discrétion — et qui durent.', en: 'No licences, no copies: every visual is drawn for the house. We embroider them tone on tone on heavy cotton, in small runs, for pieces you wear with understatement — and that last.', es: 'Sin licencias ni copias: cada diseño se dibuja para la casa. Lo bordamos tono sobre tono en algodón grueso, en series pequeñas, para prendas discretas que duran.', ar: 'بلا تراخيص وبلا نسخ: كل تصميم يُرسم خصيصًا للدار. نطرّزه بلون القماش على قطن سميك وبدفعات صغيرة، لقطع أنيقة تدوم.' },
  about_p3: { fr: 'Chaque collection est un « arc », comme une saison d’anime. Arc I — Kage ouvre l’histoire. La suite arrive bientôt.', en: 'Each collection is an “arc”, like an anime season. Arc I — Kage opens the story. The next chapter is coming soon.', es: 'Cada colección es un «arc», como una temporada de anime. Arc I — Kage abre la historia. Lo que sigue llega pronto.', ar: 'كل مجموعة هي «Arc» مثل موسم أنمي. Arc I — Kage يفتتح الحكاية، والفصل التالي قادم قريبًا.' },
  values: { fr: [['450 g', 'Coton biologique épais'], ['100 %', 'Visuels originaux'], ['N°', 'Petites séries numérotées']], en: [['450 g', 'Heavy organic cotton'], ['100%', 'Original artwork'], ['N°', 'Small numbered runs']], es: [['450 g', 'Algodón orgánico grueso'], ['100 %', 'Diseños originales'], ['N.º', 'Series pequeñas numeradas']], ar: [['450 غ', 'قطن عضوي سميك'], ['100٪', 'تصاميم أصلية'], ['رقم', 'دفعات صغيرة مرقّمة']] },
  faq: { fr: [['Les visuels sont-ils originaux ?', 'Oui. Chaque visuel est créé pour ONI : aucun personnage sous licence, aucune copie.'], ['Comment taillent les sweats ?', 'Coupe oversize. Le guide des tailles est sur chaque fiche produit.'], ['Quand sort le prochain arc ?', 'Inscris-toi à la newsletter : tu seras prévenu avant tout le monde.']],
    en: [['Are the designs original?', 'Yes. Every visual is created for ONI: no licensed characters, no copies.'], ['How do the hoodies fit?', 'Oversized. The size guide is on every product page.'], ['When is the next arc coming?', 'Join the newsletter and you will hear about it first.']],
    es: [['¿Los diseños son originales?', 'Sí. Cada diseño se crea para ONI: sin personajes con licencia ni copias.'], ['¿Cómo tallan las sudaderas?', 'Corte oversize. La guía de tallas está en cada ficha de producto.'], ['¿Cuándo sale el próximo arc?', 'Suscríbete a la newsletter y serás el primero en saberlo.']],
    ar: [['هل التصاميم أصلية؟', 'نعم. كل تصميم يُرسم لـ ONI: بلا شخصيات مرخّصة وبلا نسخ.'], ['كيف هي المقاسات؟', 'قصّة واسعة. دليل المقاسات موجود في صفحة كل منتج.'], ['متى يصدر الـ Arc القادم؟', 'اشترك في النشرة البريدية لتعرف قبل الجميع.']] },
  nl_title: { fr: 'Rejoins le clan ONI', en: 'Join the ONI clan', es: 'Únete al clan ONI', ar: 'انضم إلى عشيرة ONI' },
  nl_txt: { fr: 'Le prochain arc en avant-première et -10 % sur ta première commande.', en: 'Early access to the next arc and 10% off your first order.', es: 'El próximo arc en primicia y -10 % en tu primer pedido.', ar: 'الـ Arc القادم قبل الجميع وخصم 10٪ على طلبك الأول.' },
};
delete XT3.p2;
for (const k in XT3) for (const l of LANGS) T[l][k] = XT3[k][l];
COLORS.offwhite.name = { fr: 'Crème', en: 'Cream', es: 'Crema', ar: 'كريمي' };

// Dark 3D hero copy (4 languages)
const XT4 = {
  h3_left: { fr: 'Taillé dans l’ombre.<br>Brodé à la main.<br>Porté comme une armure.', en: 'Cut from shadow.<br>Embroidered by hand.<br>Worn like armour.', es: 'Cortado en la sombra.<br>Bordado a mano.<br>Llevado como armadura.', ar: 'مفصّل من الظل.<br>مطرّز يدويًا.<br>يُلبس كدرع.' },
  h3_right: { fr: 'Arc I · Kage<br>Hiver 2026<br>Édition numérotée.', en: 'Arc I · Kage<br>Winter 2026<br>Numbered edition.', es: 'Arc I · Kage<br>Invierno 2026<br>Edición numerada.', ar: 'Arc I · Kage<br>شتاء 2026<br>إصدار مرقّم.' },
  h3_card_l: { fr: 'Coton 450 g.<br>Petites séries.<br>Arc I · Hiver 26', en: '450 gsm cotton.<br>Small runs.<br>Arc I · Winter 26', es: 'Algodón 450 g.<br>Series pequeñas.<br>Arc I · Invierno 26', ar: 'قطن 450 غ.<br>دفعات صغيرة.<br>Arc I · شتاء 26' },
  h3_card_r: { fr: 'Livraison suivie.<br>Retours 30 jours.<br>Paiement sécurisé.', en: 'Tracked shipping.<br>30-day returns.<br>Secure payment.', es: 'Envío con seguimiento.<br>Devoluciones 30 días.<br>Pago seguro.', ar: 'شحن مع التتبع.<br>إرجاع خلال 30 يومًا.<br>دفع آمن.' },
  h3_tag: { fr: 'Kage Hoodie · Cornes brodées · Numéroté', en: 'Kage Hoodie · Embroidered horns · Numbered', es: 'Kage Hoodie · Cuernos bordados · Numerado', ar: 'Kage Hoodie · قرنان مطرّزان · مرقّم' },
  h3_cta: { fr: 'Voir le drop', en: 'Shop the drop', es: 'Ver el drop', ar: 'شاهد الإصدار' },
  h3_scroll: { fr: 'Défiler', en: 'Scroll', es: 'Desliza', ar: 'مرّر' },
  brand_sub: { fr: 'Atelier anime', en: 'Anime atelier', es: 'Taller anime', ar: 'ورشة أنمي' },
};
for (const k in XT4) for (const l of LANGS) T[l][k] = XT4[k][l];


const ONI_LOGO = '<svg class="oni-horns" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3v34M9 5c0 8 5 12 11 12s11-4 11-12M9 35c0-8 5-12 11-12s11 4 11 12" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/></svg>'; const ONI_OLD = '<svg viewBox="0 0 40 40"><path d="M9 34 C3 24 5 12 13 4 C11 14 13 24 17 33 Z" fill="currentColor"/><path d="M31 34 C37 24 35 12 27 4 C29 14 27 24 23 33 Z" fill="currentColor"/></svg>';

function announce() {
  return `<div class="announce-in"><span>${t('announce')}</span><a href="#/shipping">${t('learn_more')}</a></div>`;
}
function header() {
  const n = cartCount();
  return `<div class="hdr-in">
    <button class="burger" data-act="menu" aria-label="${t('menu')}" aria-controls="nav"><span></span><span></span><span></span></button>
    <nav class="nav" id="nav">
      <a href="#/shop" data-nav="#/shop">${t('nav_coll')}</a><a href="#/shop/arc2" data-nav="#/shop/arc2">${t('nav_arc2')}</a><a href="#/about" data-nav="#/about">${t('nav_house')}</a><a href="#/contact" data-nav="#/contact">${t('nav_contact')}</a>
      <a class="nav-extra" href="#/shipping" data-nav="#/shipping">${t('nav_shipping')}</a>
      <span class="nav-brand" aria-hidden="true">${ONI_LOGO}RWAFA</span></nav>
    <a href="#/" class="brand" aria-label="RWAFA">${ONI_LOGO}<span class="brand-txt"><b>RWAFA</b><small>${t('brand_sub')}</small></span></a>
    <div class="tools">
      <label class="lang"><span class="sr">${t('lang')}</span><select data-act="lang">${LANGS.map((l) => `<option value="${l}" ${l === lang ? 'selected' : ''}>${l.toUpperCase()}</option>`).join('')}</select></label>
      <button class="icon-btn" data-act="search" aria-label="${t('search')}">${ICON.search}</button>
      <a href="#/wishlist" class="icon-btn wish-link" aria-label="${t('wish')}">${ICON_HEART}<span class="count wish-count" ${wishes().length ? '' : 'hidden'}>${wishes().length}</span></a>
      <a href="#/cart" class="cart-btn" aria-label="${t('cart')} (${n})"><span class="cart-label">${t('cart')}</span><span class="count">${n}</span></a>
    </div></div>`;
}
function footer() {
  const sub = store.get('sub', false);
  return `<p class="ftr-logo" aria-hidden="true">RWAFA</p>
  <div class="ftr-grid dk">
    <div><p class="ftr-tag">${t('footer_tag')}</p>
      <h4>${t('nl_title')}</h4>
      ${sub ? `<p class="nl-code">${t('nl_ok')} <span class="code">ONI10</span></p>` : `<form data-form="nl" class="ftr-nl" novalidate><input type="email" name="email" placeholder="${t('nl_ph')}" aria-label="${t('email')}" required autocomplete="email"><button class="btn btn-red">${t('nl_btn')}</button></form>`}
      <div class="pay-icons" aria-label="${t('secure')}"><span>VISA</span><span>MASTERCARD</span><span>APPLE PAY</span><span>PAYPAL</span></div>
    </div>
    <div><h4>${t('shop')}</h4><ul><li><a href="#/shop/arc1">${t('col_arc1')}</a></li><li><a href="#/shop/arc2">${t('col_arc2')}</a></li><li><a href="#/shop/ess">${t('col_ess')}</a></li><li><a href="#/shop/tee">${t('type_tee')}</a></li><li><a href="#/shop/socks">${t('type_socks')}</a></li><li><a href="#/shop">${t('all')}</a></li></ul></div>
    <div><h4>${t('help')}</h4><ul><li><a href="#/shipping">${t('nav_shipping')}</a></li><li><a href="#/contact">${t('nav_contact')}</a></li><li><a href="#/about">${t('nav_about')}</a></li></ul></div>
    <div><h4>${t('follow')}</h4>${socials()}</div>
  </div>
  <div class="ftr-bottom">© ${new Date().getFullYear()} RWAFA — ${t('rights')}</div>`;
}

/* =================== TRENDS & SHOP FEATURES =================== */
const XT5 = {
  search: { fr: 'Rechercher', en: 'Search', es: 'Buscar', ar: 'بحث' },
  search_ph: { fr: 'Kage, zip, acid wash, broderie…', en: 'Kage, zip, acid wash, embroidery…', es: 'Kage, cremallera, acid wash, bordado…', ar: 'Kage، سحّاب، غسيل حمضي، تطريز…' },
  search_none: { fr: 'Aucun résultat. Essaie « zip », « puff » ou « avoine ».', en: 'No results. Try “zip”, “puff” or “oatmeal”.', es: 'Sin resultados. Prueba «cremallera», «puff» o «avena».', ar: 'لا نتائج. جرّب «سحّاب» أو «بارزة» أو «شوفاني».' },
  wish: { fr: 'Favoris', en: 'Wishlist', es: 'Favoritos', ar: 'المفضلة' },
  wish_add: { fr: 'Ajouter aux favoris', en: 'Add to wishlist', es: 'Añadir a favoritos', ar: 'أضف إلى المفضلة' },
  wish_rm: { fr: 'Retirer des favoris', en: 'Remove from wishlist', es: 'Quitar de favoritos', ar: 'إزالة من المفضلة' },
  wish_added: { fr: 'Ajouté aux favoris', en: 'Added to your wishlist', es: 'Añadido a favoritos', ar: 'أضيف إلى المفضلة' },
  wish_removed: { fr: 'Retiré des favoris', en: 'Removed from your wishlist', es: 'Quitado de favoritos', ar: 'أزيل من المفضلة' },
  wish_empty: { fr: 'Aucun favori pour l’instant. Touche le cœur d’un sweat pour le garder ici.', en: 'No favourites yet. Tap the heart on a hoodie to keep it here.', es: 'Aún no tienes favoritos. Toca el corazón de una sudadera para guardarla aquí.', ar: 'لا توجد مفضلات بعد. اضغط على القلب في أي هودي لحفظه هنا.' },
  fit: { fr: 'Coupe', en: 'Fit', es: 'Corte', ar: 'القصّة' },
  tech: { fr: 'Finition', en: 'Finish', es: 'Acabado', ar: 'التشطيب' },
  fit_oversized: { fr: 'Oversize', en: 'Oversized', es: 'Oversize', ar: 'واسعة' },
  fit_boxy: { fr: 'Boxy', en: 'Boxy', es: 'Boxy', ar: 'بوكسي' },
  tech_embroidery: { fr: 'Broderie', en: 'Embroidery', es: 'Bordado', ar: 'تطريز' },
  tech_puff: { fr: 'Puff 3D', en: '3D puff', es: 'Puff 3D', ar: 'طباعة بارزة' },
  tech_acid: { fr: 'Acid wash', en: 'Acid wash', es: 'Acid wash', ar: 'غسيل حمضي' },
  tech_dyed: { fr: 'Vintage teint', en: 'Garment-dyed', es: 'Teñido vintage', ar: 'مصبوغ فينتاج' },
  tech_zip: { fr: 'Zippé', en: 'Full zip', es: 'Cremallera', ar: 'بسحّاب' },
  tech_print: { fr: 'Impression', en: 'Print', es: 'Estampado', ar: 'طباعة' },
  b_trend: { fr: 'Tendance 2026', en: 'Trending 2026', es: 'Tendencia 2026', ar: 'رائج 2026' },
  trends_k: { fr: 'Ce qui se porte en 2026', en: 'What people wear in 2026', es: 'Lo que se lleva en 2026', ar: 'ما يُلبس في 2026' },
  trends_t: { fr: 'Les tendances de la saison', en: 'The trends of the season', es: 'Las tendencias de la temporada', ar: 'صيحات الموسم' },
  trends_d: { fr: 'Coupes oversize et boxy, zips, acid wash, relief puff 3D et tons neutres : les styles les plus demandés cette saison, dessinés à la façon ONI.', en: 'Oversized and boxy cuts, zips, acid wash, 3D puff and neutral tones: the most wanted styles this season, drawn the ONI way.', es: 'Cortes oversize y boxy, cremalleras, acid wash, relieve puff 3D y tonos neutros: los estilos más buscados de la temporada, a la manera ONI.', ar: 'قصّات واسعة وبوكسي، سحّابات، غسيل حمضي، طباعة بارزة وألوان محايدة: أكثر الأنماط طلبًا هذا الموسم بأسلوب ONI.' },
  deliv: { fr: 'Livraison estimée entre le {a} et le {b}', en: 'Estimated delivery {a} – {b}', es: 'Entrega estimada entre el {a} y el {b}', ar: 'التوصيل المتوقع بين {a} و{b}' },
  recent: { fr: 'Vus récemment', en: 'Recently viewed', es: 'Vistos recientemente', ar: 'شوهدت مؤخرًا' },
  look: { fr: 'Complète le look', en: 'Complete the look', es: 'Completa el look', ar: 'أكمل الإطلالة' },
  notify_t: { fr: 'Taille {s} épuisée', en: 'Size {s} sold out', es: 'Talla {s} agotada', ar: 'المقاس {s} نفد' },
  notify_p: { fr: 'Laisse ton e-mail : on te prévient dès son retour.', en: 'Leave your email and we’ll let you know when it’s back.', es: 'Déjanos tu email y te avisamos cuando vuelva.', ar: 'اترك بريدك وسنخبرك عند توفره.' },
  notify_btn: { fr: 'Me prévenir', en: 'Notify me', es: 'Avisarme', ar: 'أعلمني' },
  notify_ok: { fr: 'C’est noté ! On te prévient dès le retour de la taille {s}.', en: 'Done! We’ll let you know when size {s} is back.', es: '¡Hecho! Te avisamos cuando vuelva la talla {s}.', ar: 'تم! سنخبرك عند عودة المقاس {s}.' },
  ff_t: { fr: 'Trouve ta taille', en: 'Find your size', es: 'Encuentra tu talla', ar: 'اعثر على مقاسك' },
  ff_h: { fr: 'Taille (cm)', en: 'Height (cm)', es: 'Altura (cm)', ar: 'الطول (سم)' },
  ff_w: { fr: 'Poids (kg)', en: 'Weight (kg)', es: 'Peso (kg)', ar: 'الوزن (كغ)' },
  ff_pref: { fr: 'Je préfère', en: 'I prefer', es: 'Prefiero', ar: 'أفضّل' },
  ff_loose: { fr: 'Ample (oversize)', en: 'Loose (oversized)', es: 'Holgado (oversize)', ar: 'فضفاضة' },
  ff_reg: { fr: 'Plus ajusté', en: 'Closer fit', es: 'Más ajustado', ar: 'أكثر ضبطًا' },
  ff_go: { fr: 'Calculer ma taille', en: 'Find my size', es: 'Calcular mi talla', ar: 'احسب مقاسي' },
  ff_res: { fr: 'Ta taille conseillée : {s}', en: 'Your recommended size: {s}', es: 'Tu talla recomendada: {s}', ar: 'مقاسك المقترح: {s}' },
  ff_note: { fr: 'Estimation indicative basée sur nos mesures. Elle a été sélectionnée pour toi.', en: 'Indicative estimate based on our measurements. It has been selected for you.', es: 'Estimación orientativa según nuestras medidas. La hemos seleccionado para ti.', ar: 'تقدير تقريبي بناءً على قياساتنا. تم اختياره لك.' },
  ff_bad: { fr: 'Indique une taille (140–215 cm) et un poids (40–170 kg).', en: 'Enter a height (140–215 cm) and a weight (40–170 kg).', es: 'Indica una altura (140–215 cm) y un peso (40–170 kg).', ar: 'أدخل طولًا (140–215 سم) ووزنًا (40–170 كغ).' },
  drop_in: { fr: 'Arc II — prochain drop dans', en: 'Arc II — next drop in', es: 'Arc II — próximo drop en', ar: 'Arc II — الإصدار القادم بعد' },
  drop_live: { fr: 'disponible maintenant', en: 'available now', es: 'disponible ahora', ar: 'متوفر الآن' },
  u_d: { fr: 'j', en: 'd', es: 'd', ar: 'ي' }, u_h: { fr: 'h', en: 'h', es: 'h', ar: 'س' }, u_m: { fr: 'min', en: 'm', es: 'min', ar: 'د' }, u_s: { fr: 's', en: 's', es: 's', ar: 'ث' },
};
for (const k in XT5) for (const l of LANGS) T[l][k] = XT5[k][l];

const FITS = ['oversized', 'boxy'];
const TECHS = ['embroidery', 'puff', 'acid', 'dyed', 'zip', 'print'];
const NEXT_DROP = '2026-12-12T18:00:00+01:00'; // TODO: set the real date of the next drop
const ICON_HEART = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.5s-7.4-4.5-9.5-9C1 8.2 3.1 4.6 6.7 4.6c2.2 0 3.6 1.2 4.5 2.6h1.6c.9-1.4 2.3-2.6 4.5-2.6 3.6 0 5.7 3.6 4.2 6.9-2.1 4.5-9.5 9-9.5 9z"/></svg>';

const wishes = () => store.get('wish', []).filter((id) => byId(id));
const isWish = (id) => wishes().includes(id);
function toggleWish(id) { const w = wishes(), i = w.indexOf(id); if (i < 0) w.unshift(id); else w.splice(i, 1); store.set('wish', w); }
function refreshWish() { const c = $('.wish-count'); if (!c) return; const n = wishes().length; c.textContent = n; c.hidden = !n; }
function pushRecent(id) { const r = store.get('recent', []).filter((x) => x !== id && byId(x)); r.unshift(id); store.set('recent', r.slice(0, 8)); }
const recentFor = (id) => store.get('recent', []).filter((x) => x !== id).map(byId).filter(Boolean).slice(0, 4);
function lookFor(p) {
  const score = (x) => (x.type !== p.type ? 3 : 0) + (x.col !== p.col ? 2 : 0) + (x.tech.some((k) => !p.tech.includes(k)) ? 1 : 0) + (x.badges.includes('trend') ? 1 : 0);
  return PRODUCTS.filter((x) => x.id !== p.id).sort((a, b) => score(b) - score(a) || b.date - a.date).slice(0, 4);
}
const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
function searchResults(q) {
  const words = norm(q).split(/\s+/).filter(Boolean);
  const hay = (p) => norm([p.name, t('col_' + p.col), t('type_' + p.type), p.fit ? t('fit_' + p.fit) : '', ...p.tech.map((k) => t('tech_' + k)), p.desc[lang], ...p.colors.map((c) => COLORS[c].name[lang])].join(' '));
  const list = (words.length ? PRODUCTS.filter((p) => { const h = hay(p); return words.every((w) => h.includes(w)); }) : [...PRODUCTS].sort((a, b) => b.date - a.date)).slice(0, 8);
  if (!list.length) return `<p class="muted">${t('search_none')}</p>`;
  return list.map((p) => `<a class="sr-item" href="#/p/${p.id}">${photo(p, 'front', 'mini-photo')}<span><b>${esc(p.name)}</b><small>${t('col_' + p.col)} · ${t('tech_' + p.tech[0])} · ${fmt(p.price)}</small></span></a>`).join('');
}
const searchUI = () => `<h3>${t('search')}</h3><input type="search" class="search-in" data-act="search-q" placeholder="${t('search_ph')}" aria-label="${t('search')}" autocomplete="off"><div class="search-res" id="search-res">${searchResults('')}</div>`;
function addBusinessDays(d, n) { const x = new Date(d); while (n > 0) { x.setDate(x.getDate() + 1); const w = x.getDay(); if (w !== 0 && w !== 6) n--; } return x; }
function deliveryText() {
  const f = new Intl.DateTimeFormat(LOCALE[lang], { weekday: 'short', day: 'numeric', month: 'short' }), now = new Date();
  return t('deliv', { a: f.format(addBusinessDays(now, 2)), b: f.format(addBusinessDays(now, 4)) });
}
function fitFinder() {
  return `<form class="ff" data-form="ff" novalidate><p class="ff-t">${t('ff_t')}</p><div class="ff-grid">
    <label>${t('ff_h')}<input type="number" name="h" min="140" max="215" inputmode="numeric" placeholder="175"></label>
    <label>${t('ff_w')}<input type="number" name="w" min="40" max="170" inputmode="numeric" placeholder="70"></label>
    <label>${t('ff_pref')}<select name="pref" class="input"><option value="loose">${t('ff_loose')}</option><option value="close">${t('ff_reg')}</option></select></label>
  </div><button class="btn btn-red btn-block">${t('ff_go')}</button><div id="ff-res" class="ff-res" aria-live="polite"></div></form>`;
}
function recommendSize(h, w, pref) {
  let i = h < 160 ? 0 : h < 170 ? 1 : h < 178 ? 2 : h < 186 ? 3 : h < 193 ? 4 : 5;
  const bmi = w / Math.pow(h / 100, 2);
  if (bmi > 27) i++; if (bmi < 19) i--; if (pref === 'close') i--;
  return SIZES[Math.max(0, Math.min(SIZES.length - 1, i))];
}
function tickCountdown() {
  const els = $$('.countdown'); if (!els.length) return;
  const diff = new Date(NEXT_DROP) - Date.now();
  els.forEach((el) => {
    const cd = $('.cd', el); if (!cd) return;
    if (diff <= 0) { cd.textContent = t('drop_live'); return; }
    const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    const p2 = (n) => String(n).padStart(2, '0');
    cd.textContent = `${d}${t('u_d')} ${p2(h)}${t('u_h')} ${p2(m)}${t('u_m')} ${p2(s)}${t('u_s')}`;
  });
}
function wishlistPage() {
  const list = wishes().map(byId).filter(Boolean);
  return `<div class="page"><section class="wrap page-head"><p class="kicker">RWAFA</p><h1 class="h-manga">${t('wish')}</h1></section>
    <section class="wrap" style="padding-top:8px">${list.length ? `<div class="grid grid-4">${list.map(card).join('')}</div>`
      : `<div class="empty-state"><span class="empty-ico" aria-hidden="true">${ICON_HEART}</span><p class="lead" style="margin:0 auto 24px">${t('wish_empty')}</p><a class="btn btn-red" href="#/shop">${t('cta_collection')}</a></div>`}</section></div>`;
}

const XT6 = {
  type: { fr: 'Catégorie', en: 'Category', es: 'Categoría', ar: 'الفئة' },
  type_hoodie: { fr: 'Hoodies & sweats', en: 'Hoodies & sweats', es: 'Sudaderas', ar: 'هوديز وسترات' },
  type_socks: { fr: 'Chaussettes', en: 'Socks', es: 'Calcetines', ar: 'جوارب' },
  type_shoes: { fr: 'Sneakers', en: 'Sneakers', es: 'Zapatillas', ar: 'أحذية رياضية' },
  tech_knit: { fr: 'Jacquard tricoté', en: 'Knitted jacquard', es: 'Jacquard tejido', ar: 'جاكار منسوج' },
  tech_painted: { fr: 'Peint à la main', en: 'Hand-painted', es: 'Pintado a mano', ar: 'مرسوم يدويًا' },
  tech_canvas: { fr: 'Toile', en: 'Canvas', es: 'Lona', ar: 'قماش كانفاس' },
  results: { fr: '{n} article(s)', en: '{n} item(s)', es: '{n} artículo(s)', ar: '{n} منتج' },
  no_results: { fr: 'Aucun article ne correspond. Essaie d’autres filtres.', en: 'No item matches. Try other filters.', es: 'Ningún artículo coincide. Prueba otros filtros.', ar: 'لا توجد نتائج. جرّب فلاتر أخرى.' },
  desc_more_socks: { fr: 'Coton peigné 80 %, polyamide 18 %, élasthanne 2 %. Hauteur mi-mollet, bord-côte confort.', en: '80% combed cotton, 18% polyamide, 2% elastane. Mid-calf height, comfort rib.', es: '80 % algodón peinado, 18 % poliamida, 2 % elastano. Altura media pierna, puño cómodo.', ar: '80٪ قطن ممشط و18٪ بولياميد و2٪ إيلاستان. طول حتى منتصف الساق.' },
  desc_more_shoes: { fr: 'Toile de coton épaisse, semelle caoutchouc vulcanisée, semelle intérieure amovible rembourrée.', en: 'Heavy cotton canvas, vulcanised rubber sole, padded removable insole.', es: 'Lona de algodón gruesa, suela de caucho vulcanizado, plantilla acolchada extraíble.', ar: 'قماش قطني سميك ونعل مطاطي مُفلكن ونعل داخلي مبطن قابل للإزالة.' },
  material_socks: { fr: 'Lavage à 30 °C sur l’envers avec des couleurs proches. Pas de sèche-linge pour garder le jacquard net.', en: 'Wash at 30 °C inside out with similar colours. No tumble dryer to keep the jacquard sharp.', es: 'Lavar a 30 °C del revés con colores similares. Sin secadora para mantener el jacquard nítido.', ar: 'غسيل على 30° على الوجه المقلوب مع ألوان متقاربة. بدون مجفف للحفاظ على الجاكار.' },
  material_shoes: { fr: 'Nettoyage à la main avec un chiffon humide et un savon doux. Pas de machine à laver : la peinture est faite à la main.', en: 'Hand clean with a damp cloth and mild soap. No washing machine: the paint is applied by hand.', es: 'Limpiar a mano con un paño húmedo y jabón suave. Sin lavadora: la pintura es a mano.', ar: 'تنظيف يدوي بقطعة قماش مبللة وصابون لطيف. لا تُغسل في الغسالة لأن الرسم يدوي.' },
  sg_socks: { fr: 'Choisis selon ta pointure habituelle.', en: 'Pick according to your usual shoe size.', es: 'Elige según tu número de calzado habitual.', ar: 'اختر حسب مقاس حذائك المعتاد.' },
  sg_shoes: { fr: 'Coupe standard : prends ta pointure habituelle. Entre deux tailles, prends la plus grande.', en: 'True to size: take your usual size. Between two sizes, take the larger.', es: 'Talla normal: elige tu número habitual. Entre dos tallas, la mayor.', ar: 'مقاس طبيعي: اختر مقاسك المعتاد، وبين مقاسين اختر الأكبر.' },
  shoe_eu: { fr: 'Pointure EU', en: 'EU size', es: 'Talla EU', ar: 'مقاس EU' },
  foot_cm: { fr: 'Longueur du pied', en: 'Foot length', es: 'Longitud del pie', ar: 'طول القدم' },
  v_pair: { fr: 'Paire', en: 'Pair', es: 'Par', ar: 'الزوج' },
  v_detail: { fr: 'Détail', en: 'Detail', es: 'Detalle', ar: 'تفاصيل' },
  v_side: { fr: 'Profil', en: 'Side', es: 'Perfil', ar: 'جانبي' },
  v_back3: { fr: 'Vue 3/4', en: '3/4 view', es: 'Vista 3/4', ar: 'زاوية 3/4' },
  acc_k: { fr: 'Nouveau chez ONI', en: 'New at ONI', es: 'Nuevo en ONI', ar: 'جديد في ONI' },
  acc_t: { fr: 'Chaussettes & sneakers', en: 'Socks & sneakers', es: 'Calcetines y zapatillas', ar: 'جوارب وأحذية' },
  acc_d: { fr: 'Les mêmes univers que nos hoodies, de la tête aux pieds : oni, kitsune, sakura et Tokyo la nuit.', en: 'The same worlds as our hoodies, head to toe: oni, kitsune, sakura and Tokyo at night.', es: 'Los mismos universos que nuestras sudaderas, de la cabeza a los pies: oni, kitsune, sakura y Tokio de noche.', ar: 'نفس عوالم هوديزنا من الرأس إلى القدمين: أوني، كيتسوني، ساكورا وطوكيو ليلًا.' },
};
for (const k in XT6) for (const l of LANGS) T[l][k] = XT6[k][l];
const XT7 = {
  hp_aria: { fr: 'Le défilé ONI : nos produits', en: 'The ONI parade: our products', es: 'El desfile ONI: nuestros productos', ar: 'موكب ONI: منتجاتنا' },
  hp_sub: { fr: 'Hoodies, sneakers et chaussettes aux motifs d’oni, de kitsune et de sakura. Coton épais, petites séries, designs originaux.', en: 'Hoodies, sneakers and socks with oni, kitsune and sakura motifs. Heavy cotton, small runs, original designs.', es: 'Sudaderas, zapatillas y calcetines con motivos de oni, kitsune y sakura. Algodón grueso, series cortas, diseños originales.', ar: 'هوديز وأحذية وجوارب بزخارف الأوني والكيتسوني والساكورا. قطن سميك، دفعات صغيرة، تصاميم أصلية.' },
  hp_cta1: { fr: 'Voir la collection', en: 'Shop the collection', es: 'Ver la colección', ar: 'تسوّق المجموعة' },
  hp_cta2: { fr: 'Sneakers et chaussettes', en: 'Sneakers and socks', es: 'Zapatillas y calcetines', ar: 'أحذية وجوارب' },
  hp_now: { fr: 'Dans le défilé', en: 'In the parade', es: 'En el desfile', ar: 'في الموكب' },
};
for (const k in XT7) for (const l of LANGS) T[l][k] = XT7[k][l];
// ---- RWAFA texts (override the ONI copy)
const XR = {
  brand_sub: { fr: 'Streetwear du Rif', en: 'Rif streetwear', es: 'Streetwear del Rif', ar: 'ملابس الريف' },
  nav_arc2: { fr: 'Nador', en: 'Nador', es: 'Nador', ar: 'الناظور' },
  hero_l1: { fr: 'Le Rif,', en: 'The Rif,', es: 'El Rif,', ar: 'الريف،' },
  hero_l2: { fr: 'porté avec fierté.', en: 'worn with pride.', es: 'llevado con orgullo.', ar: 'نلبسه بفخر.' },
  hero_k: { fr: 'Collection Arrif, hiver 2026', en: 'Arrif collection, winter 2026', es: 'Colección Arrif, invierno 2026', ar: 'مجموعة أريف، شتاء 2026' },
  hero_p: { fr: 'Des hoodies, t-shirts et chaussettes qui portent la culture amazighe du Rif : le ⵣ, les tapis, les montagnes, Nador et la mer.', en: 'Hoodies, tees and socks that carry the Amazigh culture of the Rif: the ⵣ, the rugs, the mountains, Nador and the sea.', es: 'Sudaderas, camisetas y calcetines que llevan la cultura amazigh del Rif: el ⵣ, las alfombras, las montañas, Nador y el mar.', ar: 'هوديز وتيشيرتات وجوارب تحمل الثقافة الأمازيغية للريف: ⵣ والزرابي والجبال والناظور والبحر.' },
  hp_aria: { fr: 'Le défilé RWAFA : nos produits', en: 'The RWAFA parade: our products', es: 'El desfile RWAFA: nuestros productos', ar: 'موكب RWAFA: منتجاتنا' },
  hp_sub: { fr: 'Hoodies, t-shirts et chaussettes aux motifs amazighs : le ⵣ, les tapis du Rif, Nador et Al Hoceima. Coton épais, designs originaux.', en: 'Hoodies, tees and socks with Amazigh motifs: the ⵣ, Rif rugs, Nador and Al Hoceima. Heavy cotton, original designs.', es: 'Sudaderas, camisetas y calcetines con motivos amazigh: el ⵣ, las alfombras del Rif, Nador y Alhucemas. Algodón grueso, diseños originales.', ar: 'هوديز وتيشيرتات وجوارب بزخارف أمازيغية: ⵣ وزرابي الريف والناظور والحسيمة. قطن سميك وتصاميم أصلية.' },
  hp_cta2: { fr: 'T-shirts et chaussettes', en: 'Tees and socks', es: 'Camisetas y calcetines', ar: 'تيشيرتات وجوارب' },
  footer_tag: { fr: 'Streetwear premium inspiré du Rif et de la culture amazighe.', en: 'Premium streetwear inspired by the Rif and Amazigh culture.', es: 'Streetwear premium inspirado en el Rif y la cultura amazigh.', ar: 'ملابس شارع فاخرة مستوحاة من الريف والثقافة الأمازيغية.' },
  col_arc1: { fr: 'Arrif', en: 'Arrif', es: 'Arrif', ar: 'أريف' },
  col_arc2: { fr: 'Nador et la mer', en: 'Nador and the sea', es: 'Nador y el mar', ar: 'الناظور والبحر' },
  col_ess: { fr: 'Essentiels', en: 'Essentials', es: 'Esenciales', ar: 'الأساسيات' },
  col_arc1_d: { fr: 'Le ⵣ, les tapis et les montagnes du Rif.', en: 'The ⵣ, the rugs and the mountains of the Rif.', es: 'El ⵣ, las alfombras y las montañas del Rif.', ar: 'ⵣ والزرابي وجبال الريف.' },
  col_arc2_d: { fr: 'La lagune de Marchica, la baie d’Al Hoceima, la Méditerranée.', en: 'The Marchica lagoon, the bay of Al Hoceima, the Mediterranean.', es: 'La laguna de Marchica, la bahía de Alhucemas, el Mediterráneo.', ar: 'بحيرة مارتشيكا وخليج الحسيمة والبحر المتوسط.' },
  col_ess_d: { fr: 'Le logo RWAFA et le ⵣ, pour tous les jours.', en: 'The RWAFA logo and the ⵣ, for every day.', es: 'El logo RWAFA y el ⵣ, para cada día.', ar: 'شعار RWAFA وⵣ لكل يوم.' },
  spot_kicker: { fr: 'Pièce phare', en: 'Signature piece', es: 'Pieza estrella', ar: 'القطعة الأيقونية' },
  spot_txt: { fr: 'Le ⵣ brodé en chenille ton sur ton devant, « ARRIF » en relief au dos, coton 450 g. La pièce qui ouvre la collection.', en: 'The ⵣ in tone-on-tone chenille on the front, “ARRIF” raised on the back, 450 gsm cotton. The piece that opens the collection.', es: 'El ⵣ en chenilla tono sobre tono delante, «ARRIF» en relieve detrás, algodón de 450 g. La pieza que abre la colección.', ar: 'ⵣ بالشنيل في الأمام و«ARRIF» بارزة على الظهر، قطن 450 غ. القطعة التي تفتتح المجموعة.' },
  manifesto: { fr: 'Chaque pièce raconte un bout du Rif.', en: 'Every piece tells a piece of the Rif.', es: 'Cada prenda cuenta un trozo del Rif.', ar: 'كل قطعة تحكي جزءًا من الريف.' },
  about_title: { fr: 'L’histoire RWAFA', en: 'The RWAFA story', es: 'La historia RWAFA', ar: 'حكاية RWAFA' },
  about_p1: { fr: 'RWAFA est née entre Nador et l’Europe, chez ceux qui portent le Rif partout avec eux : la langue, la mer, les montagnes et les motifs des tapis de nos grands-mères.', en: 'RWAFA was born between Nador and Europe, among people who carry the Rif everywhere: the language, the sea, the mountains and the patterns of our grandmothers’ rugs.', es: 'RWAFA nació entre Nador y Europa, entre quienes llevan el Rif a todas partes: la lengua, el mar, las montañas y los motivos de las alfombras de nuestras abuelas.', ar: 'وُلدت RWAFA بين الناظور وأوروبا، عند من يحملون الريف معهم أينما ذهبوا: اللغة والبحر والجبال ونقوش زرابي جدّاتنا.' },
  about_p2: { fr: 'Chaque design est dessiné pour la marque, à partir de la culture amazighe : le ⵣ, les losanges, les paysages. Pas de copie, pas de symbole politique.', en: 'Every design is drawn for the brand from Amazigh culture: the ⵣ, the diamonds, the landscapes. No copies, no political symbols.', es: 'Cada diseño se dibuja para la marca a partir de la cultura amazigh: el ⵣ, los rombos, los paisajes. Sin copias ni símbolos políticos.', ar: 'كل تصميم يُرسم للعلامة انطلاقًا من الثقافة الأمازيغية: ⵣ والمعيّنات والمناظر. بلا نسخ وبلا رموز سياسية.' },
  about_p3: { fr: 'Coton épais, broderies soignées, petites séries. Des vêtements qu’on porte longtemps, et avec fierté.', en: 'Heavy cotton, careful embroidery, small runs. Clothes you wear for a long time, and with pride.', es: 'Algodón grueso, bordados cuidados, series cortas. Ropa que se lleva mucho tiempo, y con orgullo.', ar: 'قطن سميك وتطريز متقن ودفعات صغيرة. ملابس نلبسها طويلًا وبفخر.' },
  faq: { fr: [['Les designs sont-ils originaux ?', 'Oui. Chaque design est créé pour RWAFA à partir de la culture amazighe du Rif.'], ['Comment taillent les hoodies ?', 'Coupe oversize. Prends ta taille habituelle ; le guide des tailles est sur chaque fiche produit.'], ['Livrez-vous au Maroc et en Europe ?', 'Oui, avec suivi. Les délais sont indiqués au moment de la commande.'], ['Puis-je retourner un article ?', 'Oui, sous 14 jours après réception, s’il n’a pas été porté.']],
    en: [['Are the designs original?', 'Yes. Every design is created for RWAFA from the Amazigh culture of the Rif.'], ['How do the hoodies fit?', 'Oversized. Take your usual size; the size guide is on every product page.'], ['Do you ship to Morocco and Europe?', 'Yes, with tracking. Delivery times are shown at checkout.'], ['Can I return an item?', 'Yes, within 14 days of delivery, if it has not been worn.']],
    es: [['¿Los diseños son originales?', 'Sí. Cada diseño se crea para RWAFA a partir de la cultura amazigh del Rif.'], ['¿Cómo tallan las sudaderas?', 'Corte oversize. Elige tu talla habitual; la guía de tallas está en cada ficha.'], ['¿Enviáis a Marruecos y Europa?', 'Sí, con seguimiento. Los plazos se indican al pedir.'], ['¿Puedo devolver un artículo?', 'Sí, en los 14 días siguientes a la entrega, si no se ha usado.']],
    ar: [['هل التصاميم أصلية؟', 'نعم. كل تصميم يُنجز لـ RWAFA انطلاقًا من الثقافة الأمازيغية للريف.'], ['ما هو مقاس الهوديز؟', 'قصّة واسعة. اختر مقاسك المعتاد، ودليل المقاسات في كل صفحة منتج.'], ['هل توصلون إلى المغرب وأوروبا؟', 'نعم، مع التتبع. مدة التوصيل تظهر عند الطلب.'], ['هل يمكنني إرجاع منتج؟', 'نعم، خلال 14 يومًا من الاستلام إذا لم يُلبس.']] },
  nl_title: { fr: 'Rejoins la famille RWAFA', en: 'Join the RWAFA family', es: 'Únete a la familia RWAFA', ar: 'انضم إلى عائلة RWAFA' },
  nl_txt: { fr: 'Les nouveaux designs en avant-première et -10 % sur ta première commande.', en: 'New designs first and 10% off your first order.', es: 'Los nuevos diseños en primicia y -10 % en tu primer pedido.', ar: 'التصاميم الجديدة أولًا وخصم 10٪ على طلبك الأول.' },
  search_ph: { fr: 'Yaz, Nador, tapis, chaussettes…', en: 'Yaz, Nador, rug, socks…', es: 'Yaz, Nador, alfombra, calcetines…', ar: 'ياز، الناظور، زربية، جوارب…' },
  trends_k: { fr: 'Les plus demandés', en: 'Most wanted', es: 'Los más pedidos', ar: 'الأكثر طلبًا' },
  trends_t: { fr: 'Ce que le Rif porte cet hiver', en: 'What the Rif wears this winter', es: 'Lo que lleva el Rif este invierno', ar: 'ما يلبسه الريف هذا الشتاء' },
  trends_d: { fr: 'Coupes oversize, broderies ⵣ, motifs de tapis et bleus délavés.', en: 'Oversized cuts, ⵣ embroidery, rug patterns and washed blues.', es: 'Cortes oversize, bordados ⵣ, motivos de alfombra y azules lavados.', ar: 'قصّات واسعة وتطريز ⵣ ونقوش الزرابي والأزرق الباهت.' },
  drop_in: { fr: 'Prochain drop dans', en: 'Next drop in', es: 'Próximo drop en', ar: 'الإصدار القادم بعد' },
  acc_k: { fr: 'Aussi chez RWAFA', en: 'Also at RWAFA', es: 'También en RWAFA', ar: 'أيضًا في RWAFA' },
  acc_t: { fr: 'T-shirts et chaussettes', en: 'Tees and socks', es: 'Camisetas y calcetines', ar: 'تيشيرتات وجوارب' },
  acc_d: { fr: 'Les mêmes motifs, de la tête aux pieds.', en: 'The same motifs, head to toe.', es: 'Los mismos motivos, de la cabeza a los pies.', ar: 'نفس الزخارف من الرأس إلى القدمين.' },
  type_tee: { fr: 'T-shirts', en: 'Tees', es: 'Camisetas', ar: 'تيشيرتات' },
  no_reviews: { fr: 'Pas encore d’avis sur ce produit. Sois le premier à donner le tien après ta commande.', en: 'No reviews yet. Be the first to share yours after your order.', es: 'Todavía no hay opiniones. Sé el primero en dar la tuya tras tu pedido.', ar: 'لا توجد آراء بعد. كن أول من يشارك رأيه بعد طلبك.' },
};
for (const k in XR) for (const l of LANGS) T[l][k] = XR[k][l];
function viewLabel(p, v) {
  if (p.type === 'socks') return t(v === 'front' ? 'v_pair' : 'v_detail');
  if (p.type === 'shoes') return t(v === 'front' ? 'v_side' : 'v_back3');
  return t(v);
}

/* =================== PAGES =================== */
function home() {
  const kage = byId('yaz-hoodie');
  const news = [...PRODUCTS].sort((a, b) => b.date - a.date).slice(0, 4);
  return `<section class="hero3d" aria-label="${t('hp_aria')}">
      <div class="hero3d-canvas" id="hero-scene"><div class="scene-fallback" aria-hidden="true"></div></div>
      <div class="hero-copy">
        <h1 class="hero-h">${t('hero_l1')} ${t('hero_l2')}</h1>
        <p class="hero-sub">${t('hp_sub')}</p>
        <div class="hero-cta"><a class="btn btn-red" href="#/shop">${t('hp_cta1')}</a><a class="btn btn-line" href="#/shop/tee">${t('hp_cta2')}</a></div>
      </div>
      <a class="hero-now" id="hero-now" href="#/shop" hidden><span>${t('hp_now')}</span><b></b><span class="hero-now-p"></span></a>
    </section>
    <section class="wrap trends">
      <div class="row-head"><div><p class="kicker">${t('trends_k')}</p><h2 class="sec-title">${t('trends_t')}</h2></div><a href="#/shop" class="link-arrow">${t('see_all')} →</a></div>
      <p class="lead">${t('trends_d')}</p>
      <div class="grid grid-3">${PRODUCTS.filter((p) => p.badges.includes('trend')).sort((a, b) => b.date - a.date).slice(0, 6).map(card).join('')}</div>
    </section>
    <section class="wrap accs">
      <div class="row-head"><div><p class="kicker">${t('acc_k')}</p><h2 class="sec-title">${t('acc_t')}</h2></div><span class="acc-links"><a href="#/shop/tee" class="link-arrow">${t('type_tee')} →</a> <a href="#/shop/socks" class="link-arrow">${t('type_socks')} →</a></span></div>
      <p class="lead">${t('acc_d')}</p>
      <div class="grid grid-4">${PRODUCTS.filter((p) => p.type === 'tee').concat(PRODUCTS.filter((p) => p.type === 'socks')).map(card).join('')}</div>
    </section>
    <section class="wrap">
      <div class="row-head"><h2 class="sec-title">${t('new_arrivals')}</h2><a href="#/shop" class="link-arrow">${t('see_all')} →</a></div>
      <div class="grid grid-4">${news.map(card).join('')}</div>
    </section>
    <section class="wrap">
      <h2 class="sec-title">${t('collections')}</h2>
      <div class="tiles">${['arc1', 'arc2', 'ess'].map((k, i) => `<a class="tile" href="#/shop/${k}">${frame(`images/collection-${k}.jpg`, t('col_' + k), 'tile-photo')}<h3>${t('col_' + k)}</h3><p>${t('col_' + k + '_d')}</p><span class="link-arrow">${t('explore')} →</span></a>`).join('')}</div>
    </section>
    <section class="wrap">
      <div class="spot">
        <a href="#/p/${kage.id}" class="spot-link" aria-label="${kage.name}">${photo(kage, 'back', 'spot-photo')}</a>
        <div class="spot-copy">${badges(kage).replace('class="badges"', 'class="badges static"')}
          <p class="kicker">${t('spot_kicker')} · ${t('col_arc1')}</p>
          <h2 class="spot-title">${kage.name}</h2>
          <p class="lead">${t('spot_txt')}</p>
          <p class="price-xl">${fmt(kage.price)}</p>
          <a class="btn btn-red" href="#/p/${kage.id}">${t('explore')} →</a></div>
      </div>
    </section>
    <section class="wrap">
      <div class="row-head"><h2 class="sec-title">${t('faq_h')}</h2></div>
      <div class="faq-panels">${t('faq').map(([q, a], i) => `<div class="faq-row"><div class="faq-q"><b>${q}</b></div><p class="faq-a">${a}</p></div>`).join('')}</div>
    </section>
    <section class="wrap" id="next-drop">${newsletterBlock()}</section>`;
}

function shop(col) {
  const valid = ['arc1', 'arc2', 'ess'];
  F.type = TYPES.includes(col) ? col : '';
  col = valid.includes(col) ? col : '';
  F.col = col;
  const pool = PRODUCTS.filter((p) => !F.type || p.type === F.type);
  const cOpts = [...new Set(pool.flatMap((p) => p.colors))];
  const sOpts = F.type ? TYPE_SIZES[F.type] : SIZES;
  const tOpts = [...new Set(pool.flatMap((p) => p.tech))];
  return `<div class="page"><section class="wrap page-head">
      <p class="kicker">RWAFA</p>
      <h1 class="h-manga">${col ? t('col_' + col) : F.type ? t('type_' + F.type) : t('nav_shop')}</h1>
      ${col ? `<p class="lead">${t('col_' + col + '_d')}</p>` : ''}
      <nav class="chips" aria-label="${t('collection')}">${['', ...valid].map((k) => `<a class="chip ${k === col && !F.type ? 'on' : ''}" href="#/shop${k ? '/' + k : ''}">${k ? t('col_' + k) : t('all')}</a>`).join('')}</nav>
      <nav class="chips chips-type" aria-label="${t('type')}">${TYPES.map((k) => `<a class="chip ${F.type === k ? 'on' : ''}" href="#/shop/${k}">${t('type_' + k)}</a>`).join('')}</nav>
    </section>
    <section class="wrap shop">
      <details class="filters box" ${innerWidth > 900 ? 'open' : ''}><summary>${t('filters')}</summary>
        <div class="f-group"><h4>${t('size')}</h4><div class="f-chips">${sOpts.map((s) => `<button class="fchip ${F.size.has(s) ? 'on' : ''}" data-act="f-size" data-v="${s}" aria-pressed="${F.size.has(s)}">${s}</button>`).join('')}</div></div>
        <div class="f-group"><h4>${t('color')}</h4><div class="f-chips">${cOpts.map((k) => `<button class="fsw ${F.color.has(k) ? 'on' : ''}" style="--c:${COLORS[k].hex}" data-act="f-color" data-v="${k}" aria-pressed="${F.color.has(k)}" title="${COLORS[k].name[lang]}"><span class="sr">${COLORS[k].name[lang]}</span></button>`).join('')}</div></div>
        ${F.type && F.type !== 'hoodie' ? '' : `<div class="f-group"><h4>${t('fit')}</h4><div class="f-chips">${FITS.map((f) => `<button class="fchip ${F.fit.has(f) ? 'on' : ''}" data-act="f-fit" data-v="${f}" aria-pressed="${F.fit.has(f)}">${t('fit_' + f)}</button>`).join('')}</div></div>`}
        <div class="f-group"><h4>${t('tech')}</h4><div class="f-chips">${tOpts.map((k) => `<button class="fchip ${F.tech.has(k) ? 'on' : ''}" data-act="f-tech" data-v="${k}" aria-pressed="${F.tech.has(k)}">${t('tech_' + k)}</button>`).join('')}</div></div>
        <div class="f-group"><h4>${t('price')}</h4><input type="range" min="${PRICE_MIN}" max="${PRICE_MAX}" step="1" value="${F.max}" data-act="f-max" aria-label="${t('price')}"><div class="range-val" id="maxv">${t('max_price', { x: fmt(F.max) })}</div></div>
        <div class="f-group"><button class="link" data-act="f-reset">${t('reset')}</button></div>
      </details>
      <div class="shop-main">
        <div class="shop-bar"><span id="count"></span><label class="sort"><span>${t('sort')}</span><select data-act="f-sort">${[['new', 'sort_new'], ['low', 'sort_low'], ['high', 'sort_high']].map(([v, k]) => `<option value="${v}" ${F.sort === v ? 'selected' : ''}>${t(k)}</option>`).join('')}</select></label></div>
        <div class="grid" id="grid"></div>
      </div>
    </section></div>`;
}
function updateGrid() {
  const grid = $('#grid'); if (!grid) return;
  let list = PRODUCTS.filter((p) => (!F.col || p.col === F.col)
    && (!F.type || p.type === F.type)
    && (!F.size.size || p.sizes.some((s) => F.size.has(s)))
    && (!F.color.size || p.colors.some((c) => F.color.has(c)))
    && (!F.fit.size || F.fit.has(p.fit))
    && (!F.tech.size || p.tech.some((k) => F.tech.has(k)))
    && p.price <= F.max);
  list.sort((a, b) => F.sort === 'low' ? a.price - b.price : F.sort === 'high' ? b.price - a.price : b.date - a.date);
  grid.innerHTML = list.length ? list.map(card).join('') : `<p class="empty-msg">${t('no_results')}</p>`;
  $('#count').textContent = t('results', { n: list.length });
}

function reviewsFor(p) {
  const h = [...p.id].reduce((a, ch) => a + ch.charCodeAt(0), 0);
  return store.get('rv_' + p.id, []);
}
function product(id) {
  const p = byId(id);
  if (!p) return notFound();
  if (PV.id !== id) { PV = { id, color: p.colors[0], size: null, view: 'front' }; pushRecent(id); }
  const rv = reviewsFor(p), avg = rv.length ? rv.reduce((a, r) => a + r.r, 0) / rv.length : 0;
  return `<div class="page"><div class="wrap crumbs"><a href="#/">${t('nav_home')}</a> / <a href="#/shop/${p.col}">${t('col_' + p.col)}</a> / <span>${esc(p.name)}</span></div>
  <section class="wrap pdp">
    <div class="gallery">
      <div class="main-shot zoomable" id="main-shot">${photo(p, PV.view, 'main-photo', true)}${badges(p)}</div>
      <div class="thumbs">${['front', 'back', 'sleeve'].map((v) => `<button class="thumb ${PV.view === v ? 'on' : ''}" data-act="view" data-v="${v}" aria-pressed="${PV.view === v}">${photo(p, v, 'thumb-photo')}<span>${viewLabel(p, v)}</span></button>`).join('')}</div>
    </div>
    <div class="info dk">
      <p class="kicker">${t('col_' + p.col)}</p>
      <h1 class="pdp-title">${esc(p.name)}</h1>
      ${rv.length ? `<div class="rating-row">${stars(avg)} <button class="link" data-act="to-reviews">${t('reviews_n', { n: rv.length })}</button></div>` : ''}
      <p class="pdp-price">${fmt(p.price)}</p>
      ${p.stock ? `<p class="stock-warn">${t('left', { n: p.stock })}</p>` : ''}
      <p class="pdp-desc">${p.desc[lang]}</p>
      <div class="tags">${p.fit ? `<span class="tag">${t('fit')} · ${t('fit_' + p.fit)}</span>` : `<span class="tag">${t('type_' + p.type)}</span>`}${p.tech.map((k) => `<span class="tag">${t('tech_' + k)}</span>`).join('')}</div>
      <div class="opt"><span class="opt-l">${t('color')} : <b>${COLORS[PV.color].name[lang]}</b></span>
        <div class="swatches">${p.colors.map((k) => `<button class="sw ${k === PV.color ? 'on' : ''}" style="--c:${COLORS[k].hex}" data-act="color" data-v="${k}" aria-pressed="${k === PV.color}" aria-label="${COLORS[k].name[lang]}" title="${COLORS[k].name[lang]}"></button>`).join('')}</div></div>
      <div class="opt"><div class="opt-row"><span class="opt-l">${t('size')}</span><button class="link" data-act="sizeguide">${t('size_guide')}</button></div>
        <div class="sizes" id="sizes">${sizesOf(p).map((s) => p.sizes.includes(s) ? `<button class="size ${PV.size === s ? 'on' : ''}" data-act="size" data-v="${s}" aria-pressed="${PV.size === s}">${s}</button>` : `<button class="size na" data-act="notify" data-v="${s}" aria-label="${t('notify_t', { s })}">${s}</button>`).join('')}</div></div>
      <div class="buy-row"><button class="btn btn-red btn-block" data-act="add">${t('add')} — ${fmt(p.price)}</button><button class="btn btn-line wish-big ${isWish(p.id) ? 'on' : ''}" data-act="wish" data-id="${p.id}" aria-pressed="${isWish(p.id)}" aria-label="${isWish(p.id) ? t('wish_rm') : t('wish_add')}">${ICON_HEART}</button></div>
      <p class="deliv">${ICON.truck}<span>${deliveryText()}</span></p>
      <ul class="perks"><li>${ICON.truck} ${t('perk_ship')}</li><li>${ICON.ret} ${t('perk_ret')}</li><li>${ICON.lock} ${t('perk_secure')}</li></ul>
      <div class="acc">
        <details open><summary>${t('desc')}</summary><p>${p.desc[lang]} ${t(p.type === 'hoodie' ? 'desc_more' : 'desc_more_' + p.type)}</p></details>
        <details><summary>${t('material')}</summary><p>${t(p.type === 'hoodie' ? 'material_txt' : 'material_' + p.type)}</p></details>
        <details><summary>${t('size_guide')}</summary>${sizeTable(p.type)}</details>
        <details><summary>${t('nav_shipping')}</summary><p>${t('ship_short')}</p></details>
      </div>
    </div>
  </section>
  <section class="wrap" id="reviews"><h2 class="h-manga">${t('reviews')}</h2>
    <div class="reviews-grid">
      <div>${rv.length ? `<div class="review-score"><b>${avg.toFixed(1)}</b>${stars(avg)} <span>${t('reviews_n', { n: rv.length })}</span></div>` : `<p class="muted">${t('no_reviews')}</p>`}
        <div class="review-list">${rv.map((r) => `<article class="review"><h4>${esc(r.n)} ${stars(r.r)}</h4><p>${esc(r.txt)}</p></article>`).join('')}</div></div>
      <form class="box" data-form="review" novalidate><h3>${t('write_review')}</h3>
        <div class="field"><label for="rv-n">${t('your_name')}</label><input id="rv-n" name="n" type="text" maxlength="40" required></div>
        <div class="field"><label for="rv-r">${t('rating')}</label><select id="rv-r" name="r" class="input">${[5, 4, 3, 2, 1].map((n) => `<option value="${n}">${'★'.repeat(n)}${'☆'.repeat(5 - n)}</option>`).join('')}</select></div>
        <div class="field"><label for="rv-t">${t('your_review')}</label><textarea id="rv-t" name="txt" maxlength="500" required></textarea></div>
        <button class="btn btn-ink btn-block">${t('submit')}</button>
      </form>
    </div>
  </section>
  <section class="wrap"><h2 class="h-manga">${t('look')}</h2><div class="grid grid-4">${lookFor(p).map(card).join('')}</div></section>
  ${recentFor(p.id).length ? `<section class="wrap"><h2 class="h-manga">${t('recent')}</h2><div class="grid grid-4">${recentFor(p.id).map(card).join('')}</div></section>` : ''}
  <div class="sticky-buy"><div><b>${esc(p.name)}</b><span>${fmt(p.price)}</span></div><button class="btn btn-red" data-act="add">${t('add')}</button></div></div>`;
}

function cartPage() {
  if (!cart.length) return `<div class="page"><section class="empty-state"><span class="empty-ico" aria-hidden="true">${ICON.bag}</span><p class="lead" style="margin:0 auto 24px">${t('empty')}</p><a class="btn btn-red" href="#/shop">${t('cta_collection')}</a></section></div>`;
  const tt = totals(), left = Math.max(0, 80 - (tt.sub - tt.disc));
  return `<div class="page"><section class="wrap"><h1 class="h-manga">${t('cart')}</h1>
    <div class="cart-grid">
      <ul class="lines">${cart.map((l, i) => { const p = byId(l.id); return `<li class="line">
        <a href="#/p/${p.id}" class="line-img">${photo(p, 'front', 'mini-photo')}</a>
        <div><a href="#/p/${p.id}" class="line-name">${esc(p.name)}</a><span class="line-meta">${COLORS[l.color].name[lang]} · ${l.size} · ${fmt(p.price)}</span>
          <div class="qty"><button data-act="qty" data-i="${i}" data-d="-1" aria-label="−">−</button><span>${l.qty}</span><button data-act="qty" data-i="${i}" data-d="1" aria-label="+">+</button></div></div>
        <div class="line-right"><b>${fmt(p.price * l.qty)}</b><button class="link" data-act="rm" data-i="${i}">${t('remove')}</button></div></li>`; }).join('')}</ul>
      <aside class="box summary">
        <p class="free-msg">${left > 0 ? t('free_left', { x: fmt(left) }) : t('free_ok')}</p>
        <div class="progress"><i style="width:${Math.min(100, ((tt.sub - tt.disc) / 80) * 100)}%"></i></div>
        ${sumRows(tt)}
        <form class="promo" data-form="promo" novalidate><input type="text" name="code" placeholder="${t('promo')}" aria-label="${t('promo')}" value="${promo || ''}" autocomplete="off"><button class="btn btn-ink">${t('apply')}</button></form>
        <p class="err" id="promo-err"></p>
        <a class="btn btn-red btn-block" href="#/checkout">${ICON.lock.replace('<svg', '<svg width="18" height="18"')} ${t('checkout')}</a>
        <p style="text-align:center;margin:14px 0 0"><a href="#/shop" class="link">${t('continue')}</a></p>
      </aside>
    </div></section></div>`;
}
const sumRows = (tt) => `<div class="sum-row"><span>${t('subtotal')}</span><span>${fmt(tt.sub)}</span></div>
  ${tt.disc ? `<div class="sum-row disc"><span>${t('discount')} (${promo})</span><span>−${fmt(tt.disc)}</span></div>` : ''}
  <div class="sum-row"><span>${t('shipping')}</span><span>${tt.ship ? fmt(tt.ship) : t('free')}</span></div>
  <div class="sum-row total"><span>${t('total')}</span><span>${fmt(tt.total)}</span></div>`;

function checkout() {
  if (!cart.length) return cartPage();
  const tt = totals();
  let dn; try { dn = new Intl.DisplayNames([LOCALE[lang]], { type: 'region' }); } catch (e) { dn = null; }
  const countries = ['FR', 'BE', 'ES', 'NL', 'DE', 'IT', 'CH', 'GB', 'MA'];
  const f = (name, label, type = 'text', ac = '') => `<div class="field"><label for="co-${name}">${label}</label><input id="co-${name}" name="${name}" type="${type}" autocomplete="${ac}" required><span class="err"></span></div>`;
  return `<div class="page"><section class="wrap"><h1 class="h-manga">${t('secure')}</h1>
  <div class="checkout-grid">
    <form class="box" data-form="checkout" novalidate>
      <fieldset><legend>${t('contact_info')}</legend>${f('email', t('email'), 'email', 'email')}</fieldset>
      <fieldset><legend>${t('delivery')}</legend>${f('name', t('fullname'), 'text', 'name')}${f('address', t('address'), 'text', 'street-address')}
        <div class="row2">${f('zip', t('zip'), 'text', 'postal-code')}${f('city', t('city'), 'text', 'address-level2')}</div>
        <div class="field"><label for="co-country">${t('country')}</label><select id="co-country" name="country" class="input" autocomplete="country">${countries.map((c) => `<option value="${c}">${dn ? dn.of(c) : c}</option>`).join('')}</select></div>
      </fieldset>
      <fieldset><legend>${t('payment')}</legend>
        <div class="pm" role="radiogroup">
          <input type="radio" name="pm" id="pm-card" value="card" checked><label for="pm-card">${ICON.card.replace('<svg', '<svg width="24" height="24"')}${t('card')}</label>
          <input type="radio" name="pm" id="pm-apple" value="apple"><label for="pm-apple"><span style="font-size:1.3rem;line-height:1"></span>Apple Pay</label>
          <input type="radio" name="pm" id="pm-paypal" value="paypal"><label for="pm-paypal"><span style="font-weight:900;font-style:italic;color:#1e3a8a">Pay<span style="color:#0ea5e9">Pal</span></span>PayPal</label>
        </div>
        <div class="pm-panel" id="pm-panel">${ICON.lock}<span>${t('card_ph')}</span></div>
        <p class="secure-note">${ICON.lock} ${t('ssl')}</p>
      </fieldset>
      <button class="btn btn-red btn-block" id="pay-btn">${t('pay', { x: fmt(tt.total) })}</button>
      <p class="demo-note">${t('demo')}</p>
    </form>
    <aside class="box summary">
      ${cart.map((l) => { const p = byId(l.id); return `<div class="mini"><span class="line-img">${photo(p, 'front', 'mini-photo')}</span><span><b>${esc(p.name)}</b>${COLORS[l.color].name[lang]} · ${l.size} × ${l.qty}</span><span>${fmt(p.price * l.qty)}</span></div>`; }).join('')}
      ${sumRows(tt)}
    </aside>
  </div></section></div>`;
}
function success(id) {
  const name = lastOrder && lastOrder.id === id ? lastOrder.name : '';
  return `<div class="page"><section class="success"><div class="check" aria-hidden="true">✓</div>
    <h1 class="h-manga" style="transform:none">${t('order_ok')}</h1>
    <p class="lead" style="margin:0 auto 26px">${t('order_txt', { name: esc(name.split(' ')[0] || ''), id: esc(id) })}</p>
    <a class="btn btn-red" href="#/shop">${t('back_shop')}</a></section></div>`;
}
function about() {
  return `<div class="page"><section class="wrap about-hero">
    <div class="prose"><p class="kicker">${t('about_kicker')}</p><h1 class="h-manga">${t('about_title')}</h1><p>${t('about_p1')}</p><p>${t('about_p2')}</p><p>${t('about_p3')}</p>${socials()}</div>
    ${frame('images/about.jpg', 'RWAFA', 'about-photo')}
  </section>
  <section class="wrap" style="padding-top:0"><div class="values">${t('values').map(([a, b]) => `<div class="value"><b>${a}</b><p>${b}</p></div>`).join('')}</div></section>
  <section class="wrap dk">${newsletterBlock()}</section></div>`;
}
function contact() {
  return `<div class="page"><section class="wrap two">
    <div class="prose"><p class="kicker">RWAFA</p><h1 class="h-manga">${t('contact_title')}</h1><p>${t('contact_txt')}</p>
      <p><a href="mailto:contact@rwafa.com" style="color:var(--yellow);font-weight:700">contact@rwafa.com</a></p>${socials()}</div>
    <form class="box" data-form="contact" novalidate>
      <div class="field"><label for="ct-n">${t('fullname')}</label><input id="ct-n" name="name" type="text" autocomplete="name" required><span class="err"></span></div>
      <div class="field"><label for="ct-e">${t('email')}</label><input id="ct-e" name="email" type="email" autocomplete="email" required><span class="err"></span></div>
      <div class="field"><label for="ct-m">${t('message')}</label><textarea id="ct-m" name="msg" required></textarea><span class="err"></span></div>
      <button class="btn btn-red btn-block">${t('send')}</button>
    </form></section></div>`;
}
function shippingPage() {
  return `<div class="page"><section class="wrap"><p class="kicker">${t('help')}</p><h1 class="h-manga">${t('ship_title')}</h1>
    <div class="two">
      <div class="box"><h2>${ICON.truck.replace('<svg', '<svg width="30" height="30" style="display:inline;vertical-align:middle;color:var(--red)"')} ${t('ship_h')}</h2><ul>${t('ship_list').map((s) => `<li>${s}</li>`).join('')}</ul></div>
      <div class="box"><h2>${ICON.ret.replace('<svg', '<svg width="30" height="30" style="display:inline;vertical-align:middle;color:var(--red)"')} ${t('ret_h')}</h2><ul>${t('ret_list').map((s) => `<li>${s}</li>`).join('')}</ul></div>
    </div>
    <div class="box faq" style="margin-top:32px"><h2>${t('faq_h')}</h2>${t('faq').map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
    <div class="box" style="margin-top:32px"><h2>${t('size_guide')}</h2>${sizeTable()}</div>
  </section></div>`;
}
const notFound = () => `<div class="page"><section class="empty-state"><span class="big-num" aria-hidden="true">404</span><p class="lead" style="margin:0 auto 24px">${t('not_found')}</p><a class="btn btn-red" href="#/">${t('nav_home')}</a></section></div>`;

/* =================== ROUTER =================== */
const ROUTES = [
  [/^#?\/?$/, home, () => t('cta_disc')],
  [/^#\/shop(?:\/(\w+))?$/, shop, (c) => (c && T.fr['col_' + c] ? t('col_' + c) : c && T.fr['type_' + c] ? t('type_' + c) : t('nav_shop')), updateGrid],
  [/^#\/p\/([\w-]+)$/, product, (id) => (byId(id) || {}).name || '404'],
  [/^#\/cart$/, cartPage, () => t('cart')],
  [/^#\/checkout$/, checkout, () => t('secure')],
  [/^#\/success\/(\w+)$/, success, () => t('order_ok')],
  [/^#\/about$/, about, () => t('nav_about')],
  [/^#\/contact$/, contact, () => t('nav_contact')],
  [/^#\/shipping$/, shippingPage, () => t('nav_shipping')],
  [/^#\/wishlist$/, wishlistPage, () => t('wish')],
];
function render() {
  const h = location.hash || '#/';
  let html = null, title = '404', after = null;
  for (const [re, fn, ttl, aft] of ROUTES) {
    const m = h.match(re);
    if (m) { const args = m.slice(1); html = fn(...args); title = ttl(...args); after = aft; break; }
  }
  $('#app').innerHTML = html ?? notFound();
  document.title = `RWAFA — ${title}`;
  document.dispatchEvent(new Event('oni:render'));
  tickCountdown();
  markNav();
  if (after) after();
}
function markNav() {
  const h = location.hash || '#/';
  $$('.nav a').forEach((a) => a.classList.toggle('on', a.dataset.nav === h));
}
function rerender() { const y = scrollY; render(); scrollTo({ top: y, behavior: 'instant' }); }
function renderChrome() { $('#announce').innerHTML = announce(); $('#hdr').innerHTML = header(); $('#ftr').innerHTML = footer(); markNav(); }
function refreshCount() {
  const c = $('.cart-btn .count'), n = cartCount();
  if (!c) return;
  c.textContent = n;
  $('.cart-btn').setAttribute('aria-label', `${t('cart')} (${n})`);
  c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
}

/* =================== UI HELPERS =================== */
let toastT;
function toast(msg) {
  const r = $('#toast'); clearTimeout(toastT);
  r.innerHTML = `<div class="toast">${esc(msg)}</div>`;
  toastT = setTimeout(() => { r.innerHTML = ''; }, 2700);
}
let lastFocus = null;
function openModal(html, cls = '') {
  lastFocus = document.activeElement;
  $('#modal-root').innerHTML = `<div class="modal" data-act="close-bg"><div class="modal-box ${cls}" role="dialog" aria-modal="true"><button class="modal-x" data-act="close" aria-label="${t('close')}">×</button>${html}</div></div>`;
  const f = $('#modal-root input, #modal-root .modal-x'); f && f.focus();
}
function closeModal() {
  if (!$('#modal-root').innerHTML) return;
  if ($('.nl-pop')) store.set('nlDismissed', true);
  $('#modal-root').innerHTML = ''; lastFocus && lastFocus.focus && lastFocus.focus();
}
function nlPopup() {
  if (store.get('sub', false) || store.get('nlDismissed', false) || $('#modal-root').innerHTML || location.hash.startsWith('#/checkout')) return;
  openModal(`<span class="big-num" aria-hidden="true">-10 %</span><h3>${t('nl_pop')}</h3><p>${t('nl_txt')}</p><form data-form="nl" novalidate><input type="email" name="email" placeholder="${t('nl_ph')}" aria-label="${t('email')}" required autocomplete="email"><button class="btn btn-red btn-block">${t('nl_btn')}</button></form>`, 'nl-pop');
}
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
function validate(form) {
  let ok = true;
  $$('[required]', form).forEach((inp) => {
    const fld = inp.closest('.field'), err = fld && $('.err', fld);
    let msg = '';
    if (!inp.value.trim()) msg = t('required');
    else if (inp.type === 'email' && !emailOk(inp.value.trim())) msg = t('bad_email');
    if (fld) fld.classList.toggle('bad', !!msg);
    if (err) err.textContent = msg;
    if (msg && ok) { ok = false; inp.focus(); }
  });
  return ok;
}
function setLang(l) {
  if (!LANGS.includes(l)) return;
  lang = l; store.set('lang', l);
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  renderChrome(); rerender();
}

/* =================== EVENTS =================== */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.tagName === 'SELECT' || el.tagName === 'INPUT') return;
  const a = el.dataset.act, v = el.dataset.v;
  switch (a) {
    case 'menu': document.body.classList.toggle('nav-open'); break;
    case 'f-size': case 'f-color': case 'f-fit': case 'f-tech': {
      const set = { 'f-size': F.size, 'f-color': F.color, 'f-fit': F.fit, 'f-tech': F.tech }[a];
      set.has(v) ? set.delete(v) : set.add(v);
      el.classList.toggle('on', set.has(v)); el.setAttribute('aria-pressed', set.has(v)); updateGrid(); break;
    }
    case 'f-reset': F.size.clear(); F.color.clear(); F.fit.clear(); F.tech.clear(); F.max = PRICE_MAX; F.sort = 'new'; rerender(); break;
    case 'color': PV.color = v; rerender(); break;
    case 'size':
      PV.size = v; $$('#sizes .size').forEach((b) => { b.classList.toggle('on', b.dataset.v === v); b.setAttribute('aria-pressed', b.dataset.v === v); }); break;
    case 'view': {
      PV.view = v; const p = byId(PV.id);
      $('#main-shot').innerHTML = photo(p, v, 'main-photo', true) + badges(p);
      $$('.thumb').forEach((b) => { b.classList.toggle('on', b.dataset.v === v); b.setAttribute('aria-pressed', b.dataset.v === v); }); break;
    }
    case 'add': {
      if (!PV.size) { toast(t('choose_size')); const s = $('#sizes'); s.classList.remove('shake'); void s.offsetWidth; s.classList.add('shake'); s.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' }); break; }
      const ex = cart.find((l) => l.id === PV.id && l.color === PV.color && l.size === PV.size);
      ex ? ex.qty++ : cart.push({ id: PV.id, color: PV.color, size: PV.size, qty: 1 });
      saveCart(); refreshCount(); toast(t('added')); break;
    }
    case 'qty': { const l = cart[+el.dataset.i]; if (!l) break; l.qty += +el.dataset.d; if (l.qty <= 0) cart.splice(+el.dataset.i, 1); saveCart(); refreshCount(); rerender(); break; }
    case 'rm': cart.splice(+el.dataset.i, 1); saveCart(); refreshCount(); rerender(); break;
    case 'sizeguide': { const gp = location.hash.startsWith('#/p/') ? byId(PV.id) : null, ty = gp ? gp.type : 'hoodie';
      openModal(`<h3>${t('size_guide')}</h3>${ty === 'hoodie' ? fitFinder() : ''}${sizeTable(ty)}`); break; }
    case 'search': openModal(searchUI(), 'search-pop'); break;
    case 'wish': {
      const id = el.dataset.id; toggleWish(id); const on = isWish(id);
      $$(`[data-act="wish"][data-id="${id}"]`).forEach((b) => { b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? t('wish_rm') : t('wish_add')); });
      refreshWish(); toast(on ? t('wish_added') : t('wish_removed'));
      if (location.hash === '#/wishlist' && !on) rerender();
      break;
    }
    case 'notify': openModal(`<h3>${t('notify_t', { s: v })}</h3><p class="muted">${t('notify_p')}</p><form data-form="notify" data-s="${v}" class="stack" novalidate><input type="email" name="email" placeholder="${t('nl_ph')}" aria-label="${t('email')}" required autocomplete="email"><button class="btn btn-red btn-block">${t('notify_btn')}</button></form>`); break;
    case 'tech-link': case 'fit-link':
      F.tech.clear(); F.fit.clear(); (a === 'tech-link' ? F.tech : F.fit).add(v);
      if ((location.hash || '#/') === '#/shop') { e.preventDefault(); rerender(); }
      break;
    case 'to-nl': { const n = $('#next-drop'); n && n.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' }); break; }
    case 'to-reviews': $('#reviews').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); break;
    case 'close': closeModal(); break;
    case 'close-bg': if (e.target === el) closeModal(); break;
  }
});
document.addEventListener('change', (e) => {
  const el = e.target;
  if (el.dataset.act === 'lang') setLang(el.value);
  else if (el.dataset.act === 'f-sort') { F.sort = el.value; updateGrid(); }
  else if (el.name === 'pm') {
    const map = { card: 'card_ph', apple: 'apple_ph', paypal: 'paypal_ph' };
    $('#pm-panel').innerHTML = `${ICON.lock}<span>${t(map[el.value])}</span>`;
  }
});
document.addEventListener('input', (e) => {
  if (e.target.dataset.act === 'search-q') { const r = $('#search-res'); if (r) r.innerHTML = searchResults(e.target.value); return; }
  if (e.target.dataset.act === 'f-max') { F.max = +e.target.value; $('#maxv').textContent = t('max_price', { x: fmt(F.max) }); updateGrid(); }
});
document.addEventListener('mousemove', (e) => {
  const z = e.target.closest && e.target.closest('.zoomable'); if (!z) return;
  const r = z.getBoundingClientRect();
  z.style.setProperty('--zx', ((e.clientX - r.left) / r.width) * 100 + '%');
  z.style.setProperty('--zy', ((e.clientY - r.top) / r.height) * 100 + '%');
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); document.body.classList.remove('nav-open'); } });

const FORMS = {
  nl(f) {
    const v = f.email.value.trim();
    if (!emailOk(v)) { toast(t('bad_email')); f.email.focus(); return; }
    store.set('sub', true);
    // TODO production: send the address to your newsletter provider (Klaviyo, Brevo, Mailchimp…)
    const inPop = !!f.closest('.nl-pop');
    if (inPop) $('.nl-pop').innerHTML = `<button class="modal-x" data-act="close" aria-label="${t('close')}">×</button><h3>${t('nl_ok')}</h3><p><span class="code">ONI10</span></p>`;
    renderChrome(); if (!inPop) rerender();
    toast(`${t('nl_ok')} ONI10`);
  },
  promo(f) {
    const code = f.code.value.trim().toUpperCase();
    if (PROMOS.includes(code)) { promo = code; store.set('promo', code); rerender(); toast(t('code_ok')); }
    else { promo = null; store.set('promo', null); rerender(); const er = $('#promo-err'); if (er) er.textContent = code ? t('code_bad') : ''; }
  },
  review(f) {
    if (!f.n.value.trim() || !f.txt.value.trim()) { toast(t('required')); return; }
    const k = 'rv_' + PV.id, list = store.get(k, []);
    list.unshift({ n: f.n.value.trim().slice(0, 40), r: Math.min(5, Math.max(1, +f.r.value || 5)), txt: f.txt.value.trim().slice(0, 500) });
    store.set(k, list); rerender(); toast(t('review_thanks'));
  },
  ff(f) {
    const h = +f.h.value, w = +f.w.value;
    if (!(h >= 140 && h <= 215 && w >= 40 && w <= 170)) { toast(t('ff_bad')); return; }
    const size = recommendSize(h, w, f.pref.value);
    $('#ff-res').innerHTML = `<b>${t('ff_res', { s: size })}</b><small>${t('ff_note')}</small>`;
    const p = byId(PV.id);
    if (p && location.hash.startsWith('#/p/') && p.sizes.includes(size)) {
      PV.size = size;
      $$('#sizes .size').forEach((b) => { b.classList.toggle('on', b.dataset.v === size); b.setAttribute('aria-pressed', b.dataset.v === size); });
    }
  },
  notify(f) {
    const v = f.email.value.trim();
    if (!emailOk(v)) { toast(t('bad_email')); f.email.focus(); return; }
    // TODO production: send to your back-in-stock tool (Klaviyo, Shopify…)
    const list = store.get('notify', []); list.push({ id: PV.id, size: f.dataset.s }); store.set('notify', list);
    closeModal(); toast(t('notify_ok', { s: f.dataset.s }));
  },
  contact(f) {
    if (!validate(f)) return;
    // TODO production: POST to your form backend (Formspree, Netlify Forms, own API…)
    f.reset(); toast(t('sent'));
  },
  checkout(f) {
    if (!validate(f)) return;
    const btn = $('#pay-btn'); btn.disabled = true; btn.textContent = t('processing');
    // TODO production: create a Stripe PaymentIntent / PayPal order on your server and confirm here.
    setTimeout(() => {
      const id = 'RWF' + Math.random().toString(36).slice(2, 8).toUpperCase();
      lastOrder = { id, name: f.name.value.trim() };
      cart = []; saveCart(); promo = null; store.set('promo', null);
      refreshCount(); location.hash = '#/success/' + id;
    }, 1300);
  },
};
document.addEventListener('submit', (e) => {
  const f = e.target.closest('form[data-form]'); if (!f) return;
  e.preventDefault(); FORMS[f.dataset.form] && FORMS[f.dataset.form](f);
});

/* =================== INIT =================== */
document.documentElement.lang = lang;
document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
renderChrome();
render();
addEventListener('hashchange', () => {
  document.body.classList.remove('nav-open'); closeModal();
  render(); scrollTo({ top: 0, behavior: 'instant' }); $('#app').focus({ preventScroll: true });
});
setInterval(tickCountdown, 1000);
setTimeout(nlPopup, 14000);
// read-only view of the catalogue for the 3D hero (hero3d.js)
window.SHOP = { products: PRODUCTS, fmt: (n) => fmt(n) };
})();
