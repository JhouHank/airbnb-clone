"use client";
// hydration protect 影片Auth UI的開始 大約35分鐘
import { Children, useEffect, useState } from "react";

interface ClientOnlyProps {
	children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <>{children}</>;
};

export default ClientOnly;
