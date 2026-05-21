import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, PartyPopper, Coffee, CalendarHeart } from "lucide-react";

const yesConfirmations = [
  "Wait wait wait... are you REALLY sure? 😏",
  "Like... emotionally and spiritually sure? 💅",
  "Final answer? No pressure, if you say no this app could auto-destroy 😌",
  "Okay but imagine: cute outfit, good food, dangerous eye contact. Still yes? 👀",
  "Last checkpoint before the adventure unlocks ✨"
];

const noConfirmations = [
  "No? Hmm. Are you sure or are you just being dramatic? 😭",
  "Okay, but what if there is dessert involved? 🍰",
  "What if I promise to be charming for at least 73% of the date? 😌",
  "Are you rejecting me... or rejecting happiness? Big difference 😤",
  "Careful. The No button is developing commitment issues. Try again? 😂"
];

const yesButtonTexts = ["Yes 😌", "Still yes 💕", "Okay yes 😂", "Fine, destiny ✨", "YES, take me out 💘"];
const noButtonTexts = ["No 🙈", "Still no 😭", "Hmm no", "Suspicious no", "No but I'm smiling"];

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 4,
        duration: 5 + Math.random() * 5,
        size: 14 + Math.random() * 24
      })),
    []
  );

  return (
    <div className="floating-hearts">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="floating-heart"
          style={{ left: h.left }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{ y: -820, opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}

export default function App() {
  const [path, setPath] = useState("start");
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noRunaway, setNoRunaway] = useState(false);

  const yesIndex = Math.min(yesCount, yesConfirmations.length - 1);
  const noIndex = Math.min(noCount, noConfirmations.length - 1);

  const title =
    path === "start"
      ? "Important Question Department"
      : path === "yes"
      ? yesConfirmations[yesIndex]
      : path === "no"
      ? noConfirmations[noIndex]
      : "Date confirmed. History has been made. 💘";

  const subtitle =
    path === "start"
      ? "A tiny investigation conducted with extreme scientific seriousness."
      : path === "yes"
      ? "Please confirm. Requesting legal clarity from my lawyer."
      : path === "no"
      ? "Interesting answer. The committee would like to appeal this decision."
      : "You said yes enough times for this to become legally cute.";

  function chooseYes() {
    if (yesCount >= 4) {
      setPath("final");
      return;
    }
    setPath("yes");
    setYesCount((c) => c + 1);
  }

  function chooseNo() {
    setPath("no");
    setNoCount((c) => c + 1);
    if (noCount >= 2) setNoRunaway(true);
  }

  function reset() {
    setPath("start");
    setYesCount(0);
    setNoCount(0);
    setNoRunaway(false);
  }

  return (
    <main className="app">
      <FloatingHearts />

      <div className="blur-one" />
      <div className="blur-two" />
      <div className="blur-three" />

      <section className="center-wrap">
        <motion.div layout className="card">
          <div className="top-row">
            <div className="pill">
              <Sparkles className="pink-icon" size={20} />
              <span>Very Serious Date Survey</span>
            </div>
            <div className="cute-badge">100% cute</div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={path + yesCount + noCount}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28 }}
              className="content"
            >
              {path !== "final" ? (
                <>
                  <motion.div
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="main-icon"
                  >
                    <CalendarHeart size={46} />
                  </motion.div>

                  <h1>{path === "start" ? "Miss, would you like to come to Italy with me?" : title}</h1>
                  <p className="subtitle">{subtitle}</p>

                  <div className="buttons">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={chooseYes}
                      className="yes-button"
                    >
                      <span>
                        {yesButtonTexts[Math.min(yesCount, yesButtonTexts.length - 1)]}
                        <Heart size={20} fill="currentColor" />
                      </span>
                    </motion.button>

                    <motion.button
                      animate={
                        noRunaway
                          ? { x: [0, 18, -18, 12, -8, 0], rotate: [0, 2, -2, 1, 0] }
                          : {}
                      }
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={chooseNo}
                      className="no-button"
                    >
                      {noButtonTexts[Math.min(noCount, noButtonTexts.length - 1)]}
                    </motion.button>
                  </div>

                  {path === "no" && noCount >= 2 && (
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="warning">
                      Official update: the No button is now under investigation for bad vibes.
                    </motion.p>
                  )}
                </>
              ) : (
                <div className="final">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="party-icon"
                  >
                    <PartyPopper size={54} />
                  </motion.div>

                  <h1>Perfect. It’s a date.</h1>
                  <p className="subtitle">
                    Please prepare your best outfit, your most iconic smile, and at least one funny story.
                    I’ll handle the rest.
                  </p>

                  <div className="details">
                    <div className="detail-box rose">
                      <Coffee />
                      <p className="detail-title">Vibe</p>
                      <p>Cute, fun, zero awkward silence.</p>
                    </div>
                    <div className="detail-box sky">
                      <Sparkles />
                      <p className="detail-title">Dress code</p>
                      <p>Dangerously charming.</p>
                    </div>
                    <div className="detail-box yellow">
                      <Heart fill="currentColor" />
                      <p className="detail-title">Warning</p>
                      <p>May cause smiling.</p>
                    </div>
                  </div>

                  <button onClick={reset} className="replay-button">
                    Replay the cuteness
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
