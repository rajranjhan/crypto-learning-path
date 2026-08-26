import type { Step } from "../../../types";

export const whyQuantumMatters: Step = {
  id: "why-quantum-matters",
  title: "Why a Different Kind of Computer Changes Everything",
  prose:
    "<p>Picture a master locksmith who arrives in town with a strange new machine. For some lock designs — a padlock, the paint-mixing trick from the Asymmetric Primitives lesson — the machine looks at the lock and cuts a working key almost instantly, no picking required. For a different kind of lock, a dial vault with a huge number of combinations, the machine doesn't cut a key at all; it just lets the locksmith try combinations somewhat faster than by hand. Same locksmith, same machine, wildly different outcomes depending on what kind of lock he's standing in front of.</p>" +
    "<p>Every security guarantee in this series rests on a hardness assumption: something believed to be, with current computers, too slow to break — RSA's factoring problem, ECC and Diffie-Hellman's discrete logarithm problem, or brute-forcing an AES key by trying every possibility. Those assumptions are about ordinary, classical computers. A sufficiently powerful quantum computer changes the math for some of them, not all of them, and knowing exactly which is the whole point of this lesson.</p>" +
    "<p>Quantum computers don't just run classical algorithms faster across the board — they enable fundamentally different algorithms for a narrow set of problems, by exploiting superposition and interference to explore many possibilities at once. Two of those algorithms matter enormously here: <strong>Shor's algorithm</strong>, which solves factoring and discrete logarithms efficiently, and <strong>Grover's algorithm</strong>, which speeds up brute-force search generically but only by a fixed, limited amount.</p>" +
    "<p>Those two algorithms land on completely different outcomes for the two families of cryptography this series has covered — one gets broken outright, the other just needs a bigger key. The next two steps take them in turn.</p>",
  bullets: [
    "The locksmith's machine: cuts a working key instantly for some locks, only speeds up trying combinations for others",
    "Every cryptographic guarantee in this series rests on some problem being too slow to solve on a classical computer",
    "A large enough quantum computer changes that math for some problems, not all of them",
    "Shor's algorithm: efficiently solves factoring and discrete logarithms — the exact hard problems behind RSA, ECC, and Diffie-Hellman",
    "Grover's algorithm: speeds up brute-force search generically, but only by a fixed, limited amount",
  ],
  diagram: `
    <div class="flow" style="align-items: stretch;">
      <div class="node" style="flex: 1; border-color:#b91c1c;">
        <div class="node-title" style="color:#b91c1c;">Shor's algorithm</div>
        <div class="node-sub">breaks RSA, ECC, Diffie-Hellman outright</div>
      </div>
      <div class="node" style="flex: 1;">
        <div class="node-title">Grover's algorithm</div>
        <div class="node-sub">only weakens AES/SHA — a bigger key fixes it</div>
      </div>
    </div>
    <p class="diagram-note">
      One of these is an emergency for the Asymmetric Primitives lesson. The
      other is a footnote for the Symmetric Primitives lesson. The next two
      steps explain why.
    </p>
  `,
};
