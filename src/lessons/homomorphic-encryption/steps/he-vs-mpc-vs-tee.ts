import type { Step } from "../../../types";

export const heVsMpcVsTee: Step = {
  id: "he-vs-mpc-vs-tee",
  title: "Confidential Computing — HE, MPC & TEEs",
  prose:
    "<p>Homomorphic encryption isn't the only way to compute on data without exposing it — it's one of three commonly used approaches, and picking the right one matters as much as understanding any one of them individually.</p>" +
    "<p><strong>Secure Multi-Party Computation (MPC)</strong> lets several parties jointly compute a function over their combined inputs so that none of them learns anything about the others' inputs beyond the final result — think several hospitals computing a shared statistic without any of them seeing each other's patient records. Unlike homomorphic encryption, there's no single \"data owner\" outsourcing to an untrusted third party; trust is distributed across the participants themselves, and the parties actively communicate with each other during the protocol rather than one party silently doing all the work.</p>" +
    "<p><strong>Trusted Execution Environments (TEEs)</strong> — hardware enclaves like Intel SGX or AWS Nitro Enclaves — take a completely different approach: run ordinary plaintext computation inside a hardware-isolated region of a CPU that even the machine's own operating system can't inspect. Much faster than either MPC or FHE, since the computation is unencrypted the whole time, but the security guarantee rests on trusting the hardware vendor's isolation and the enclave's own attestation — a different, narrower trust assumption than either cryptographic approach.</p>" +
    "<p>None of these fully replace the others. Real confidential-computing systems increasingly combine them: FHE or MPC for the strongest cryptographic guarantees on the most sensitive operations, TEEs where hardware trust is acceptable and speed matters more, sometimes both in the same system.</p>",
  bullets: [
    "Homomorphic Encryption: one data owner, one untrusted computing party, pure cryptography, no communication needed after the ciphertext is sent",
    "Secure Multi-Party Computation (MPC): several parties jointly compute over their combined inputs, actively communicating, no single party ever sees the others' raw data",
    "Trusted Execution Environments (TEEs): plaintext computation inside a hardware-isolated enclave — fast, but trust shifts to the hardware vendor and its attestation",
    "None of these are mutually exclusive — production confidential-computing systems often combine two or more",
  ],
  takeaway: "None of these are mutually exclusive — production confidential-computing systems often combine two or more.",
  figure: {
    body: `
    <div class="flow">
      <div class="node equal">
        <div class="node-title">Homomorphic Encryption</div>
        <div class="node-sub left">one owner; untrusted computer</div>
      </div>
      <div class="node equal">
        <div class="node-title">Secure MPC</div>
        <div class="node-sub left">several parties; active protocol</div>
      </div>
      <div class="node equal">
        <div class="node-title">Trusted Execution Environment</div>
        <div class="node-sub left">plaintext inside enclave</div>
      </div>
    </div>
    <p class="diagram-note">
      Same goal, different trust and performance tradeoffs.
    </p>
  `,
  },
};
