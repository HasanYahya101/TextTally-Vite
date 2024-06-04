import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Toaster, toast } from "sonner";
import { TooltipTrigger, TooltipContent, Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

export function Playground() {
    const [text, setText] = useState("");

    const [words, setWords] = useState(0);

    const [characters, setCharacters] = useState(0);

    const [spaces, setSpaces] = useState(0);

    const [searchResults, setSearchResults] = useState([]);

    const [search, setSearch] = useState("");

    const handleTextChange = (event) => {
        const text = event.target.value;
        setText(text);
        const wordCount = text.split(/\s/).filter((word) => word.length > 0).length;
        setWords(wordCount);
        const characterCount = text.length;
        setCharacters(characterCount);
        const spaceCount = text.split(" ").length - 1;
        setSpaces(spaceCount);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text);

        toast.success("Text copied to clipboard", {
            action: {
                label: "Undo",
                onClick: () => {
                    navigator.clipboard.writeText("");
                    toast.dismiss();
                }
            },
        })
    }

    const handleUpperCase = () => {
        const upperCaseText = text.toUpperCase();
        setText(upperCaseText);

        toast.success("Text converted to uppercase", {
            action: {
                label: "Close",
                onClick: () => {
                    toast.dismiss();
                }
            },
        })
    }

    const handleLowerCase = () => {
        const lowerCaseText = text.toLowerCase();
        setText(lowerCaseText);

        toast.success("Text converted to lowercase", {
            action: {
                label: "Close",
                onClick: () => {
                    toast.dismiss();
                }
            },
        })
    }

    const searchClicked = () => {
        if (search === "") {
            toast.error("Please enter search text", {
                action: {
                    label: "Close",
                    onClick: () => {
                        toast.dismiss();
                    }
                },
            })
            return;
        }

        const searchResults = text.match(new RegExp(search, "gi"));
        if (searchResults) {
            toast.success(`${searchResults.length} matches found`, {
                action: {
                    label: "Close",
                    onClick: () => {
                        toast.dismiss();
                    }
                },
            })
            setSearchResults(searchResults);
        } else {
            toast.error("No matches found", {
                action: {
                    label: "Close",
                    onClick: () => {
                        toast.dismiss();
                    }
                },
            })
            setSearchResults([]);
        }
        console.log(searchResults);
    }

    return (
        (
            <Card className="w-full max-w-2xl mx-auto p-4 md:p-6 grid place-items-center mt-20"
            >
                <Toaster />
                <CardContent>
                    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4 md:p-6">
                        <div className="flex flex-col gap-2">
                            <Textarea onChange={handleTextChange} value={text} style={{ scrollbarWidth: "none" }}
                                className="resize-none rounded-lg border border-gray-200 p-4 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 scroll-m-6"
                                placeholder="Type your text here..."
                                rows={6}
                            >
                            </Textarea>
                            <div className="flex items-center justify-between gap-2">
                                <div
                                    className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                    <Link2Icon className="w-4 h-4" />
                                    <span id="word-count">{words} words</span>
                                    <AlignLeftIcon className="w-4 h-4" />
                                    <span id="char-count">{characters} characters</span>
                                    <AlignRightIcon className="w-4 h-4" />
                                    <span id="space-count">{spaces} spaces</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button onClick={() => handleCopy()}
                                        className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                        size="icon"
                                        variant="ghost" >
                                        <ClipboardIcon className="w-4 h-4" />
                                        <span className="sr-only">Count</span>
                                    </Button>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                                    size="icon"
                                                    variant="ghost">
                                                    <SearchIcon className="w-4 h-4" />
                                                    <span className="sr-only">Search</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className="w-[300px]">
                                                <div className="flex flex-col gap-2 p-3">
                                                    <Input value={search} onChange={(e) => setSearch(e.target.value)}
                                                        className="rounded-lg border border-gray-200 p-2 text-sm dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50"
                                                        placeholder="Enter search text..."
                                                        type="text" />
                                                    <Button onClick={() => searchClicked()}
                                                        className="w-full mt-2">Search</Button>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <Button onClick={() => handleUpperCase()}
                                        className="text-gray-500 hover:bg-gray-100 h-10 w-10 dark:text-gray-400 dark:hover:bg-gray-800"
                                        size="icon"
                                        variant="ghost">
                                        <CaseUpperIcon className="w-4 h-4" />
                                        <span className="sr-only">Uppercase</span>
                                    </Button>
                                    <Button onClick={() => handleLowerCase()}
                                        className="text-gray-500 hover:bg-gray-100 h-10 w-10 dark:text-gray-400 dark:hover:bg-gray-800"
                                        size="icon"
                                        variant="ghost">
                                        <CaseLowerIcon className="w-4 h-4" />
                                        <span className="sr-only">Lowercase</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card >
        )
    );
}

function AlignLeftIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="21" x2="3" y1="6" y2="6" />
            <line x1="15" x2="3" y1="12" y2="12" />
            <line x1="17" x2="3" y1="18" y2="18" />
        </svg>)
    );
}


function AlignRightIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <line x1="21" x2="3" y1="6" y2="6" />
            <line x1="21" x2="9" y1="12" y2="12" />
            <line x1="21" x2="7" y1="18" y2="18" />
        </svg>)
    );
}


function CaseLowerIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="7" cy="12" r="3" />
            <path d="M10 9v6" />
            <circle cx="17" cy="12" r="3" />
            <path d="M14 7v8" />
        </svg>)
    );
}


function CaseUpperIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m3 15 4-8 4 8" />
            <path d="M4 13h6" />
            <path d="M15 11h4.5a2 2 0 0 1 0 4H15V7h4a2 2 0 0 1 0 4" />
        </svg>)
    );
}


function ClipboardIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        </svg>)
    );
}


function Link2Icon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M9 17H7A5 5 0 0 1 7 7h2" />
            <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
            <line x1="8" x2="16" y1="12" y2="12" />
        </svg>)
    );
}


function SearchIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>)
    );
}
