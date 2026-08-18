import Nav from './Nav';
import Motion from './Motion';

// Shared page frame: fixed Nav + Motion (ScrollSmoother) sit OUTSIDE the
// #smooth-wrapper; page content goes inside #smooth-content. Every route renders
// this so the smooth-scroll structure and motion are consistent, and Motion
// remounts per navigation (fresh smoother + reveals for each page).
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main id="top" className="font-sans">
      <Nav />
      <Motion />
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </main>
  );
}
