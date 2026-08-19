import { useEffect } from "react";
import { useSoundsStore } from "@/sounds/sounds-store";
import { searchMockSounds } from "@/sounds/mock-sounds";

export function useSoundSearch({
	query,
	commercialOnly,
}: {
	query: string;
	commercialOnly: boolean;
}) {
	const {
		searchResults,
		isSearching,
		searchError,
		lastSearchQuery,
		currentPage,
		hasNextPage,
		isLoadingMore,
		totalCount,
		setSearchResults,
		setSearching,
		setSearchError,
		setLastSearchQuery,
		setCurrentPage,
		setHasNextPage,
		setTotalCount,
		setLoadingMore,
		appendSearchResults,
		appendTopSounds,
		resetPagination,
	} = useSoundsStore();

	const loadMore = async () => {
		if (isLoadingMore || !hasNextPage) return;

		try {
			setLoadingMore({ loading: true });
			const nextPage = currentPage + 1;

			const searchParams = new URLSearchParams({
				page: nextPage.toString(),
				type: "effects",
			});

			if (query.trim()) {
				searchParams.set("q", query);
			}

			searchParams.set("commercial_only", commercialOnly.toString());
			let results;
			try {
				const response = await fetch(
					`/api/sounds/search?${searchParams.toString()}`,
				);

				if (response.ok) {
					const data = await response.json();
					results = { results: data.results, count: data.count, next: data.next };
				} else {
					throw new Error(`Load more failed: ${response.status}`);
				}
			} catch {
				results = searchMockSounds({
					query,
					commercialOnly,
				});
			}

			if (query.trim()) {
				appendSearchResults(results.results);
			} else {
				appendTopSounds(results.results);
			}

			setCurrentPage({ page: nextPage });
			setHasNextPage({ hasNext: !!results.next });
			setTotalCount(results.count);
		} catch (err) {
			setSearchError({
				error: err instanceof Error ? err.message : "Load more failed",
			});
		} finally {
			setLoadingMore({ loading: false });
		}
	};

	useEffect(() => {
		if (!query.trim()) {
			setSearchResults({ results: [] });
			setSearchError({ error: null });
			setLastSearchQuery({ query: "" });
			return;
		}

		if (query === lastSearchQuery && searchResults.length > 0) {
			return;
		}

		let ignore = false;

		const timeoutId = setTimeout(async () => {
			try {
				setSearching({ searching: true });
				setSearchError({ error: null });
				resetPagination();

				let results;
				try {
					const response = await fetch(
						`/api/sounds/search?q=${encodeURIComponent(query)}&type=effects&page=1`,
					);

					if (response.ok) {
						const data = await response.json();
						results = {
							results: data.results,
							count: data.count,
							next: data.next,
						};
					} else {
						throw new Error(`Search failed: ${response.status}`);
					}
				} catch {
					results = searchMockSounds({
						query,
						commercialOnly,
					});
				}

				if (!ignore) {
					setSearchResults({ results: results.results });
					setLastSearchQuery({ query: query });
					setHasNextPage({ hasNext: !!results.next });
					setTotalCount({ count: results.count });
					setCurrentPage({ page: 1 });
				}
			} catch (err) {
				if (!ignore) {
					setSearchError({
						error: err instanceof Error ? err.message : "Search failed",
					});
				}
			} finally {
				if (!ignore) {
					setSearching({ searching: false });
				}
			}
		}, 300);

		return () => {
			clearTimeout(timeoutId);
			ignore = true;
		};
	}, [
		query,
		lastSearchQuery,
		searchResults.length,
		setSearchResults,
		setSearching,
		setSearchError,
		setLastSearchQuery,
		setCurrentPage,
		setHasNextPage,
		setTotalCount,
		resetPagination,
	]);

	return {
		results: searchResults,
		isLoading: isSearching,
		error: searchError,
		loadMore,
		hasNextPage,
		isLoadingMore,
		totalCount,
	};
}
