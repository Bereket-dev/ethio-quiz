const totalQuestions = [
  {
    id: 1,
    title: "Psychology",
    points: 10,
    timeAllowed: { min: 1, sec: 15 },
    description:
      "Dive into the fascinating world of the human mind, behavior, and mental processes. Test your understanding of psychological theories, experiments, and concepts.",
    questions: [
      {
        question: "Who is considered the father of psychoanalysis?",
        options: [
          { text: "Sigmund Freud", isCorrect: true },
          { text: "Carl Jung", isCorrect: false },
          { text: "B.F. Skinner", isCorrect: false },
          { text: "Jean Piaget", isCorrect: false },
        ],
      },
      {
        question:
          "Which part of the brain is primarily responsible for decision making?",
        options: [
          { text: "Cerebellum", isCorrect: false },
          { text: "Frontal lobe", isCorrect: true },
          { text: "Occipital lobe", isCorrect: false },
          { text: "Parietal lobe", isCorrect: false },
        ],
      },
      {
        question: "What does the 'Id' represent in Freud’s theory?",
        options: [
          { text: "Moral conscience", isCorrect: false },
          { text: "Rational thought", isCorrect: false },
          { text: "Primitive desires and instincts", isCorrect: true },
        ],
      },
      {
        question:
          "Which psychologist is known for classical conditioning with dogs?",
        options: [
          { text: "John Watson", isCorrect: false },
          { text: "Ivan Pavlov", isCorrect: true },
          { text: "Erik Erikson", isCorrect: false },
        ],
      },
      {
        question: "What is cognitive dissonance?",
        options: [
          { text: "A disorder related to memory loss", isCorrect: false },
          {
            text: "A discomfort caused by holding conflicting beliefs",
            isCorrect: true,
          },
          { text: "The inability to process emotions", isCorrect: false },
          { text: "An overreaction to sensory stimuli", isCorrect: false },
        ],
      },
      {
        question: "Which theory explains learning through observation?",
        options: [
          { text: "Behaviorism", isCorrect: false },
          { text: "Social Learning Theory", isCorrect: true },
          { text: "Psychoanalytic Theory", isCorrect: false },
          { text: "Humanism", isCorrect: false },
        ],
      },
      {
        question: "What is Maslow’s highest level in the hierarchy of needs?",
        options: [
          { text: "Self-esteem", isCorrect: false },
          { text: "Love and belonging", isCorrect: false },
          { text: "Self-actualization", isCorrect: true },
          { text: "Safety", isCorrect: false },
        ],
      },
      {
        question: "Which psychologist is famous for the Bobo doll experiment?",
        options: [
          { text: "Albert Bandura", isCorrect: true },
          { text: "Carl Rogers", isCorrect: false },
          { text: "John B. Watson", isCorrect: false },
          { text: "Lev Vygotsky", isCorrect: false },
        ],
      },
      {
        question: "Which perspective focuses on free will and self-growth?",
        options: [
          { text: "Cognitive", isCorrect: false },
          { text: "Behavioral", isCorrect: false },
          { text: "Humanistic", isCorrect: true },
          { text: "Psychoanalytic", isCorrect: false },
        ],
      },
      {
        question: "What is the placebo effect?",
        options: [
          { text: "A side effect of medication", isCorrect: false },
          {
            text: "An improvement caused by expectation rather than treatment",
            isCorrect: true,
          },
          { text: "The failure of a drug to work", isCorrect: false },
          { text: "A form of cognitive bias", isCorrect: false },
        ],
      },
    ],
  },
];

module.exports = { totalQuestions };
