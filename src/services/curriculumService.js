// ─────────────────────────────────────────────────────────────────────────────
// 3-month English curriculum  B1→B2  (10 units × 6 lessons × 5 words = 300)
// Words are common, practical, B1-B2 level — no rare vocabulary.
// Each lesson carries reviewWords (3-4 from the previous lesson) to
// reinforce spaced repetition without any extra API calls.
// ─────────────────────────────────────────────────────────────────────────────

const w = (word, ru, example) => ({ word, ru, example })

export const CURRICULUM = [
  // ─── UNIT 1: Daily Life ────────────────────────────────────────────────────
  {
    id: 'unit1', title: 'Daily Life', emoji: '🏠',
    lessons: [
      {
        id: 'u1l1', title: 'Morning Routine',
        topicHint: 'morning routines and how people start their day',
        newWords: [
          w('wake up',       'просыпаться',        'I wake up at 7 every morning.'),
          w('get up',        'вставать',            'She gets up right after the alarm.'),
          w('skip',          'пропускать',          'I sometimes skip breakfast when I\'m late.'),
          w('rush',          'торопиться',          'I have to rush — I\'m late for work.'),
          w('alarm clock',   'будильник',           'My alarm clock rings at 6:30.'),
        ],
        reviewWords: [],
      },
      {
        id: 'u1l2', title: 'Evening Routine',
        topicHint: 'evening routines, relaxing after work, going to bed',
        newWords: [
          w('go to bed',     'ложиться спать',      'I usually go to bed around midnight.'),
          w('tidy up',       'убирать/наводить порядок', 'Let\'s tidy up the kitchen after dinner.'),
          w('relax',         'расслабляться',        'I like to relax with a good book.'),
          w('exhausted',     'измотанный',           'After work I\'m completely exhausted.'),
          w('unwind',        'расслабиться (снять стресс)', 'Music helps me unwind in the evening.'),
        ],
        reviewWords: [
          w('wake up', 'просыпаться'), w('rush', 'торопиться'), w('skip', 'пропускать'),
        ],
      },
      {
        id: 'u1l3', title: 'Home',
        topicHint: 'living at home, renting or owning a flat, neighbours',
        newWords: [
          w('apartment',     'квартира',            'I rent a small apartment in the city centre.'),
          w('rent',          'аренда / снимать жильё', 'The rent is quite expensive in this area.'),
          w('landlord',      'хозяин жилья',        'My landlord fixed the heating last week.'),
          w('cozy',          'уютный',              'Our living room is small but very cozy.'),
          w('move in',       'въехать / переехать', 'When did you move into this place?'),
        ],
        reviewWords: [
          w('tidy up', 'убирать'), w('exhausted', 'измотанный'), w('relax', 'расслабляться'),
        ],
      },
      {
        id: 'u1l4', title: 'Family',
        topicHint: 'family members, relationships, growing up',
        newWords: [
          w('sibling',       'брат или сестра',     'I have two siblings — a brother and a sister.'),
          w('relative',      'родственник',          'We visit relatives at Christmas.'),
          w('get along',     'ладить',               'Do you get along well with your neighbours?'),
          w('raise',         'воспитывать',          'It\'s not easy to raise children alone.'),
          w('household',     'домохозяйство / члены семьи', 'Our household has four people.'),
        ],
        reviewWords: [
          w('apartment', 'квартира'), w('rent', 'аренда'), w('cozy', 'уютный'),
        ],
      },
      {
        id: 'u1l5', title: 'Daily Schedule',
        topicHint: 'planning your day, habits, time management',
        newWords: [
          w('schedule',      'расписание',           'I keep a schedule to stay organised.'),
          w('manage',        'справляться / успевать', 'How do you manage so many tasks?'),
          w('used to',       'привык(ла) к / раньше делал(а)', 'I used to wake up very late.'),
          w('habit',         'привычка',              'Reading at night is a good habit.'),
          w('routine',       'распорядок дня',        'My morning routine takes about an hour.'),
        ],
        reviewWords: [
          w('sibling', 'брат или сестра'), w('get along', 'ладить'), w('household', 'домохозяйство'),
        ],
      },
      {
        id: 'u1l6', title: 'Free Time at Home',
        topicHint: 'free time, what you enjoy doing at home',
        newWords: [
          w('spare time',    'свободное время',      'What do you do in your spare time?'),
          w('bored',         'скучно / скучающий',   'I get bored if I stay home all weekend.'),
          w('series',        'сериал',               'We watched a whole series in one weekend.'),
          w('catch up',      'наверстать / давно не виделись', 'I need to catch up on some reading.'),
          w('stay in',       'оставаться дома',      'Let\'s stay in tonight — it\'s raining.'),
        ],
        reviewWords: [
          w('schedule', 'расписание'), w('habit', 'привычка'), w('routine', 'распорядок'),
        ],
      },
    ],
  },

  // ─── UNIT 2: Food & Eating ─────────────────────────────────────────────────
  {
    id: 'unit2', title: 'Food & Eating', emoji: '🍽️',
    lessons: [
      {
        id: 'u2l1', title: 'Meals',
        topicHint: 'meals during the day, eating habits',
        newWords: [
          w('meal',          'приём пищи',          'I have three meals a day.'),
          w('taste',         'вкус / пробовать на вкус', 'This soup tastes amazing.'),
          w('dish',          'блюдо',               'My favourite dish is pasta with mushrooms.'),
          w('ingredient',    'ингредиент',           'What ingredients do you need for this recipe?'),
          w('recipe',        'рецепт',               'My grandmother\'s recipe is the best.'),
        ],
        reviewWords: [
          w('spare time', 'свободное время'), w('stay in', 'оставаться дома'), w('habit', 'привычка'),
        ],
      },
      {
        id: 'u2l2', title: 'Cooking',
        topicHint: 'cooking methods, what and how you cook at home',
        newWords: [
          w('boil',          'кипятить / варить',   'Boil the pasta for ten minutes.'),
          w('fry',           'жарить',              'I usually fry eggs for breakfast.'),
          w('prepare',       'готовить / подготавливать', 'I prepare lunch every Sunday.'),
          w('mix',           'смешивать',            'Mix the flour and eggs together.'),
          w('leftover',      'остатки еды',          'I made a soup from the leftovers.'),
        ],
        reviewWords: [
          w('meal', 'приём пищи'), w('taste', 'вкус'), w('recipe', 'рецепт'),
        ],
      },
      {
        id: 'u2l3', title: 'At a Restaurant',
        topicHint: 'going to a restaurant, ordering food',
        newWords: [
          w('order',         'заказывать',           'I\'d like to order the grilled chicken.'),
          w('waiter',        'официант',             'The waiter was very friendly.'),
          w('bill',          'счёт',                 'Could we have the bill, please?'),
          w('recommend',     'рекомендовать',        'Can you recommend something vegetarian?'),
          w('tip',           'чаевые',               'It\'s polite to leave a tip.'),
        ],
        reviewWords: [
          w('dish', 'блюдо'), w('prepare', 'готовить'), w('ingredient', 'ингредиент'),
        ],
      },
      {
        id: 'u2l4', title: 'Healthy Eating',
        topicHint: 'healthy and unhealthy food choices, dieting',
        newWords: [
          w('diet',          'диета / питание',      'I try to follow a healthy diet.'),
          w('avoid',         'избегать',             'I avoid fast food during the week.'),
          w('balanced',      'сбалансированный',     'A balanced meal includes protein and vegetables.'),
          w('snack',         'перекус',              'I have a small snack in the afternoon.'),
          w('portion',       'порция',               'Restaurant portions here are very large.'),
        ],
        reviewWords: [
          w('order', 'заказывать'), w('recommend', 'рекомендовать'), w('bill', 'счёт'),
        ],
      },
      {
        id: 'u2l5', title: 'Food Preferences',
        topicHint: 'likes, dislikes, allergies, food culture',
        newWords: [
          w('prefer',        'предпочитать',         'I prefer tea to coffee.'),
          w('can\'t stand',  'терпеть не могу',      'I can\'t stand the smell of fish.'),
          w('allergic',      'аллергичный / аллергик', 'She is allergic to nuts.'),
          w('spicy',         'острый (пряный)',      'Is this dish very spicy?'),
          w('flavor',        'вкус / аромат',        'This has a really interesting flavor.'),
        ],
        reviewWords: [
          w('diet', 'диета'), w('avoid', 'избегать'), w('snack', 'перекус'),
        ],
      },
      {
        id: 'u2l6', title: 'Food & Culture',
        topicHint: 'national cuisine, eating traditions, trying new food',
        newWords: [
          w('traditional',   'традиционный',         'What is a traditional dish in your country?'),
          w('street food',   'уличная еда',          'I love trying street food when I travel.'),
          w('vegetarian',    'вегетарианец / вегетарианское', 'Do you have a vegetarian option?'),
          w('tasty',         'вкусный',              'This is the most tasty bread I\'ve ever had.'),
          w('cuisine',       'кухня (национальная)', 'Italian cuisine is my absolute favourite.'),
        ],
        reviewWords: [
          w('prefer', 'предпочитать'), w('flavor', 'вкус'), w('spicy', 'острый'),
        ],
      },
    ],
  },

  // ─── UNIT 3: Getting Around ────────────────────────────────────────────────
  {
    id: 'unit3', title: 'Getting Around', emoji: '🚌',
    lessons: [
      {
        id: 'u3l1', title: 'Transport',
        topicHint: 'how you get around the city, daily commute',
        newWords: [
          w('commute',       'добираться (на работу)', 'My commute takes about 40 minutes.'),
          w('traffic',       'движение / пробки',    'There\'s a lot of traffic in the morning.'),
          w('ticket',        'билет',                'I bought a return ticket online.'),
          w('platform',      'платформа',            'The train leaves from platform 3.'),
          w('transfer',      'пересадка',            'You need to make a transfer at the central station.'),
        ],
        reviewWords: [
          w('traditional', 'традиционный'), w('cuisine', 'кухня'), w('prefer', 'предпочитать'),
        ],
      },
      {
        id: 'u3l2', title: 'Giving Directions',
        topicHint: 'asking for and giving directions, describing routes',
        newWords: [
          w('turn left/right', 'повернуть налево/направо', 'Turn left at the traffic lights.'),
          w('straight ahead', 'прямо',               'Go straight ahead for two blocks.'),
          w('corner',        'угол / поворот',       'The café is just around the corner.'),
          w('block',         'квартал',              'It\'s about two blocks from here.'),
          w('landmark',      'ориентир',             'Use the church as a landmark.'),
        ],
        reviewWords: [
          w('commute', 'добираться'), w('traffic', 'пробки'), w('ticket', 'билет'),
        ],
      },
      {
        id: 'u3l3', title: 'Driving',
        topicHint: 'cars, driving habits, roads',
        newWords: [
          w('speed limit',   'ограничение скорости', 'The speed limit here is 50.'),
          w('lane',          'полоса движения',      'Stay in the right lane.'),
          w('park',          'парковать(ся)',        'It\'s hard to park in the city centre.'),
          w('traffic jam',   'пробка',               'I was stuck in a traffic jam for an hour.'),
          w('fine',          'штраф',                'You can get a fine for parking there.'),
        ],
        reviewWords: [
          w('turn left/right', 'повернуть'), w('straight ahead', 'прямо'), w('landmark', 'ориентир'),
        ],
      },
      {
        id: 'u3l4', title: 'Public Transport',
        topicHint: 'buses, metro, trams — using public transport',
        newWords: [
          w('route',         'маршрут',              'Which route do you take to work?'),
          w('fare',          'стоимость проезда',    'The fare went up again this year.'),
          w('rush hour',     'час пик',              'I try to avoid travelling during rush hour.'),
          w('crowded',       'переполненный',        'The metro is very crowded at 8 am.'),
          w('delay',         'задержка',             'There was a 20-minute delay on my line.'),
        ],
        reviewWords: [
          w('traffic jam', 'пробка'), w('lane', 'полоса'), w('park', 'парковаться'),
        ],
      },
      {
        id: 'u3l5', title: 'Planning a Journey',
        topicHint: 'planning trips, booking transport, travel schedules',
        newWords: [
          w('departure',     'отправление',          'The departure is at 9:15.'),
          w('arrival',       'прибытие',             'What time is the arrival in Berlin?'),
          w('book',          'бронировать',          'I booked my ticket three weeks ago.'),
          w('convenient',    'удобный',              'Is this time convenient for you?'),
          w('direct',        'прямой (без пересадок)', 'Is there a direct train to Paris?'),
        ],
        reviewWords: [
          w('route', 'маршрут'), w('delay', 'задержка'), w('rush hour', 'час пик'),
        ],
      },
      {
        id: 'u3l6', title: 'Travel Problems',
        topicHint: 'dealing with travel problems — lost ticket, wrong bus, delays',
        newWords: [
          w('cancel',        'отменить',             'My flight was cancelled due to weather.'),
          w('miss',          'опоздать (на транспорт)', 'I missed the last bus home.'),
          w('complain',      'жаловаться',           'I need to complain about this delay.'),
          w('alternative',   'альтернативный / замена', 'Is there an alternative route?'),
          w('refund',        'возврат денег',        'Can I get a refund for this ticket?'),
        ],
        reviewWords: [
          w('departure', 'отправление'), w('book', 'бронировать'), w('convenient', 'удобный'),
        ],
      },
    ],
  },

  // ─── UNIT 4: Shopping ──────────────────────────────────────────────────────
  {
    id: 'unit4', title: 'Shopping', emoji: '🛍️',
    lessons: [
      {
        id: 'u4l1', title: 'In a Shop',
        topicHint: 'shopping, buying things, finding what you need in a store',
        newWords: [
          w('browse',        'разглядывать / листать', 'I like to browse before I decide.'),
          w('receipt',       'чек',                  'Keep your receipt in case you need to return it.'),
          w('discount',      'скидка',               'Is there a student discount?'),
          w('afford',        'позволить себе',        'I can\'t afford a new laptop right now.'),
          w('exchange',      'обменять',             'Can I exchange this for a bigger size?'),
        ],
        reviewWords: [
          w('cancel', 'отменить'), w('refund', 'возврат'), w('complain', 'жаловаться'),
        ],
      },
      {
        id: 'u4l2', title: 'Clothes',
        topicHint: 'buying clothes, trying things on, style',
        newWords: [
          w('try on',        'примерять',            'Can I try this on?'),
          w('fit',           'подходить по размеру', 'These trousers don\'t fit me.'),
          w('style',         'стиль',                'I like your style — where did you buy that?'),
          w('suit',          'подходить / идти (о вещи)', 'That colour really suits you.'),
          w('comfortable',   'удобный (о одежде)',   'I prefer comfortable shoes.'),
        ],
        reviewWords: [
          w('browse', 'разглядывать'), w('discount', 'скидка'), w('afford', 'позволить себе'),
        ],
      },
      {
        id: 'u4l3', title: 'Prices',
        topicHint: 'talking about prices, comparing value, sales',
        newWords: [
          w('expensive',     'дорогой',              'This restaurant is too expensive for me.'),
          w('cheap',         'дешёвый',              'These shoes were really cheap in the sale.'),
          w('sale',          'распродажа',           'Everything is 30% off in the summer sale.'),
          w('worth',         'стоить (того)',        'Is this phone worth the price?'),
          w('bargain',       'выгодная покупка',     'This jacket was a real bargain.'),
        ],
        reviewWords: [
          w('try on', 'примерять'), w('fit', 'подходить'), w('suit', 'идти (о вещи)'),
        ],
      },
      {
        id: 'u4l4', title: 'Online Shopping',
        topicHint: 'shopping online, delivery, reviews',
        newWords: [
          w('deliver',       'доставлять',           'They deliver within 2-3 days.'),
          w('review',        'отзыв / обзор',        'I always read reviews before buying.'),
          w('track',         'отслеживать',          'You can track your order online.'),
          w('return',        'вернуть (товар)',       'I want to return this — it doesn\'t work.'),
          w('guarantee',     'гарантия',             'Does this come with a guarantee?'),
        ],
        reviewWords: [
          w('expensive', 'дорогой'), w('sale', 'распродажа'), w('bargain', 'выгодная покупка'),
        ],
      },
      {
        id: 'u4l5', title: 'Money',
        topicHint: 'saving money, budgeting, spending habits',
        newWords: [
          w('budget',        'бюджет',               'I try to stick to a monthly budget.'),
          w('save up',       'копить деньги',        'I\'m saving up for a trip to Japan.'),
          w('spend',         'тратить',              'How much do you spend on food each week?'),
          w('waste',         'тратить впустую',      'I don\'t want to waste money on things I don\'t need.'),
          w('deal',          'выгодная сделка',      'I got a great deal on this flight.'),
        ],
        reviewWords: [
          w('deliver', 'доставлять'), w('review', 'отзыв'), w('return', 'вернуть'),
        ],
      },
      {
        id: 'u4l6', title: 'Shopping Habits',
        topicHint: 'how and where you shop, preferences, impulsive buying',
        newWords: [
          w('impulsive',     'импульсивный',         'I sometimes make impulsive purchases.'),
          w('compare',       'сравнивать',           'I always compare prices before buying.'),
          w('essential',     'необходимый',          'Food and rent are essential expenses.'),
          w('luxury',        'роскошь / люксовый',   'A new car is a luxury for me right now.'),
          w('second-hand',   'подержанный',          'I often buy second-hand books online.'),
        ],
        reviewWords: [
          w('budget', 'бюджет'), w('save up', 'копить'), w('deal', 'выгодная сделка'),
        ],
      },
    ],
  },

  // ─── UNIT 5: Work & Career ─────────────────────────────────────────────────
  {
    id: 'unit5', title: 'Work & Career', emoji: '💼',
    lessons: [
      {
        id: 'u5l1', title: 'Finding a Job',
        topicHint: 'job hunting, interviews, applying for a position',
        newWords: [
          w('apply',         'подавать заявку',      'I applied for three jobs this week.'),
          w('interview',     'собеседование',        'I have a job interview on Monday.'),
          w('hire',          'нанимать',             'They decided to hire someone with more experience.'),
          w('salary',        'зарплата',             'What is the starting salary for this position?'),
          w('position',      'должность',            'She got a new position as a team leader.'),
        ],
        reviewWords: [
          w('compare', 'сравнивать'), w('essential', 'необходимый'), w('luxury', 'роскошь'),
        ],
      },
      {
        id: 'u5l2', title: 'At Work',
        topicHint: 'daily work life, tasks, colleagues, meetings',
        newWords: [
          w('deadline',      'дедлайн / крайний срок', 'The deadline is this Friday.'),
          w('meeting',       'встреча / совещание',  'We have a meeting every Monday morning.'),
          w('colleague',     'коллега',              'I get on well with my colleagues.'),
          w('task',          'задача',               'My main task today is to finish the report.'),
          w('busy',          'занятой',              'I\'m too busy to take a break right now.'),
        ],
        reviewWords: [
          w('apply', 'подавать заявку'), w('salary', 'зарплата'), w('interview', 'собеседование'),
        ],
      },
      {
        id: 'u5l3', title: 'Skills & Experience',
        topicHint: 'professional skills, learning at work, challenges',
        newWords: [
          w('improve',       'улучшать',             'I want to improve my writing skills.'),
          w('develop',       'развивать',            'The company helps employees develop new skills.'),
          w('experience',    'опыт',                 'How many years of experience do you have?'),
          w('skill',         'навык',                'Communication is a very important skill.'),
          w('challenge',     'трудность / вызов',    'Learning a new language is a real challenge.'),
        ],
        reviewWords: [
          w('deadline', 'дедлайн'), w('colleague', 'коллега'), w('task', 'задача'),
        ],
      },
      {
        id: 'u5l4', title: 'Career Growth',
        topicHint: 'career development, promotions, ambitions',
        newWords: [
          w('promotion',     'повышение',            'She got a promotion after two years.'),
          w('ambition',      'амбиция / стремление', 'What are your career ambitions?'),
          w('goal',          'цель',                 'My goal is to become a project manager.'),
          w('achieve',       'достигать',            'It feels great to achieve something difficult.'),
          w('performance',   'результативность / производительность', 'My performance review is next week.'),
        ],
        reviewWords: [
          w('improve', 'улучшать'), w('skill', 'навык'), w('experience', 'опыт'),
        ],
      },
      {
        id: 'u5l5', title: 'Work-Life Balance',
        topicHint: 'balancing work and personal life, stress, flexibility',
        newWords: [
          w('flexible',      'гибкий',               'My schedule is quite flexible.'),
          w('overtime',      'сверхурочные',         'I don\'t want to work overtime every week.'),
          w('quit',          'уволиться / бросить',  'She quit her job to travel the world.'),
          w('stress',        'стресс',               'Work stress is becoming a serious problem.'),
          w('reward',        'вознаграждение',       'The reward for hard work is worth it.'),
        ],
        reviewWords: [
          w('promotion', 'повышение'), w('goal', 'цель'), w('achieve', 'достигать'),
        ],
      },
      {
        id: 'u5l6', title: 'Working from Home',
        topicHint: 'remote work, advantages and disadvantages, productivity',
        newWords: [
          w('remote',        'удалённый (формат работы)', 'Remote work has many advantages.'),
          w('productive',    'продуктивный',         'I\'m more productive at home.'),
          w('distraction',   'отвлечение',           'Social media is my biggest distraction.'),
          w('collaborate',   'сотрудничать',         'It\'s harder to collaborate online.'),
          w('home office',   'домашний офис',        'I set up a proper home office last year.'),
        ],
        reviewWords: [
          w('flexible', 'гибкий'), w('stress', 'стресс'), w('quit', 'уволиться'),
        ],
      },
    ],
  },

  // ─── UNIT 6: Health ────────────────────────────────────────────────────────
  {
    id: 'unit6', title: 'Health', emoji: '💊',
    lessons: [
      {
        id: 'u6l1', title: 'Symptoms',
        topicHint: 'feeling unwell, describing symptoms',
        newWords: [
          w('headache',      'головная боль',        'I\'ve had a headache all day.'),
          w('fever',         'температура / жар',    'She has a high fever.'),
          w('sore throat',   'боль в горле',         'I can\'t speak loudly — I have a sore throat.'),
          w('feel sick',     'чувствовать себя плохо', 'I\'ve been feeling sick since this morning.'),
          w('hurt',          'болеть (о части тела)', 'My back really hurts after sitting all day.'),
        ],
        reviewWords: [
          w('remote', 'удалённый'), w('productive', 'продуктивный'), w('stress', 'стресс'),
        ],
      },
      {
        id: 'u6l2', title: 'At the Doctor',
        topicHint: 'visiting a doctor, describing illness, getting advice',
        newWords: [
          w('appointment',   'запись / приём (у врача)', 'I need to make an appointment.'),
          w('prescription',  'рецепт (врача)',       'The doctor gave me a prescription.'),
          w('diagnose',      'ставить диагноз',      'They diagnosed him with pneumonia.'),
          w('recover',       'поправляться',         'She fully recovered in two weeks.'),
          w('rest',          'отдыхать / покой',     'The doctor said I need to rest.'),
        ],
        reviewWords: [
          w('headache', 'головная боль'), w('feel sick', 'плохо себя чувствовать'), w('hurt', 'болеть'),
        ],
      },
      {
        id: 'u6l3', title: 'Healthy Habits',
        topicHint: 'healthy lifestyle, daily habits for good health',
        newWords: [
          w('exercise',      'физическая нагрузка / заниматься', 'I exercise three times a week.'),
          w('sleep well',    'хорошо спать',         'I don\'t sleep well when I\'m stressed.'),
          w('energy',        'энергия',              'I don\'t have enough energy in the morning.'),
          w('mental health', 'психическое здоровье', 'Mental health is just as important as physical.'),
          w('well-being',    'благополучие / самочувствие', 'Walking helps my overall well-being.'),
        ],
        reviewWords: [
          w('recover', 'поправляться'), w('rest', 'отдыхать'), w('prescription', 'рецепт'),
        ],
      },
      {
        id: 'u6l4', title: 'Sport & Fitness',
        topicHint: 'sport, exercise, keeping fit',
        newWords: [
          w('work out',      'тренироваться',        'I work out at the gym twice a week.'),
          w('warm up',       'разминаться',          'Always warm up before exercise.'),
          w('strength',      'сила / силовые тренировки', 'Strength training is good for your back.'),
          w('stamina',       'выносливость',         'Running improves your stamina.'),
          w('stretch',       'растягиваться',        'I stretch every morning to stay flexible.'),
        ],
        reviewWords: [
          w('exercise', 'заниматься'), w('energy', 'энергия'), w('well-being', 'самочувствие'),
        ],
      },
      {
        id: 'u6l5', title: 'Feelings & Mood',
        topicHint: 'emotions, how you feel, dealing with difficult feelings',
        newWords: [
          w('anxious',       'тревожный / взволнованный', 'I feel anxious before big presentations.'),
          w('confident',     'уверенный',            'Practice makes you more confident.'),
          w('grateful',      'благодарный',          'I\'m grateful for my good health.'),
          w('upset',         'расстроенный',         'She was quite upset about the news.'),
          w('cheer up',      'подбодрить / поднять настроение', 'Let\'s go out — it\'ll cheer you up.'),
        ],
        reviewWords: [
          w('work out', 'тренироваться'), w('stamina', 'выносливость'), w('stretch', 'растягиваться'),
        ],
      },
      {
        id: 'u6l6', title: 'Staying Healthy Long-term',
        topicHint: 'long-term health, prevention, lifestyle choices',
        newWords: [
          w('prevent',       'предотвращать',        'Regular check-ups can prevent serious illness.'),
          w('lifestyle',     'образ жизни',          'A healthy lifestyle includes good sleep.'),
          w('habit',         'привычка',              'Bad habits are hard to break.'),
          w('moderate',      'умеренный',            'Everything in moderation is the key.'),
          w('check-up',      'медосмотр',            'I have a check-up every year.'),
        ],
        reviewWords: [
          w('anxious', 'тревожный'), w('confident', 'уверенный'), w('grateful', 'благодарный'),
        ],
      },
    ],
  },

  // ─── UNIT 7: Technology ────────────────────────────────────────────────────
  {
    id: 'unit7', title: 'Technology', emoji: '💻',
    lessons: [
      {
        id: 'u7l1', title: 'Devices',
        topicHint: 'smartphones, laptops, gadgets you use',
        newWords: [
          w('laptop',        'ноутбук',              'My laptop is old and very slow.'),
          w('screen',        'экран',                'The screen on this phone is excellent.'),
          w('battery',       'аккумулятор / батарея', 'My battery drains really fast.'),
          w('charge',        'заряжать',             'I forgot to charge my phone overnight.'),
          w('update',        'обновлять / обновление', 'Don\'t forget to install the latest update.'),
        ],
        reviewWords: [
          w('prevent', 'предотвращать'), w('lifestyle', 'образ жизни'), w('check-up', 'медосмотр'),
        ],
      },
      {
        id: 'u7l2', title: 'Internet',
        topicHint: 'using the internet daily, speed, connection',
        newWords: [
          w('search',        'искать / поиск',       'Just search for it online.'),
          w('download',      'скачивать',            'How long will it take to download?'),
          w('connection',    'подключение',          'My internet connection is very slow today.'),
          w('stream',        'стримить / смотреть онлайн', 'I stream movies instead of buying DVDs.'),
          w('bandwidth',     'пропускная способность сети', 'Video calls need a lot of bandwidth.'),
        ],
        reviewWords: [
          w('laptop', 'ноутбук'), w('charge', 'заряжать'), w('update', 'обновлять'),
        ],
      },
      {
        id: 'u7l3', title: 'Social Media',
        topicHint: 'social networks, content, online communication',
        newWords: [
          w('post',          'публикация / публиковать', 'I post photos every weekend.'),
          w('share',         'делиться',             'She shared the article on her profile.'),
          w('follow',        'подписаться',          'How many people follow you?'),
          w('comment',       'комментарий',          'I got a lot of positive comments.'),
          w('notification',  'уведомление',          'I turn off notifications at night.'),
        ],
        reviewWords: [
          w('search', 'искать'), w('stream', 'смотреть онлайн'), w('download', 'скачивать'),
        ],
      },
      {
        id: 'u7l4', title: 'Tech Problems',
        topicHint: 'fixing devices, dealing with tech problems',
        newWords: [
          w('crash',         'зависнуть / сломаться', 'My computer crashed and I lost my work.'),
          w('fix',           'починить',             'Can you fix this error message?'),
          w('restart',       'перезапустить',        'Try restarting your phone.'),
          w('backup',        'резервная копия',      'Always make a backup of your files.'),
          w('delete',        'удалять',              'I deleted the wrong file by accident.'),
        ],
        reviewWords: [
          w('post', 'публиковать'), w('notification', 'уведомление'), w('follow', 'подписаться'),
        ],
      },
      {
        id: 'u7l5', title: 'Online Privacy',
        topicHint: 'internet safety, passwords, personal data',
        newWords: [
          w('password',      'пароль',               'Use a strong password for every account.'),
          w('privacy',       'конфиденциальность',   'I\'m concerned about my online privacy.'),
          w('account',       'аккаунт / учётная запись', 'I deleted my social media account.'),
          w('secure',        'безопасный',           'Make sure the website is secure before paying.'),
          w('data',          'данные',               'Apps collect a lot of personal data.'),
        ],
        reviewWords: [
          w('crash', 'зависнуть'), w('backup', 'резервная копия'), w('delete', 'удалять'),
        ],
      },
      {
        id: 'u7l6', title: 'AI & the Future',
        topicHint: 'artificial intelligence, automation, future of technology',
        newWords: [
          w('artificial intelligence', 'искусственный интеллект', 'Artificial intelligence is changing many industries.'),
          w('automate',      'автоматизировать',     'Many simple tasks will be automated soon.'),
          w('smart device',  'умное устройство',     'Smart devices can control your whole home.'),
          w('digital',       'цифровой',             'We live in a digital world now.'),
          w('virtual',       'виртуальный',          'Virtual meetings have become very common.'),
        ],
        reviewWords: [
          w('password', 'пароль'), w('data', 'данные'), w('secure', 'безопасный'),
        ],
      },
    ],
  },

  // ─── UNIT 8: Travel ────────────────────────────────────────────────────────
  {
    id: 'unit8', title: 'Travel', emoji: '✈️',
    lessons: [
      {
        id: 'u8l1', title: 'Planning a Trip',
        topicHint: 'planning holidays, choosing a destination, preparation',
        newWords: [
          w('destination',   'пункт назначения',     'Where is your dream destination?'),
          w('itinerary',     'маршрут / план поездки', 'I planned a detailed itinerary.'),
          w('visa',          'виза',                 'Do I need a visa to travel there?'),
          w('passport',      'паспорт',              'Make sure your passport is valid.'),
          w('currency',      'валюта',               'I need to exchange some currency.'),
        ],
        reviewWords: [
          w('automate', 'автоматизировать'), w('virtual', 'виртуальный'), w('digital', 'цифровой'),
        ],
      },
      {
        id: 'u8l2', title: 'At the Airport',
        topicHint: 'airports, flying, check-in process',
        newWords: [
          w('check in',      'регистрироваться',     'You can check in online 24 hours before.'),
          w('boarding pass', 'посадочный талон',     'Don\'t forget your boarding pass.'),
          w('luggage',       'багаж',                'My luggage was overweight.'),
          w('gate',          'выход на посадку',     'The flight departs from gate B7.'),
          w('departure',     'отправление',          'The departure lounge was very crowded.'),
        ],
        reviewWords: [
          w('destination', 'пункт назначения'), w('visa', 'виза'), w('itinerary', 'маршрут'),
        ],
      },
      {
        id: 'u8l3', title: 'At the Hotel',
        topicHint: 'hotel stays, checking in and out, hotel facilities',
        newWords: [
          w('reservation',   'бронирование',         'I have a reservation under my name.'),
          w('check out',     'выписаться',           'We need to check out by 11 am.'),
          w('view',          'вид (из окна)',        'The room has a great view of the ocean.'),
          w('facilities',    'удобства / оснащение', 'The hotel has excellent facilities.'),
          w('complain',      'жаловаться',           'I had to complain about the noise.'),
        ],
        reviewWords: [
          w('check in', 'регистрироваться'), w('luggage', 'багаж'), w('gate', 'выход на посадку'),
        ],
      },
      {
        id: 'u8l4', title: 'Sightseeing',
        topicHint: 'visiting places, tourist attractions, exploring a new city',
        newWords: [
          w('attraction',    'достопримечательность', 'The main attraction is the old cathedral.'),
          w('local',         'местный / местный житель', 'Ask a local for the best restaurants.'),
          w('guide',         'гид / путеводитель',   'We hired a guide for the museum.'),
          w('souvenir',      'сувенир',              'I always buy a small souvenir to remember the trip.'),
          w('explore',       'исследовать',          'I love to explore new cities on foot.'),
        ],
        reviewWords: [
          w('reservation', 'бронирование'), w('facilities', 'удобства'), w('complain', 'жаловаться'),
        ],
      },
      {
        id: 'u8l5', title: 'Travel Experiences',
        topicHint: 'memorable travel moments, cultural differences',
        newWords: [
          w('culture shock', 'культурный шок',       'I had a bit of culture shock in Japan.'),
          w('customs',       'обычаи / таможня',     'Learning local customs is important.'),
          w('breathtaking',  'захватывающий дух',    'The view from the top was breathtaking.'),
          w('recommend',     'рекомендовать',        'I would highly recommend this place.'),
          w('unforgettable', 'незабываемый',         'It was an unforgettable experience.'),
        ],
        reviewWords: [
          w('attraction', 'достопримечательность'), w('explore', 'исследовать'), w('local', 'местный'),
        ],
      },
      {
        id: 'u8l6', title: 'Travel Problems',
        topicHint: 'dealing with problems while travelling',
        newWords: [
          w('lost',          'потерянный / заблудиться', 'I got completely lost in the city.'),
          w('insurance',     'страховка',            'Travel insurance is really important.'),
          w('emergency',     'чрезвычайная ситуация', 'In an emergency, call the local number.'),
          w('stolen',        'украденный',           'My wallet was stolen at the market.'),
          w('embassy',       'посольство',           'If you lose your passport, contact your embassy.'),
        ],
        reviewWords: [
          w('recommend', 'рекомендовать'), w('unforgettable', 'незабываемый'), w('customs', 'обычаи'),
        ],
      },
    ],
  },

  // ─── UNIT 9: Hobbies & Culture ─────────────────────────────────────────────
  {
    id: 'unit9', title: 'Hobbies & Culture', emoji: '🎭',
    lessons: [
      {
        id: 'u9l1', title: 'Free Time',
        topicHint: 'hobbies, free time activities, what you enjoy',
        newWords: [
          w('passion',       'страсть / увлечение',  'My passion is photography.'),
          w('pursue',        'заниматься / следовать', 'I want to pursue my interest in painting.'),
          w('hobby',         'хобби',                'Do you have any unusual hobbies?'),
          w('collection',    'коллекция',            'I have a large collection of old books.'),
          w('creative',      'творческий',           'I enjoy creative activities like drawing.'),
        ],
        reviewWords: [
          w('lost', 'заблудиться'), w('insurance', 'страховка'), w('emergency', 'чрезвычайная ситуация'),
        ],
      },
      {
        id: 'u9l2', title: 'Arts & Culture',
        topicHint: 'museums, galleries, theatre, arts',
        newWords: [
          w('exhibition',    'выставка',             'I went to a photography exhibition.'),
          w('performance',   'выступление / спектакль', 'The performance lasted two hours.'),
          w('impressive',    'впечатляющий',         'The museum was really impressive.'),
          w('audience',      'аудитория / зрители',  'The audience loved the show.'),
          w('exhibit',       'экспонат',             'My favourite exhibit was the Roman sculpture.'),
        ],
        reviewWords: [
          w('passion', 'увлечение'), w('pursue', 'заниматься'), w('creative', 'творческий'),
        ],
      },
      {
        id: 'u9l3', title: 'Film & Books',
        topicHint: 'films, books, series — talking about media',
        newWords: [
          w('plot',          'сюжет',                'The plot of this film is very unusual.'),
          w('character',     'персонаж',             'The main character is very complex.'),
          w('review',        'рецензия / обзор',     'Have you read any reviews of this book?'),
          w('based on',      'основан на',           'This film is based on a true story.'),
          w('genre',         'жанр',                 'What\'s your favourite film genre?'),
        ],
        reviewWords: [
          w('exhibition', 'выставка'), w('performance', 'спектакль'), w('impressive', 'впечатляющий'),
        ],
      },
      {
        id: 'u9l4', title: 'Sport & Competition',
        topicHint: 'watching and playing sports, team sports, competition',
        newWords: [
          w('compete',       'соревноваться',        'I used to compete in swimming.'),
          w('fan',           'болельщик / фанат',    'I\'m a huge fan of football.'),
          w('stadium',       'стадион',              'The stadium holds 80,000 people.'),
          w('cheer',         'болеть / поддерживать криком', 'Everyone was cheering for the home team.'),
          w('championship',  'чемпионат',            'Did you watch the championship final?'),
        ],
        reviewWords: [
          w('plot', 'сюжет'), w('character', 'персонаж'), w('genre', 'жанр'),
        ],
      },
      {
        id: 'u9l5', title: 'Social Life',
        topicHint: 'friends, social events, meeting people',
        newWords: [
          w('meet up',       'встретиться',          'Let\'s meet up this weekend.'),
          w('catch up',      'поговорить / наверстать', 'I need to catch up with old friends.'),
          w('invite',        'приглашать',           'She invited me to her birthday party.'),
          w('celebrate',     'праздновать',          'We celebrated his promotion at a restaurant.'),
          w('occasion',      'случай / повод',       'It was a very special occasion.'),
        ],
        reviewWords: [
          w('compete', 'соревноваться'), w('fan', 'фанат/болельщик'), w('cheer', 'поддерживать'),
        ],
      },
      {
        id: 'u9l6', title: 'Music',
        topicHint: 'music preferences, concerts, instruments',
        newWords: [
          w('lyrics',        'текст песни',          'I love songs with meaningful lyrics.'),
          w('instrument',    'музыкальный инструмент', 'Do you play any instrument?'),
          w('concert',       'концерт',              'I went to an amazing live concert last month.'),
          w('album',         'альбом',               'Their new album is absolutely brilliant.'),
          w('catchy',        'прилипчивый (о мелодии)', 'That melody is so catchy!'),
        ],
        reviewWords: [
          w('meet up', 'встретиться'), w('celebrate', 'праздновать'), w('occasion', 'повод'),
        ],
      },
    ],
  },

  // ─── UNIT 10: Plans & Opinions ─────────────────────────────────────────────
  {
    id: 'unit10', title: 'Plans & Opinions', emoji: '💬',
    lessons: [
      {
        id: 'u10l1', title: 'Making Plans',
        topicHint: 'arranging to do things, future plans, confirming or changing plans',
        newWords: [
          w('arrange',       'договариваться / организовать', 'Let\'s arrange to meet next week.'),
          w('look forward to', 'с нетерпением ждать', 'I\'m really looking forward to the trip.'),
          w('confirm',       'подтверждать',         'Can you confirm the time?'),
          w('postpone',      'отложить',             'We had to postpone the meeting.'),
          w('involve',       'включать в себя / подразумевать', 'The job involves a lot of travel.'),
        ],
        reviewWords: [
          w('lyrics', 'текст песни'), w('concert', 'концерт'), w('catchy', 'прилипчивый'),
        ],
      },
      {
        id: 'u10l2', title: 'Sharing Opinions',
        topicHint: 'expressing opinions, agreeing and disagreeing politely',
        newWords: [
          w('opinion',       'мнение',               'In my opinion, this is the best approach.'),
          w('agree',         'соглашаться',          'I completely agree with you.'),
          w('disagree',      'не соглашаться',       'I\'m afraid I disagree.'),
          w('suggest',       'предлагать',           'I\'d like to suggest a different solution.'),
          w('consider',      'рассматривать / обдумывать', 'Have you considered moving to a bigger city?'),
        ],
        reviewWords: [
          w('arrange', 'договориться'), w('look forward to', 'с нетерпением ждать'), w('postpone', 'отложить'),
        ],
      },
      {
        id: 'u10l3', title: 'Comparing Things',
        topicHint: 'comparing options, advantages and disadvantages',
        newWords: [
          w('similar',       'похожий',              'These two phones are very similar.'),
          w('difference',    'различие / разница',   'What is the main difference?'),
          w('advantage',     'преимущество',         'The main advantage is the price.'),
          w('disadvantage',  'недостаток',           'The biggest disadvantage is the size.'),
          w('whereas',       'тогда как / в то время как', 'I like tea, whereas my sister prefers coffee.'),
        ],
        reviewWords: [
          w('opinion', 'мнение'), w('agree', 'соглашаться'), w('suggest', 'предлагать'),
        ],
      },
      {
        id: 'u10l4', title: 'Solving Problems',
        topicHint: 'dealing with everyday problems, finding solutions',
        newWords: [
          w('issue',         'проблема / вопрос',    'There\'s a small issue with my order.'),
          w('solve',         'решать (проблему)',    'How did you solve the problem?'),
          w('approach',      'подход',               'Let\'s try a different approach.'),
          w('effective',     'эффективный',          'What is the most effective solution?'),
          w('deal with',     'разбираться / справляться', 'How do you deal with difficult people?'),
        ],
        reviewWords: [
          w('similar', 'похожий'), w('advantage', 'преимущество'), w('disadvantage', 'недостаток'),
        ],
      },
      {
        id: 'u10l5', title: 'Talking About the Future',
        topicHint: 'hopes, dreams, expectations for the future',
        newWords: [
          w('expect',        'ожидать',              'I expect things to get better soon.'),
          w('dream of',      'мечтать о',            'I\'ve always dreamed of living abroad.'),
          w('uncertain',     'неопределённый',       'The future feels very uncertain.'),
          w('eventually',    'в конечном итоге / когда-нибудь', 'I\'ll eventually learn to drive.'),
          w('optimistic',    'оптимистичный',        'I\'m quite optimistic about next year.'),
        ],
        reviewWords: [
          w('issue', 'проблема'), w('solve', 'решать'), w('deal with', 'справляться'),
        ],
      },
      {
        id: 'u10l6', title: 'Reflection & Review',
        topicHint: 'looking back, progress, what you have learned',
        newWords: [
          w('reflect on',    'размышлять / обдумывать', 'I often reflect on what I\'ve learned.'),
          w('progress',      'прогресс',             'I\'ve made a lot of progress this year.'),
          w('challenge',     'вызов / сложность',    'Every new skill comes with its challenges.'),
          w('motivate',      'мотивировать',         'What motivates you to keep learning?'),
          w('achieve',       'достигать',            'I\'m proud of what I\'ve achieved.'),
        ],
        reviewWords: [
          w('expect', 'ожидать'), w('dream of', 'мечтать'), w('optimistic', 'оптимистичный'),
        ],
      },
    ],
  },
]

