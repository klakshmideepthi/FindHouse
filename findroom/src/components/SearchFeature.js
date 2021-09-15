import React, { useState } from 'react'

import {Register} from "./Signup"
function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.updatesearch(event.currentTarget.value)

    }

    return (
        <Register>
              <div className="form-group">
            <input  className="form-control" style={{paddingLeft:30,borderRadius:0}}
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Search By Typing..."
            />
            </div>
        </Register>
    )
}

export default SearchFeature
