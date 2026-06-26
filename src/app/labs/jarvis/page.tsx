"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Eyebrow, GradientText, useLang } from "../_shared/shell";
import { JARVIS as B } from "../_shared/brands";

type Phase = "idle" | "requesting" | "active" | "denied" | "unsupported" | "failed";

// MediaPipe WASM + hand model. WASM version is pinned to the installed package
// so the loader and binaries stay in sync; the model is fetched once from
// Google's CDN and then cached by the browser.
const WASM_URL = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

const T = {
  en: {
    eyebrow: "Experimental · Jarvis Mode",
    t1: "Jarvis", t2: "Mode",
    sub: "Your camera stays private — never shown. Orderly ovals of particles track each hand and morph to your finger gestures: make a fist to condense them, open your palm to bloom, point to fire a beam, pinch to spin a vortex, throw the horns for sparks — and pull two hands apart to zoom.",
    activate: "Activate Jarvis Mode",
    requesting: "Starting camera & loading hand model…",
    privacy: "Camera is used only to detect your hands — the video is never shown, recorded, or uploaded. Hand tracking runs locally in your browser.",
    deactivate: "Deactivate", fullscreen: "Fullscreen",
    standby: "SEARCHING", tracking: "TRACKING", hands: "HANDS", gesture: "GESTURE", zoom: "ZOOM", fps: "FPS",
    deniedT: "Camera access blocked",
    deniedB: "Jarvis Mode needs your camera to detect your hands. Allow camera access for this site in your browser, then try again.",
    unsupT: "Camera not available",
    unsupB: "Your browser doesn't expose a camera API, or the page isn't served over HTTPS (required for camera access).",
    failT: "Couldn't load the hand model",
    failB: "The hand-tracking model failed to download. Check your connection and try again.",
    retry: "Try again",
    howT: "How it works",
    how: "Jarvis Mode runs Google's MediaPipe Hand Landmarker in your browser, tracking up to two hands (21 points each). It reads which fingers are extended to classify a gesture, then drives a completely different particle behaviour for each — condense, bloom, beam, dual swirl, vortex, electric arcs, or halo. The distance between your hands controls a live zoom. No video is ever displayed; tracking is fully on-device.",
    gestures: "Try these gestures",
    legend: [
      { icon: "✊", name: "Fist", desc: "condense into a dense core" },
      { icon: "🖐️", name: "Open palm", desc: "bloom into a wide cloud" },
      { icon: "☝️", name: "Point", desc: "fire a directed beam" },
      { icon: "✌️", name: "Peace", desc: "split into two swirls" },
      { icon: "🤏", name: "Pinch", desc: "spin an inward vortex" },
      { icon: "🤘", name: "Rock", desc: "spark electric arcs" },
      { icon: "🤟", name: "Three", desc: "form a rotating halo" },
    ],
    tip: "Tip: hold up one or both hands and try the gestures below — pull your hands apart to zoom in.",
  },
  id: {
    eyebrow: "Eksperimental · Mode Jarvis",
    t1: "Mode", t2: "Jarvis",
    sub: "Kamera Anda tetap privat — tidak pernah ditampilkan. Oval partikel yang rapi melacak tiap tangan dan berubah sesuai gestur jari: kepalkan untuk memadat, buka telapak untuk mekar, tunjuk untuk memancarkan beam, cubit untuk pusaran, acungkan rock untuk percikan — dan jauhkan dua tangan untuk zoom.",
    activate: "Aktifkan Mode Jarvis",
    requesting: "Memulai kamera & memuat model tangan…",
    privacy: "Kamera hanya dipakai untuk mendeteksi tangan — videonya tidak pernah ditampilkan, direkam, atau diunggah. Pelacakan tangan berjalan lokal di browser Anda.",
    deactivate: "Matikan", fullscreen: "Layar penuh",
    standby: "MENCARI", tracking: "MELACAK", hands: "TANGAN", gesture: "GESTUR", zoom: "ZOOM", fps: "FPS",
    deniedT: "Akses kamera diblokir",
    deniedB: "Mode Jarvis butuh kamera untuk mendeteksi tangan. Izinkan akses kamera untuk situs ini di browser Anda, lalu coba lagi.",
    unsupT: "Kamera tidak tersedia",
    unsupB: "Browser Anda tidak menyediakan API kamera, atau halaman tidak disajikan lewat HTTPS (wajib untuk akses kamera).",
    failT: "Gagal memuat model tangan",
    failB: "Model pelacakan tangan gagal diunduh. Periksa koneksi Anda lalu coba lagi.",
    retry: "Coba lagi",
    howT: "Cara kerja",
    how: "Mode Jarvis menjalankan MediaPipe Hand Landmarker dari Google di browser Anda, melacak hingga dua tangan (21 titik tiap tangan). Ia membaca jari mana yang terbuka untuk mengklasifikasi gestur, lalu menjalankan perilaku partikel yang sama sekali berbeda untuk tiap gestur — memadat, mekar, beam, pusaran ganda, vortex, busur listrik, atau halo. Jarak antar tangan mengontrol zoom langsung. Tidak ada video yang ditampilkan; pelacakan sepenuhnya di perangkat.",
    gestures: "Coba gestur ini",
    legend: [
      { icon: "✊", name: "Kepalan", desc: "memadat jadi inti rapat" },
      { icon: "🖐️", name: "Telapak terbuka", desc: "mekar jadi awan lebar" },
      { icon: "☝️", name: "Menunjuk", desc: "memancarkan beam terarah" },
      { icon: "✌️", name: "Peace", desc: "terbelah jadi dua pusaran" },
      { icon: "🤏", name: "Cubit", desc: "pusaran spiral ke dalam" },
      { icon: "🤘", name: "Rock", desc: "memercikkan busur listrik" },
      { icon: "🤟", name: "Tiga jari", desc: "membentuk halo berputar" },
    ],
    tip: "Tips: angkat satu atau dua tangan dan coba gestur di bawah — jauhkan kedua tangan untuk memperbesar.",
  },
};

