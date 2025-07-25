"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatSlug } from "@/lib/utils";
import { type Unit } from "@/types/firestore";
import { BookDashed, BookOpenCheck } from "lucide-react";
import Link from "next/link";

type Props = {
  unit: Unit;
  pathname: string;
  unitIndex: number;
  preview: boolean;
};

const UnitAccordion = ({ unit, pathname, unitIndex, preview }: Props) => {
  return (
    <AccordionItem
      className="mb-3 border-none"
      value={unit.title}
      key={unitIndex}
    >
      <AccordionTrigger
        id={unit.title}
        className="text-balance pb-1.5 text-left text-2xl font-semibold hover:no-underline sm:text-4xl"
      >
        {unit.title}
      </AccordionTrigger>

      <hr className="mb-3 mt-1.5 h-1 w-full" />

      <AccordionContent className="flex flex-col gap-3">
        {unit.chapters.map((chapter, chapterIndex) =>
          chapter.isPublic ? (
            <Link
              className="group flex items-center gap-x-2 font-semibold last:mb-0"
              href={`${pathname.split("/").slice(0, 4).join("/")}/unit-${unitIndex + 1}-${unit.id}/chapter/${chapter.id}/${formatSlug(chapter.title)}`}
              key={chapterIndex}
            >
              <div className="flex size-8 flex-shrink-0 items-center justify-center rounded bg-primary text-center text-base text-white">
                {unitIndex + 1}.{chapterIndex + 1}
              </div>

              <div className="text-balance text-base font-medium group-hover:underline sm:text-lg">
                {chapter.title}
              </div>
            </Link>
          ) : (
            <div
              className="group flex items-center gap-x-2 font-semibold last:mb-0"
              key={chapterIndex}
            >
              <div className="flex size-8 flex-shrink-0 items-center justify-center rounded bg-primary text-center text-base text-white opacity-70">
                {unitIndex + 1}.{chapterIndex + 1}
              </div>

              <div className="text-balance text-base font-medium opacity-70 group-hover:underline sm:text-lg">
                {chapter.title}
              </div>
              <Link
                href={
                  preview
                    ? `${pathname.split("/").slice(0, 4).join("/")}/unit-${unitIndex + 1}-${unit.id}/chapter/${chapter.id}/${formatSlug(chapter.title)}`
                    : "/apply"
                }
                className="ml-auto w-20 shrink-0 text-nowrap rounded-full border border-gray-400 px-2 py-0.5 text-center text-gray-600 transition-colors group-hover:border-primary group-hover:text-black sm:w-36 sm:py-0"
              >
                <span className="hidden group-hover:hidden sm:inline">
                  Work In Progress
                </span>
                <span className="group-hover:hidden sm:hidden">WIP</span>
                <span className="hidden group-hover:inline">
                  {preview ? "Preview" : "Join FiveHive"}
                </span>
              </Link>
            </div>
          ),
        )}
        {unit.tests?.map((test, testIndex) =>
          test.isPublic ? (
            <Link
              className="flex items-center gap-x-2 font-semibold last:mb-0 hover:underline"
              href={`${pathname.split("/").slice(0, 4).join("/")}/unit-${unitIndex + 1}-${unit.id}/test/${test.id}`}
              key={test.id}
            >
              <BookOpenCheck className="size-8" />
              {test.name
                ? test.name
                : // unit.tests cuz typescript doesn't recognize I checked for unit.tests already
                  `Unit ${unitIndex + 1} Test ${unit.tests && unit.tests.length > 1 ? ` ${testIndex + 1}` : ""}`}
            </Link>
          ) : (
            <div
              className="group flex items-center gap-x-2 font-semibold last:mb-0"
              key={test.id}
            >
              <BookDashed className="size-8 shrink-0 opacity-70" />
              <span className="opacity-70 group-hover:underline">
                {test.name
                  ? test.name
                  : // unit.tests cuz typescript doesn't recognize I checked for unit.tests already
                    `Unit ${unitIndex + 1} Test ${unit.tests && unit.tests.length > 1 ? ` ${testIndex + 1}` : ""}`}
              </span>
              <a
                href={
                  preview
                    ? `${pathname.split("/").slice(0, 4).join("/")}/unit-${unitIndex + 1}-${unit.id}/test/${test.id}`
                    : "/apply"
                }
                className="ml-auto w-20 shrink-0 text-nowrap rounded-full border border-gray-400 px-2 py-0.5 text-center text-gray-600 transition-colors group-hover:border-primary group-hover:text-black sm:w-36 sm:py-0"
              >
                <span className="hidden group-hover:hidden sm:inline">
                  Work In Progress
                </span>
                <span className="group-hover:hidden sm:hidden">WIP</span>
                <span className="hidden group-hover:inline">
                  {preview ? "Preview" : "Join FiveHive"}
                </span>
              </a>
            </div>
          ),
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
export default UnitAccordion;
