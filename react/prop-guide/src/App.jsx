import { useState } from "react";
import BasicProps from "./components/BasicProps";
import RefProps from "./components/RefProps";
import ChildrenProps from "./components/ChildrenProps";
import ThemeToggler from "./components/ThemeToggler";
import ComplexProps from "./components/ComplexProps";
import "./App.css";

function Navigation() {
  const sections = [
    { id: "basic", label: "Basic Props", icon: "🥡" },
    { id: "Ref", label: "Ref Props", icon: "🔗" },
    { id: "Children", label: "Children Props", icon: "👶" },
    { id: "Complex", label: "ComplexProps", icon: "🧩" },
    { id: "Theme", label: "ThemeProps", icon: "🎨" },
  ];

  return (
    <nav className={`sticky top-0 shadow-md z-50 transition-colors`}>
      <div className={`container mx-auto px-4 py-4`}>
        <div className="flex flex-wrap gap-2 justify-center">
          {sections.map((section) => (
            <button
              className={`text-white bg-blue-600 px-4 py-2 transition-all duration-300 rounded-lg font-medium hover:bg-blue-700`}
              key={section.id}
            >
              <span className="mr-2">{section.icon}</span>
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const isDark = true;
  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <header
          className={`transition-colors mb-12 text-center ${isDark ? "text-white" : "text-gray-800"}`}
        >
          <h1 className="text-5xl font-bold">React props explain</h1>
          <p className={`text-xl ${isDark ? "text-white" : "tex to-gray-600"}`}>
            A simple comprehensive guide on React Props
          </p>
          <div className={`mt-4 inline-block px-6 py-2 rounded-full`}></div>
        </header>

        <div className={`space-y-8`}>
          <div id="basic" className="scroll-mt-200">
            <BasicProps />
          </div>
          <div id="basic" className="scroll-mt-200">
            <RefProps />
          </div>
          <div id="basic" className="scroll-mt-200">
            <ChildrenProps />
          </div>
          <div id="basic" className="scroll-mt-200">
            <ComplexProps />
          </div>
          <div id="basic" className="scroll-mt-200">
            <ThemeToggler />
          </div>
        </div>

        <footer
          className={`mt-12 text-center pb-8 transition-colors ${isDark ? "text-gray-400" : "text-gray-600"} `}
        >
          <p className="text-sm">
            Made with ❤️ using npm, Vite, React and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <AppContent />
    </div>
  );
}

export default App;
