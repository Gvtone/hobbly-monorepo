import { Sparkles } from "lucide-react";

function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-2 py-6 border-t border-border">
      <div className="flex justify-center items-center gap-2">
        <span className="flex justify-center items-center rounded-full bg-linear-135 from-hobbly-sky to-hobbly-lavender p-2 text-white">
          <Sparkles size={12}></Sparkles>
        </span>
        <span className="font-md font-hobbly-serif">Hobbly</span>
      </div>
      <span className="text-sm text-muted-foreground">
        Made with ✨ for hobby lovers everywhere
      </span>
      <span className="text-xs text-muted-foreground">
        © 2026 Hobbly · <a href="#">Privacy</a> · <a href="#">Terms</a>
      </span>
    </footer>
  );
}

export default Footer;
