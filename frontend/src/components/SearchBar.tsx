import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useApp } from "@/stores/useApp";
import { User } from "@/lib/types";
import { debounce } from "lodash";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[] | null>([]);
    const { searchUser } = useApp();
    const handleSearch = useCallback(
        debounce(async (query) => {
            if (!query.trim()) {
                setUsers([]);
                return;
            }
            const results = await searchUser(query);
            setUsers(results);
        }, 500),
        []
    );

    useEffect(() => {
        handleSearch(query);
    }, [query, handleSearch]);

    return (
        <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
            <div className="flex items-center border px-3 rounded-md bg-background shadow-sm p-2">
                <div className="flex items-center">

                
                <Search size={20} className="text-gray-500" />
                <Input
                    placeholder="Search user"
                    value={query}
                    className="border-none outline-none flex-1 ml-2 bg-background"
                    onChange={(e) => setQuery(e.target.value)}
                />
                </div>
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="text-muted-foreground hover:text-foreground cursor-pointer">
                        <X size={18} />
                    </button>
                )}
            </div>
            {query && (
                <div className="absolute left-0 w-full mt-1 border shadow-md bg-background z-50 max-h-60 overflow-auto md:block">
                    {users && users.length > 0 ? (
                        users.map((user) => (
                            <Card key={user.id} className="border-none hover:bg-accent transition-all rounded-none">
                                <Link to={`/user/${user.id}`}>
                                    <CardContent className="flex items-center gap-3 cursor-pointer p-2">
                                        <Avatar>
                                            <AvatarFallback>
                                                {user.firstName?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">
                                                {user.firstName} {user.lastName || ""}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))
                    ) : (
                        <p className="p-3 text-sm text-muted-foreground text-center">No users found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default SearchBar;