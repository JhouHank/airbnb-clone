"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoriesProps {
	icon: IconType;
	label: string;
	selected?: boolean;
}

const CategoryBox: React.FC<CategoriesProps> = ({ icon: Icon, label, selected }) => {
	const router = useRouter();
	const params = useSearchParams();

	const handleClick = useCallback(() => {
		let currentQuery = {};

		// 當點選類別的圖案時進行篩選
		if (params) {
			currentQuery = qs.parse(params.toString());
		}

		const updatedQuery: any = {
			...currentQuery,
			category: label,
		};

		// 當點選已經被選中的類別時取消篩選
		if (params?.get("category") == label) {
			delete updatedQuery.category;
		}

		const url = qs.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);

		router.push(url);
	}, [label, params, router]);

	return (
		<div
			onClick={handleClick}
			className={`
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}`}
		>
			<Icon size={26} />
			<div className="font-medium text-sm">{label}</div>
		</div>
	);
};

export default CategoryBox;