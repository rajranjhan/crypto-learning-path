import type { Step } from "../../../types";

export const theCaveProblem: Step = {
  id: "the-cave-problem",
  title: "Ali Baba's Cave — Proving a Secret Without Saying It",
  prose:
    "<p>Picture a circular cave with a single entrance that splits into two paths, A and B, meeting again at a locked magic door deep inside — a door that only opens to someone who knows the secret word. Peggy claims she knows the word. Victor doesn't believe her, but she doesn't want to just say the word out loud — that would tell Victor the secret, and everyone else who happens to be listening. How can she convince him without giving it away?</p>" +
    "<p>Here's the protocol: Victor waits outside while Peggy walks into the cave and picks either path A or B, out of his sight. Victor then walks to the entrance and shouts which path he wants her to come out of — A or B, his choice, made after she's already committed to a path. If Peggy really knows the secret word, she can always come out the requested side: if she's already on that side, she just walks out; if she's on the other side, she opens the locked door with the word and walks through to the requested exit.</p>" +
    "<p>If she doesn't know the word, she can only come out the side she happens to already be on — a coin flip, a 50% chance of guessing which side Victor will ask for. Repeat this a handful of times, and a Peggy who's bluffing gets caught almost certainly; a Peggy who genuinely knows the word passes every single round. And at no point did Victor ever hear the secret word, or see the door open — he only ever saw her walk out of the side he asked for.</p>",
  bullets: [
    "Peggy (the prover) claims to know a secret; Victor (the verifier) wants proof without learning the secret itself",
    "Each round: Peggy commits to a path out of Victor's sight, then Victor names which exit he wants — chosen after she's already committed",
    "A prover who knows the secret can satisfy any request, every time",
    "A prover who doesn't know the secret only succeeds by chance — 50% per round, shrinking exponentially over repeated rounds",
    "Victor never sees the secret word or the door opening — only ever the outcome of each round",
  ],
  diagram: `
    <div class="flow">
      <div class="node">
        <div class="node-title">Peggy</div>
        <div class="node-sub">🙋 walks in, picks path A or B out of sight</div>
      </div>
      <div class="link">
        <div class="lock">🚪</div>
        <div class="link-label">locked door, secret word opens it</div>
        <div class="arrow">⇄</div>
      </div>
      <div class="node node-proxy">
        <div class="node-title">Victor</div>
        <div class="node-sub">🕵️ names an exit after she's committed — never sees the word</div>
      </div>
    </div>
    <p class="diagram-note">
      This is the entire idea of a zero-knowledge proof in one story: prove
      you can always satisfy an unpredictable challenge, without ever
      revealing why you can. The next step names the three properties this
      protocol actually has.
    </p>
  `,
};
