import React from "react"
import {Flex, Spin} from "antd";
import Search from "antd/es/input/Search";
import {getWithAbort} from "@Turtle/Api/Turxios";
import DocumentsApi, {VSearchResult} from "@Turtle/DocInt/Api/DocumentsApi";
import {Simulate} from "react-dom/test-utils";
import abort = Simulate.abort;


export default function VSearchView() {


    const timeOutGuard: { current: any } = React.useMemo(() => ({
        current: null
    }), [])

    const [handler] = React.useState(new AbortController())

    const [isSearchTyping, setIsSearchTyping] = React.useState(false)
    const [isSearching, setIsSearching] = React.useState(false)

    const [searchText, setSearchText] = React.useState("")

    const [searchResults, setSearchResults] = React.useState<Array<VSearchResult>>([])


    async function search() {
        setIsSearchTyping(false)
        setIsSearching(true)
        const response = await DocumentsApi.VSearch(handler, searchText)
        setSearchResults(response)
        setIsSearching(false)

    }


    function searchTyping(text: string) {
        setSearchText(text)


        if (isSearching) {
            handler.abort()
        }

        if (timeOutGuard.current) {
            clearTimeout(timeOutGuard.current)
        }

        setIsSearchTyping(true)

        timeOutGuard.current = setTimeout(() => search(), 500)

    }

    React.useEffect(() => {
        return () => {
            if (isSearching) {
                handler.abort()
                clearTimeout(timeOutGuard.current)
            }
        }
    }, [])


    return (
        <Flex vertical>

            <Search
                defaultValue={searchText}
                onChange={(e) => {
                    searchTyping(e.target.value)
                }}

            />

            {
                (isSearchTyping || isSearching) && (
                    <Spin/>
                )
            }

            {
                searchResults.map((searchResult) => {
                    return (
                        <div>
                            <div>{searchResult.similarity}</div>
                            <div>{searchResult.doc.name}</div>
                            <div>{searchResult.doc.description}</div>
                        </div>
                    )
                })
            }


        </Flex>
    )
}