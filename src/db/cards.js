/**
 * Messages from the Magi — Cards of Destiny
 * PRIMARY CARD DATABASE
 *
 * 53 cards numbered 1–53
 *   1–13  Hearts   (Ace → King)
 *  14–26  Clubs    (Ace → King)
 *  27–39  Diamonds (Ace → King)
 *  40–52  Spades   (Ace → King)
 *     53  Joker    (excluded from numerology)
 *
 * Fields per card:
 *   id              {number}  canonical card number 1–53
 *   name            {string}  display name e.g. "Ace of Hearts"
 *   suit            {string}  "Hearts"|"Clubs"|"Diamonds"|"Spades"|"Joker"
 *   rank            {string}  "Ace"|"2"…"10"|"Jack"|"Queen"|"King"|"Joker"
 *   numericalValue  {number}  used in all birth/compatibility calculations
 *   imagePath       {string}  root-relative path served from /public
 *   suitSymbol      {string}  ♥ ♣ ♦ ♠ ★
 *   suitElement     {string}  Water|Fire|Earth|Air|Spirit
 *   suitColor       {string}  hex accent color for UI
 *   suitKeywords    {Array}   thematic keywords for the suit
 *   keywords        {Array}   card-level keywords
 *   affirmation     {string}  REPLACE WITH SHARON'S VOICE
 *   action          {string}  REPLACE WITH SHARON'S VOICE
 *   description     {string}  REPLACE WITH SHARON'S VOICE
 *
 * Search "SHARON:" to find placeholder fields awaiting her content.
 */

const SUIT_META = {
  Hearts:   { symbol: "♥", element: "Water",  color: "#C0392B", keywords: ["emotion","love","intuition","relationships","feeling"] },
  Clubs:    { symbol: "♣", element: "Fire",    color: "#1A7A4A", keywords: ["creativity","action","inspiration","will","initiation"] },
  Diamonds: { symbol: "♦", element: "Earth",   color: "#2471A3", keywords: ["value","resources","manifestation","material","abundance"] },
  Spades:   { symbol: "♠", element: "Air",     color: "#6C3483", keywords: ["mind","truth","transformation","wisdom","the unseen"] },
  Joker:    { symbol: "★", element: "Spirit",  color: "#B8960C", keywords: ["infinite potential","the fool's journey","pure possibility"] },
};

const RANK_NUM = {
  Ace:1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,
  "8":8,"9":9,"10":10,Jack:11,Queen:12,King:13,Joker:0
};

function card(id, rank, suit, img, keywords, affirmation, action, description) {
  const m = SUIT_META[suit];
  return {
    id, rank, suit,
    name: suit === "Joker" ? "Joker" : `${rank} of ${suit}`,
    numericalValue: RANK_NUM[rank],
    imagePath: `/images/cards/${img}`,
    suitSymbol: m.symbol,
    suitElement: m.element,
    suitColor: m.color,
    suitKeywords: m.keywords,
    keywords, affirmation, action, description,
  };
}

