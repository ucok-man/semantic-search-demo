/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { Loader2, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {};

export default function SearchBox({}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isSearching, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(defaultQuery);

  const search = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  return (
    <div className="relative flex h-14 w-full flex-col bg-white">
      <div className="relative z-10 h-14 rounded-md">
        <Input
          disabled={isSearching}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }

            if (e.key === "Escape") {
              inputRef?.current?.blur();
            }
          }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
          className="absolute inset-0 h-full"
          placeholder="i.e Light jacket for spring rain"
        />
        <Button
          disabled={isSearching}
          size={"sm"}
          onClick={search}
          className="absolute inset-y-0 right-0 h-full rounded-l-none"
        >
          {isSearching && <Loader2 className="size-6 animate-spin" />}
          {!isSearching && <Search className="size-6" />}
        </Button>
      </div>
    </div>
  );
}
