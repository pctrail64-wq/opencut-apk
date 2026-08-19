export function generateStaticParams() {
	return [{ version: "1.0" }];
}

export default function ChangelogLayout({ children }: { children: React.ReactNode }) {
	return children;
}
