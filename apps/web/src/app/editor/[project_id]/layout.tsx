export function generateStaticParams() {
	return [{ project_id: "default" }];
}

export default function EditorLayout({ children }: { children: React.ReactNode }) {
	return children;
}