const GLABEL: Record<string, { en: string; id: string }> = {
  oval: { en: "HOVER", id: "HOVER" },
  open: { en: "OPEN", id: "TERBUKA" },
  fist: { en: "FIST", id: "KEPALAN" },
  point: { en: "POINT", id: "TUNJUK" },
  peace: { en: "PEACE", id: "DAMAI" },
  vortex: { en: "PINCH", id: "CUBIT" },
  rock: { en: "ROCK", id: "ROCK" },
  ring: { en: "THREE", id: "TIGA" },
};

export default function JarvisPage() {
  const [lang] = useLang();
  const t = T[lang];

  const [phase, setPhase] = useState<Phase>("idle");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const landmarkerRef = useRef<any>(null);

  const statusRef = useRef<HTMLSpanElement>(null);
  const handsRef = useRef<HTMLSpanElement>(null);
  const gestureRef = useRef<HTMLSpanElement>(null);
  const zoomRef = useRef<HTMLSpanElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);
  const langRef = useRef(lang);
  useEffect(() => { langRef.current = lang; }, [lang]);

  const stopStream = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((tr) => tr.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    try { landmarkerRef.current?.close?.(); } catch { /* noop */ }
    landmarkerRef.current = null;
  }, []);

  const deactivate = useCallback(() => {
    stopStream();
    setPhase("idle");
  }, [stopStream]);

  const activate = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setPhase("unsupported");
      return;
    }
    setPhase("requesting");

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
    } catch (e) {
      setPhase((e as DOMException)?.name === "NotAllowedError" ? "denied" : "unsupported");
      return;
    }
    streamRef.current = stream;
    const v = videoRef.current;
    if (!v) return;
    v.srcObject = stream;

    try {
      const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision");
      const vision = await FilesetResolver.forVisionTasks(WASM_URL);
      const opts = { baseOptions: { modelAssetPath: MODEL_URL, delegate: "GPU" as const }, runningMode: "VIDEO" as const, numHands: 2 };
      try {
        landmarkerRef.current = await HandLandmarker.createFromOptions(vision, opts);
      } catch {
        landmarkerRef.current = await HandLandmarker.createFromOptions(vision, { ...opts, baseOptions: { ...opts.baseOptions, delegate: "CPU" } });
      }
    } catch {
      stopStream();
      setPhase("failed");
      return;
    }

    try { await v.play(); } catch { /* autoplay handled by gesture */ }
    setPhase("active");
  }, [stopStream]);

  useEffect(() => () => stopStream(), [stopStream]);

  // ── Render loop ──────────────────────────────────────────
  useEffect(() => {
    if (phase !== "active") return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    let W = 0, H = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Orderly particle field — two halves, one per hand slot. Each half is its
    // own phyllotaxis disk (even, structured layout).
    const N = window.innerWidth < 640 ? 460 : 820;
    const halfN = Math.floor(N / 2);
    const ps = Array.from({ length: N }, (_, i) => {
      const slot = i < halfN ? 0 : 1;
      const li = slot === 0 ? i : i - halfN;
      const ln = slot === 0 ? halfN : N - halfN;
      const f = (li + 0.5) / ln;
      const rad = Math.sqrt(f);
      const ang = li * 2.39996323;
      const isFinger = li % 4 === 0; // ~25% become fingertip particles
      return {
        slot, bx: rad * Math.cos(ang), by: rad * Math.sin(ang),
        x: W / 2, y: H / 2,
        ease: isFinger ? 0.26 : 0.18,
        finger: isFinger ? ((li / 4) | 0) % 5 : -1,
        fa: Math.random() * 6.283, fr: Math.random(),
        t: f, rad, ang, par: li % 2,
      };
    });

    // Smoothed per-hand state (two slots).
    const makeHand = () => ({
      p: 0, cx: W / 2, cy: H / 2, dirX: 0, spread: 0.3, vx: 0, vy: 0, speed: 0,
      wx: W / 2, wy: H / 2, dirx: 0, diry: -1, ls: 1, rs: 1,
      gesture: "oval", gCand: "oval", gCount: 0,
      tips: Array.from({ length: 5 }, () => ({ x: W / 2, y: H / 2 })),
    });
    const hands = [makeHand(), makeHand()];
    let Z = 1; // global zoom (two-hand distance)

    const ME: Record<string, number> = { open: 0.75, rock: 0.95, vortex: 0.55, point: 0.65, fist: 0.45, peace: 0.55, ring: 0.45, oval: 0.2 };
    const TIP = [4, 8, 12, 16, 20];
    let last = performance.now();
    let lastTs = 0;
    let lastHud = 0;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateHand = (hs: (typeof hands)[number], lm: any[]) => {
      const minDim = Math.min(W, H);
      let sx = 0, sy = 0;
      for (const pt of lm) { sx += 1 - pt.x; sy += pt.y; }
      const cxN = sx / lm.length;
      const tcx = cxN * W, tcy = (sy / lm.length) * H;

      const dd = (a: number, b: number) => Math.hypot(lm[a].x - lm[b].x, lm[a].y - lm[b].y);
      const palm = dd(0, 9) || 1e-4;
      const spreadRaw = dd(4, 20) / palm;
      const sp = clamp((spreadRaw - 0.6) / 1.8, 0, 1);

      // Finger-extended flags (tip farther from wrist than its mid joint).
      const idx = dd(8, 0) > dd(6, 0) * 1.05;
      const mid = dd(12, 0) > dd(10, 0) * 1.05;
      const rng = dd(16, 0) > dd(14, 0) * 1.05;
      const pky = dd(20, 0) > dd(18, 0) * 1.05;
      const pinch = dd(4, 8) / palm < 0.35;

      let g = "oval";
      if (pinch && !mid && !rng && !pky) g = "vortex";
      else if (!idx && !mid && !rng && !pky) g = "fist";
      else if (idx && mid && rng && pky) g = "open";
      else if (idx && !mid && !rng && !pky) g = "point";
      else if (idx && mid && !rng && !pky) g = "peace";
      else if (idx && pky && !mid && !rng) g = "rock";
      else if (idx && mid && rng && !pky) g = "ring";
      // Debounce so the mode doesn't flicker frame-to-frame.
      if (g === hs.gCand) hs.gCount++; else { hs.gCand = g; hs.gCount = 0; }
      if (hs.gCount >= 3) hs.gesture = g;

      const vX = (tcx - hs.cx) / minDim, vY = (tcy - hs.cy) / minDim;
      hs.vx += (vX - hs.vx) * 0.4;
      hs.vy += (vY - hs.vy) * 0.4;
      hs.speed = Math.hypot(hs.vx, hs.vy);
      const dirX = clamp((cxN - 0.5) * 2.5 + hs.vx * 6, -1, 1);

      hs.p += (1 - hs.p) * 0.15;
      hs.cx += (tcx - hs.cx) * 0.3;
      hs.cy += (tcy - hs.cy) * 0.3;
      hs.dirX += (dirX - hs.dirX) * 0.2;
      hs.spread += (sp - hs.spread) * 0.2;
      hs.wx += ((1 - lm[0].x) * W - hs.wx) * 0.3;
      hs.wy += (lm[0].y * H - hs.wy) * 0.3;
      for (let f = 0; f < 5; f++) {
        const pt = lm[TIP[f]];
        hs.tips[f].x += ((1 - pt.x) * W - hs.tips[f].x) * 0.35;
        hs.tips[f].y += (pt.y * H - hs.tips[f].y) * 0.35;
      }
    };

    const drawArc = (ax: number, ay: number, bx: number, by: number, alpha: number) => {
      const segs = 7;
      ctx.strokeStyle = `rgba(160,240,255,${alpha})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      for (let i = 1; i < segs; i++) {
        const tt = i / segs;
        const mx = ax + (bx - ax) * tt + (Math.random() - 0.5) * 18;
        const my = ay + (by - ay) * tt + (Math.random() - 0.5) * 18;
        ctx.lineTo(mx, my);
      }
      ctx.lineTo(bx, by);
      ctx.stroke();
    };

    const loop = (now: number) => {
      rafRef.current = requestAnimationFrame(loop);
      const dt = Math.min(64, now - last) || 16;
      last = now;

      // 1) Detect up to two hands, assign each to a stable slot via handedness.
      const lmk = landmarkerRef.current;
      const seen = [false, false];
      if (lmk && video.readyState >= 2) {
        const ts = now <= lastTs ? lastTs + 1 : now;
        lastTs = ts;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let res: any = null;
        try { res = lmk.detectForVideo(video, ts); } catch { res = null; }
        const list: number[][][] = res?.landmarks ?? [];
        const handed = res?.handednesses ?? res?.handedness ?? [];
        for (let h = 0; h < list.length; h++) {
          const lm = list[h];
          if (!lm || lm.length < 21) continue;
          const label = handed[h]?.[0]?.categoryName;
          let slot = label === "Right" ? 1 : label === "Left" ? 0 : h % 2;
          if (seen[slot]) slot ^= 1;
          if (seen[slot]) continue;
          seen[slot] = true;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          updateHand(hands[slot], lm as any);
        }
      }
      for (let s = 0; s < 2; s++) if (!seen[s]) hands[s].p += (0 - hands[s].p) * 0.08;

      // 2) Per-hand derived values (lean scales + pointing direction) + zoom.
      const minDim = Math.min(W, H);
      for (let s = 0; s < 2; s++) {
        const hs = hands[s];
        hs.ls = 1 + Math.max(0, -hs.dirX * hs.p) * 1.2;
        hs.rs = 1 + Math.max(0, hs.dirX * hs.p) * 1.2;
        const dx = hs.tips[1].x - hs.wx, dy = hs.tips[1].y - hs.wy;
        const dl = Math.hypot(dx, dy) || 1;
        hs.dirx = dx / dl; hs.diry = dy / dl;
      }
      let zTarget = 1;
      if (hands[0].p > 0.5 && hands[1].p > 0.5) {
        const d = Math.hypot(hands[0].cx - hands[1].cx, hands[0].cy - hands[1].cy) / minDim;
        zTarget = clamp(0.6 + ((d - 0.25) / 0.65) * 1.2, 0.6, 1.8);
      }
      Z += (zTarget - Z) * 0.1;

      // 3) Background trails — longer streaks the faster the hands move.
      const maxSpeed = Math.max(hands[0].speed * hands[0].p, hands[1].speed * hands[1].p);
      const fade = clamp(0.26 - maxSpeed * 0.6, 0.07, 0.26);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(6,8,12,${fade})`;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";

      // Aura lines + electric arcs per hand.
      for (let s = 0; s < 2; s++) {
        const hs = hands[s];
        if (hs.p <= 0.35) continue;
        ctx.strokeStyle = `rgba(34,211,238,${0.1 * hs.p})`;
        ctx.lineWidth = 1;
        for (let f = 0; f < 5; f++) {
          ctx.beginPath();
          ctx.moveTo(hs.cx, hs.cy);
          ctx.lineTo(hs.tips[f].x, hs.tips[f].y);
          ctx.stroke();
        }
        if (hs.gesture === "rock") {
          const a = hs.tips[1], b = hs.tips[4];
          for (let k = 0; k < 3; k++) drawArc(a.x, a.y, b.x, b.y, 0.5 * hs.p);
          drawArc(hs.cx, hs.cy, a.x, a.y, 0.3 * hs.p);
          drawArc(hs.cx, hs.cy, b.x, b.y, 0.3 * hs.p);
        }
      }

      // 4) Update + draw particles — target depends on each hand's gesture.
      const breath = 1 + 0.05 * Math.sin(now * 0.0011);
      for (const q of ps) {
        const hs = hands[q.slot];
        const pr = hs.p;
        const Cx = hs.cx, Cy = hs.cy;
        const r0 = minDim * (0.085 + hs.spread * 0.15) * Z;

        // Standby home position (orderly ring around a side of the screen).
        const baseRs = minDim * 0.12 * breath;
        const homeX = W * (q.slot === 0 ? 0.43 : 0.57);
        const sX = homeX + q.bx * baseRs;
        const sY = H / 2 + q.by * baseRs;

        // Active (gesture) target.
        let aX = Cx, aY = Cy;
        switch (hs.gesture) {
          case "open": {
            const rb = r0 * 1.85, w = 1 + 0.18 * Math.sin(now * 0.004 + q.ang * 2);
            aX = Cx + q.bx * rb * w; aY = Cy + q.by * rb * w * 0.92; break;
          }
          case "fist": {
            const rc = r0 * 0.22 * (1 + 0.18 * Math.sin(now * 0.006));
            aX = Cx + q.bx * rc; aY = Cy + q.by * rc; break;
          }
          case "point": {
            const L = minDim * 0.6 * Z;
            const along = ((q.t + now * 0.0004) % 1) * L;
            const px = -hs.diry, py = hs.dirx;
            const spr = (q.rad - 0.5) * r0 * 0.5;
            aX = Cx + hs.dirx * along + px * spr;
            aY = Cy + hs.diry * along + py * spr; break;
          }
          case "peace": {
            const an = q.par ? hs.tips[2] : hs.tips[1];
            const rr = r0 * 0.55 * q.rad, aa = q.ang + now * 0.004 * (q.par ? 1 : -1);
            aX = an.x + Math.cos(aa) * rr; aY = an.y + Math.sin(aa) * rr; break;
          }
          case "vortex": {
            const vx = (hs.tips[0].x + hs.tips[1].x) / 2, vy = (hs.tips[0].y + hs.tips[1].y) / 2;
            const rr = r0 * 1.3 * q.rad * (0.55 + 0.45 * Math.sin(now * 0.003 - q.rad * 6));
            const aa = q.ang + now * 0.005 * (1.4 / (q.rad + 0.25));
            aX = vx + Math.cos(aa) * rr; aY = vy + Math.sin(aa) * rr; break;
          }
          case "rock": {
            const a = hs.tips[1], b = hs.tips[4];
            const bx2 = a.x + (b.x - a.x) * q.t, by2 = a.y + (b.y - a.y) * q.t;
            aX = bx2 + (Math.random() - 0.5) * r0 * 0.5;
            aY = by2 + (Math.random() - 0.5) * r0 * 0.5; break;
          }
          case "ring": {
            const rr = r0 * 1.35, aa = q.ang + now * 0.002;
            aX = Cx + Math.cos(aa) * rr; aY = Cy + Math.sin(aa) * rr * 0.95; break;
          }
          default: { // oval / hover
            const side = q.bx < 0 ? hs.ls : hs.rs;
            const ringX = Cx + q.bx * r0 * 1.25 * side;
            const ringY = Cy + q.by * r0 * 0.85;
            if (q.finger >= 0) {
              const tip = hs.tips[q.finger];
              aX = tip.x + Math.cos(q.fa) * q.fr * minDim * 0.03 * Z;
              aY = tip.y + Math.sin(q.fa) * q.fr * minDim * 0.03 * Z;
            } else { aX = ringX; aY = ringY; }
          }
        }

        const tx = sX * (1 - pr) + aX * pr;
        const ty = sY * (1 - pr) + aY * pr;
        q.x += (tx - q.x) * q.ease;
        q.y += (ty - q.y) * q.ease;

        const fingerBoost = hs.gesture === "oval" && q.finger >= 0 ? pr * 0.45 : 0;
        const energy = Math.min(1, pr * (ME[hs.gesture] ?? 0.2) + hs.speed * 6 * pr + fingerBoost);
        const size = 1.25 + energy * 2.2;
        const al = 0.42 + energy * 0.48;
        const cr = (34 + (255 - 34) * energy) | 0;
        const cg = (211 + (240 - 211) * energy) | 0;
        const cb = (238 + (180 - 238) * energy) | 0;
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${al})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, size, 0, 6.283);
        ctx.fill();
        if (energy > 0.45) {
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${al * 0.22})`;
          ctx.beginPath();
          ctx.arc(q.x, q.y, size * 3, 0, 6.283);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";

      // 5) HUD readouts (throttled).
      if (now - lastHud > 140) {
        lastHud = now;
        const count = (hands[0].p > 0.5 ? 1 : 0) + (hands[1].p > 0.5 ? 1 : 0);
        const primary = hands[0].p > 0.5 ? hands[0] : hands[1].p > 0.5 ? hands[1] : null;
        if (statusRef.current) statusRef.current.textContent = count > 0 ? t.tracking : t.standby;
        if (handsRef.current) handsRef.current.textContent = `${count}`;
        if (gestureRef.current) gestureRef.current.textContent = primary ? GLABEL[primary.gesture][langRef.current] : "—";
        if (zoomRef.current) zoomRef.current.textContent = `${Math.round(Z * 100)}%`;
        if (fpsRef.current) fpsRef.current.textContent = `${Math.round(1000 / dt)}`;
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [phase, t.tracking, t.standby]);

  const toggleFullscreen = () => {
    const el = stageRef.current;
    if (!el) return;
    if (!document.fullscreenElement) el.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const corner = { borderColor: `rgba(${B.accent},0.6)` };

  return (
    <section className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-16">
      {/* Hidden video — used only as the hand-tracking source, never shown. */}
      <video ref={videoRef} playsInline muted className="absolute opacity-0 pointer-events-none -z-10 w-px h-px" />

      <div className="text-center mb-8">
        <div className="flex justify-center mb-5"><Eyebrow brand={B}>{t.eyebrow}</Eyebrow></div>
        <h1 className="font-extrabold tracking-tight mb-4" style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)" }}>
          {t.t1} <GradientText brand={B}>{t.t2}</GradientText>
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">{t.sub}</p>
      </div>

      {/* ── STAGE ────────────────────────────────────────────── */}
      <div ref={stageRef} className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#04060a]">
        {phase === "active" && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />}

        {/* HUD frame */}
        <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
          <div className="hud-tl absolute w-7 h-7 top-4 left-4" style={corner} />
          <div className="hud-tr absolute w-7 h-7 top-4 right-4" style={corner} />
          <div className="hud-bl absolute w-7 h-7 bottom-4 left-4" style={corner} />
          <div className="hud-br absolute w-7 h-7 bottom-4 right-4" style={corner} />
        </div>

        {/* Live readouts */}
        {phase === "active" && (
          <>
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping" style={{ background: `rgb(${B.accentText})` }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: `rgb(${B.accentText})` }} />
              </span>
              <span ref={statusRef} className="text-[11px] font-mono tracking-[0.25em]" style={{ color: `rgb(${B.accentText})` }}>{t.standby}</span>
            </div>
            <div className="absolute bottom-16 sm:bottom-4 left-4 z-20 flex flex-col sm:flex-row gap-x-5 gap-y-1 font-mono text-[10px] sm:text-[11px] text-zinc-400">
              <span>{t.hands} <span ref={handsRef} className="text-white">0</span></span>
              <span>{t.gesture} <span ref={gestureRef} className="text-white" style={{ color: `rgb(${B.accentText})` }}>—</span></span>
              <span>{t.zoom} <span ref={zoomRef} className="text-white">100%</span></span>
              <span>{t.fps} <span ref={fpsRef} className="text-white">0</span></span>
            </div>
          </>
        )}

        {/* Idle / requesting / error overlays */}
        {phase !== "active" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            {(phase === "idle" || phase === "requesting") && (
              <>
                <div className="flex items-center justify-center w-20 h-20 rounded-3xl mb-6" style={{ background: `linear-gradient(135deg, rgba(${B.accent},0.2), rgba(${B.accent},0.05))`, border: `1px solid rgba(${B.accent},0.3)` }}>
                  <i className={`bi ${phase === "requesting" ? "bi-arrow-repeat animate-spin" : "bi-hand-index-thumb"} text-3xl`} style={{ color: `rgb(${B.accentText})` }} />
                </div>
                <button
                  onClick={activate}
                  disabled={phase === "requesting"}
                  className={`inline-flex items-center gap-2.5 bg-gradient-to-r ${B.gradClasses} disabled:opacity-60 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95`}
                  style={{ boxShadow: `0 12px 28px -10px rgba(${B.accent},0.6)` }}
                >
                  <i className="bi bi-broadcast" />
                  {phase === "requesting" ? t.requesting : t.activate}
                </button>
                <p className="text-[11px] text-zinc-500 max-w-sm mt-5 leading-relaxed flex items-center gap-2">
                  <i className="bi bi-shield-lock flex-shrink-0" /> {t.privacy}
                </p>
              </>
            )}

            {(phase === "denied" || phase === "unsupported" || phase === "failed") && (
              <>
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 mb-5">
                  <i className={`bi ${phase === "denied" ? "bi-camera-video-off" : "bi-exclamation-triangle"} text-red-400 text-2xl`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{phase === "denied" ? t.deniedT : phase === "failed" ? t.failT : t.unsupT}</h3>
                <p className="text-sm text-zinc-500 max-w-sm mb-5">{phase === "denied" ? t.deniedB : phase === "failed" ? t.failB : t.unsupB}</p>
                {phase !== "unsupported" && (
                  <button onClick={activate} className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-all hover:bg-white/5" style={{ color: `rgb(${B.accentText})`, border: `1px solid rgba(${B.accent},0.3)` }}>
                    <i className="bi bi-arrow-repeat" /> {t.retry}
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* Control bar */}
        {phase === "active" && (
          <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
            <button onClick={toggleFullscreen} title={t.fullscreen} className="flex items-center justify-center w-10 h-10 rounded-lg bg-black/40 backdrop-blur border border-white/10 text-zinc-300 hover:text-white hover:bg-black/60 transition-colors">
              <i className="bi bi-arrows-fullscreen text-sm" />
            </button>
            <button onClick={deactivate} title={t.deactivate} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/25 transition-colors text-sm font-medium">
              <i className="bi bi-stop-circle" /> {t.deactivate}
            </button>
          </div>
        )}
      </div>

      {phase === "active" && <p className="text-center text-xs text-zinc-500 mt-4">{t.tip}</p>}

      {/* Gesture legend */}
      <div className="mt-8">
        <p className="text-center text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">{t.gestures}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {t.legend.map((g) => (
            <div key={g.name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0b0b12]/70 px-4 py-3">
              <span className="text-2xl leading-none">{g.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">{g.name}</p>
                <p className="text-[11px] text-zinc-500 leading-snug">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="mt-10 rounded-2xl border border-white/10 bg-[#0b0b12]/70 p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-3">
          <i className="bi bi-hand-index-thumb" style={{ color: `rgb(${B.accentText})` }} />
          <h2 className="font-semibold text-lg">{t.howT}</h2>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">{t.how}</p>
      </div>
    </section>
  );
}
