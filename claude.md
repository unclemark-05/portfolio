Full 3D Portfolio Blueprint

`markdown
# 3D Portfolio Website Blueprint

## Project Overview
Build a modern portfolio website showcasing **3 real websites** you developed:
1. **Opiro** – Music platform for artists and fans.
2. **Scripture Call** – Daily Bible verses and faith app.
3. **SpareRoom Nigeria** – Room finder and rental platform.

The portfolio should:
- Use **Next.js** for frontend + SSR.
- Use **React Three Fiber (R3F)** for 3D interactive animations.
- Include **GSAP + ScrollTrigger** for scroll-based animations.
- Be **optimized for speed**, load <2s on desktop.
- Work **responsively** on mobile, tablet, and desktop.
- Include a **contact form** using **BaaS** (e.g., Supabase or Firebase).
- Showcase your **skills, websites, and tech stack** interactively.

---

## 1. Project Setup

1. Create a new Next.js project with TypeScript:

bash
npx create-next-app@latest 3d-portfolio --typescript
cd 3d-portfolio
`

2. Install dependencies:

bash
npm install three @react-three/fiber @react-three/drei gsap @react-spring/three react-use-gesture @supabase/supabase-js


3. Add global CSS in `styles/globals.css`.

---

## 2. File & Component Structure


/3d-portfolio
  /components
    Hero3D.tsx          # 3D hero section
    OpiroScene.tsx       # 3D showcase for Opiro
    ScriptureScene.tsx   # 3D showcase for Scripture Call
    SpareRoomScene.tsx   # 3D showcase for SpareRoom
    SkillList.tsx        # Skills section
    Navbar.tsx
    Footer.tsx
  /pages
    index.tsx            # Landing page + all sections
    contact.tsx          # Contact page
  /public
    /models              # Optimized glTF/GLB models
    /textures            # Any textures used
  /styles
    globals.css
    animations.css
  /utils
    scrollUtils.ts
    animations.ts


---

## 3. Hero Section (Hero3D.tsx)

**Purpose:** First impression — interactive 3D objects representing each website.

* **Opiro**: Floating music vinyl or waveform.
* **Scripture Call**: Open floating book.
* **SpareRoom**: Stylized 3D room or house.

**Features:**

* Hover effects on objects.
* Floating/rotation animation.
* Click → scroll to respective project section.

**Sample Implementation:**

tsx
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Float, OrbitControls, useGLTF } from '@react-three/drei';

export default function Hero3D() {
  const opiro = useGLTF('/models/opiro.glb');
  const scripture = useGLTF('/models/scripture.glb');
  const spareRoom = useGLTF('/models/spareRoom.glb');

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Float floatIntensity={0.5} rotationIntensity={0.2}>
          <primitive object={opiro.scene} position={[-3, 0, 0]} />
          <primitive object={scripture.scene} position={[0, 0, 0]} />
          <primitive object={spareRoom.scene} position={[3, 0, 0]} />
        </Float>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}


---

## 4. Project Sections

### OpiroScene.tsx

* 3D music desk or floating albums.
* Clicking opens modal or screenshot carousel.
* Animate album covers using GSAP on scroll.

### ScriptureScene.tsx

* Open Bible pages turn as user scrolls.
* Smooth light rays or glow effect for spiritual feel.

### SpareRoomScene.tsx

* 3D floor plan with rooms side-by-side.
* Hover animations for key features (BVN verification, escrow icons).
* Click to expand screenshots or project description.

---

## 5. Skills Section (SkillList.tsx)

* Display your tech stack: React, Next.js, R3F, GSAP, BaaS, UI/UX.
* Optional: small floating 3D icons for each skill.
* Animations on scroll: fade-in + slight float.

---

## 6. Scroll & Animation Strategy

* Use **GSAP + ScrollTrigger**:

  * Animate camera moves between sections.
  * Trigger project scene animations as user scrolls.
* Use **lazy loading** for models:

  * Only load scene when section enters viewport.
  * Use Next.js `dynamic(import())` with `{ ssr: false }`.

---

## 7. Performance Optimizations

* Use **low-poly 3D models**.
* Limit post-processing (shadows, bloom, glow) to essentials.
* Use **Suspense** fallback for lazy loading.
* For mobile:

  * Reduce animation intensity.
  * Replace complex 3D with static placeholders or screenshots.

---

## 8. Contact Page

* Use BaaS (Supabase/Firebase) to store form submissions.
* Form fields:

  * Name
  * Email
  * Message
* Include success/failure feedback.

---

## 9. Styling

* Use **CSS modules** or **Tailwind**.
* Smooth background gradients for 3D sections.
* Minimalist design to highlight 3D models.
* Responsive layouts using media queries.

---

## 10. Deployment

* Use **Vercel** for Next.js hosting.
* Test performance on desktop and mobile.
* Ensure fallback for low-spec devices.

---

## 11. Extra Notes / Features

* Use **OrbitControls** but limit rotation for hero section.
* Add subtle floating particles or background animation for depth.
* Keep 3D scenes interactive but not overwhelming.
* Always test **FPS > 50** for smooth UX.
* Consider adding **light/dark mode** toggle.

---

## 12. Summary Flow

1. Landing Hero 3D → user sees interactive floating objects.
2. Scroll → OpiroScene 3D showcase → click → modal screenshots.
3. Scroll → ScriptureScene 3D showcase → click → modal/screenshots.
4. Scroll → SpareRoomScene 3D showcase → interactive floor plan.
5. Scroll → SkillList → animated 3D icons of tech stack.
6. Scroll → Contact → BaaS form.