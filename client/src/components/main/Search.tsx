import { FC, useState, useEffect } from "react";
import { useAppDispatch } from "@slices-my/store";
import { setQuery } from "@slices-my/search.reducer";
import search_img from "/img/search.svg"
import icon_img from "/img/icon.png"
import bell_img from "/img/bell.svg"

import ProfileBanner from "@components/ProfileBanner";

const Search: FC = () => {
    const [search, setSearch] = useState<string>("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setQuery(search))
    }, [search])

    return (
        <div id="search">
            <img id="icon" src={icon_img} alt="icon" />
            <img id="search_img" src={search_img} alt="search" />
            <input value={search} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} placeholder="Поиск контактов" type="search" id="search_input" />
            <img id="bell" src={bell_img} alt="bell" />

            <ProfileBanner />
        </div>
    )
}

export default Search