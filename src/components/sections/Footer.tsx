export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-slate-400">
          © {new Date().getFullYear()} Nguyen Sy Nguyen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
