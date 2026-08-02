export type LinksProps = {
  title: string;
  links: string[];
};

export function Links({ title, links }: LinksProps) {
  return (
    <div className="flex flex-col items-start gap-2 sm:gap-13.75">
      <h3 className="font-medium">{title}</h3>

      <nav className="flex flex-col items-start justify-center gap-4 font-medium text-black sm:gap-11.5">
        {links.map((link, index) => (
          <a key={index} href="#">
            {link}
          </a>
        ))}
      </nav>
    </div>
  );
}
