const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="text-primary font-semibold">@comrademohan</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
