export function generateStaticParams() {
	return [{ slug: "default" }];
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
	return children;
}
