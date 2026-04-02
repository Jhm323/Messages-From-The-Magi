/**
 * Messages from the Magi
 * PRIMARY CARD DATABASE
 *
 * 53 cards numbered 1–53
 *   1–13  Hearts   (Ace → King)
 *  14–26  Clubs    (Ace → King)
 *  27–39  Diamonds (Ace → King)
 *  40–52  Spades   (Ace → King)
 *     53  Joker    (excluded from numerology)
 *
 * Card descriptions sourced from Sharon Jeffers' physical deck and itsallinthecards.com.
 */

const SUIT_META = {
  Hearts:   { symbol: "♥", element: "Water",  color: "#C0392B", keywords: ["love","relationships","emotion","harmony","intuition"] },
  Clubs:    { symbol: "♣", element: "Fire",    color: "#1A7A4A", keywords: ["mind","intelligence","communication","creativity","knowledge"] },
  Diamonds: { symbol: "♦", element: "Earth",   color: "#2471A3", keywords: ["vision","business","material world","manifestation","abundance"] },
  Spades:   { symbol: "♠", element: "Air",     color: "#6C3483", keywords: ["transformation","self-mastery","spiritual growth","truth","rebirth"] },
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
    ["new beginnings","curiosity","excellence","new love","self-expression"],
    "Excellence is the keyword for my life. I give myself permission to begin anew.",
    "Take the road that excites you. Say yes to the adventure your heart is calling you toward.",
    "The magic carpet of curiosity has come to offer you a ride. Please jump on and enjoy the view. Give your mind free reign to explore and discover the wonders of your imagination to create a new relationship with yourself; a relationship that leads you to your truest self-expression. Spirit is calling you to the dance floor. Give yourself permission to begin anew. New love, new life, and a new you await your attention. Excellence is the keyword for the Ace of Hearts! This card can indicate a new person, and/or conception in all forms, or a new home. If you are needing to choose between two things, and can't do both, take the road that excites you. A call to enhance the quality of life for others is something to pay attention to."),

  card(2,"2","Hearts","02_2_of_hearts.jpg",
    ["union","partnership","soul calling","intimacy","reflection"],
    "I act from what I know is true for me. Intimacy begins with myself.",
    "Follow your heart and express what is most important to you. Say 'Yes' to love.",
    "The deeper embrace of self or with another is in the cards. Your soul is calling to you. Allow the past to fall behind and let go of that which no longer serves you or your life. Face forward to fall into love's embrace, for now and the future. Let yourself be the priority in all of your relationships. Partnerships of all kinds are favored, and each one will reflect the relationship you are having with yourself. It is most important that you act from what you know is true for you, rather than obligation. Follow your heart and express what is most important to you in every way. Listen to the call of your soul and say 'Yes' to love. Pay close attention to messages that come your way, and to all of your interactions. Intimacy is the key; first with self and then with others."),

  card(3,"3","Hearts","03_3_of_hearts.jpg",
    ["communication","perspective","inner knowing","clarity","choice"],
    "I already know the answer. I trust my inner knowing to guide me.",
    "Speak your truth. If you have something to share, you are meant to be heard.",
    "The grass is always greener on the other side of the hill. Or is it? If you are struggling with a decision that is taking you back and forth in your thinking, it might be wise to find a new approach. Changing your physical position with the intention of changing your perspective can bring you greater clarity. Communication is key and the gathering of information will bring balance. Ask your heart what feels right for you rather than someone else. There is no need to limit yourself to one choice or one thing. Inner knowing is the key, and some part of you already knows the answer. Trust that. If you have something you want to share you are meant to be heard, so please speak. If you are feeling to begin anew, take that step forward and give yourself permission to explore."),

  card(4,"4","Hearts","04_4_of_hearts.jpg",
    ["subtle messages","new foundations","passion","unseen forces","family"],
    "I embrace what is speaking to me. I build new foundations on love and passion.",
    "Pay close attention to what is least obvious. The unseen is speaking — listen.",
    "Pay close attention to that which is least obvious. If something is trying to get your attention it would be smart to embrace whatever that is to see and hear that which is speaking to you. Subtle messages can come out of nowhere right now, as the doorway to the unseen and the unknown is wide open. This is a time to build new foundations based on your passion and those things that bring you excitement. Love and relationship are key at this time — be sure that you are giving them your full attention. Hard work carried in the arms of grace will open the way for you to manifest your heart's real desires. If family, friends, or any of your relationships need you right now, you will be rewarded for whatever kindness and wisdom you share with them."),

  card(5,"5","Hearts","05_5_of_hearts.jpg",
    ["change","curiosity","adventure","inner knowing","growth"],
    "I trust and follow my inner knowing. Change is leading me to what I truly desire.",
    "Embrace change with curiosity. Say 'Yes please' to the adventure unfolding.",
    "Changes that are happening, or trying to happen, are for the better in the long run, especially changes with relationships, home, or location. Trust and follow the thoughts you are having with curiosity and receptivity as they lead you to what you truly desire, and the people and places you are meant to be with. Curiosity wants to take you on an adventure — say 'Yes please'. In the realm of business and finance, creativity and change can be your best friends at this time. Have faith in your inner knowing and where your desires are taking you, and look to the horizon for your true vision for yourself. Any changes that are occurring now are for the better. Embrace change. Be confident in your own self-awareness and trust what you know is true."),

  card(6,"6","Hearts","06_6_of_hearts.jpg",
    ["balance","harmony","creative ideas","relationship","personal freedom"],
    "I bring all my relationships to their greatest expression, beginning with myself.",
    "Initiate your ideas and bring them into form. Your creative power opens the door to freedom.",
    "Is there a relationship that needs to be brought into balance? The 6 of Hearts teaches us to take all of our relationships to the greatest possible expression in thought, feeling, action, and communication, beginning with our relationship with ourself. Balance and harmony must be the very foundation of your life, inside and in your surrounding environments. If there is discord, you are being called to action to bring about a change. It's time to initiate your ideas so you can bring them into form, as building on your ideas will open the door to your personal freedom. Your creative ideas will open, and favored, you just have to take action toward helping them come to fruition. You have the power to draw everything your way."),

  card(7,"7","Hearts","07_7_of_hearts.jpg",
    ["heart and mind","integrity","forgiveness","beauty","patience"],
    "I communicate from my highest integrity, with true kindness and compassion.",
    "Take an inward journey to receive the clearest direction and knowing.",
    "The heart and the mind together will bring the best results for decisions and actions to be taken at this time. If you use one without the other you may not reach your desired outcomes. If forgiveness is called for, it's your opportunity to take that step no matter what, and acceptance is the key to success. The 7 of Hearts teaches us to communicate from our highest integrity and with true kindness and compassion; if we look deep enough into the eyes of another, we see our reflection. This is the time to practice this. This card also represents the beauty of life and can draw you in that direction for your career or something that you desire to express at this time. Patience is important. Take an inward journey to receive the clearest direction and knowing."),

  card(8,"8","Hearts","08_8_of_hearts.jpg",
    ["love","support","encouragement","gratitude","inner refinement"],
    "I let my decisions be guided by love and gratitude. Greatness is the result.",
    "Reach out for support — it is waiting for you. Be open and receptive in each moment.",
    "The power of love is calling you to the dance floor! If there is something that you need support with, this is the time to reach out and let that support come your way, because it is waiting to do just that. Encouragement could come in ways you did not imagine or expect, so be open and receptive in each moment. Refinement in the inner world of your being may be called for at this time, and if this speaks to you — meditation or similar activities could make way for the greatest clarity. Let your decisions and your actions be guided by love and gratitude and you will find yourself in the pot at the end of the rainbow, as this is a most fortunate influence. Tap into your heart energy that knows that when someone or something is touched by the hand of love, greatness is the result."),

  card(9,"9","Hearts","09_9_of_hearts.jpg",
    ["universal love","letting go","values","release","charity"],
    "I commit to my values and release what no longer belongs. Universal love guides me.",
    "Let go of what no longer serves. Getting involved in a charitable way is favored.",
    "Is there someone that you might need to let go of now? If you know this is true then it's okay to do that. Letting go will serve everyone in the best possible ways. Spiritual and material values when in alignment will put you on the perfect path forward, so it's important to commit to your values rather than someone else's. This influence suggests that it's time to take things less personally so you can look at the bigger picture and have greater clarity. The 9 of Hearts is the card of universal love. This love is impersonal and therefore releases all attachment. If you know that there is someone in your life that no longer belongs there, this may be the time to let go and move on. Acknowledge the blessings and release attachment. Getting involved in a charitable way is favored."),

  card(10,"10","Hearts","10_10_of_hearts.jpg",
    ["community","recognition","good fortune","vision","generosity"],
    "I lead with love and idealism. I share my vision with those who care.",
    "Position yourself to receive. Be social and say 'Yes' to invitations.",
    "The Ten of Hearts represents the gathering of love and people, and this could be a time when people are drawn to you to express their gratitude for your being. Great good fortune comes through others with this card and its influences. People want to recognize you, so be sure to position yourself to receive. Take a stand to lead with love and idealism, as this will be in your favor. Any changes with work or career or the direction of projects is favored and will put you on the perfect path. If you have something you want to share with people this could be a sign that it's time to do that. Anything put into motion can expand with great good fortune. Share your vision with those who care and see what happens. This is a time to be social and say 'Yes' to invitations."),

  card(11,"Jack","Hearts","11_jack_of_hearts.jpg",
    ["self-love","boundaries","giving","fulfillment","self-value"],
    "My giving comes from a place of fulfillment. I put myself first and love flows freely.",
    "Create clear personal boundaries based in self-love. Take care of yourself first.",
    "Learning to put one's self first can be one of the hardest things to do. The Jack of Hearts teaches that there is a significant difference between giving and sacrifice. Giving comes from a place of fulfillment — and sacrifice is an act that comes from obligation — real or imagined. If you are needing to create better personal boundaries, this is the time to take that step for yourself. This jack teaches us to put ourselves first and to have clear personal boundaries that are based in our self-love and self-value. Sacrifice serves no one. Let your giving come from a place of fulfillment of self-love and self-giving. Your dreams are at the forefront of your giving — to you. When you take care of yourself, you become the way-shower of love. Do that."),

  card(12,"Queen","Hearts","12_queen_of_hearts.jpg",
    ["emotional balance","compassion","receiving","healing arts","harmony"],
    "I give from overflowing fulfillment. My needs matter too.",
    "Create space for others to give to you. Dream of what you wish to have and receive it.",
    "The Heart suit teaches us that emotional balance and harmony within ourselves and in life is the key to happiness. This queen is asking now if there is balance between what you give and what you are given and what you receive. Are you giving too much to others, putting them before you? If so, maybe it's time to change that behavior, as this queen is more suited to give from overflowing fulfillment. This is the crown of love and compassion. If you feel that your needs are not being met, perhaps now is the time to change that by creating the space for others to give to you. Dream of what you wish to have and imagine the crown of this queen as your own. If you are considering a career in the healing arts, this is a confirmation."),

  card(13,"King","Hearts","13_king_of_hearts.jpg",
    ["passion","beauty","ease","mastery","artistic success"],
    "I relax into my passionate nature and explore what I truly desire from life.",
    "Take action with the greatest possibility you see. Mastery with artistic ventures is favored.",
    "Perhaps it's time to relax more deeply into your passionate nature and explore in detail what you truly are desiring from life. Beauty and ease are two of the keywords for the King of Hearts, and when he shows up he wants to bestow upon you his goodness and graciousness for you to incorporate into your life. Mastery with emotions, feelings, and self-expression are important to balance. Success can be yours if you are true to your most sensitive nature. If you seek a lover — he will come. This card can also signify a baby boy who is on the way. It is time to take action with that which you see as the greatest possibility so that it might take form. Mastery and success with artistic ventures is highly favored, as is profession and self-owned business. It's okay to be master of your own time."),

  /* ── CLUBS 14–26 ──────────────────────────────────────────────── */
  card(14,"Ace","Clubs","14_ace_of_clubs.jpg",
    ["inspired ideas","new connections","confidence","self-knowing","new beginnings"],
    "I trust my ideas and feelings together. I rely on my confidence and self-knowing.",
    "Pay close attention to the people who show up and the ideas floating into your head. Act decisively.",
    "An inspired idea or a new connection with someone could lead to fresh opportunities, personally or professionally, and this can be a time for new beginnings, so pay close attention to the people who show up for you and the ideas that come floating into your head. Avoid taking the actions or words of others too personally right now — you must rely on your confidence and self-knowing to guide you. Do your best to be detached from the situation at hand so that you can gain and maintain greater clarity first as an observer. Trust your ideas and feelings together as one as this will give you the best foundation for decisive action. It's okay to be selfish if that's what is needed to be true to your being. A surprise soulmate connection is possible during this time."),

  card(15,"2","Clubs","15_2_of_clubs.jpg",
    ["inner conversation","authenticity","cooperation","clarity","communication"],
    "I choose what is best for me, and that will be best for everyone.",
    "Spend time with your inner knowing, then take action from a clear place in your heart.",
    "This could be a time to turn inward to observe the conversations you are having with yourself and how they are being expressed through your communication with others and what is manifesting in your life. If there is a conflict of any kind going on inside or out, it could be tied to the conversations going on in your head to the interactions with another person or a situation occurring in your life. Cooperation is the result of understanding, and it could be that more information is necessary to gain a greater perspective, which will result in clarity. Your authenticity is key — choose what is best for you and that will be best for everyone. Spend some time with your inner magician, then take action from a clear place in your heart."),

  card(16,"3","Clubs","16_3_of_clubs.jpg",
    ["creative intelligence","passion","excitement","expression","choice"],
    "I give my passion permission to lead the way. My excitement is real.",
    "Choose only what makes you happy. Let your excitement lead you forward.",
    "Your creative intelligence is calling for an avenue of expression. If this creative energy is not applied in some way, confusion or indecision could be the result. If you find yourself in a state of uncertainty, you may need more information and some physical activity to move the mental energy into balance. You are being asked to find your passion, and to give it permission to lead the way. This is what will make you happiest. If you find yourself torn between two choices go with your gut feelings — if you want to have both, you can do that as well. Don't get stuck in an 'either/or' space in your head. Be sure to choose what makes you happiest, and remember, the magic of life is real. Let your excitement lead you forward to choose only what makes you happy."),

  card(17,"4","Clubs","17_4_of_clubs.jpg",
    ["foundation","intuition","flexibility","growth","planning"],
    "I trust my judgment, my intuition, and my progressive thinking. I am true to myself.",
    "Make a solid plan and stay flexible. Go through the open doors, disregard the closed ones.",
    "This is the time to give your ideas a foundation for growth. Draw on your methodical mind to work for you to make a solid plan for what it is that you want to do. Trust your judgment, your intuition, and your progressive thinking at this time will guarantee success. Focused intention at this time will guarantee success. Take care that you don't limit yourself though with fixed ideas, as flexibility is the key to new growth taking place. Balance your intuition and your logic and follow the flow of energy as it leads the way. Go through the open doors. Disregard the ones that are closed. In regard to love and romance, it will be wise to trust what you feel is actual rather than what you hope is real when looking to see who someone really is. Be true to yourself."),

  card(18,"5","Clubs","18_5_of_clubs.jpg",
    ["curiosity","flexibility","mental curiosity","spiritual shift","openness"],
    "Curiosity is my greatest power. I am open and receptive to what change brings.",
    "Let curiosity lead the way. Be fluid and flexible — share what you are learning.",
    "Let curiosity lead the way. Remain open to changes with ideas, plans, and the direction you thought you might be going in. Shifts in thinking are opening up new horizons for you, and it will be wise for you to be fluid and flexible in general, and specifically. Flexibility is your greatest power at the moment! Change always brings growth. The 5 of Clubs is the card of mental curiosity, and it teaches us to be open and receptive to new ideas or changes that perhaps we didn't initiate or see coming. Curiosity is the key to opening new doors! Be receptive and look to see where the change could lead to, rather than fearing the loss of what is. This is an opportune time for a spiritual shift that is relative to your daily life. Share what you are learning with those who matter most in your life."),

  card(19,"6","Clubs","19_6_of_clubs.jpg",
    ["intuition","the messenger","inner rhythm","discipline","priorities"],
    "I trust what I see, hear, and know. I align with the natural rhythm of my being.",
    "Take time to be still and go within. Create structure and be true to yourself first.",
    "Trust your intuition. Trust what you see, trust what you hear, and trust what you know. Be aware of what is going on around you, as this is the card of the Messenger, and life could be speaking to you from every direction. Take time to be still to go within and feel the natural rhythm of your being, as this is of utmost importance at this time. Like the sea, you have a signature rhythm within and it is of utmost importance that you spend time aligning with that now. It could be time to create more structure and discipline in your life so that you make your inner nature your first choice of reference. Be clear with your priorities, and be true to yourself, first and always. Take responsibility for necessary adjustments that are called for now, and all will fall into place."),

  card(20,"7","Clubs","20_7_of_clubs.jpg",
    ["higher knowledge","refinement","gratitude","greatness","recognition"],
    "I express my brilliance with gratitude. Grace opens the door for my greatness.",
    "Refine your thinking and inner conversations. Gratitude is the key that opens the door for Grace.",
    "Time to go up one more level now to use your innate mental filters of refinement to tap into higher knowledge and higher self-awareness. When there is right order in the mind, we then proceed with a more panoramic view of life. Negative thought patterns and beliefs must be acknowledged and then changed to reflect the knowing of greatness. If necessary, refine your thinking and inner conversations going on in your psyche so that what goes on in your psyche supports what you truly want to manifest in your life. Refine communication so that you are expressing your brilliance in the same way. Gratitude is the key that opens the door for Grace to enter. This is a time when your greatness could be recognized or acknowledged in some way."),

  card(21,"8","Clubs","21_8_of_clubs.jpg",
    ["focused intention","clarity","right action","receptivity","success"],
    "Intention plus Action equals Success. My clear intention reveals my true direction.",
    "Be clear. Be open and receptive to ideas around you. Take action with your dreams.",
    "The key to the kingdom of the 8 of Clubs is focused Intention. This is the most powerful mental card in the deck, and with clear intention and right action anything can be accomplished. The operative word in that sentence is 'clear'. The secret to tapping this power is to be open and receptive to the ideas of others and to the changes that life presents to you. You must beware of fixed, inflexible attitudes. Be very attentive to the conversations that surround you, as those conversations are likely to be carrying a message in the form of ideas; messages that reveal your true direction. Intention plus Action equals Success. Your answer lies in the unity of spirit and matter and heaven and earth, both of which meet in the center of your being. Take action with your dreams."),

  card(22,"9","Clubs","22_9_of_clubs.jpg",
    ["bigger vision","open mind","collaboration","destiny","possibility"],
    "I think bigger. I let go of how things should be and let life show me something greater.",
    "Let go of your ideas of what is right. Step back and see where life is pointing you.",
    "Perhaps it's time let go of how you think things should be and open your vision to see what's possible in a larger way. If things aren't going the way you expect them to, maybe you are going in the wrong direction. Maybe life wants to give you something greater than what you have in mind. Perhaps the hand of fate is coaxing you to go in a different direction. To know, you must let go of your ideas of what you think is right and step back so that you can see the direction that life is pointing you in. The 9 of Clubs says — 'Think bigger'. Let go of how you think things should be and let life show you something greater than you have imagined for yourself. Choose to participate in collaboration with your heart's desire, make this the priority. Be the possibility!"),

  card(23,"10","Clubs","23_10_of_clubs.jpg",
    ["passion","teaching","healing","publishing","spiritual initiation"],
    "I align my actions with my passion. I invest my time and energy in what truly matters.",
    "Define the plan for you and you only. Put your priorities in order to make this happen.",
    "The rich and power-filled 10 of Clubs calls you to align your actions with your passion personally and professionally. It's time to get to work by investing your time and energy into what it is that you want to manifest, what you really are as a teacher and a healer. Define the plan for you, and you only, and put your priorities in order to make this happen. This is a time when you could be influenced by a mentor or guide who will give you the direction and confirmation you desire. Healing and teaching are favored in every way for you and from you to others. Spiritual initiation to greater self-awareness is happening. Be sure to give yourself some time to be social with people of like-mind now. Publishing is favored."),

  card(24,"Jack","Clubs","24_jack_of_clubs.jpg",
    ["awareness","logic","technology","creative exploration","perception"],
    "Logic is my friend. I reach high and wide with my awareness and perception.",
    "Pay attention to your thoughts. Be open and receptive to what is offered.",
    "Reach high and wide with your awareness and your perception. This jack is a genius of sorts who stimulates creative exploration and expression. This card also favors anything having to do with technology and the internet, property and real estate, so any of the aforementioned could be in the limelight and can bring you success. Logic is your friend right now, because with this Jack logic overrides emotion. Drama is not the path so if someone is bringing too much drama, dismiss it, and possibly them. Logic and rational thinking are key. Use logic wisely and draw on compassion when dealing with others. This is lightning fast energy that opens to the future, so expect the unexpected and be open and receptive to what is offered. Pay attention to your thoughts."),

  card(25,"Queen","Clubs","25_queen_of_clubs.jpg",
    ["intelligence","intuition","kingdom","leadership","grace"],
    "I take charge of what is being created in my life with a keen eye and exalted intuition.",
    "Take stock of your kingdom and make any necessary changes. Trust your intuition.",
    "There is a throne within each one of us, and when this queen shows up she beckons us to sit in that inner throne to view our kingdom with compassion and scrutiny. Who's in the kingdom, how did they get there, do they belong, are all things running as desired, and is there something I need to pay closer attention to? These are the questions of this queen. Your life is your kingdom. The Queen of Clubs calls you to take charge of what is being created with a keen eye and exalted intuition. This is a card of great intelligence and unending grace. If there is a woman who is playing a powerful role in your life — it might be wise to understand the role she is playing with greater insight. Is it time to take stock of your kingdom and make any necessary changes? Trust your intuition!"),

  card(26,"King","Clubs","26_king_of_clubs.jpg",
    ["authenticity","inner rhythm","insight","intuition","mental mastery"],
    "I walk to the beat of my own drum, in perfect harmony with my innermost natural rhythms.",
    "Have the inner conversations that create what you want. Your imagination is your castle.",
    "The crown of authenticity invites you to walk to the beat of your own drum. Of course that's after you gather the materials for the drum, build the drum, and then play it in perfect harmony with your innermost natural rhythms. The power of this mental crown blesses you with the gifts of insight, intuition, patience, and personal power to be in perfect delivery of who you are, right here and now. Let your imagination transport you to the castle of your dreams, as it is there you will find your true passion. This card signifies an intelligent man who could have great influence for you right now. Be open and receptive to who comes before you. Your inner conversations are the secret to all that you create in your life. Be sure you are having the conversations that create what you want."),

  /* ── DIAMONDS 27–39 ───────────────────────────────────────────── */
  card(27,"Ace","Diamonds","27_ace_of_diamonds.jpg",
    ["vision","imagination","new business","opportunity","manifestation"],
    "I ask myself 'What is possible?' and then take action to follow where I am drawn.",
    "Let your imagination compose what your heart desires to manifest, then say 'Yes'.",
    "Pay close attention to where your imagination is taking you and to the visions you are having when your imagination has chosen. When the mind wanders, it often reveals our truest desires. This is the card of the visionary, the one who looks forward to the future to see what can be and what is possible. Ask yourself, 'What is possible'. Once your vision comes into clear sight, take action to follow where you are drawn to be, wherever that is, and to what you feel excited about doing, whatever that may be. Let your imagination compose that which your heart desires to manifest, and then say 'Yes'. New business is favored, as are new opportunities and something great is on the way!"),

  card(28,"2","Diamonds","28_2_of_diamonds.jpg",
    ["intuition","vision","self-expression","partnership","focus"],
    "Intuition is in the driver's seat. I follow my true vision to bring my desires into being.",
    "Focus on the end result and go with the flow. Be true to yourself. Partnerships are favored.",
    "Logic must be given the position of co-pilot for the moment, and Intuition must be in the driver's seat. What is the vision that you hold for yourself right now? It's time to follow your true vision so that you can coax the physical realm to respond to what you see and what you desire. This is how you will bring your heart's desire into being. With your vision as your guide, you can create a clear pathway to your self-expression. Stay focused on the end result and go with the flow that leads you there. See the possibility you hold for yourself as a reality. In doing so you will naturally compel your desired outcome. Creative intelligence is at your beck and call. Partnerships are favored. Focus, and be true to yourself."),

  card(29,"3","Diamonds","29_3_of_diamonds.jpg",
    ["clarity","boundaries","uniqueness","authenticity","wholeness"],
    "My uniqueness is my magic wand. My greatest self-expression is outside the box.",
    "Seek clarity first. Physical movement helps. Make a clear decision from a place of wholeness.",
    "Feelings of being uncentered or ungrounded if not kept in check can lead to chaos and confusion. If there is a decision to be made, clarity must be sought first. Gather whatever information you need to make you comfortable, then wait to take action until it feels like right timing for you. Physical movement can help to bring your mind back into focus. One must be whole with oneself to make a clear decision. Perhaps the lesson to be learned has to do with having clearer boundaries, and making the choice to lead the way with what you know is right for you. Your greatest self-expression is outside the box, because the further you go in that direction the greater your success will be. Your uniqueness is your magic wand."),

  card(30,"4","Diamonds","30_4_of_diamonds.jpg",
    ["security","stability","hard work","financial integrity","good fortune"],
    "I build on existing foundations with flexibility and financial integrity.",
    "Be open and receptive to creative ideas. Hard work will pay great dividends.",
    "Security and stability are at the door and they want to come in. Building on existing foundations for success is highly favored at this time. It might be wise to exercise flexibility with new ideas, especially if they are coming from someone else. Be open and receptive to all creative ideas, especially ones that stimulate change. This is a time to be productive with your ideas, and adventurous with your spirit. Hard work will pay great dividends and bring personal fulfillment. Financial integrity will open the gates to great good fortune, and luck could come from foreign interests. In matters of the heart, keep both eyes open the logic in fact so that you see clearly who is repeating old patterns — this will serve you best."),

  card(31,"5","Diamonds","31_5_of_diamonds.jpg",
    ["values","priorities","honest communication","truth","networking"],
    "I follow my deepest passion. Honest communication brings resolution.",
    "Ask questions. Seek greater understanding. Networking and groups support your ideas.",
    "Changes in your values and the shifting of your priorities are likely now. Follow your deepest passion to stay on the best path for you. If you are guided to, or have had thoughts about doing something for those less fortunate, this is your spirit seeking to fulfill its destiny, and it would be wise of you to pay attention and take action with your ideas. Seeking greater understanding, or searching for the truth of something that perhaps is questionable at the moment will bring resolution. Honest communication is the key. Interaction with groups or networking is favored to support your ideas and bring balance to any doubts of succeeding. It's okay, and important to ask questions."),

  card(32,"6","Diamonds","32_6_of_diamonds.jpg",
    ["clarity","inner and outer balance","integrity","finances","priorities"],
    "Integrity is the key. I am true to myself in the greatest ways possible.",
    "Let your intuition and logic work hand in hand. Take responsibility for necessary adjustments.",
    "The balance of inner and outer perception is the key to having clarity. When your intuition and your logic are working hand-in-hand, your priorities are in order. The call for responsibility to order is initiated by taking responsibility for actions. Integrity is the key. This card signifies that this could be a time to make important adjustments, particularly in regard to finances. If those are in order, perhaps seeing a greater way to move to a more creative path of thinking about what you're doing. If something isn't working for you, you must ask if you are being true to yourself in the greatest ways possible. If not, this would be a good time to change things so that you become your first priority."),

  card(33,"7","Diamonds","33_7_of_diamonds.jpg",
    ["heaven and earth","spirit and matter","trust","faith","creation"],
    "I step into the center of creation and recognize the gift of my life.",
    "Let go of fears related to the physical plane. Trust and let go — everything will come your way.",
    "This card represents the union of Heaven and Earth, and Spirit and Matter, and the connection between the Heart and the Mind. This balance of 'all that is' invites you now to step into the center of creation and recognize the gift of your life. Let go of fears related to the physical plane and give way to trust and faith and the confidence of creation itself. If you are breathing, you are meant to be here and life has a plan for you. The diamond pierces both the heavens and the earth and is the only stone that allows light to pass through it. Be the diamond who stands connected to the heavens and the earth and to spirit and matter jointly, allowing the light to pass through you. Trust and let go of anything that is holding you back and everything will come your way."),

  card(34,"8","Diamonds","34_8_of_diamonds.jpg",
    ["perception","truth","authenticity","recognition","self-honesty"],
    "I speak and live in my truth. All the goodness I give is coming back to me now.",
    "Be honest with yourself about what you see. Dare to do things your way.",
    "The power of perception is blessing you. Like standing on the top of a tall mountain, if you stop and look around you can see everything clearly. The key is to stop and look. Justification and rationale are not your friends at the moment — they are storytellers who can take you far away from yourself. Your intuition and imagination are your best friends. Be honest with yourself and what you know you are seeing. Take the actions that set you apart and support your authenticity. Recognition can come from your commitment to self and your choice to speak and live in your truth. Dare to do things your way. All the goodness you give is coming back to you now. Open your arms to receive those blessings, and enjoy your magnificent self."),

  card(35,"9","Diamonds","35_9_of_diamonds.jpg",
    ["networking","generosity","abundance","giving","like-minded community"],
    "I give without expectation. Through giving, the pathways of life open for me.",
    "Gather with like-minded people and share your ideas. Give freely and receive unexpected goodness.",
    "This is a great time to network with others or to promote people or things that you love. Gather with like-minded people and share your ideas, as it is through giving that your greatest blessings will find their way to you. Connect and network with people together for their success. The greater the abundance you create for others, the greater your abundance will be. Take care not to have unreasonable expectations of people or situations, as this will undermine your higher expressions. The secret now is to give without the expectation of receiving anything in return; this will open the pathways for life to give to you. Build your house on a foundation of love, as this will open the doors for you to receive unexpected goodness. Enjoy."),

  card(36,"10","Diamonds","36_10_of_diamonds.jpg",
    ["gratitude","good fortune","sincerity","simplicity","receiving"],
    "Gratitude is my magic wand. I receive in the greatest ways possible, without expectation.",
    "Be grateful for every little thing. Trust life is taking care of you and see its beauty.",
    "Gratitude is your magic wand right now, and it is the key to all realms of good fortune and happiness that want to come your way. Good fortune wants to rain upon you, the secret is to work hard for what you want and be grateful for every little thing you have been given in your life. If you trust your intuition, and keep your lesser desires in check, while giving to the world around you from a place of sincerity, you will be rewarded from every direction with goodness and greatness. To not want is the key. To be grateful is the secret. Trust life is taking care of you and to see the beauty in the simplicity of life will open the floodgates of goodness and light your path each step of the way. It's time to receive in the greatest ways possible, without expectation. Enjoy."),

  card(37,"Jack","Diamonds","37_jack_of_diamonds.jpg",
    ["entrepreneurial spirit","originality","innovation","freedom","ingenuity"],
    "The more original I am, the greater my success. Ingenuity carried on integrity brings fortune.",
    "Think outside the box. Build new foundations from passion and excitement. Dare to be original.",
    "Thinking about starting your own business? If you have drawn this jack, he's here to bless you with his entrepreneurial spirit and give you the go ahead. Let your clever self lead the way forward. Think outside the box with your ideas and dare to be original, because the more original you are the greater success you will have in your endeavors. Creative financial undertakings are highly favored, especially if they are inspired by fresh, innovative ideas. Foreign interests are favored as well. Build new foundations from passion and excitement that come from your dreaming. Whatever the case may be — if you want your freedom, this is a great direction for you to take. Ingenuity carried on integrity can bring great success and much good fortune."),

  card(38,"Queen","Diamonds","38_queen_of_diamonds.jpg",
    ["self-reflection","intelligence","communication","arts","self-worth"],
    "I deserve love, respect, and all the goodness that life has to offer.",
    "Look in the mirror to see what your spirit is asking you to see in yourself.",
    "Challenges that come forth in our relationships with others are personal lessons for our own growth. That which we see in another is a reflection of the relationship we are having with ourself. If you are challenged in this way right now, perhaps you might try lowering your expectations of another, and look in the mirror to see what your spirit is asking you to see in yourself. Look for the goodness that your highly sophisticated intelligence wants to be recognized in a greater way. In the realms of business this is a favorable card, especially in regard to the arts or communication. Trust where your intuition wants to take you. Know that you deserve love and respect, and all the goodness that life has to offer."),

  card(39,"King","Diamonds","39_king_of_diamonds.jpg",
    ["ethics","integrity","intuitive intelligence","business success","leadership"],
    "I trust my intuitive intelligence. I step into my power and assume the crown of integrity.",
    "Take the lead, be the boss, trust your intuition. The key to success is the crown of integrity.",
    "Ethics is the name of the game, integrity and focus are the keys that open the doors to good fortune. This is a time when your awareness and your perception will serve you well in all situations. Don't take things at face value, rather seek to find the source within or behind what is being presented to you and by all means, trust your intuitive intelligence. This card is an indication of success in business. It is time to step into your power and take hold of what you know belongs to you. Trust the ideas that come to you. Someone of power will be available to assist you. It's important for you to take the lead, be the boss, and run the show in partnerships. Your intuition is trustworthy, give it the power to lead your way. The key to success with this king is to assume the crown of integrity."),

  /* ── SPADES 40–52 ─────────────────────────────────────────────── */
  card(40,"Ace","Spades","40_ace_of_spades.jpg",
    ["spiritual death and rebirth","intuition","truth revealed","new direction","receptivity"],
    "I am true to my personal wisdom. The invisible becomes known and I trust what I know.",
    "Listen carefully and openly to self and others. Time alone in meditation is important.",
    "The magician has come to bring you a magic wand — that magic wand is your power to create. Be true to your personal wisdom and the beauty you know that lives within inside of you. The invisible can become known now. Secrets or untruths are revealed, and you can trust that what you feel is certain. Pay attention to your five senses and your keen intuition. This is the card of spiritual death and rebirth, so new insights are more than likely and you can trust what you know. The cards indicate a new job, or career, or a new way of doing business. If you are thinking about taking things in a new direction you are thinking correctly. Time alone in meditation is important. Listen carefully and openly to self and to others. Receptivity is key."),

  card(41,"2","Spades","41_2_of_spades.jpg",
    ["sharing wisdom","partnership","authentic self","inner knowing","teaching"],
    "I give the gift of personal wisdom to the world. Life is speaking to me and I commit to listening.",
    "Trust what you know is true. Take actions that support your inner knowing and go forward.",
    "If you have something valuable to share and you are feeling the need to do that, sharing it now could have great impact on you and someone else. The dreamer within is calling to guide you to be aligned with your authentic self and to take a step in the direction that your heart desires. It's time to give the gift of personal wisdom to the world around you. Partnerships are in focus, and they are favored. If you are considering a new partnership this could be a good time. If you are concerned about a partnership, trust what you know is true, trust your intuition and take the actions that support your inner knowing. If you are thinking about teaching or healing, this card is a confirmation to go forward. Life is speaking to you, commit to listening."),

  card(42,"3","Spades","42_3_of_spades.jpg",
    ["new journey","creativity","risk","self-expression","balance"],
    "I let go of hidden fears and take action. Balance in living is key to a clear perspective.",
    "Take one step forward now. Trust that it's time to take a risk, especially with creativity.",
    "One step forward now can begin a new and successful journey. If you have an idea that you've been thinking about pursuing, this is the time to take action. If many things are on the horizon, see how they blend together. If uncertainty or confusion are present, trust that it's time to take a risk, especially with creativity in, or with business. New opportunities are likely to show up now. This is the time to think in unique ways to experience greater joy through your self-expression and your work. This card blends the imagination with the ability to do business. Hidden fears can hold us back — let go of any fears and take action. Trust what you know and take the steps to go forward into the world around you. Remember, balance in living is key to holding a clear perspective."),

  card(43,"4","Spades","43_4_of_spades.jpg",
    ["good fortune","partnership","building","new income streams","receptivity"],
    "I work for what I want and follow my ideas to build platforms upon which they can grow.",
    "Work! Build! Create! Be open and receptive to opportunities and guidance that come to you.",
    "This is a card of great good fortune, and that fortune comes to you when you work for what you want and follow your ideas to build platforms upon which they can grow. The opportunity is to join in partnership with your visions of the future and take action to create what you see. The power of an influential person could support you to bring your ideas to fruition so be open and receptive to the opportunities that come to you. Work! Build! Create! With new foundations, new streams of income will flow. If you have been resisting a change, or something that keeps showing up, perhaps it's time to be more open, and also to listen to what others are saying if they have guidance for you. It's okay to trust."),

  card(44,"5","Spades","44_5_of_spades.jpg",
    ["change","progressive outcomes","allies","presence","something bigger ahead"],
    "I move forward with full presence of being. Something bigger is ahead.",
    "Let people support you — let the love in. Thank the past and turn toward the future.",
    "Changes in life, work, or health are likely now, and they can come quickly and unexpectedly. Be sure that you are at the forefront of what is going on in your life so that you are in command of what is happening while being open and receptive to any shifts that are going on. When the 5 of Spades brings change the outcomes in the end are always progressive and for the best. People are your allies — let them support you — let the love in. This card can be an indication that it's time to change something that you've been resisting. If that's true for you, let go and move forward because ahead of you is where the gifts are waiting. Thank the past, turn toward the future, and move with full presence of being. Something bigger is ahead."),

  card(45,"6","Spades","45_6_of_spades.jpg",
    ["fate and destiny","subconscious dreaming","inner wisdom","soul's call","adjustments"],
    "I am true to myself. My inner wisdom brings my good fortune.",
    "Dream and imagine. Let your choices come from your deepest inner knowing.",
    "Fate and Destiny have walked in the door and they are asking for your attention. Do you feel the call of your destiny? This is a very special time in your life, and the deeper you go within yourself, the greater view you will have of what lies ahead. Take the time to dream and imagine, this is very important. If there are adjustments to be made in your life, this is the time to make them, but your choices must come from your deepest inner knowing. The key is to tap into your subconscious dreaming and rest in your imagination and let both take you on a journey to reveal to you the truest desires of your heart and your soul. Any adjustments that you make from your inner wisdom will bring your good fortune, all you have to do is be completely true to yourself."),

  card(46,"7","Spades","46_7_of_spades.jpg",
    ["the mystic","inner truth","personal power","stillness","self-mastery"],
    "I have a golden crown of mastery. I choose what I want from within.",
    "Dive deep inside and discover your truth. All questions find their answers in stillness within.",
    "Any obstacles that you are experiencing in life can be easily removed with the proper perspective. That perspective will come from you diving deep inside and discovering your truth. This is the card of the mystic, and it does not accept 'No' for an answer. Being true to yourself no matter what is the message of the 7 of Spades. In our stillness, as all questions find their answers in that place within. There is great personal power available to you now, it's simply a matter of putting yourself on track. You have a golden crown of mastery sitting on your head, this energy can serve you in all ways in the world. Choose what you want from within."),

  card(47,"8","Spades","47_8_of_spades.jpg",
    ["self-discipline","self-mastery","authenticity","new project","authority"],
    "I give myself permission to be the authority. My authenticity enlightens others.",
    "Establish new disciplines that support your direction. Focused integrity guarantees success.",
    "Is it time to change old patterns or habits that are no longer serving you? It's time to establish new disciplines that support your chosen direction in life, or the direction you desire to take? Self-discipline will lead to self-mastery, and with the 8 of Spades showing up, it might be time to take all of the aforementioned up a notch, as this is what will guarantee success. If you are embarking upon a new project, the cards say that there is success before you — the more focused and disciplined you are with your integrity, the greater the outcome. Give yourself permission to be the authority. The gift of your authenticity will be enlightening for others, it's just a matter of owning that fully and allowing the expression of your true nature to be at the forefront of your actions. Enjoy that."),

  card(48,"9","Spades","48_9_of_spades.jpg",
    ["reinvention","rebirth","letting go","death and rebirth","creativity"],
    "I embrace the unknown. I let go of what no longer serves who I am becoming.",
    "Embrace the unknown. Is it time to let go? Creativity is favored — create anew.",
    "The 9 of Spades represents and initiates the reinvention of self and re-creation of life, it might be that this is a time when letting go of the past in many ways is the order of business. Personal and spiritual initiation are on the table when this card shows up. It is commonly referred to as the 'death card', and often people, things, and ways of life change or are lost. When these things happen, they are destined to be. The highly creative influences with you now beckon you to create anew. Often we are asked to let go of that which no longer serves who we are becoming. This is a powerful time of death and rebirth, rejuvenation and reinvention. Is it time to let go? If it is, it will serve you beyond measure to do so. Embrace the unknown. Creativity is favored."),

  card(49,"10","Spades","49_10_of_spades.jpg",
    ["spiritual accomplishment","right action","compassion","service","success"],
    "I blend my highest values with my thoughts and deeds. Success is mine for the asking.",
    "Let your motivation and inspiration move you into action. Remember those who love and care for you.",
    "Spiritual and material accomplishments are the rewards for right action. When we blend our highest values with our thoughts and deeds, the reward is pure success, and great personal empowerment. Love is the desired expression for this card, and whatever is built must be founded on compassion. Service to humanity in some way is highly favored. If you can integrate that into business you will receive the blessings of the gods. Either way, this card says that success is yours for the asking. The 10 of Spades showing up indicates that your desired direction is sure to bring you success. Action is the key with this influence, so let your motivation and your inspiration move you into action. Be sure that with your newfound success, you remember those who love and care for you."),

  card(50,"Jack","Spades","50_jack_of_spades.jpg",
    ["spiritual initiation","inner life","integrity","ingenuity","follow-through"],
    "My inner life is my first priority. Integrity in word and action leads to great success.",
    "Serve the inner aspect of your being. Clearly refined ideas come alive with intentional action.",
    "This is the card of spiritual initiation, and this jack suggests that your inner life be your first priority, so whatever you can do to serve that aspect of your being, do that. On the mundane level of things, cleverness, ingenuity, and follow-through will get you exactly what you want, integrity in word and action is the key. Clearly refined ideas can lead to great success — the magic comes alive with your intentional actions. In the shadows, this jack says trust life, but lock the doors. Keep what is yours close to your heart and be faithful to your intuition if trust is an issue. If you are not paying attention, deception could sneak in the door. Remain aware and trust your instincts. The creative force of nature that can bring great good fortune will be the reward for your endeavors."),

  card(51,"Queen","Spades","51_queen_of_spades.jpg",
    ["self-mastery","manifestation","innocence","personal power","humility"],
    "I embrace 'Yes, I can have that.' The magic is found in humility and innocence.",
    "Seriously acknowledge what you truly desire and know with all your being that you can have it.",
    "If you are putting others before yourself for any reason, known or unknown to you, it's time to change the direction of how you are using your energy and your personal power. This queen is wearing the crown of self-mastery, and she wants to share it with you. She wants you to know that you have the power to create exactly what you want. The secret to manifestation lies in your innocence. Your innocence invites you to seriously acknowledge what you truly desire and with all your being know that you can have that exactly. This is the magic of the Queen of Spades — she has the power to manifest anything, and so do you. Once you embrace the 'Yes, I can have that', they will manifest. Now is the time for that. The magic will be found in humility and innocence."),

  card(52,"King","Spades","52_king_of_spades.jpg",
    ["personal power","compassion","wisdom","kingdom","forward movement"],
    "I rule my kingdom with compassion, integrity, and wisdom. All systems are go.",
    "Be courageous with the actions you need to take. Engage those around you in their greatness.",
    "The King of Spades has come to ask you if you are assuming your personal power. If you are being asked to rise to wear this crown, what is holding you back? New insights and self-awareness will lead to the answer you seek. The key is to be courageous with the actions you know you need to take. This king asks you to assume the throne of your personal kingdom and rule with compassion, understanding, integrity, and wisdom, as it is from this position that you can guide the change you desire. This is a time to rule your kingdom as you know it is meant to be — your kingdom being your life. Engage those around you to empower them to be in their greatness, as this is the work of a king. All systems are go for forward movement, whatever that means for you now."),

  /* ── JOKER 53 ─────────────────────────────────────────────────── */
  card(53,"Joker","Joker","53_joker.jpg",
    ["infinite potential","the wild card","the fool's wisdom","pure possibility","spirit"],
    "I embrace the unknown. I am the wildcard in my own story.",
    "Do one completely spontaneous thing today — unplanned, unstructured, purely in the moment.",
    "The Joker stands outside the numbered system — the wild card, the sacred fool, the one who bows to no rules. This card carries the energy of infinite potential and divine play. When the Joker appears, the ordinary rules do not apply. This is a moment of pure possibility, unexpected change, or the universe's invitation to stop being so serious about the game. Note: The Joker is excluded from standard numerological calculations."),
];

export const CARD_BACK_PATH  = "/images/util/card_back.jpg";
export const SUIT_METADATA   = SUIT_META;