// ─── Derived helpers ──────────────────────────────────────────────────────────

export function getAllLessons() {
  return CURRICULUM.flatMap(u =>
    u.lessons.map(l => ({ ...l, unitId: u.id, unitTitle: u.title, unitEmoji: u.emoji }))
  )
}

export function getLessonById(id) {
  return getAllLessons().find(l => l.id === id) || null
}

// ─── Progress (localStorage) ─────────────────────────────────────────────────

const PLAN_KEY = 'english_tutor_plan_v1'

function loadPlan() {
  try { return JSON.parse(localStorage.getItem(PLAN_KEY)) || { completed: [] } }
  catch { return { completed: [] } }
}

function savePlan(data) { localStorage.setItem(PLAN_KEY, JSON.stringify(data)) }

export function getCompletedLessons() {
  return new Set(loadPlan().completed)
}

export function completeLesson(lessonId) {
  const plan = loadPlan()
  if (!plan.completed.includes(lessonId)) {
    plan.completed = [...plan.completed, lessonId]
    savePlan(plan)
  }
}

export function getCurrentLesson() {
  const completed = getCompletedLessons()
  return getAllLessons().find(l => !completed.has(l.id)) || null
}

export function getPlanStats() {
  const all = getAllLessons()
  const completed = getCompletedLessons()
  return {
    total: all.length,
    done: completed.size,
    percent: Math.round((completed.size / all.length) * 100),
  }
}

// Build the vocabulary context string to inject into the AI system prompt
export function buildVocabContext(lesson) {
  const newList = lesson.newWords.map(w => `"${w.word}" (${w.ru})`).join(', ')
  const reviewList = lesson.reviewWords?.length
    ? lesson.reviewWords.map(w => `"${w.word}"`).join(', ')
    : null

  let ctx = `\n\nTOPIC FOCUS: ${lesson.topicHint}\n\nVOCABULARY FOR THIS LESSON:\n`
  ctx += `New words to introduce and naturally use in conversation: ${newList}.\n`
  if (reviewList) {
    ctx += `Also naturally weave in these review words from last lesson: ${reviewList}.\n`
  }
  ctx += `Use the vocabulary organically in your questions and responses — don't list or announce them.`
  return ctx
}
