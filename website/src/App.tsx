import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Home from "./pages/Home";

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();

  if (hash.startsWith("#/privacy")) {
    return (
      <main className="relative min-h-screen bg-ink">
        <Nav />
        <Privacy />
        <Footer />
      </main>
    );
  }
  if (hash.startsWith("#/terms")) {
    return (
      <main className="relative min-h-screen bg-ink">
        <Nav />
        <Terms />
        <Footer />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-ink">
      <Nav />
      <Home />
      <Footer />
    </main>
  );
}