export const CARDS = [

  /* ── HEARTS 1–13 ─────────────────────────────────────────────── */
  card(1,"Ace","Hearts","01_ace_of_hearts.jpg",
    ["new love","emotional beginnings","the seed of feeling"],
    "I open my heart to the love that is always available to me.",
    "Write a letter to yourself expressing one thing you genuinely love about who you are.",
    "The Ace of Hearts is the seed of all emotional experience — the very first beat of the heart's knowing. It carries the pure frequency of love before conditions are placed upon it. When this card appears, something new is stirring in the realm of feeling. A relationship, a creative passion, or a deeper connection to self may be awakening. This is an invitation to let love lead."),

  card(2,"2","Hearts","02_2_of_hearts.jpg",
    ["union","partnership","reflection","mirroring"],
    "I attract relationships that reflect my highest truth.",
    "Reach out to someone you care about today — not to ask or receive, but simply to let them know they matter.",
    "The 2 of Hearts speaks of union — the moment two hearts recognize one another. This card governs partnerships, deep friendships, and the sacred mirroring that happens when we are truly seen by another. It may indicate a meaningful connection is forming, or that an existing relationship is deepening. Are you showing up fully in your relationships?"),

  card(3,"3","Hearts","03_3_of_hearts.jpg",
    ["expression","creativity","emotional abundance","joy"],
    "I express my feelings freely and trust that they are welcome.",
    "Create something today — a drawing, a poem, a meal — purely for the joy of making it.",
    "The 3 of Hearts is the card of emotional expression and creative joy. Where the Ace planted the seed and the 2 recognized another, the 3 bursts into full bloom. This is the energy of celebration, laughter, and the overflow of feeling into creative form. When this card appears, life is asking you to express what is in your heart — out loud, with color, with music, with presence."),

  card(4,"4","Hearts","04_4_of_hearts.jpg",
    ["stability","emotional foundation","inner peace","contemplation"],
    "I am grounded in love. My heart is a sanctuary.",
    "Spend 10 minutes in stillness — no screens, no noise. Just breathe and notice what your heart has to say.",
    "The 4 of Hearts brings stability to the emotional realm. After the burst of the 3, the 4 asks us to settle, to build, to create a firm foundation from which love can grow sustainably. This is a card of emotional security and inner peace. It may also signal a period of contemplation — a time to look inward before moving outward again."),

  card(5,"5","Hearts","05_5_of_hearts.jpg",
    ["change","loss","transition","emotional growth"],
    "I move through change with an open heart, trusting what is being revealed.",
    "Identify one old emotional pattern you are ready to release. Write it down, then burn or bury the paper.",
    "The 5 of Hearts marks the turning point in the emotional journey — the place of necessary change, and sometimes loss. Something is shifting in the landscape of feeling. A relationship, a belief about love, or an old way of being may be transforming. The 5 of Hearts asks for courage and trust that what is falling away is making room for something truer."),

  card(6,"6","Hearts","06_6_of_hearts.jpg",
    ["harmony","healing","restoration","nostalgic love"],
    "I give and receive love freely, in perfect harmony.",
    "Do something kind for someone from your past — a card, a message, a prayer — without expectation of return.",
    "The 6 of Hearts is the card of harmony and healing in relationships. It carries a gentle, restorative energy — the kind that smooths over what has been fractured and returns us to a place of grace. This card often speaks of nostalgia, of revisiting the past with compassionate eyes, and of the healing that comes from generosity and forgiveness."),

  card(7,"7","Hearts","07_7_of_hearts.jpg",
    ["illusion","fantasy","spiritual love","the inner world"],
    "I see clearly through the eyes of love, without losing myself in fantasy.",
    "Sit with a dream you carry in your heart. Journal: what is real here? What is wishful thinking?",
    "The 7 of Hearts dwells in the space between imagination and reality. It is the card of dreams, romantic idealism, and the inner emotional life. This card can speak of beautiful visions and spiritual love — or of illusions that cloud our perception. When the 7 of Hearts appears, discernment is called for. The heart is powerful; let it dream, but also let it see."),

  card(8,"8","Hearts","08_8_of_hearts.jpg",
    ["movement","leaving behind","emotional maturity","moving on"],
    "I trust myself enough to walk toward what my heart truly calls for.",
    "Identify one situation you have been holding on to out of fear rather than love. Take one small step toward releasing it.",
    "The 8 of Hearts is the great walker — the one who moves on when it is time, even when the heart still lingers. This card speaks of emotional courage: the willingness to leave what no longer serves, even when it was once deeply loved. There is no bitterness here, only the quiet knowing that the journey must continue."),

  card(9,"9","Hearts","09_9_of_hearts.jpg",
    ["wish fulfillment","emotional completion","satisfaction","the wish card"],
    "My heart's deepest wishes are aligned with my highest good.",
    "Write down the wish closest to your heart right now. Hold it with open, expectant trust.",
    "The 9 of Hearts is known as the Wish Card — one of the most beloved in the deck. It carries the energy of emotional fulfillment, of dreams that come true, of the heart's deepest longings moving into form. When this card appears, pay attention to what you are wishing for. The universe is listening."),

  card(10,"10","Hearts","10_10_of_hearts.jpg",
    ["family","emotional wholeness","community","the full cup"],
    "I am held by love — from family, from community, from the universe itself.",
    "Gather with people who nourish your heart — in person or virtually. Share a meal, a memory, or simply your presence.",
    "The 10 of Hearts is the card of emotional wholeness — the full cup, the loving family, the community that holds us. It speaks of the joy that comes from belonging, from being part of something larger than ourselves. This is the energy of celebration, togetherness, and the deep satisfaction of a life rich in loving connections."),

  card(11,"Jack","Hearts","11_jack_of_hearts.jpg",
    ["the young lover","emotional idealism","charm","romantic messenger"],
    "I carry love as my message wherever I go.",
    "Write a love letter — to a person, to a dream, to life itself. Let it be unguarded and true.",
    "The Jack of Hearts is the eternal romantic — youthful, charming, and led entirely by the heart. This card often represents a person who carries love as their primary language, or it may speak to a quality within us: the part that dares to feel deeply, to pursue beauty, to keep the heart open. The Jack brings news of love — and an invitation to be brave enough to express it."),

  card(12,"Queen","Hearts","12_queen_of_hearts.jpg",
    ["emotional mastery","compassion","nurturing","intuitive wisdom"],
    "I love wisely, deeply, and without losing myself.",
    "Practice receiving today — allow someone to care for you without deflecting.",
    "The Queen of Hearts embodies emotional mastery. She is the archetype of deep compassion, intuitive wisdom, and nurturing love — not the kind that loses itself in others, but the kind that loves from a full cup. When this card appears, it calls forward your capacity to love wisely, to listen with your whole being, and to tend to the emotional landscape of yourself and those around you."),

  card(13,"King","Hearts","13_king_of_hearts.jpg",
    ["emotional authority","mastery through love","the compassionate leader"],
    "I lead with love and stand in the full authority of my heart.",
    "Make a decision today that is guided by love rather than fear. Notice how that feels in your body.",
    "The King of Hearts is love made sovereign. This is the archetype of the leader who governs from compassion — who has walked through enough fire to understand the full spectrum of human emotion and emerged with wisdom, not bitterness. Where are you being invited to lead with love?"),

  /* ── CLUBS 14–26 ──────────────────────────────────────────────── */
  card(14,"Ace","Clubs","14_ace_of_clubs.jpg",
    ["new beginnings","creative spark","inspired action","will"],
    "I am ignited. My creative fire burns with purpose.",
    "Start something today — even one sentence, one brushstroke, one step toward the goal.",
    "The Ace of Clubs is the lightning bolt of creative initiation. It carries the pure, unformed energy of inspired will — the moment before an idea becomes action. This card marks the beginning of a creative or energetic cycle. Something is being born through you. The Ace of Clubs does not wait; it moves. What is asking to be started?"),

  card(15,"2","Clubs","15_2_of_clubs.jpg",
    ["planning","vision","creative partnership","future-building"],
    "I hold my vision clearly and take the next step with confidence.",
    "Create a simple map of where you are headed. Let it be a living document, not a rigid plan.",
    "The 2 of Clubs is the card of the visionary who stands at the threshold. You have an idea, a spark — now you must look ahead and choose your direction. This card speaks of planning, creative partnership, and the exciting tension between potential and commitment. The world is full of possibility. The 2 of Clubs asks you to begin choosing."),

  card(16,"3","Clubs","16_3_of_clubs.jpg",
    ["expansion","enterprise","early success","collaboration"],
    "I expand boldly, knowing that what I build has lasting value.",
    "Identify one person whose skills complement yours. Reach out about a possible collaboration.",
    "The 3 of Clubs speaks of enterprise and expansion — the first fruits of creative effort beginning to show. Plans are moving forward, early success is visible, and the call is to build on the momentum. This card often indicates collaboration, the broadening of creative vision, and the satisfaction of seeing something you dared to begin actually growing."),

  card(17,"4","Clubs","17_4_of_clubs.jpg",
    ["celebration","completion","rest","creative homecoming"],
    "I celebrate what I have built and rest in the joy of accomplishment.",
    "Mark a recent accomplishment with a small ritual of celebration — a toast, a walk, a moment of gratitude.",
    "The 4 of Clubs brings us home after a period of creative work. This is a card of celebration and completion — the joy of having built something real and pausing to honor it. Like a housewarming for the soul, this card invites you to rest in what you have created and feel the deep satisfaction of work well done."),

  card(18,"5","Clubs","18_5_of_clubs.jpg",
    ["conflict","competition","friction","creative tension"],
    "I channel all tension into creative fuel. I am not diminished by opposition.",
    "Identify a current source of friction. Ask: what is this trying to show me? What strength is being called forth?",
    "The 5 of Clubs brings fire in the form of friction. This is the card of creative conflict — competing ideas, clashing wills, the chaos that can either scatter energy or forge something stronger. This card does not signal defeat; it signals the need for clarity, discernment, and the willingness to stand in your creative truth even when challenged."),

  card(19,"6","Clubs","19_6_of_clubs.jpg",
    ["victory","recognition","momentum","earned success"],
    "I receive recognition with grace and keep moving with purpose.",
    "Acknowledge your own victories — write down three things you have accomplished that you have not yet given yourself credit for.",
    "The 6 of Clubs is the card of earned victory. After the friction of the 5, this card brings recognition, momentum, and the satisfaction of having proven oneself. Success is not given here — it is earned. And it arrives with the energy of a parade, inviting you to accept your due and carry that confidence forward."),

  card(20,"7","Clubs","20_7_of_clubs.jpg",
    ["perseverance","standing ground","spiritual courage","the lone warrior"],
    "I stand firmly in my truth and do not waver in the face of opposition.",
    "Identify one area where you have been yielding to pressure when you should be standing firm. Choose one action that honors your truth.",
    "The 7 of Clubs is the card of the one who stands alone and holds the line. This is perseverance under pressure — the creative warrior who refuses to abandon their vision even when the world pushes back. This card often appears when we are being tested. Hold your ground. Your position has merit. Do not give way."),

  card(21,"8","Clubs","21_8_of_clubs.jpg",
    ["swift movement","messages","acceleration","inspired speed"],
    "I move swiftly and clearly toward what I am called to create.",
    "Take fast, decisive action on something you have been deliberating over. Trust the momentum.",
    "The 8 of Clubs is energy in flight — swift, direct, unstoppable. This card often signals rapid movement in a creative or professional arena: messages arriving, decisions being made, projects accelerating. There is no time for hesitation here. Move quickly. Communicate clearly. Ride the wave."),

  card(22,"9","Clubs","22_9_of_clubs.jpg",
    ["resilience","endurance","strength tested","the long road"],
    "I have what it takes. Every challenge has made me stronger.",
    "Take stock of how far you have come. Write down three challenges you have survived that you once thought might break you.",
    "The 9 of Clubs is the card of the battle-tested spirit. This is endurance energy — the quiet strength of one who has been through the fire and is still standing. This card may appear when you are weary but near the end of a long cycle. You have more in you than you know. Rest if you must. But do not give up."),

  card(23,"10","Clubs","23_10_of_clubs.jpg",
    ["responsibility","burden","completion through effort","legacy"],
    "I carry my responsibilities with strength, and I release what is not mine to carry.",
    "Audit your current responsibilities. Identify one thing you can delegate, release, or set down entirely.",
    "The 10 of Clubs is the card of great responsibility. The creative fire of the suit has built something substantial — and now there is much to carry. This card speaks of the weight of leadership, creative legacy, and the burdens that come with building something meaningful. Are you carrying what is truly yours? And are you carrying it with intention, not martyrdom?"),

  card(24,"Jack","Clubs","24_jack_of_clubs.jpg",
    ["the creative youth","inspired messenger","enthusiasm","fiery potential"],
    "My enthusiasm is my greatest creative asset. I let it lead.",
    "Pursue one thing today purely because it excites you — no outcome, no agenda, just the joy of the pursuit.",
    "The Jack of Clubs is the creative fire in its youngest, most enthusiastic form. This card brings messages of inspiration and the electric energy of new possibility. The Jack of Clubs does not overthink — he moves, creates, explores. When this card appears, let yourself be energized. Enthusiasm is the beginning of mastery."),

  card(25,"Queen","Clubs","25_queen_of_clubs.jpg",
    ["creative mastery","magnetic leadership","independent spirit","the inspired visionary"],
    "I create boldly and lead by the power of my authentic vision.",
    "Dedicate uninterrupted time today to your creative work — no apologies, no compromises.",
    "The Queen of Clubs is the creative force fully embodied. She is magnetic, visionary, and completely at home in the realm of inspired action. This card represents the mastery of creative energy — not through control, but through authentic expression and the confidence to lead with vision. She inspires others not by instruction, but by example."),

  card(26,"King","Clubs","26_king_of_clubs.jpg",
    ["creative authority","visionary leadership","the builder","inspired sovereignty"],
    "I lead with vision and build what the world needs.",
    "Articulate your creative vision clearly — in writing, in conversation, or in a sketch. Give it more concrete form today.",
    "The King of Clubs is the master builder — the one whose creative vision has matured into leadership. This card represents the full flowering of the suit's fiery energy: vision made real, inspiration turned into lasting structures, leadership grounded in genuine creative authority. You are being called to own your role as a builder and visionary."),

  /* ── DIAMONDS 27–39 ───────────────────────────────────────────── */
  card(27,"Ace","Diamonds","27_ace_of_diamonds.jpg",
    ["new resources","financial beginning","material seed","opportunity"],
    "I am open to abundance in all its forms. New resources flow to me.",
    "Identify one concrete opportunity in front of you right now. Write down three steps to move toward it.",
    "The Ace of Diamonds is the seed of material manifestation — the first breath of abundance entering form. This card speaks of new financial beginnings, unexpected resources, or the opening of an opportunity that has real, tangible value. Plant wisely. The Ace of Diamonds is only a seed — what grows from it depends entirely on the attention and energy you give it."),

  card(28,"2","Diamonds","28_2_of_diamonds.jpg",
    ["balance","juggling","adaptability","financial duality"],
    "I balance what I have and what I seek with grace and wisdom.",
    "Review your current resource landscape. Identify one area that needs rebalancing.",
    "The 2 of Diamonds speaks of the delicate dance of balance in the material world. Resources are shifting, and you are learning to juggle what you have with what you need. This card asks for adaptability and a light touch — don't grip too tightly. The 2 of Diamonds rewards those who can flow between abundance and simplicity without losing their center."),

  card(29,"3","Diamonds","29_3_of_diamonds.jpg",
    ["skill","craftsmanship","creative work","collaboration for value"],
    "My skills are valuable. I offer them with confidence and receive fairly in return.",
    "Identify one skill you consistently undervalue. Research what it is worth in the marketplace.",
    "The 3 of Diamonds is the card of skilled work and creative craftsmanship. This is the energy of mastery in service — the artisan, the specialist, the one whose value is recognized because their work speaks for itself. This card often signals a time of productive collaboration where different skills combine to create something greater."),

  card(30,"4","Diamonds","30_4_of_diamonds.jpg",
    ["security","conservation","material stability","holding on"],
    "I create lasting security from a place of abundance, not fear.",
    "Review your savings or financial safety net. Take one small, practical step toward greater material security.",
    "The 4 of Diamonds is the card of material security — the solid ground beneath your feet. It speaks of savings, protected resources, and the satisfaction of having built a stable foundation. However, this card carries a caution: security held too tightly becomes hoarding. The 4 of Diamonds asks you to build your stability wisely, without letting fear of lack close your hand."),

  card(31,"5","Diamonds","31_5_of_diamonds.jpg",
    ["material loss","financial challenge","resourcefulness","the lesson of lack"],
    "Even in scarcity, I am resourceful, resilient, and held.",
    "Identify one creative solution to a current material challenge. What resource do you have that you haven't fully utilized?",
    "The 5 of Diamonds can be a difficult card — it speaks of material hardship, financial strain, or a season of lack. But within every challenge of the 5 lives a lesson in resilience and resourcefulness. This is not a card of permanent poverty; it is a card of the alchemist who learns to make something from very little."),

  card(32,"6","Diamonds","32_6_of_diamonds.jpg",
    ["generosity","giving and receiving","charity","material flow"],
    "Abundance flows through me. I give freely and receive gracefully.",
    "Make a gift today — financial, material, or of your time. Give with no expectation of return.",
    "The 6 of Diamonds governs the sacred exchange of material resources. This card speaks of generosity, charity, and the understanding that true abundance is not hoarded but circulated. Examine the flow of giving and receiving in your life. Are you over-giving? Under-receiving? The 6 of Diamonds asks you to find balance in the flow."),

  card(33,"7","Diamonds","33_7_of_diamonds.jpg",
    ["patience","long-term investment","spiritual value","the harvest"],
    "I trust the timing of my harvest. What I have planted is growing.",
    "Identify one long-term investment — financial, creative, relational — and recommit to it today.",
    "The 7 of Diamonds is the card of the patient farmer — one who has planted well and now must wait. This card governs long-term investments, spiritual rewards that arrive in material form, and the wisdom of trusting a process even when the results are not yet visible. The 7 of Diamonds promises a harvest. But it asks: are you willing to tend the field before it arrives?"),

  card(34,"8","Diamonds","34_8_of_diamonds.jpg",
    ["diligence","apprenticeship","skill-building","refinement"],
    "I commit to excellence. Every repetition deepens my mastery.",
    "Dedicate focused time today to the deliberate practice of a skill. Show up fully, without shortcuts.",
    "The 8 of Diamonds is the card of the dedicated apprentice — the one who shows up every day to refine their craft, improve their skill, and build toward mastery. This card honors diligence, precision, and the willingness to do the work, especially when it is quiet and unsexy. Excellence is built in these moments."),

  card(35,"9","Diamonds","35_9_of_diamonds.jpg",
    ["material comfort","self-sufficiency","abundance earned","luxury"],
    "I have built something beautiful. I allow myself to enjoy it.",
    "Do one thing today that is purely a treat for yourself — with no guilt and no justification required.",
    "The 9 of Diamonds is the card of earned comfort and gracious self-sufficiency. This is abundance that has been built consciously — and now enjoyed without apology. This card speaks of financial independence, the pleasure of beautiful surroundings, and the deep satisfaction of a life that reflects your values. You have arrived. Enjoy what you have created."),

  card(36,"10","Diamonds","36_10_of_diamonds.jpg",
    ["family wealth","legacy","lasting abundance","generational flow"],
    "I build wealth that blesses not only me but those who come after me.",
    "Consider what legacy you are building — financial, creative, spiritual. Write down one intention for what you want to pass on.",
    "The 10 of Diamonds is the card of lasting abundance and generational legacy. This is not just wealth for oneself — it is wealth that flows through families, communities, and time. This card speaks of inheritance, of building something that outlasts the individual, and of the deep satisfaction of creating material security that blesses others."),

  card(37,"Jack","Diamonds","37_jack_of_diamonds.jpg",
    ["the opportunist","financial messenger","practical youth","news of value"],
    "I act swiftly on real opportunity. I know the difference between a good deal and a distraction.",
    "Research one financial or material opportunity that has come to your attention. Get the facts before deciding.",
    "The Jack of Diamonds brings news of opportunity — often financial or material in nature. This card represents the quick-minded entrepreneur who spots value where others do not and moves swiftly. When the Jack of Diamonds appears, pay attention to what is arriving: a deal, an offer, a financial message. Act thoughtfully, but don't let opportunity pass through hesitation."),

  card(38,"Queen","Diamonds","38_queen_of_diamonds.jpg",
    ["material mastery","practical abundance","the luxurious feminine","grounded prosperity"],
    "I am the embodiment of grounded abundance. I know my worth.",
    "Invest in yourself today — financially, creatively, or physically. Spend in a way that honors your value.",
    "The Queen of Diamonds is abundance embodied — grounded, sensual, and entirely at home in the material world. She knows the value of things and of herself. She creates beautiful, prosperous environments and tends them with intelligence and grace. This card represents the mastery of practical abundance: knowing how to attract, tend, and enjoy material resources without becoming enslaved to them."),

  card(39,"King","Diamonds","39_king_of_diamonds.jpg",
    ["financial mastery","material authority","the provider","practical wisdom"],
    "I lead with practical wisdom and create abundance that serves the greater good.",
    "Make one significant, wise financial decision today — an investment, a boundary, a commitment to your material future.",
    "The King of Diamonds is the master of the material world — not through greed, but through wisdom. This card represents the full maturity of the Diamonds suit: the ability to create, manage, and circulate abundance with authority and generosity. The King of Diamonds builds empires that serve. He is the provider, the investor, the one whose practical wisdom creates lasting value for all."),

  /* ── SPADES 40–52 ─────────────────────────────────────────────── */
  card(40,"Ace","Spades","40_ace_of_spades.jpg",
    ["truth","clarity","the sword of mind","new understanding"],
    "I welcome clarity, even when it cuts through comfortable illusions.",
    "Write the truth about one situation in your life that you have been softening or avoiding.",
    "The Ace of Spades is the sword of truth — the sharp, clear edge of the mind at its most penetrating. This card initiates a cycle of mental clarity, decisive knowing, and the courage to see things as they truly are. It can feel like a sudden illumination or a difficult revelation. The Ace of Spades cuts through illusion in service of truth. Are you ready to see clearly?"),

  card(41,"2","Spades","41_2_of_spades.jpg",
    ["indecision","stalemate","difficult choice","the need for discernment"],
    "I trust my inner knowing to guide me through uncertainty.",
    "Sit in stillness with a decision you have been avoiding. Ask your body: which path feels like expansion? Which feels like contraction?",
    "The 2 of Spades is the card of difficult choices and the tension of indecision. Two paths stand before you, and neither is obviously right. This card does not resolve the dilemma — it simply asks you to sit with the discomfort of not-yet-knowing long enough to find your genuine answer. The truth is already in you."),

  card(42,"3","Spades","42_3_of_spades.jpg",
    ["heartbreak","painful truth","grief","the clearing"],
    "I allow myself to grieve what was, so I can be fully present to what is.",
    "Give yourself permission to feel a loss or disappointment fully today. Do not rush to fix it.",
    "The 3 of Spades is one of the most tender cards in the deck — it speaks of heartbreak, of the grief that comes when mind and heart must accept a painful truth. This is not the card of permanent loss, but of necessary grief. Something must be felt before it can be released. What breaks open can also break us free."),

  card(43,"4","Spades","43_4_of_spades.jpg",
    ["rest","retreat","mental recuperation","the healing pause"],
    "I honor my need for rest. In stillness, I am restored.",
    "Schedule a genuine rest period today — no tasks, no media. Sleep, walk in nature, or simply sit. Let your mind recover.",
    "The 4 of Spades is the card of necessary rest. After the piercing energy of the 3, the mind and spirit require recuperation. This is not laziness — it is strategic withdrawal, the kind of stillness that restores clarity and prepares us for the next engagement. Rest is not retreat. It is preparation."),

  card(44,"5","Spades","44_5_of_spades.jpg",
    ["conflict","defeat","hollow victory","the cost of winning"],
    "I choose my battles wisely and walk away from conflict that costs more than it gives.",
    "Examine a current conflict. Ask honestly: what am I truly fighting for? Is it worth the cost?",
    "The 5 of Spades speaks of conflict and the complicated nature of winning. This card often signals a battle — of words, ideas, or wills — where even victory may feel hollow. It asks for an honest reckoning: what are you fighting for, and at what cost? Sometimes the wisest move is to walk away."),

  card(45,"6","Spades","45_6_of_spades.jpg",
    ["transition","passage","moving on","calmer waters ahead"],
    "I move through transition with trust, knowing calmer waters await.",
    "Identify a transition you are currently navigating. Write a letter to your future self on the other side of it.",
    "The 6 of Spades is the card of the passage — the gentle movement from a turbulent chapter into calmer waters. There is relief in the 6 of Spades, and the sense that the most difficult part is behind you. Trust the current. You are being carried forward."),

  card(46,"7","Spades","46_7_of_spades.jpg",
    ["strategy","cunning","solo action","the careful move"],
    "I act with strategy and integrity. I move carefully and without deception.",
    "Map out your current strategy for a goal. Identify any shortcuts you are tempted to take and ask: are they ethical?",
    "The 7 of Spades is the card of the strategist — the careful, often solitary thinker who moves behind the scenes. This card can represent clever, strategic action taken independently. It can also signal a caution: be mindful of who you trust, and be sure your own moves are above board. The 7 of Spades rewards intelligence, not deception."),

  card(47,"8","Spades","47_8_of_spades.jpg",
    ["restriction","self-imposed limitation","the inner prison","awaiting clarity"],
    "I release the beliefs that bind me. I am freer than I know.",
    "Identify one belief you hold about yourself that is keeping you stuck. Write it down, then write its opposite. Which feels more true?",
    "The 8 of Spades is the card of the self-imposed prison. Most of the restrictions this card speaks of are mental — beliefs we hold about what is possible, what we deserve, what we are allowed to do or be. The door is not locked from the outside. What would it mean to set yourself free?"),

  card(48,"9","Spades","48_9_of_spades.jpg",
    ["anxiety","dark night of the soul","fear","the mind at midnight"],
    "I am safe. This darkness is not permanent — it is a passage, not a destination.",
    "When fear arises, place one hand on your heart and breathe. Ask: what is actually true right now, in this moment?",
    "The 9 of Spades is the card of the dark night — those 3am hours when the mind is at its most restless and fear runs unchecked. This is the card of anxiety, of worst-case thinking, of the isolation that comes when we have lost touch with hope. And yet — every dark night eventually gives way to dawn. What fear is ready to be seen and released?"),

  card(49,"10","Spades","49_10_of_spades.jpg",
    ["endings","the final blow","completion through crisis","transformation"],
    "This ending is clearing the way for something I cannot yet see. I surrender.",
    "Sit with an ending or loss in your life. Write: what has this cleared? What might become possible now that this is complete?",
    "The 10 of Spades is the card of absolute endings — the final word, the closed door, the crisis that forces transformation. This is one of the most potent cards in the deck, and it does not arrive gently. But what the 10 of Spades takes, it takes for a reason. Every ending of this magnitude clears the ground for something entirely new."),

  card(50,"Jack","Spades","50_jack_of_spades.jpg",
    ["the clever youth","mental agility","sharp wit","news that cuts"],
    "I use my sharp mind in service of truth and growth.",
    "Write without editing for 10 minutes — let your unfiltered mind speak. Notice what clarity emerges.",
    "The Jack of Spades is the quick-minded, sharp-tongued messenger of the suit. This card brings information that cuts through confusion — sometimes uncomfortably. The Jack of Spades represents mental agility, wit, and the kind of clear-eyed perception that does not spare feelings in service of truth."),

  card(51,"Queen","Spades","51_queen_of_spades.jpg",
    ["mental mastery","clear perception","independence","the truth-teller"],
    "I see clearly. I speak truthfully. I love with open eyes.",
    "Have one honest conversation you have been avoiding. Say what is true with kindness, but say it.",
    "The Queen of Spades is one of the most powerful archetypes in the deck. She is the master of clear perception — the one who sees without illusion, who speaks truth without cruelty, and who has walked through enough grief to have wisdom in her bones. She is not unkind — she is undeniably honest."),

  card(52,"King","Spades","52_king_of_spades.jpg",
    ["mental authority","justice","the wise judge","sovereign mind"],
    "I think with clarity, judge with fairness, and act with moral authority.",
    "Approach one situation today as a fair, wise judge — weighing all sides before deciding. Notice what becomes clear.",
    "The King of Spades is the archetype of the sovereign mind — the judge, the philosopher, the one whose authority comes from the clarity and fairness of his thought. The King of Spades does not rule by force but by the undeniable power of clear, principled thinking. You are being called to embody wisdom over reaction."),

  /* ── JOKER 53 ─────────────────────────────────────────────────── */
  card(53,"Joker","Joker","53_joker.jpg",
    ["infinite potential","the wild card","the fool's wisdom","pure possibility"],
    "I embrace the unknown. I am the wildcard in my own story.",
    "Do one completely spontaneous thing today — unplanned, unstructured, purely in the moment.",
    "The Joker stands outside the numbered system — the wild card, the sacred fool, the one who bows to no rules. This card carries the energy of infinite potential and divine play. When the Joker appears, the ordinary rules do not apply. This is a moment of pure possibility, unexpected change, or the universe's invitation to stop being so serious about the game. Note: The Joker is excluded from standard numerological calculations in the Cards of Destiny system."),
];

export const CARD_BACK_PATH  = "/images/util/card_back.jpg";
export const SUIT_METADATA   = SUIT_META;
