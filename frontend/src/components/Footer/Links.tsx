import { Link } from "react-router";

export type LinksProps = {
  title: string;
  links: {
    title: string;
    href?: string;
  }[];
};

export function Links({ title, links }: LinksProps) {
  return (
    <div className="flex flex-col items-start gap-2 sm:gap-13.75">
      <h3 className="font-medium">{title}</h3>

      <nav className="flex flex-col items-start justify-center gap-4 font-medium text-black sm:gap-11.5">
        {links.map((link, index) => (
          <Link key={index} to={link.href || "#"}>
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
